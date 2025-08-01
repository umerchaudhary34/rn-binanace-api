import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';

const Stack = createNativeStackNavigator();

const IntroStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{gestureEnabled: false}}>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{title: 'Home', headerShown: false}}
    />
  </Stack.Navigator>
);

export default IntroStack;
