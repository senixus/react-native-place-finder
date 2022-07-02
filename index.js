import 'react-native-gesture-handler';
import {AppRegistry, Dimensions} from 'react-native';

import App from './App';

import EStyleSheet from 'react-native-extended-stylesheet';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
