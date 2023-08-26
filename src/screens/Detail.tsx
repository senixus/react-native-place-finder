import React, {FC, useEffect, useRef, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  View,
  Image,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Components
import FullScreenImage, {IModalRef} from '@components/detail/Modal';
import ReviewCard from '@components/review/ReviewCard';
import DetailCard from '@components/detail/DetailCard';
import AppButton from '@components/common/AppButton';
import AppText from '@components/common/AppText';

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
import {color} from '@utils/color';

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

  // Route Params
  const {id} = route.params;

  // Refs
  const modalRef = useRef<IModalRef>(null);

  const getBusinessDetail = async () => {
    try {
      const [detailResponse, reviewResponse] = await Promise.all([
        yelp.get(`/businesses/${id}`),
        yelp.get(`/businesses/${id}/reviews`),
      ]);

      setBusinessDetail(detailResponse.data);
      setReview(reviewResponse.data);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.log(error);
    }
  };

  useEffect(() => {
    getBusinessDetail();
  }, []);

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
      <SafeAreaView style={styles.body}>
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
  },
  reviewTitle: {
    fontSize: '17rem',
    textTransform: 'capitalize',
    letterSpacing: 0.5,
    fontWeight: '700',
    color: color.mono.black,
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
});
