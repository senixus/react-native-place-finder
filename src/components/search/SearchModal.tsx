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
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch} from 'react-redux';

// Components
import AppInput from '../common/AppInput';
import AppButton from '../common/AppButton';
import AppText from '../common/AppText';

// Assets
import close from '../../assets/close-circle.png';

// Actions
import {searchQuery} from '../../redux/searchSlice';

export interface IModalRef {
  handleModal: () => void;
}

interface IProps {
  setLocation: (value: string) => void;
  setTerm: (value: string) => void;
  location: string;
  term: string;
}

const SearchModal: ForwardRefRenderFunction<IModalRef, IProps> = (
  {setLocation, setTerm, location, term},
  ref,
) => {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const handleModal = () => setModalVisible(prevVisible => !prevVisible);

  useImperativeHandle(ref, () => ({
    handleModal,
  }));

  const search = () => {
    dispatch(searchQuery({location, term}));
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}>
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
  label: {
    fontSize: '13rem',
    marginBottom: 10,
    fontWeight: '600',
  },
});

export default forwardRef(SearchModal);
