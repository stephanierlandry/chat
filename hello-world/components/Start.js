import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';

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
              value={this.state.name}
              placeholder='Your name'
            />
            <Button
              style={styles.button}
              title="Start Chatting"
              onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name })}
            />
            </View>
        </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 180
  },
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
    color:'white',
    fontSize: 40,
    fontWeight:'bold'

  },
  inputContainer:{
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: '44%',
    width: '88%',
    marginBottom: 27
  },
  button:{
    width: '88%',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor:'red',
    color:'#FFFFFF'
  }
});
