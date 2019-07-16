import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import CameraScreen from './src/components/CameraScreen';
import VideoScreen from './src/components/VideoScreen';
import GeolocationScreen from './src/components/GeolocationScreen';
import Home from './src/components/Home';
import { Root } from 'native-base';

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    CameraScreen: CameraScreen,
    VideoScreen: VideoScreen,
    GeolocationScreen: GeolocationScreen
  },
  {
    initialRouteName: 'Home',
    headerMode: 'float',
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'black'
      }
    }
  }
)

// export default createAppContainer(AppNavigator);
const AppContainer = createAppContainer(AppNavigator);

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