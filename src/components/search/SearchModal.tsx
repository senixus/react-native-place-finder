import React, {
  ForwardRefRenderFunction,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Modal,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch} from 'react-redux';

// Components
import AppButton from '@components/common/AppButton';
import AppInput from '@components/common/AppInput';
import AppText from '@components/common/AppText';

// Assets
import close from '@assets/close-circle.png';

// Utils
import {color} from '@utils/color';
import {font} from '@utils/font';

export interface IModalRef {
  handleModal: () => void;
}

interface IProps {
  setLocation: (value: string) => void;
  setTerm: (value: string) => void;
  searchBusiness: () => void;
  location: string;
  term: string;
}

const SearchModal: ForwardRefRenderFunction<IModalRef, IProps> = (
  {setLocation, setTerm, location, term, searchBusiness},
  ref,
) => {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const handleModal = () => setModalVisible(prevVisible => !prevVisible);

  useImperativeHandle(ref, () => ({
    handleModal,
  }));

  const search = () => {
    searchBusiness();
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}>
      <SafeAreaProvider>
        <SafeAreaView edges={['top']} style={{flex: 1}}>
          <KeyboardAvoidingView
            style={styles.centeredView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <AppButton
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.closeBtn}>
                  <Image source={close} />
                </AppButton>
                <View style={{...styles.inputItem, marginTop: 100}}>
                  <AppText text="Food, Drink etc..." style={styles.label} />
                  <AppInput
                    value={term}
                    setValue={(value: string) => setTerm(value)}
                    placeholder="Pasta, Coffee, Beer etc..."
                  />
                </View>
                <View style={styles.inputItem}>
                  <AppText text="Location" style={styles.label} />
                  <AppInput
                    value={location}
                    setValue={(value: string) => setLocation(value)}
                    placeholder="New York"
                  />
                </View>

                <AppButton style={styles.button} onPress={search}>
                  <Text style={styles.text}>Search</Text>
                </AppButton>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
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
    backgroundColor: color.mono.white,
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
    backgroundColor: color.red.primary,
  },
  inputItem: {
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: color.mono.white,
    fontFamily: font.bold,
    textAlign: 'center',
    letterSpacing: 0.8,
    fontSize: '14rem',
  },
  label: {
    fontSize: '13rem',
    marginBottom: 10,
    fontFamily: font.semiBold,
  },
});

export default forwardRef(SearchModal);
