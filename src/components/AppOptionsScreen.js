import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { FileSystem } from 'expo';
import { Container, Content, Toast , ListItem, Text, Icon, Button, Left, Body, Right } from 'native-base';
import Header from './Header';

export default class ListIconExample extends Component {

  constructor(props) {
    super(props);
  }

  clearCache(type) {
    let directoryName = type.charAt(0).toUpperCase() + type.slice(1);
    FileSystem.deleteAsync(FileSystem.documentDirectory + type).then(Toast.show(
      {
        text: `${directoryName} cache cleared successfully.`, 
        buttonText: 'Okay', 
        duration: 3000,
        position: 'top',
        type: 'success',
        style: {
          width: 500,
          alignSelf: 'center'
        }
      }
      )).catch(e => {
      console.log(e, `${directoryName} directory could not be deleted`);
    })
  }

  render() {

    const navigationProps = this.props;

    return (
      <Container>
        <Header showBackButton={true} {...navigationProps} title='Settings' />
        <Content>
          <ListItem icon>
            <Left>
              <Button style={styles.settingsButtons}>
                <Icon active name="camera" />
              </Button>
            </Left>
            <Body>
              <Text>Clear Photo Cache</Text>
            </Body>
            <Right>
              <Button transparent onPress={() => this.clearCache('photos')}>
                <Text>Clear</Text>
              </Button>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={styles.settingsButtons}>
                <Icon active name="videocam" />
              </Button>
            </Left>
            <Body>
              <Text>Clear Video Cache</Text>
            </Body>
            <Right>
              <Button transparent onPress={() => this.clearCache('videos')}>
                <Text>Clear</Text>
              </Button>
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  settingsButtons: {
    backgroundColor: "#039be5"
  }
})