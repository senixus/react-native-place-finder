import React, {FC} from 'react';
import {View, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Components
import AppButton from '../common/AppButton';
import AppText from '../common/AppText';

// Assets
import star from '../../assets/filled-star.png';
import defaultPhoto from '../../assets/default-photo.png';

// Interfaces
import {ISearchItem} from '../../interfaces/search.interface';

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
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: '110rem',
    flex: 1,
    borderRadius: 10,
    margin: 10,
  },
  image: {
    height: '100rem',
    width: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  itemName: {
    marginBottom: 5,
    fontSize: '15rem',
    fontWeight: '600',
    color: '#202533',
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
    color: '#4f5a79',
  },
});
