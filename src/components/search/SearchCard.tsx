import React, {FC} from 'react';
import {View, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Components
import AppButton from '@components/common/AppButton';
import AppText from '@components/common/AppText';

// Interface
import {ISearchItem} from '@interfaces/search.interface';

// Assets
import defaultPhoto from '@assets/default-photo.png';
import star from '@assets/filled-star.png';

// Utils
import {color} from '@utils/color';
import {font} from '@utils/font';

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
          searchItem?.image_url ? {uri: searchItem.image_url} : defaultPhoto
        }
        style={styles.img}
      />
      <View style={styles.innerContainer}>
        <AppText text={searchItem.name} style={styles.title} />
        <View style={styles.innerChildContainer}>
          <AppText
            text={searchItem?.is_closed ? 'Closed' : 'Open'}
            style={{
              ...styles.reviewCount,
              color: searchItem?.is_closed ? '#ff0e0e' : '#4bb543',
              marginVertical: 4,
            }}
          />
          <View style={styles.labelContainer}>
            {searchItem.categories?.length > 0 &&
              searchItem.categories?.map((item, i) => (
                <View key={i} style={styles.label}>
                  <AppText text={item.title} style={styles.labelText} />
                </View>
              ))}
          </View>
          <AppText
            text={`${searchItem.location?.city}, ${searchItem.location?.country}`}
            style={styles.text}
          />
        </View>
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
      </View>
    </AppButton>
  );
};

export default SearchCard;

const styles = EStyleSheet.create({
  container: {
    marginVertical: 15,
    borderWidth: 1,
    borderColor: color.gray.secondary,
    marginHorizontal: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  innerContainer: {
    flex: 1,
  },
  img: {
    height: 'auto',
    width: '130rem',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  title: {
    fontSize: '16rem',
    fontFamily: font.bold,
    color: color.mono.black,
    paddingTop: 10,
    paddingLeft: 10,
    flex: 1,
  },
  innerChildContainer: {
    paddingLeft: 10,
    marginVertical: 5,
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
    color: color.mono.black,
    fontWeight: '600',
  },
  reviewCount: {
    color: color.gray.primary,
  },
  text: {
    marginVertical: 7,
    color: color.mono.black,
  },
  label: {
    backgroundColor: color.red.primary,
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
    color: color.mono.white,
  },
});
