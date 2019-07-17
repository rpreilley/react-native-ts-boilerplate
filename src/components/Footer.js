import React, { Component } from "react";
import { Footer, FooterTab, Button, Icon, Text } from "native-base";
import { StyleSheet } from 'react-native';

export default class AppFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {

    return (
      <Footer style={styles.footer}>
        <FooterTab>
          <Button vertical onPress={() => this.props.navigate('Camera')}>
            <Icon name="camera" style={styles.footerButtons}/>
            <Text style={styles.footerText}>Camera</Text>
          </Button>
          <Button vertical onPress={() => this.props.navigate('Video')}>
            <Icon name="videocam" style={styles.footerButtons}/>
            <Text style={styles.footerText}>Video</Text>
          </Button>
          <Button vertical onPress={() => this.props.navigate('Geolocation')}>
            <Icon active name="pin" style={styles.footerButtons}/>
            <Text style={styles.footerText}>Geolocation</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const styles = StyleSheet.create({
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