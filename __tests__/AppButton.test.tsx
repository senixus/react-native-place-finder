import React from 'react';
import {Text} from 'react-native';
import {render, fireEvent} from '@testing-library/react-native';

import AppButton from '@components/common/AppButton';

describe('AppButton', () => {
  test('renders correctly', () => {
    // Save the original console.log function
    const originalLog = console.log;

    // Create a spy function to capture console.log calls
    const consoleSpy = jest.fn();
    console.log = consoleSpy;

    const {getByText, queryByText, getByTestId} = render(
      <AppButton onPress={() => console.log('Test')}>
        <Text>Child Text</Text>
      </AppButton>,
    );

    const button = getByTestId('button');
    fireEvent.press(button);

    // Assert that console.log was called with the expected message
    expect(consoleSpy).toHaveBeenCalledWith('Test');

    // Restore the original console.log function
    console.log = originalLog;

    const childElementText = getByText('Child Text');
    const error = queryByText('Error Message');

    expect(childElementText).toBeTruthy();
    expect(childElementText).toBeDefined();
    expect(childElementText.props.children).toEqual('Child Text');
    expect(error).toBeNull(); // Check if an element doesn't exist
  });
});
