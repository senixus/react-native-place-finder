import React from 'react';
import {act, render} from '@testing-library/react-native';
import {Text} from 'react-native';

import Modal, {IModalRef} from '@components/detail/Modal';

describe('Modal', () => {
  test('renders correctly', () => {
    const modalRef = React.createRef<IModalRef>();

    const {getByTestId, getByText} = render(
      <Modal ref={modalRef}>
        <Text>Test</Text>
      </Modal>,
    );

    // Initially, the modal should not be visible
    expect(() => getByText('Test')).toThrow();

    act(() => {
      // Show the modal using the ref
      modalRef.current?.handleModal();
    });

    expect(() => getByText('Test')).toBeTruthy();
    expect(() => getByText('Test')).toBeDefined();

    act(() => {
      modalRef.current?.handleModal();
    });

    expect(() => getByText('Test')).toThrow();

    const modalTest = getByTestId('modal-test');

    expect(modalTest).toBeTruthy();
  });
});
