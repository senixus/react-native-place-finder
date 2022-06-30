import React, {useState} from 'react';
import {Modal, Text, View, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Components
import AppInput from '../common/AppInput';
import AppButton from '../common/AppButton';

import close from '../../assets/close-circle.png';

const SearchModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AppButton
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.closeBtn}>
              <Image source={close} />
            </AppButton>
            <View style={{...styles.inputItem, marginTop: 100}}>
              <AppInput placeholder="Pasta, Coffee, Beer etc..." />
            </View>
            <View style={styles.inputItem}>
              <AppInput placeholder="New York" />
            </View>
            <AppButton
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.text}>Search</Text>
            </AppButton>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = EStyleSheet.create({
  centeredView: {
    flex: 1,
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  modalView: {
    backgroundColor: '#fff',
    position: 'relative',
    flex: 1,
    padding: 25,
    justifyContent: 'center',
  },
  button: {
    borderRadius: 30,
    padding: 10,
    height: '50rem',
    marginTop: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d82227',
  },
  inputItem: {
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.8,
    fontSize: '14rem',
  },
});

export default SearchModal;
