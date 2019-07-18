import React, { Component } from "react";
import { Header, Title, Button, Icon, Left, Right, Body, Text } from "native-base";
import { StyleSheet } from 'react-native';

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBackButton: true,
      title: ''
    }
  }

  componentDidMount() {
    this.setState({showBackButton: this.props.showBackButton})
    if (this.props.title) {
      this.setState({ title: this.props.title })
    } else {
      this.setState({ title: 'View Title' })
    }
  }

  render() {

    let pageTitle = this.state.title;

    return (
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={() => this.props.navigation ? this.props.navigation.toggleDrawer() : this.props.toggleDrawer()}>
            <Icon name='menu' style={styles.headerButtons} />
          </Button>
        </Left>
        <Body>
          <Title style={styles.headerText}>{ pageTitle }</Title>
        </Body>
        <Right>
          { this.state.showBackButton 
            ? 
              <Button transparent onPress={ () => this.props.navigation.goBack() }>
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