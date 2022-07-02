import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';

interface IAppTextProps {
  style: StyleProp<TextStyle>;
  text: string | number;
}

const AppText: React.FC<IAppTextProps> = ({style, text}) => (
  <Text allowFontScaling={false} style={style}>
    {text}
  </Text>
);

export default AppText;
