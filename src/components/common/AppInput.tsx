import React, {FC} from 'react';
import {TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface IProps {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  isSecure?: boolean;
  backgroundColor?: string;
  isBorder?: boolean;
  borderRadius?: number;
  pre?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
}

const AppInput: FC<IProps> = ({
  isSecure = false,
  placeholder,
  value,
  setValue,
  backgroundColor = 'white',
  borderRadius = 4,
  pre = false,
  onBlur,
  onFocus,
}) => {
  return (
    <TextInput
      onFocus={onFocus && onFocus}
      onBlur={onBlur && onBlur}
      secureTextEntry={isSecure}
      placeholder={placeholder}
      value={value}
      onChangeText={setValue}
      style={{
        ...styles.input,
        backgroundColor,
        borderRadius,
        borderTopLeftRadius: pre ? 0 : borderRadius,
        borderBottomLeftRadius: pre ? 0 : borderRadius,
      }}
    />
  );
};

export default AppInput;

const styles = EStyleSheet.create({
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ced4da',
    height: '36rem',
    padding: 10,
  },
});
