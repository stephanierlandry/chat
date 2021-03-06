/**
*@description this component handles the landing page
*@requires React
*@requires React-Native
*@requires React-Native-Elements
*/

import React from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';

export default class Screen1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: ''
    }
  }

  render() {
    return (

      <ImageBackground style={styles.backgroundImage} source={require('../assets/BackgroundImage.png')}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Hello World</Text>
        </View>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
          enabled={Platform.OS === "ios" ? true : false}>
          <View style={styles.inputContainer}>
            {/* onChangeText sets name state */}
            <TextInput
              style={styles.input}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
              placeholder="Your Name"
              placeholderTextColor='#757083'
              accessible={true}
              accessibilityLabel="Name Input"
              accessibilityHint="Add your name to your chat"
            />
          </View>
          <View style={styles.backgroundColorContainer}>
            <Text style={styles.backgroundColorText}>{'Choose Background Color:'}</Text>
            <View style={styles.colorButtonContainer}>
              {/* onPress send sets color state */}
              <TouchableOpacity
                style={[styles.colorButton, styles.color1]}
                onPress={() => this.setState({ color: '#090C08' })}
                accessible={true}
                accessibilityLabel="Background color options"
                accessibilityHint="Let’s you choose the background color of your chat page."
                accessibilityRole="button"
              />
              <TouchableOpacity
                style={[styles.colorButton, styles.color2]}
                onPress={() => this.setState({ color: '#474056' })}
                accessible={true}
                accessibilityLabel="Background color options"
                accessibilityHint="Let’s you choose the background color of your chat page."
                accessibilityRole="button"
              />
              <TouchableOpacity
                style={[styles.colorButton, styles.color3]}
                onPress={() => this.setState({ color: '#8A95A5' })}
                accessible={true}
                accessibilityLabel="Background color options"
                accessibilityHint="Let’s you choose the background color of your chat page."
                accessibilityRole="button"
              />
              <TouchableOpacity
                style={[styles.colorButton, styles.color4]}
                onPress={() => this.setState({ color: '#B9C6AE' })}
                accessible={true}
                accessibilityLabel="Background color options"
                accessibilityHint="Let’s you choose the background color of your chat page."
                accessibilityRole="button"
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {/* onPress sends name and color state to Chat component to display name and change background color */}
            <Button
              title="Start Chatting"
              onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}
              buttonStyle={
                { backgroundColor: '#757083', width: 320, height: 60, justifyContent: 'center', borderRadius: 2}
              }
            />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  titleContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    color: '#FFFFFF',
    fontSize: 45,
    fontWeight: '600'
  },

  container: {
    backgroundColor: 'white',
    height: '44%',
    width: '88%',
    flex:1,
    marginBottom: 25
  },
  inputContainer:{
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    width: '88%',
    flex:1
  },
  input: {
    height: 60,
    borderColor: '#757083',
    borderWidth: 2,
    borderRadius: 3,
    width: '100%',
    fontSize: 16,
    marginTop: 25,
    paddingLeft: 7,
    opacity: 0.5,
    fontWeight: '300'
  },

  backgroundColorContainer: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'left',
    marginTop: 25
  },
  backgroundColorText: {
    fontSize: 16,
    color: '#757083',
    fontWeight: '600',
    paddingLeft: 22
  },
  colorButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginStart: 20
  },
  colorButton: {
    borderRadius: 50,
    width: 40,
    height: 40,
    marginHorizontal: 10
  },
  color1: {
    backgroundColor: '#090C08'
  },
  color2: {
    backgroundColor: '#474056'
  },
  color3: {
    backgroundColor: '#8A95A5'
  },
  color4: {
    backgroundColor: '#B9C6AE'
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 25,
    alignSelf: 'center'
  }
});
