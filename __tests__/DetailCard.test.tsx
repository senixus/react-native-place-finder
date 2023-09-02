import React from 'react';
import {render} from '@testing-library/react-native';

import DetailCard from '@components/detail/DetailCard';

// Interface
import {IBusinessDetail} from '@interfaces/detail.interface';

test('renders correctly', () => {
  const handleModal = jest.fn();

  const detail: IBusinessDetail = {
    alias: 'test',
    categories: [{alias: 'category', title: 'Category'}],
    coordinates: {latitude: 22, longitude: 33},
    display_phone: '123',
    distance: 222,
    hours: [
      {
        hours_type: 'test',
        is_open_now: true,
        open: [{day: 2, end: '3', is_overnight: false, start: '2'}],
      },
    ],
    id: '1',
    image_url: 'www.test.com',
    is_claimed: false,
    is_closed: true,
    location: {display_address: ['test']},
    name: 'Test',
    phone: '213',
    photos: ['test.png'],
    rating: 2,
    review_count: 3,
  };

  const {getByText} = render(
    <DetailCard businessDetail={detail} handleModal={handleModal} />,
  );

  const text = getByText('Test');

  expect(text).toBeTruthy();
});
