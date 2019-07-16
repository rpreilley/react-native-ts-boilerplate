import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Container, Content, Button } from 'native-base';

export default class GeolocationScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Geolocation'
    }
  }

  state = {

  };

  async componentWillMount() {

  }

  componentDidMount() {
   
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.contentContainer}>
          <View>
            <Text style={styles.content}>
              Geolocation Screen
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    color: '#fff'
  }
})