import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text } from "native-base";

export default class HeaderNoLeft extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Header>
        <Left>
          <Button transparent onPress={() => this.props.toggleDrawer()}>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>My App Title</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => this.props.goBack()}>
            <Icon name='arrow-back' />
            <Text>Back</Text>
          </Button>
        </Right>
      </Header>
    );
  }
}