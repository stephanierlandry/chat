import React from 'react';
import PropTypes from 'prop-types';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default class CustomActions extends React.Component{

  constructor(){
    super();
    this.state={
      location:null,
      image: null
    }
  }
  pickImage = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  if(status === 'granted') {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
    }).catch(error => console.log(error));

    if (!result.cancelled) {
      this.setState({
        image: result
      });
    }
  }
}

takePhoto = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);

  if(status === 'granted'){
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    }).catch(error => console.log(error));

    if (!result.cancelled) {
      this.setState({
        image: result
      })
    }
  }
}

getLocation = async () => {
 const { status } = await Permissions.askAsync(Permissions.LOCATION);
 if(status === 'granted') {
   let result = await Location.getCurrentPositionAsync({});

   if (result) {
     this.setState({
       location: result
     });
   }
 }
}


  onActionPress = () => {
  const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
  const cancelButtonIndex = options.length - 1;
  this.context.actionSheet().showActionSheetWithOptions(
    {
      options,
      cancelButtonIndex,
    },
    async (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          console.log('user wants to pick an image');
          this.pickImage();
          return;
        case 1:
          console.log('user wants to take a photo');
          this.takePhoto();
          return;
        case 2:
          console.log('user wants to get their location');
          this.getLocation();
        default:
      }
    },
  );
};


  render() {
   return (
     <TouchableOpacity style={[styles.container]} onPress={this.onActionPress}>
       <View style={[styles.wrapper, this.props.wrapperStyle]}>
         <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
       </View>
     </TouchableOpacity>
   );
 }
}

const styles = StyleSheet.create({
 container: {
   width: 26,
   height: 26,
   marginLeft: 10,
   marginBottom: 10,
 },
 wrapper: {
   borderRadius: 13,
   borderColor: '#b2b2b2',
   borderWidth: 2,
   flex: 1,
 },
 iconText: {
   color: '#b2b2b2',
   fontWeight: 'bold',
   fontSize: 16,
   backgroundColor: 'transparent',
   textAlign: 'center',
 },
});

CustomActions.contextTypes = {
 actionSheet: PropTypes.func,
};
