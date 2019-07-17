import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text } from "native-base";
import { StyleSheet } from 'react-native';

export default class HeaderNoLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBackButton: true
    }
  }

  componentDidMount() {
    console.log("OLD", this.props.showBackButton)
    this.setState({showBackButton: this.props.showBackButton})
    console.log("NEW", this.props.showBackButton)
  }

  render() {

    return (
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={() => this.props.toggleDrawer()}>
            <Icon name='menu' style={styles.headerButtons} />
          </Button>
        </Left>
        <Body>
          <Title style={styles.headerText}>My App Title</Title>
        </Body>
        <Right>
          { this.state.showBackButton 
            ? 
            
              <Button transparent onPress={ () => this.props.goBack() }>
                <Icon name='arrow-back' style={styles.headerButtons} />
                <Text style={styles.headerText}>Back</Text>
              </Button>
            : null
          }
        </Right>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#039be5',
    textDecorationColor: '#f0f'
  },
  headerText: {
    color: 'white'
  },
  headerButtons: {
    color: 'white'
  }
});