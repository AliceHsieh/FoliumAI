
import React from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: "camera comp",
  takePhotoButtonTitle: "take a photo with your camera",
  chooseFromLibraryButtonTitle: "choose photo"
}

export default class ReactCamera extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
    }
  }

  selectPhotoTapped() {

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const imageData = new FormData();
        imageData.append('leaf_image',response.data);
        console.log(imageData);

        // create an endpoint here.. 
        // if the process is successful pass the image to processing

        let source = { uri: response.uri };
        console.log(source);
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.homeContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('./images/logo.png')} />
        </View>
          <TouchableOpacity style={styles.homeContainer}
            onPress={this.selectPhotoTapped.bind(this)}>
            <Image resizeMode="contain" style={styles.logo} source={require('./images/start.png')} />
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  homeContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#5FA717'
  },
  logo: {
    marginTop: 100,
    position: 'absolute',
    width: 250,
    height: 250
  },
  button: {
    backgroundColor: 'green',
    borderColor: '#a4db82',
    borderWidth: 200,
    borderRadius: 5,
    width: 600,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 10,
    textAlign:'center',
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
});