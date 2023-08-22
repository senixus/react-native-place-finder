import React, {FC, useEffect, useRef, useState} from 'react';
import {Image, View, FlatList, StatusBar} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import AppText from '../components/common/AppText';
import AppButton from '../components/common/AppButton';
import SearchCard from '../components/search/SearchCard';
import SearchModal, {IModalRef} from '../components/search/SearchModal';
import FullScreenModal, {
  IModalRef as IFullScreenRef,
} from '../components/detail/Modal';
import Map from '../components/map/Map';
import PreviewLocation from '../components/map/PreviewLocation';

// Assets
import filter from '../assets/edit.png';
import close from '../assets/close-circle.png';

// Interface
import {IAppParams} from '../interfaces/app.interface';
import {ISearchSelector, searchQuery} from '../redux/searchSlice';
import {ISearchItem} from '../interfaces/search.interface';

interface IProps {
  navigation: StackNavigationProp<IAppParams, 'Home'>;
  route: RouteProp<IAppParams, 'Home'>;
}

const Search: FC<IProps> = ({route}) => {
  // States
  const [location, setLocation] = useState('New York');
  const [term, setTerm] = useState('coffee');
  const [markerItem, setMarkerItem] = useState<ISearchItem>();

  // Refs
  const modalRef = useRef<IModalRef>(null);
  const mapModalRef = useRef<IFullScreenRef>(null);

  // Hooks
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<IAppParams, 'Search'>>();
  const searchItems = useSelector<ISearchSelector, ISearchItem[]>(
    state => state.search.searchItems,
  );

  useEffect(() => {
    dispatch(searchQuery({location, term}));
  }, []);

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

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <SearchModal
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

        <Map setMarkerItem={setMarkerItem} />
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
    backgroundColor: '#fff',
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
    color: '#202533',
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  filterIcon: {
    width: 30,
    height: 30,
  },
  mapBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#d82227',
    borderWidth: 1,
    borderColor: '#d82227',
    borderRadius: 100,
    height: '35rem',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  mapText: {
    color: '#fff',
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
