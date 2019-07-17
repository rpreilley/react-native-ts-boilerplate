import React, { Component } from 'react';
import { FileSystem } from 'expo';
import { Container, Content, Toast , ListItem, Text, Icon, Button, Left, Body, Right } from 'native-base';
import Header from './Header';

export default class ListIconExample extends Component {

  clearCache(type) {
    let directoryName = type.charAt(0).toUpperCase() + type.slice(1);
    FileSystem.deleteAsync(FileSystem.documentDirectory + type).then(Toast.show(
      {
        text: `${directoryName} cleared successfully.`, 
        buttonText: 'Okay', 
        duration: 3000,
        position: 'top',
        type: 'success'
      }
      )).catch(e => {
      console.log(e, `${directoryName} directory could not be deleted`);
    })
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
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
              <Button style={{ backgroundColor: "#FF9501" }}>
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