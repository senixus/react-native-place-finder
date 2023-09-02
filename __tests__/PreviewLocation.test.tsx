import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

// Components
import PreviewLocation from '@components/map/PreviewLocation';

// interface
import {ISearchItem} from '@interfaces/search.interface';

describe('PreviewLocation', () => {
  const markerItem: ISearchItem = {
    name: 'Sample Location',
    rating: 4.5,
    review_count: 100,
    display_phone: '123-456-7890',
    image_url: 'https://example.com/sample.jpg',
    alias: 'test',
    categories: [{alias: 'restaurant', title: 'Restaurant'}],
    coordinates: {latitude: 22, longitude: 33},
    distance: 222,
    id: '1',
    is_closed: true,
    location: {country: 'Test', city: 'test'},
    phone: '213',
  };
  test('renders correctly', () => {
    const onRedirect = jest.fn();

    const {getByText} = render(
      <PreviewLocation onRedirect={onRedirect} markerItem={markerItem} />,
    );

    const locationName = getByText('Sample Location');
    const rating = getByText('4.5');
    const reviewCount = getByText('(100)');
    const phoneNumber = getByText('123-456-7890');
    const category = getByText('Restaurant');

    expect(locationName).toBeTruthy();
    expect(rating).toBeTruthy();
    expect(reviewCount).toBeTruthy();
    expect(phoneNumber).toBeTruthy();
    expect(category).toBeTruthy();
  });

  test('it calls onRedirect function when AppButton is pressed', () => {
    const onRedirectMock = jest.fn();
    const {getByTestId} = render(
      <PreviewLocation markerItem={markerItem} onRedirect={onRedirectMock} />,
    );

    // Find the AppButton and simulate a press
    const appButton = getByTestId('button');
    fireEvent.press(appButton);

    // Assert that the onRedirect function was called
    expect(onRedirectMock).toHaveBeenCalled();
    expect(onRedirectMock).toHaveBeenCalledTimes(1);
  });
});
