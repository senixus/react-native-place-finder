import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './src/RootNavigation';

// Screens
import Detail from '@screens/Detail';
import Home from '@screens/Home';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
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
    </NavigationContainer>
  );
};

export default App;
