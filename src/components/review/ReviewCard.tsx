import React, {FC} from 'react';
import {Image, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Components
import AppText from '../common/AppText';

// Assets
import star from '../../assets/filled-star.png';
import defaultPhoto from '../../assets/default-profile-photo.png';
import unfilled from '../../assets/star.png';

// Interfaces
import {IReviewItem} from '../../interfaces/review.interface';

interface IProps {
  review: IReviewItem;
}

const ReviewCard: FC<IProps> = ({review}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={
            review?.user?.image_url
              ? {uri: review?.user?.image_url}
              : defaultPhoto
          }
          style={styles.image}
        />
        <View style={styles.review}>
          <AppText text={review?.user?.name} style={styles.username} />
          <View style={styles.starRating}>
            {Array.from({length: review.rating}, (_, i) => (
              <Image key={i} source={star} style={styles.star} />
            ))}
          </View>
          <AppText style={styles.description} text={review?.text} />
          <AppText
            text={review?.time_created?.split(' ')[0]}
            style={styles.date}
          />
        </View>
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  innerContainer: {
    padding: 10,
    flexDirection: 'row',
  },
  review: {
    flex: 1,
    marginLeft: 15,
  },
  image: {
    borderRadius: 100,
    height: '60rem',
    width: '60rem',
  },
  username: {
    fontWeight: '600',
    color: '#202533',
    letterSpacing: 0.4,
    textTransform: 'capitalize',
  },
  description: {
    marginVertical: 8,
    color: '#4f5a79',
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  starRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  star: {
    marginHorizontal: 2,
  },
});
