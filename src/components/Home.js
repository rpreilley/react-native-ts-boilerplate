import { FileSystem } from 'expo';
import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, Thumbnail, ActionSheet } from 'native-base';
import Header from './Header';

export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Home'
    }
  }

  takeAction(index) {
    // Grab index and perform action. Will set as ENUM
    let indexSelected = index;
    switch(indexSelected) {
      case 0:
        FileSystem.deleteAsync(FileSystem.documentDirectory + 'photos').catch(e => {
          console.log(e, 'Photos directory could not be deleted');
        })
        break;
      case 1:
        FileSystem.deleteAsync(FileSystem.documentDirectory + 'videos').catch(e => {
          console.log(e, 'Videos directory could not be deleted');
        })
        break;
      case 1:
        // Do nothing, has been cancelled
        break;
      default:
        // code block
    }
  }

  render() {

    const imageUri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';
    let BUTTONS = ['Clear Photo Cache', 'Clear Video Cache', 'Cancel'];
    let CANCEL_INDEX = 3;

    return (
      <Container>
        {/* <Header /> */}
        <Content padder contentContainerStyle={styles.contentContainer}>
          <View style={styles.thumbnail}>
            <Thumbnail large source={{uri: imageUri}} />
          </View>
          <Text>
            This is a react native demonstration, utilizing Expo's camera and geolocation APIs.
          </Text>
          <View style={styles.clearCacheButton}>
            <Button
              onPress={() =>
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  title: 'Clear Cache Options'
                },
                buttonIndex => {
                  this.takeAction(buttonIndex)
                }
              )}
            >
              <Text>
                Clear cache
              </Text>
            </Button>
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => this.props.navigation.navigate('CameraScreen')}>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('VideoScreen')}>
              <Icon name="videocam" />
              <Text>Video</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('GeolocationScreen')}>
              <Icon active name="pin" />
              <Text>Geolocation</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  clearCacheButton: {
    marginTop: 15
  }
});