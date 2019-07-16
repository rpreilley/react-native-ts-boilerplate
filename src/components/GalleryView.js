import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { FaceDetector, MediaLibrary, Permissions, FileSystem } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import Photo from './Photo';
import VideoComponent from './Video';

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';
const VIDEOS_DIR = FileSystem.documentDirectory + 'videos';

export default class GalleryView extends React.Component {
  state = {
    faces: {},
    images: {},
    photos: [],
    videos: [],
    selected: []
  };

  componentDidMount = async () => {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    const videos = await FileSystem.readDirectoryAsync(VIDEOS_DIR);
    this.setState({ photos, videos });
  };

  toggleSelection = (uri, isSelected) => {
    let selected = this.state.selected;
    if (isSelected) {
      selected.push(uri);
    } else {
      selected = selected.filter(item => item !== uri);
    }
    this.setState({ selected });
  };

  saveToGallery = async () => {
    const photos = this.state.selected;
    const videos = this.state.selected;

    if (photos.length > 0 || videos.length) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== 'granted') {
        throw new Error('Denied CAMERA_ROLL permissions!');
      }

      if (photos.length > 0) {
        const photoPromises = photos.map(photoUri => {
          return MediaLibrary.createAssetAsync(photoUri);
        });
      }

      if (videos.length > 0) {
        const videoPromises = videos.map(videoUri => {
          return MediaLibrary.createAssetAsync(videoUri);
        });
      }

      await Promise.all(photoPromises);
      await Promise.all(videoPromises);
      alert('Successfully saved to user\'s gallery!');
    } else {
      alert('No photos to save!');
    }
  };

  renderPhoto = fileName => 
    <Photo
      key={fileName}
      uri={`${PHOTOS_DIR}/${fileName}`}
      onSelectionToggle={this.toggleSelection}
    />;

  renderVideo = fileName => 
  <VideoComponent
    key={fileName}
    uri={`${VIDEOS_DIR}/${fileName}`}
    onSelectionToggle={this.toggleSelection}
  />;

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
            <MaterialIcons name="arrow-back" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.saveToGallery}>
            <Text style={styles.whiteText}>Save selected to gallery</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentComponentStyle={{ flex: 1 }}>
          <View style={styles.pictures}>
            {this.state.photos.map(this.renderPhoto)}
            {this.state.videos.map(this.renderVideo)}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4630EB',
  },
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  videos: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  button: {
    padding: 20,
  },
  whiteText: {
    color: 'white',
  }
});