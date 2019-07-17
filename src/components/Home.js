import React from 'react';
import {
  StyleSheet
} from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import Header from './Header';

export default class Home extends React.Component {

  render() {

    let headerProps = this.props.navigation;

    return (
      <Container>
        <Header {...headerProps}/>
        <Content padder contentContainerStyle={styles.contentContainer}>
          <Text>
            This is a react native demonstration, utilizing Expo's camera and geolocation APIs.
          </Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => this.props.navigation.navigate('Camera')}>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('Video')}>
              <Icon name="videocam" />
              <Text>Video</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('Geolocation')}>
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
  clearCacheButton: {
    padding: 10,
    position: 'absolute',
    top: 0,
    left: 0
  }
});