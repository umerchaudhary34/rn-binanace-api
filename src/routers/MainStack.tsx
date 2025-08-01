import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Introduction/Splash';
// import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

const Stack = createNativeStackNavigator();
// const Auth = createNativeStackNavigator();
const Home = createNativeStackNavigator();

const RootStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{gestureEnabled: false}}>
    <Stack.Screen
      name="Splash"
      component={Splash}
      options={{title: 'Splash', headerShown: false}}
    />
    {/* <Stack.Screen
      name="GetStarted"
      component={GetStarted}
      options={{
        title: 'GetStarted',
        headerShown: false,
        headerLeft: () => null,
      }}
    /> */}
    {/* <Auth.Screen
      name="Authentication"
      component={AuthStack}
      options={{
        title: 'Authentication',
        headerShown: false,
        headerLeft: () => null,
      }}
    /> */}
    <Home.Screen
      name="HomeStack"
      component={HomeStack}
      options={{title: 'HomeStack', headerShown: false, headerLeft: () => null}}
    />
  </Stack.Navigator>
);

export default RootStack;
