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
import {useDispatch, useSelector} from 'react-redux';

// Components
import ReviewCard from '../components/review/ReviewCard';
import FullScreenImage, {IModalRef} from '../components/detail/Modal';
import AppButton from '../components/common/AppButton';

// Interfaces
import {IAppParams} from '../interfaces/app.interface';
import {
  getBusinessDetail,
  getReviewsByBusinessId,
  ISearchSelector,
} from '../redux/searchSlice';

import {IReview} from '../interfaces/review.interface';
import {IBusinessDetail} from '../interfaces/detail.interface';

// Assets
import defaultPhoto from '../assets/default-photo.png';
import back from '../assets/left-arrow.png';
import close from '../assets/close-circle.png';
import DetailCard from '../components/detail/DetailCard';

interface IProps {
  navigation: StackNavigationProp<IAppParams, 'Detail'>;
  route: RouteProp<IAppParams, 'Detail'>;
}

const Detail: FC<IProps> = ({navigation, route}) => {
  // Hooks
  const dispatch = useDispatch();
  const businessDetail = useSelector<ISearchSelector, IBusinessDetail>(
    state => state.search.detail,
  );
  const review = useSelector<ISearchSelector, IReview>(
    state => state.search.reviews,
  );

  // States
  const [image, setImage] = useState('');

  // Route Params
  const {id} = route.params;

  // Refs
  const modalRef = useRef<IModalRef>(null);

  useEffect(() => {
    dispatch(getBusinessDetail(id));
    dispatch(getReviewsByBusinessId(id));
  }, [route]);

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
            />

            {review?.reviews?.length > 0 &&
              review?.reviews?.map(review => (
                <ReviewCard review={review} key={review?.id} />
              ))}
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
    backgroundColor: 'white',
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
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: '#000',
  },
  backBtn: {
    position: 'absolute',
    left: 10,
    top: 10,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
