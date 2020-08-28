import React from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground } from 'react-native';
import  { Button } from 'react-native-elements';

export default class Screen1 extends React.Component {

  constructor(props){
    super(props);
    this.state = { name: ' ' }
  }



  render() {
    return (

        <ImageBackground style={styles.backgroundImage} source={require('../assets/BackgroundImage.png')}>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Hello World</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(name) => this.setState({name})}
              value={this.state}
              placeholder="Your Name"
              placeholderTextColor='#757083'
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Start Chatting"
              onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name })}
              buttonStyle={{backgroundColor: '#757083', width:320, height:60, justifyContent: 'center', borderRadius:2}}
            />
          </View>
        </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent:'flex-end',
    alignItems: 'center'
  },
  titleContainer:{
    flex: 1,
    justifyContent: 'center'
  },
  title:{
    color:'#FFFFFF',
    fontSize: 45,
    fontWeight:'600'

  },
  inputContainer:{
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '44%',
    width: '88%',
    marginBottom: 27,
    flex:1
  },
  input: {
    height: 60,
    borderColor: '#757083',
    borderWidth: 2,
    borderRadius:3,
    width: '88%',
    fontSize: 16,
    marginTop: 25,
    paddingLeft:7,
    opacity: 0.5,
    fontWeight: '300'
  },
  buttonContainer:{
    flex:1,
    justifyContent:'flex-end',
    marginBottom: 25
  }
});
