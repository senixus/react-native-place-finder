import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import SearchCard from '@components/search/SearchCard';

// Interface
import {ISearchItem} from '@interfaces/search.interface';

describe('SearchCard', () => {
  const detail: ISearchItem = {
    alias: 'test',
    categories: [{alias: 'category', title: 'Category'}],
    coordinates: {latitude: 22, longitude: 33},
    display_phone: '123',
    distance: 222,
    id: '1',
    image_url: 'www.test.com',
    is_closed: true,
    location: {city: 'Amsterdam', country: 'Netherlands'},
    name: 'Test',
    phone: '213',
    rating: 2,
    review_count: 3,
  };
  test('renders correctly', () => {
    const onDetail = jest.fn();

    const {getByText} = render(
      <SearchCard searchItem={detail} onDetail={onDetail} />,
    );

    const text = getByText('Test');
    const isClosed = getByText('Closed');
    const location = getByText('Amsterdam, Netherlands');

    expect(text).toBeTruthy();
    expect(isClosed).toBeTruthy();
    expect(location).toBeTruthy();
  });

  test('onPress calls', () => {
    const onDetail = jest.fn();

    const {getByTestId} = render(
      <SearchCard searchItem={detail} onDetail={onDetail} />,
    );

    const button = getByTestId('button');

    fireEvent.press(button);

    expect(onDetail).toHaveBeenCalled();
    expect(onDetail).toHaveBeenCalledTimes(1);

    fireEvent.press(button);

    expect(onDetail).toHaveBeenCalledTimes(2);
  });
});
