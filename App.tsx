import React from 'react';
import { StatusBar } from 'react-native';
import RNPreventScreenshot from 'react-native-screenshot-prevent';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, NavigationState, useNavigationContainerRef } from '@react-navigation/native';
import { ImagePickerScreen } from './ImagePickerScreen';
import { ProtectedInputScreen } from './ProtectedInputScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

RNPreventScreenshot.enabled(false);

export type RootStackParamList = {
  ImagePickerScreen: undefined;
  ProtectedInputScreen: undefined;
}

const AppStack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const navigationRef = useNavigationContainerRef<RootStackParamList>();

  const onNavigationStateChanged = (state: NavigationState | undefined): void => {
    if (state == undefined) return;
    const currentRoutes = state.routes;
    const currentIndex = state.index;
    const currentRoute = currentRoutes[currentIndex];
    // If you remove `ProtectedInputScreen` from `sensitiveScreens` the app won't crash
    const sensitiveScreens = ['ProtectedInputScreen'];
    const isCurrentRouteSensitive = sensitiveScreens.indexOf(currentRoute?.name) > -1;
    if (isCurrentRouteSensitive) {
      RNPreventScreenshot.enabled(true);
      RNPreventScreenshot.enableSecureView();
    } else {
      RNPreventScreenshot.enabled(false);
      RNPreventScreenshot.disableSecureView();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef} onStateChange={onNavigationStateChanged}>
          <StatusBar />
          <AppStack.Navigator>
            <AppStack.Screen name="ImagePickerScreen" component={ImagePickerScreen} />
            <AppStack.Screen name="ProtectedInputScreen" component={ProtectedInputScreen} />
          </AppStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
