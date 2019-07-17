import React from 'react';
import {
  StyleSheet
} from 'react-native';
import { Container, Content, FooterTab, Button, Icon, Text } from 'native-base';
import Header from './Header';
import Footer from './Footer';

export default class Home extends React.Component {

  render() {

    let navigationProps = this.props.navigation;

    return (
      <Container>
        <Header showBackButton={false} {...navigationProps}/>
        <Content padder contentContainerStyle={styles.contentContainer}>
          <Text>
            This is a react native demonstration, utilizing Expo's camera and geolocation APIs.
          </Text>
        </Content>
        <Footer {...navigationProps} />
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