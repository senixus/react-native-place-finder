import React, {FC} from 'react';
import ClusterMapView from 'react-native-map-clustering';
import {PROVIDER_GOOGLE} from 'react-native-maps';
import EStyleSheet from 'react-native-extended-stylesheet';

// Utils
import {color} from '@utils/color';
import {font} from '@utils/font';

interface IProps {
  latLng: {lat: number; lng: number};
  children: React.ReactNode;
}

const Map: FC<IProps> = ({latLng, children}) => {
  return (
    <ClusterMapView
      animationEnabled={false}
      toolbarEnabled={false}
      clusterColor={color.red.primary}
      clusteringEnabled={true}
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: latLng.lat,
        longitude: latLng.lng,
        latitudeDelta: 8.5,
        longitudeDelta: 8.5,
      }}>
      {children}
    </ClusterMapView>
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
    fontFamily: font.regular,
  },
});
