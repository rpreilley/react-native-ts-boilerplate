import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MapView, Location, Permissions } from "expo";
import { Container, Content, Button, Text, Card, CardItem, Body, Spinner  } from 'native-base'; 
import Header from './Header';
import Footer from './Footer';

export default class GeolocationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      permissionsGranted: false,
      currentLocation: [],
      nearbyRestaurants: [],
      currentLat: null,
      currentLon: null,
      brLatitude: 30.447407,
      brLongitude: -91.181549
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({ permissionsGranted: status === 'granted' });
  }

  componentDidMount() {
    this.fetchCurrentLocation();
  }

  fetchCurrentLocation() {
    Location.getCurrentPositionAsync()
      .then((response) => {
        console.log(response)
        this.setState({
          isLoading: false,
          currentLocation: [response],
          currentLat: response.coords.latitude,
          currentLon: response.coords.longitude
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  fetchNearbyRestaurants() {
    fetch(`https://developers.zomato.com/api/v2.1/geocode?lat=${this.state.currentLat}&lon=${this.state.currentLon}`)
      .then(function(response) {
        console.log("RESPONSE: ", response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
      });
  }

  fetchRegionForCoordinates(lat, lon, distance) {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;

       const latitudeDelta =distance / oneDegreeOfLatitudeInMeters;
       const longitudeDelta = distance / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

       return result = {
           latitude: lat,
           longitude: lon,
           latitudeDelta,
           longitudeDelta,
       }
  }

  render() {
    const navigationProps = this.props;

    const LATITUDE = this.state.brLatitude; // Baton Rouge, LA
    const LONGITUDE = this.state.brLongitude; // Baton Rouge, LA

    let response = this.fetchRegionForCoordinates(LATITUDE, LONGITUDE, 5000);
    
    // Set deltas based on response
    const LATITUDE_DELTA = response.latitudeDelta
    const LONGITUDE_DELTA = response.longitudeDelta
    
    return (
      <Container>
        <Header showBackButton={true} {...navigationProps} />
        <Content contentContainerStyle={styles.contentContainer}>
          <View style={styles.topContent}>
            { this.state.currentLat && this.state.currentLon ?
            <Card>
              <CardItem>
                <Text>
                  {`Current Latitude: ${this.state.currentLat}`}
                </Text> 
              </CardItem>
              <CardItem>
                <Text>
                  {`Current Longitude: ${this.state.currentLon}`}
                </Text> 
              </CardItem>
              <CardItem style={{justifyContent: 'center'}}>
                <Button onPress={() => this.fetchNearbyRestaurants}>
                  <Text>
                    Mark Nearby Restaurants
                  </Text>
                </Button>
                { this.state.nearbyRestaurants.length > 0 ?
                <Button>
                  <Text>
                    Clear Restaurants Markers
                  </Text>
                </Button>
                : null
                }
              </CardItem>
            </Card> : 
            <Spinner color='#039be5' /> }
          </View>
          {}
          <MapView
              style={styles.mapView}
              region={{
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
              }}
          >
            {this.state.isLoading ? null : this.state.currentLocation.map((marker, index) => {

              const markerCoords = {
                latitude: marker.coords.latitude,
                longitude: marker.coords.longitude,
              };

              return (
                  <MapView.Marker
                      key={index}
                      coordinate={markerCoords}
                      title='My current location'
                      //description={metaData}
                  />
              );
            })}
          </MapView>
        </Content>
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
  topContent: {
    marginBottom: 10
  },
  mapView: {
    height: 500,
    width: '100%'
  }
})