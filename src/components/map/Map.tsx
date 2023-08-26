import React, {FC, useEffect} from 'react';
import {View} from 'react-native';
import ClusterMapView from 'react-native-map-clustering';
import {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import EStyleSheet from 'react-native-extended-stylesheet';

// Interfaces
import {ISearchItem} from '@interfaces/search.interface';

// Components
import AppText from '@components/common/AppText';

// Utils
import {color} from '@utils/color';

interface IProps {
  setMarkerItem?: (value: ISearchItem) => void;
  searchItems: ISearchItem[];
}

const Map: FC<IProps> = ({setMarkerItem, searchItems}) => {
  useEffect(() => {
    return () => setMarkerItem?.({} as ISearchItem);
  }, []);

  return (
    <>
      <ClusterMapView
        animationEnabled={false}
        toolbarEnabled={false}
        clusterColor={color.red.primary}
        clusteringEnabled={true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: searchItems[0]?.coordinates?.latitude,
          longitude: searchItems[0]?.coordinates?.longitude,
          latitudeDelta: 8.5,
          longitudeDelta: 8.5,
        }}>
        {searchItems?.length > 0 &&
          searchItems?.map(item => (
            <Marker
              onPress={() => setMarkerItem && setMarkerItem(item)}
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
      </ClusterMapView>
    </>
  );
};

export default Map;

const styles = EStyleSheet.create({
  map: {
    flex: 1,
  },
  btn: {
    backgroundColor: color.red.primary,
    borderWidth: 1,
    borderColor: color.red.primary,
    borderRadius: 100,
    height: '35rem',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  name: {
    color: color.mono.white,
    letterSpacing: 0.5,
    fontSize: '13rem',
  },
});
