import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';

// Screens
import Detail from '@screens/Detail';
import Home from '@screens/Home';

// Store
import store from './src/redux/store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen
              options={{headerShown: false}}
              component={Home}
              name="Home"
            />
            <Stack.Screen
              options={{headerShown: false}}
              component={Detail}
              name="Detail"
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
