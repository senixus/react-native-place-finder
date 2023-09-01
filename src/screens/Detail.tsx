import React, {FC, useEffect, useRef, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  View,
  Image,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Polyline, Marker} from 'react-native-maps';

// Components
import FullScreenImage, {IModalRef} from '@components/detail/Modal';
import ReviewCard from '@components/review/ReviewCard';
import DetailCard from '@components/detail/DetailCard';
import AppButton from '@components/common/AppButton';
import AppText from '@components/common/AppText';
import FullScreenModal, {
  IModalRef as IFullScreenRef,
} from '@components/detail/Modal';
import Map from '@components/map/Map';

// Interfaces
import {IBusinessDetail} from '@interfaces/detail.interface';
import {IAppParams} from '@interfaces/app.interface';
import {IReview} from '@interfaces/review.interface';

// Assets
import defaultPhoto from '@assets/default-photo.png';
import close from '@assets/close-circle.png';
import back from '@assets/left-arrow.png';

// API
import yelp from '@api/index';

// Utils
import {GOOGLE_API_URL, GOOGLE_MAPS_API_KEY} from '@utils/config';
import {decodeCoordinates} from '@utils/coordinatesDecoder';
import {color} from '@utils/color';
import {font} from '@utils/font';

interface IProps {
  navigation: StackNavigationProp<IAppParams, 'Detail'>;
  route: RouteProp<IAppParams, 'Detail'>;
}

const Detail: FC<IProps> = ({navigation, route}) => {
  // States
  const [image, setImage] = useState('');
  const [businessDetail, setBusinessDetail] = useState<IBusinessDetail>(
    {} as IBusinessDetail,
  );
  const [review, setReview] = useState<IReview>({reviews: [], total: 0});
  const [isLoading, setIsLoading] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState<
    {latitude: number; longitude: number}[]
  >([]);

  // Route Params
  const {id, latLng} = route.params;

  // Refs
  const modalRef = useRef<IModalRef>(null);
  const mapModalRef = useRef<IFullScreenRef>(null);

  const getDirections = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `${GOOGLE_API_URL}/directions/json?origin=${latLng.lat},${latLng.lng}&destination=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`,
      );
      const data = await response.json();
      const routes = data.routes;

      if (routes.length > 0) {
        const coordinates = routes[0].overview_polyline.points;
        const decodedCoordinateList = decodeCoordinates(coordinates);
        const route = decodedCoordinateList.map(coord => ({
          latitude: coord[0],
          longitude: coord[1],
        }));
        setRouteCoordinates(route);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBusinessDetail = async () => {
    try {
      setIsLoading(true);
      const [detailResponse, reviewResponse] = await Promise.all([
        yelp.get(`/businesses/${id}`),
        yelp.get(`/businesses/${id}/reviews`),
      ]);

      setBusinessDetail(detailResponse.data);
      setReview(reviewResponse.data);
      getDirections(
        detailResponse.data.coordinates.latitude,
        detailResponse.data.coordinates.longitude,
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (process.env.NODE_ENV === 'development') console.log(error);
    }
  };

  useEffect(() => {
    getBusinessDetail();
  }, [id, latLng]);

  const handleModal = (img: string) => {
    setImage(img);
    modalRef?.current?.handleModal();
  };

  return (
    <>
      <FullScreenImage ref={modalRef}>
        <Image source={{uri: image}} style={{flex: 1}} />
        <AppButton
          onPress={() => modalRef?.current?.handleModal()}
          style={styles.closeBtn}>
          <Image source={close} />
        </AppButton>
      </FullScreenImage>
      <FullScreenModal ref={mapModalRef}>
        <AppButton
          onPress={() => mapModalRef?.current?.handleModal()}
          style={styles.closeBtn}>
          <Image source={close} />
        </AppButton>
        <Map latLng={{lat: latLng.lat, lng: latLng.lng}}>
          <Marker coordinate={{latitude: latLng.lat, longitude: latLng.lng}} />
          {businessDetail.coordinates && (
            <Marker
              coordinate={{
                latitude: businessDetail.coordinates.latitude,
                longitude: businessDetail.coordinates.longitude,
              }}
            />
          )}
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor={color.red.primary}
              strokeWidth={4}
            />
          )}
        </Map>
      </FullScreenModal>
      <SafeAreaView style={styles.body}>
        {isLoading ? (
          <View style={styles.container}>
            <View style={styles.loader}>
              <ActivityIndicator color={color.red.primary} />
            </View>
          </View>
        ) : (
          <ScrollView style={styles.body}>
            <View style={styles.container}>
              <ImageBackground
                imageStyle={{opacity: 0.5}}
                source={
                  businessDetail?.image_url
                    ? {uri: businessDetail?.image_url}
                    : defaultPhoto
                }
                style={styles.image}
                resizeMode="cover"
              />
              <AppButton
                onPress={() => navigation.goBack()}
                style={styles.backBtn}>
                <Image source={back} />
              </AppButton>
              <DetailCard
                handleModal={(photo: string) => handleModal(photo)}
                totalReview={review?.total}
                businessDetail={businessDetail}
              />

              {review.reviews?.length > 0 && (
                <View>
                  <View style={styles.reviewTitleContainer}>
                    <AppText text="Reviews" style={styles.reviewTitle} />
                    <View style={styles.dot} />
                    <AppText
                      text={`${review?.total} Review(s)`}
                      style={styles.totalReview}
                    />
                  </View>

                  {review.reviews?.map(review => (
                    <ReviewCard review={review} key={review?.id} />
                  ))}
                </View>
              )}
            </View>
          </ScrollView>
        )}
        <AppButton
          onPress={() => mapModalRef.current?.handleModal()}
          style={styles.mapBtn}>
          <AppText text="Show on Map" style={styles.mapText} />
        </AppButton>
      </SafeAreaView>
    </>
  );
};

export default Detail;

const styles = EStyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: color.mono.white,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  innerContainer: {
    padding: 10,
  },
  image: {
    height: '170rem',
    width: '100%',
    backgroundColor: '#000',
  },
  backBtn: {
    position: 'absolute',
    left: 10,
    top: 10,
    backgroundColor: color.mono.white,
    borderRadius: 100,
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  reviewTitle: {
    fontSize: '17rem',
    textTransform: 'capitalize',
    letterSpacing: 0.5,
    color: color.mono.black,
    fontFamily: font.bold,
  },
  reviewTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 10,
  },
  dot: {
    width: '4rem',
    height: '4rem',
    borderRadius: 100,
    backgroundColor: color.gray.primary,
    marginHorizontal: 7,
  },
  loader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
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
});
