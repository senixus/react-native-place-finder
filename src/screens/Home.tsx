import React, {FC, useEffect, useRef, useState} from 'react';
import {Image, View, FlatList, StatusBar, Platform, Alert} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {
  PERMISSIONS,
  RESULTS,
  check,
  request,
  openSettings,
} from 'react-native-permissions';

// Components
import SearchModal, {IModalRef} from '@components/search/SearchModal';
import PreviewLocation from '@components/map/PreviewLocation';
import SearchCard from '@components/search/SearchCard';
import AppButton from '@components/common/AppButton';
import AppText from '@components/common/AppText';
import Map from '@components/map/Map';
import FullScreenModal, {
  IModalRef as IFullScreenRef,
} from '@components/detail/Modal';

// Assets
import close from '@assets/close-circle.png';
import filter from '@assets/edit.png';

// Interface
import {ISearchItem} from '@interfaces/search.interface';
import {IAppParams} from '@interfaces/app.interface';

// API
import yelp from '@api/index';

// Utils
import {color} from '@utils/color';

const LOCATION =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

const Search = () => {
  // States
  const [location, setLocation] = useState('New York');
  const [term, setTerm] = useState('coffee');
  const [markerItem, setMarkerItem] = useState<ISearchItem>();
  const [searchItems, setSearchItems] = useState<ISearchItem[]>([]);

  // Refs
  const modalRef = useRef<IModalRef>(null);
  const mapModalRef = useRef<IFullScreenRef>(null);

  // Hooks
  const navigation = useNavigation<StackNavigationProp<IAppParams, 'Search'>>();

  useEffect(() => {
    search();
  }, []);

  const search = async () => {
    try {
      const qs = new URLSearchParams({location, term}).toString();
      const response = await yelp.get(`/businesses/search?${qs}`);
      setSearchItems(response.data.businesses);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}: {item: ISearchItem}) => (
    <SearchCard
      searchItem={item}
      onDetail={() => navigation.navigate('Detail', {id: item?.id})}
    />
  );

  const handleRedirect = () => {
    navigation.navigate('Detail', {id: markerItem?.id as string});
    mapModalRef.current?.handleModal();
  };

  const checkPermission = async () => {
    const result = await check(LOCATION);
    if (result === RESULTS.DENIED) {
      const response = await request(LOCATION);
      if (response === RESULTS.GRANTED || response === RESULTS.LIMITED) {
        console.log(response);
      }
    } else if (result !== RESULTS.GRANTED && result !== RESULTS.LIMITED) {
      Alert.alert('Location Permission', 'App need location permission', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Open Settings', onPress: () => openSettings()},
      ]);
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <SearchModal
        searchBusiness={search}
        ref={modalRef}
        location={location}
        term={term}
        setLocation={setLocation}
        setTerm={setTerm}
      />
      <FullScreenModal ref={mapModalRef}>
        <AppButton
          onPress={() => mapModalRef?.current?.handleModal()}
          style={styles.closeBtn}>
          <Image source={close} />
        </AppButton>
        {markerItem?.id ? (
          <PreviewLocation
            onRedirect={handleRedirect}
            markerItem={markerItem}
          />
        ) : (
          <></>
        )}
        <Map searchItems={searchItems} setMarkerItem={setMarkerItem} />
      </FullScreenModal>
      <SafeAreaView edges={['top']} style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.filterHeader}>
            <AppText text={`${location} - ${term}`} style={styles.searchText} />
            <AppButton
              onPress={() => modalRef.current?.handleModal()}
              style={styles.filterBtn}>
              <Image source={filter} style={styles.filterIcon} />
            </AppButton>
          </View>
          <FlatList
            data={searchItems}
            renderItem={renderItem}
            keyExtractor={item => item?.id}
            contentContainerStyle={{paddingBottom: 20}}
          />
          <AppButton
            onPress={() => mapModalRef.current?.handleModal()}
            style={styles.mapBtn}>
            <AppText text="Show on Map" style={styles.mapText} />
          </AppButton>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Search;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.mono.white,
    position: 'relative',
  },
  filterBtn: {
    marginLeft: 'auto',
  },
  searchText: {
    marginLeft: 'auto',
    fontWeight: '700',
    letterSpacing: 0.5,
    fontSize: '15rem',
    color: color.mono.black,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: color.gray.secondary,
  },
  filterIcon: {
    width: 30,
    height: 30,
  },
  mapBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: color.red.primary,
    borderWidth: 1,
    borderColor: color.red.primary,
    borderRadius: 100,
    height: '35rem',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  mapText: {
    color: color.mono.white,
    letterSpacing: 0.5,
    fontSize: '13rem',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
});
