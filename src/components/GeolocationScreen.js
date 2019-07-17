import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MapView, Location, Permissions } from "expo";
import { Container, Content } from 'native-base'; 

export default class GeolocationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      permissionsGranted: false,
      currentLocation: [],
      brLatitude: 30.447407,
      brLongitude: -91.181549
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({ permissionsGranted: status === 'granted' });
  }

  componentDidMount() {
    //this.fetchCurrentLocation();
  }

  fetchCurrentLocation() {
    Location.getCurrentPositionAsync()
      .then((response) => {
        console.log("RESPONSE :", response)
        this.setState({
          isLoading: false,
          currentLocation: [response]
        })
      })
      .catch((error) => {
        console.log(error);
      })
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

    const LATITUDE = this.state.brLatitude; // Baton Rouge, LA
    const LONGITUDE = this.state.brLongitude; // Baton Rouge, LA

    let response = this.fetchRegionForCoordinates(LATITUDE, LONGITUDE, 12000);
    
    // Set deltas based on response
    const LATITUDE_DELTA = response.latitudeDelta
    const LONGITUDE_DELTA = response.longitudeDelta
    
    return (
      <Container>
        <Content padder contentContainerStyle={styles.contentContainer}>
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
  mapView: {
    height: 500,
    width: '100%'
  }
})