import React, {FC} from 'react';
import {View, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Components
import AppButton from '../common/AppButton';
import AppText from '../common/AppText';

// Interface
import {ISearchItem} from '../../interfaces/search.interface';

// Assets
import star from '../../assets/filled-star.png';
import defaultPhoto from '../../assets/default-photo.png';

interface IProps {
  onDetail: () => void;
  searchItem: ISearchItem;
}

const SearchCard: FC<IProps> = ({onDetail, searchItem}) => {
  return (
    <AppButton onPress={onDetail} style={styles.container}>
      <Image
        resizeMode="cover"
        source={
          searchItem?.image_url ? {uri: searchItem?.image_url} : defaultPhoto
        }
        style={styles.img}
      />
      <AppText text={searchItem?.name} style={styles.title} />
      <View style={styles.ratingContainer}>
        <View style={styles.innerRatingContainer}>
          <Image source={star} />
          <AppText text={searchItem?.rating} style={styles.rating} />
        </View>
        <AppText
          text={`(${
            searchItem?.review_count > 500 ? '500+' : searchItem?.review_count
          })`}
          style={styles.reviewCount}
        />
      </View>
    </AppButton>
  );
};

export default SearchCard;

const styles = EStyleSheet.create({
  container: {
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 5,
    borderRadius: 10,
  },
  img: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: '150rem',
    width: '100%',
  },
  title: {
    fontSize: '15rem',
    fontWeight: '700',
    color: '#202533',
    paddingTop: 10,
    paddingLeft: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingLeft: 10,
  },
  innerRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginRight: 10,
    marginLeft: 5,
    color: '#202533',
    fontWeight: '600',
  },
  reviewCount: {
    color: '#4f5a79',
  },
});
