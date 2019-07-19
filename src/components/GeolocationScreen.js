import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MapView, Location, Permissions } from "expo";
import { Container, Content, Button, Text, Card, CardItem, Spinner, Item, Input, Toast } from 'native-base'; 
import Header from './Header';
import Slider from 'react-native-slider';
import API_KEYS from '../../constants';

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
      zomato_key: null,
      zoomLevel: 2000      
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({ permissionsGranted: status === 'granted' });
  }

  componentDidMount() {
    this.state.zomato_key = API_KEYS.ZOMATO
    this.fetchCurrentLocation();
  }

  fetchCurrentLocation() {
    Location.getCurrentPositionAsync()
      .then((response) => {
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
    const config = {
      headers: {
        'user-key': this.state.zomato_key
      }
    }

    fetch(`https://developers.zomato.com/api/v2.1/geocode?lat=${this.state.currentLat}&lon=${this.state.currentLon}`, config)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        let response = myJson.nearby_restaurants;
        this.setState({nearbyRestaurants: response})
      })
      .catch((error) => {
        console.log(error);
      })
  }

  clearNearbyRestaurants() {
    this.setState({nearbyRestaurants: []})
  }

  fetchRegionForCoordinates(lat, lon, distance) {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;

       const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
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

    const LATITUDE = this.state.currentLat; // Baton Rouge, LA
    const LONGITUDE = this.state.currentLon; // Baton Rouge, LA

    let response = this.fetchRegionForCoordinates(LATITUDE, LONGITUDE, this.state.zoomLevel);
    
    // Set deltas based on response
    const LATITUDE_DELTA = response.latitudeDelta
    const LONGITUDE_DELTA = response.longitudeDelta
    
    return (
      <Container>
        <Header showBackButton={true} {...navigationProps} title='Geolocation' />
        <View style={styles.topContent}>
          { this.state.currentLat && this.state.currentLon ?
            <Card>
              <CardItem>
                <Text style={styles.zoomText}>
                 Adjust Zoom
                </Text>
                <Item>
                  <Slider
                    value={this.state.zoomLevel}
                    onValueChange = {(value) => this.setState({zoomLevel: value})}
                    minimumValue = {1}
                    maximumValue = {10000}
                    thumbTintColor = '#039be5'
                    minimumTrackTintColor= '#039be5'
                    maximumTrackTintColor= '#039be5'
                    style={{width: 500}}
                  />
                </Item>
              </CardItem>
              <CardItem>
                <Button onPress={() => this.fetchNearbyRestaurants()}>
                  <Text>
                    Get Nearby Restaurants
                  </Text>
                </Button>
              </CardItem>
              <CardItem>
              { this.state.nearbyRestaurants.length > 0 ?
                <Button onPress={() => this.clearNearbyRestaurants()}>
                  <Text>
                    Clear Restaurants Markers
                  </Text>
                </Button>
              : null
              }
              </CardItem>
            </Card> 
            : 
            <Spinner color='#039be5' /> }
        </View>
        <Content contentContainerStyle={styles.contentContainer}>
          { this.state.currentLat && this.state.currentLon ? 
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

              const metaData = `Lat: ${this.state.currentLat} Lon: ${this.state.currentLon}`

              return (
                  <MapView.Marker
                      key='current-loc'
                      coordinate={markerCoords}
                      title='My current location'
                      description={metaData}
                      pinColor = '#039be5'
                  />
              );
            })}

            {this.state.isLoading ? null : this.state.nearbyRestaurants.map((marker, index) => {

              // Lat Lon comes back as string, need to set as number before passing to component
              let lat = Number(marker.restaurant.location.latitude);
              let lon = Number(marker.restaurant.location.longitude);

              const markerCoords = {
                latitude: lat,
                longitude: lon,
              };

              const metaData = `Address: ${marker.restaurant.location.address}`

              return (
                  <MapView.Marker
                      key={index}
                      coordinate={markerCoords}
                      title={marker.restaurant.name}
                      description={metaData}
                  />
              );
            })}
            </MapView>
            : null
          }
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
    marginTop: 10,
    marginBottom: 10
  },
  mapView: {
    height: 500,
    width: '100%'
  },
  zoomText: {
    marginRight: 5
  }
})