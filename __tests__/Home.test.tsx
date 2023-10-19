import React from 'react';
import {Text} from 'react-native';
import {render, fireEvent} from '@testing-library/react-native';

import Home from '@screens/Home';

jest.mock('react-native-geolocation-service', () => ({
  getCurrentPosition: jest.fn(),
}));

jest.mock('react-native-permissions', () => ({
  check: jest.fn(),
  request: jest.fn(),
  openSettings: jest.fn(),
  RESULTS: {DENIED: 'denied', GRANTED: 'granted', LIMITED: 'limited'},
  PERMISSIONS: {
    ANDROID: {ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION'},
    IOS: {LOCATION_WHEN_IN_USE: 'ios.permission.LOCATION_WHEN_IN_USE'},
  },
}));

describe('Home', () => {
  test('renders correctly', () => {
    const {getByText} = render(<Home />);
    expect(getByText('Show on Map')).toBeTruthy();
  });
});

/*
    // LocationComponent.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import LocationComponent from './LocationComponent';

// Mock the react-native-geolocation-service module
jest.mock('react-native-geolocation-service', () => ({
  getCurrentPosition: jest.fn(),
}));

describe('LocationComponent', () => {
  it('should render without errors', () => {
    const { getByText } = render(<LocationComponent />);
    // Your assertions here
  });

  it('should handle location data', () => {
    // Mock a successful location response
    const mockLocation = {
      coords: {
        latitude: 123,
        longitude: 456,
      },
    };
    
    // Set up the mock behavior for getCurrentPosition
    require('react-native-geolocation-service').getCurrentPosition.mockImplementationOnce(
      (successCallback) => successCallback(mockLocation)
    );

    // Now, you can call your getLocation function and assert the behavior
    const locationData = getLocation(); // Assuming you have a function to get location data

    // Your assertions here to verify the behavior when location data is received
  });

  it('should handle location error', () => {
    // Mock an error response
    const mockError = {
      code: 1,
      message: 'Location permission denied',
    };

    // Set up the mock behavior for getCurrentPosition
    require('react-native-geolocation-service').getCurrentPosition.mockImplementationOnce(
      (successCallback, errorCallback) => errorCallback(mockError)
    );

    // Now, you can call your getLocation function and assert the behavior
    const locationError = getLocation(); // Assuming you have a function to get location data

    // Your assertions here to verify the behavior when a location error occurs
  });
});
*/
