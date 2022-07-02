import React, {
  ForwardRefRenderFunction,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {Modal, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export interface IModalRef {
  handleModal: () => void;
}

interface IProps {
  children: React.ReactNode;
}

const FullScreenModal: ForwardRefRenderFunction<IModalRef, IProps> = (
  {children},
  ref,
) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => setModalVisible(prevVisible => !prevVisible);

  useImperativeHandle(ref, () => ({
    handleModal,
  }));

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}>
      <View style={styles.centeredView}>{children}</View>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  centeredView: {
    flex: 1,
  },
});

export default forwardRef(FullScreenModal);
