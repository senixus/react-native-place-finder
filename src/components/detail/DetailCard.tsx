import React, {FC} from 'react';
import {View, Image, ScrollView} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Components
import AppText from '../common/AppText';
import AppButton from '../common/AppButton';

// Assets
import star from '../../assets/filled-star.png';
import defaultPhoto from '../../assets/default-photo.png';

// Interfaces
import {IBusinessDetail} from '../../interfaces/detail.interface';

interface IProps {
  totalReview: number;
  handleModal: (value: string) => void;
  businessDetail: IBusinessDetail;
}

const DetailCard: FC<IProps> = ({totalReview, handleModal, businessDetail}) => {
  return (
    <View style={styles.innerContainer}>
      <View style={styles.infoContainer}>
        <View style={{flex: 1, marginTop: 50}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AppText text={businessDetail?.name} style={styles.title} />
            <View
              style={{
                ...styles.dot,
                width: 10,
                height: 10,
                backgroundColor: businessDetail?.is_closed
                  ? '#ff0e0e'
                  : '#4bb543',
              }}
            />
          </View>

          <View style={styles.subInfo}>
            <Image source={star} style={styles.star} />
            <AppText text={businessDetail?.rating} style={styles.text} />
            {/* <View style={styles.dot} /> */}
          </View>
          <View style={styles.labelContainer}>
            {businessDetail.categories?.length > 0 &&
              businessDetail.categories?.map((item, i) => (
                <View key={i} style={styles.label}>
                  <AppText text={item.title} style={styles.labelText} />
                </View>
              ))}
          </View>

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
          <AppText text="Photo" style={{...styles.title, marginVertical: 7}} />
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
    marginVertical: 15,
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
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
    height: '90rem',
    width: '90rem',
    borderWidth: 3,
    borderColor: '#fff',
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
  label: {
    backgroundColor: '#e00707',
    marginRight: 7,
    borderRadius: 100,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginTop: 5,
  },
  labelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 4,
  },
  labelText: {
    color: '#fff',
  },
});
