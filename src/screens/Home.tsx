import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  View,
  FlatList,
  StatusBar,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import EStyleSheet from 'react-native-extended-stylesheet';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation} from '@react-navigation/native';
import {Marker} from 'react-native-maps';
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
import {GOOGLE_API_URL, GOOGLE_MAPS_API_KEY} from '@utils/config';
import {color} from '@utils/color';
import {font} from '@utils/font';

const LOCATION =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

const Search = () => {
  // States
  const [location, setLocation] = useState('');
  const [term, setTerm] = useState('coffee');
  const [markerItem, setMarkerItem] = useState<ISearchItem>();
  const [searchItems, setSearchItems] = useState<ISearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [latLng, setLatLng] = useState({lat: 0, lng: 0});

  // Refs
  const modalRef = useRef<IModalRef>(null);
  const mapModalRef = useRef<IFullScreenRef>(null);

  // Hooks
  const navigation = useNavigation<StackNavigationProp<IAppParams, 'Search'>>();

  useEffect(() => {
    if (location !== '') {
      search();
    }
  }, [location]);

  const search = async () => {
    try {
      setIsLoading(true);
      const qs = new URLSearchParams({location, term}).toString();
      const response = await yelp.get(`/businesses/search?${qs}`);
      setSearchItems(response.data.businesses);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const renderItem = ({item}: {item: ISearchItem}) => (
    <SearchCard
      searchItem={item}
      onDetail={() => navigation.navigate('Detail', {id: item?.id, latLng})}
    />
  );

  const handleRedirect = () => {
    navigation.navigate('Detail', {id: markerItem?.id as string, latLng});
    mapModalRef.current?.handleModal();
  };

  const getCityFromLatLng = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `${GOOGLE_API_URL}/geocode/json?address=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`,
      );
      const data = await response.json();
      const city =
        data.results[0]?.address_components[3]?.long_name || 'Las vegas';
      setLocation(city);
    } catch (error) {
      console.log(error);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        getCityFromLatLng(coords.latitude, coords.longitude);
        setLatLng({lat: coords.latitude, lng: coords.longitude});
      },
      error => {
        console.log(error.code, error.message);
      },
    );
  };

  const checkPermission = async () => {
    const result = await check(LOCATION);

    if (result === RESULTS.DENIED) {
      const response = await request(LOCATION);
      if (response === RESULTS.GRANTED || response === RESULTS.LIMITED) {
        getLocation();
      }
    } else if (result !== RESULTS.GRANTED && result !== RESULTS.LIMITED) {
      Alert.alert('Location Permission', 'App need location permission', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Open Settings', onPress: () => openSettings()},
      ]);
    } else {
      getLocation();
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
        <Map
          latLng={{
            lat: searchItems[0]?.coordinates?.latitude,
            lng: searchItems[0]?.coordinates?.longitude,
          }}>
          {searchItems?.length > 0 &&
            searchItems?.map(item => (
              <Marker
                onPress={() => setMarkerItem(item)}
                key={item.id}
                coordinate={{
                  latitude: item.coordinates.latitude,
                  longitude: item.coordinates.longitude,
                }}>
                <View style={styles.btn}>
                  <AppText text={item.name} style={styles.name} />
                </View>
              </Marker>
            ))}
        </Map>
      </FullScreenModal>
      <SafeAreaView edges={['top']} style={styles.body}>
        <View style={styles.container}>
          {isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator color={color.red.primary} />
            </View>
          ) : (
            <>
              <View style={styles.filterHeader}>
                <AppText
                  text={`${location} - ${term}`}
                  style={styles.searchText}
                />
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
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Search;

const styles = EStyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: color.mono.white,
  },
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
    fontFamily: font.bold,
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
    fontFamily: font.regular,
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  loader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
