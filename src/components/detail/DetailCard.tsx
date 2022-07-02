import React, {FC} from 'react';
import {View, Image, ScrollView} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useSelector} from 'react-redux';

// Components
import AppText from '../common/AppText';
import AppButton from '../common/AppButton';

// Assets
import star from '../../assets/filled-star.png';
import defaultPhoto from '../../assets/default-photo.png';

// Interfaces
import {IBusinessDetail} from '../../interfaces/detail.interface';
import {ISearchSelector} from '../../redux/searchSlice';

interface IProps {
  totalReview: number;
  handleModal: (value: string) => void;
}

const DetailCard: FC<IProps> = ({totalReview, handleModal}) => {
  const businessDetail = useSelector<ISearchSelector, IBusinessDetail>(
    state => state.search.detail,
  );

  return (
    <View style={styles.innerContainer}>
      <View style={styles.infoContainer}>
        <View style={{flex: 1}}>
          <AppText text={businessDetail?.name} style={styles.title} />
          <View style={styles.subInfo}>
            <Image source={star} style={styles.star} />
            <AppText text={businessDetail?.rating} style={styles.text} />
            <View style={styles.dot} />
            <AppText
              text={
                businessDetail?.categories?.length > 0
                  ? businessDetail?.categories[0]?.title
                  : ''
              }
              style={styles.text}
            />
          </View>
          <AppText
            text={`${totalReview} Review(s)`}
            style={styles.totalReview}
          />
          <AppText
            text={businessDetail?.location?.display_address
              ?.join(',')
              ?.split(',')
              .join(' ')}
            style={styles.totalReview}
          />
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={
              businessDetail?.image_url
                ? {uri: businessDetail?.image_url}
                : defaultPhoto
            }
            style={styles.logo}
          />
        </View>
      </View>
      {businessDetail?.photos?.length > 0 && (
        <>
          <AppText
            text="Photo(s)"
            style={{...styles.title, marginVertical: 7}}
          />
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {businessDetail?.photos?.map(photo => (
              <AppButton key={photo} onPress={() => handleModal(photo)}>
                <Image
                  source={{uri: photo}}
                  style={styles.photoItem}
                  resizeMode="cover"
                />
              </AppButton>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default DetailCard;

const styles = EStyleSheet.create({
  innerContainer: {
    padding: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    position: 'relative',
  },
  logoContainer: {
    position: 'absolute',
    right: 0,
    top: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    borderRadius: 100,
    height: '70rem',
    width: '70rem',
  },
  title: {
    fontSize: '17rem',
    textTransform: 'capitalize',
    letterSpacing: 0.5,
    fontWeight: '700',
    color: '#202533',
  },
  text: {
    color: '#4f5a79',
    fontWeight: '500',
    fontSize: '13rem',
    letterSpacing: 0.4,
  },
  dot: {
    width: '4rem',
    height: '4rem',
    borderRadius: 100,
    backgroundColor: '#4f5a79',
    marginHorizontal: 7,
  },
  subInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  star: {
    marginRight: 5,
  },
  totalReview: {
    color: '#4f5a79',
    fontWeight: '500',
    fontSize: '13rem',
    letterSpacing: 0.4,
    marginTop: 6,
  },
  photoItem: {
    width: 300,
    height: 200,
    marginRight: 5,
    borderRadius: 5,
  },
});
