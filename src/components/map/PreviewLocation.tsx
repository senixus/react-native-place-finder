import React, {FC} from 'react';
import {View, Image, Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Components
import AppButton from '@components/common/AppButton';
import AppText from '@components/common/AppText';

// Assets
import defaultPhoto from '@assets/default-photo.png';
import star from '@assets/filled-star.png';

// Interfaces
import {ISearchItem} from '@interfaces/search.interface';

// Utils
import {color} from '@utils/color';
import {font} from '@utils/font';

interface IProps {
  markerItem: ISearchItem;
  onRedirect: () => void;
}

const PreviewLocation: FC<IProps> = ({markerItem, onRedirect}) => {
  return (
    <AppButton onPress={onRedirect} style={styles.cardInfo}>
      <Image
        resizeMode="cover"
        source={
          markerItem?.image_url ? {uri: markerItem?.image_url} : defaultPhoto
        }
        style={styles.image}
      />
      <View style={styles.cardInfoItem}>
        <AppText
          text={markerItem?.name ? markerItem?.name : ''}
          style={styles.itemName}
        />
        <View style={styles.ratingContainer}>
          <Image source={star} />
          <AppText
            text={markerItem?.rating ? markerItem?.rating : ''}
            style={styles.rating}
          />
          <AppText
            text={
              markerItem?.review_count ? `(${markerItem?.review_count})` : ''
            }
            style={styles.rating}
          />
        </View>
        <AppText
          text={markerItem?.display_phone ? `${markerItem?.display_phone}` : ''}
          style={{...styles.rating, marginVertical: 5}}
        />
        <AppText
          text={
            markerItem?.categories ? `${markerItem?.categories[0]?.title}` : ''
          }
          style={styles.rating}
        />
      </View>
    </AppButton>
  );
};

export default PreviewLocation;

const styles = EStyleSheet.create({
  cardInfo: {
    zIndex: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: color.mono.white,
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: '110rem',
    flex: 1,
    borderRadius: 10,
    margin: 10,
    ...Platform.select({
      ios: {
        marginBottom: 25,
      },
    }),
  },
  image: {
    height: '100%',
    width: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  itemName: {
    marginBottom: 5,
    fontSize: '15rem',
    fontFamily: font.semiBold,
    color: color.mono.black,
  },
  cardInfoItem: {
    paddingLeft: 7,
    paddingTop: 7,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 7,
    fontWeight: '500',
    color: color.gray.primary,
  },
});
