import React from 'react';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {themeContext} from './src/config/themeContext';
import theme from './src/config/theme';
import {useColorScheme} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootStack from './src/routers/MainStack';

const queryClient = new QueryClient();

const App = () => {
  const isDarkMode: boolean = useColorScheme() === 'dark';
  return (
    <themeContext.Provider value={isDarkMode ? theme.dark : theme.light}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <GestureHandlerRootView style={{flex: 1}}>
            <RootStack />
            <Toast />
          </GestureHandlerRootView>
        </NavigationContainer>
      </QueryClientProvider>
    </themeContext.Provider>
  );
};
export default App;
