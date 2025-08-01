import 'react-native-get-random-values'; // Ensure random values work
import React from 'react';
import {StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './routers/MainStack';
import {themeContext} from './config/themeContext';
import theme from './config/theme';
import {useColorScheme} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const queryClient = new QueryClient();

const App = () => {
  const isDarkMode: boolean = useColorScheme() === 'dark';
  return (
    <themeContext.Provider value={isDarkMode ? theme.dark : theme.light}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <GestureHandlerRootView style={styles.container}>
            <RootStack />
            <Toast />
          </GestureHandlerRootView>
        </NavigationContainer>
      </QueryClientProvider>
    </themeContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
