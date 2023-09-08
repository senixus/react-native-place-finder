import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import {Text} from 'react-native';

import SearchModal, {IModalRef} from '@components/search/SearchModal';

describe('SearchModal', () => {
  const modalRef = React.createRef<IModalRef>();
  const setTerm = jest.fn();
  const setLocation = jest.fn();
  const searchBusiness = jest.fn();

  test('renders correctly', () => {
    const {getByPlaceholderText} = render(
      <SearchModal
        location="San Francisco"
        searchBusiness={searchBusiness}
        setLocation={setLocation}
        term="initial text"
        setTerm={setTerm}
        ref={modalRef}
      />,
    );

    act(() => {
      modalRef.current?.handleModal();
    });

    expect(() =>
      getByPlaceholderText('Pasta, Coffee, Beer etc...'),
    ).toBeTruthy();
  });
});
