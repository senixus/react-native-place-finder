import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import AppInput from '@components/common/AppInput';

describe('AppInput', () => {
  test('renders correctly', async () => {
    const onChangeText = jest.fn();

    const {getByDisplayValue, getByPlaceholderText} = render(
      <AppInput placeholder="Testing" setValue={onChangeText} value="" />,
    );

    const placeholderText = getByPlaceholderText('Testing');
    const inputValue = getByDisplayValue('');

    expect(placeholderText).toBeTruthy();
    expect(placeholderText).toBeDefined();
    expect(inputValue).toBeDefined();

    fireEvent.changeText(placeholderText, 'New Value');

    expect(onChangeText).toHaveBeenCalledWith('New Value');
  });
});
