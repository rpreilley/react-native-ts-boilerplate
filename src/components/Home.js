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
        <Header showBackButton={false} {...headerProps}/>
        <Content padder contentContainerStyle={styles.contentContainer}>
          <Text>
            This is a react native demonstration, utilizing Expo's camera and geolocation APIs.
          </Text>
        </Content>
        <Footer style={styles.footer}>
          <FooterTab>
            <Button vertical onPress={() => this.props.navigation.navigate('Camera')}>
              <Icon name="camera" style={styles.footerButtons}/>
              <Text style={styles.footerText}>Camera</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('Video')}>
              <Icon name="videocam" style={styles.footerButtons}/>
              <Text style={styles.footerText}>Video</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('Geolocation')}>
              <Icon active name="pin" style={styles.footerButtons}/>
              <Text style={styles.footerText}>Geolocation</Text>
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
  },
  footer: {
    backgroundColor: '#039be5',
    textDecorationColor: '#f0f'
  },
  footerText: {
    color: 'white'
  },
  footerButtons: {
    color: 'white'
  }
});