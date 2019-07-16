import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { MapView, Location, Permissions } from "expo";

export default class GeolocationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      permissionsGranted: false,
      markers: []
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Map View'
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({ permissionsGranted: status === 'granted' });
  }

  componentDidMount() {
    //this.fetchMarkerData();
  }

  fetchMarkerData() {
    fetch('https://feeds.citibikenyc.com/stations/stations.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ 
          isLoading: false,
          markers: responseJson.stationBeanList, 
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    
    return (
      <MapView
          style={{ flex: 1 }}
          region={{
            latitude: 40.76727216,
            longitude: -73.99392888,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
      >
        {this.state.isLoading ? null : this.state.markers.map((marker, index) => {
          const markerCoords = {
              latitude: marker.latitude,
              longitude: marker.longitude,
          };

          const metaData = `Status: ${marker.statusValue}`;

          return (
              <MapView.Marker
                  key={index}
                  coordinate={markerCoords}
                  title={marker.stationName}
                  description={metaData}
              />
          );
        })}
      </MapView>
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