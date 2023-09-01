import React, {FC} from 'react';
import {StyleProp, TouchableOpacity, ViewProps} from 'react-native';

interface IProps {
  style?: StyleProp<ViewProps>;
  children: React.ReactNode;
  onPress?: () => void;
  isDisabled?: boolean;
}

const AppButton: FC<IProps> = ({
  onPress,
  style,
  children,
  isDisabled = false,
}) => {
  return (
    <TouchableOpacity
      testID="button"
      disabled={isDisabled}
      onPress={onPress}
      style={style}>
      {children}
    </TouchableOpacity>
  );
};

export default AppButton;
