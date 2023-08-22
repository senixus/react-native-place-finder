import React, {
  ForwardRefRenderFunction,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {Modal, StatusBar, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

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
      <SafeAreaProvider>
        <SafeAreaView
          edges={['top']}
          style={{flex: 1, backgroundColor: 'transparent'}}>
          <View style={styles.centeredView}>{children}</View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  centeredView: {
    flex: 1,
  },
});

export default forwardRef(FullScreenModal);
