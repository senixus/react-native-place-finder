import React from 'react';
import {render} from '@testing-library/react-native';

import ReviewCard from '@components/review/ReviewCard';

// Interface
import {IReviewItem} from '@interfaces/review.interface';

test('renders correctly', () => {
  const review: IReviewItem = {
    id: '1',
    rating: 2,
    text: 'Test text',
    time_created: '22.10.2022',
    url: 'www.test.com',
    user: {id: '1', image_url: 'test.png', name: 'test', profile_url: 'test'},
  };

  const {getByText} = render(<ReviewCard review={review} />);

  const text = getByText('Test text');

  expect(text).toBeTruthy();
  expect(text).toBeDefined();
  expect(text.props.children).toEqual('Test text');
});
