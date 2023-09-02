import React from 'react';
import {render} from '@testing-library/react-native';

import AppText from '@components/common/AppText';

test('renders correcty', () => {
  const {getByText} = render(<AppText text="Test" style={{color: 'red'}} />);

  const text = getByText('Test');

  expect(text).toBeTruthy();
});
