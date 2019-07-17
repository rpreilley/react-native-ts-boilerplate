import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import CameraScreen from './src/components/CameraScreen';
import VideoScreen from './src/components/VideoScreen';
import GeolocationScreen from './src/components/GeolocationScreen';
import AppOptionsScreen from './src/components/AppOptionsScreen';
import Home from './src/components/Home';
import { Root } from 'native-base';

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: Home,
    Camera: CameraScreen,
    Video: VideoScreen,
    Geolocation: GeolocationScreen,
    Settings: AppOptionsScreen
  },
  {
    initialRouteName: 'Home',
    headerMode: 'float',
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'black'
      }
    },
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  }
)

// export default createAppContainer(AppNavigator);
const AppContainer = createAppContainer(AppDrawerNavigator);

export default class App extends React.Component {
  static nagivationOptions = {
    title: 'App',
    headerTitle: 'Test'
  }
  render() {
    return (
      <Root>
        <AppContainer />
      </Root>
    );
  }
}