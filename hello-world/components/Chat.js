import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

//Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBJauPjDWcmAnCdlSAqFGZ7XqN4dHyjxCk",
   authDomain: "test-c13bb.firebaseapp.com",
   databaseURL: "https://test-c13bb.firebaseio.com",
   projectId: "test-c13bb",
   storageBucket: "test-c13bb.appspot.com",
   messagingSenderId: "602669976798",
   appId: "1:602669976798:web:fc0ec7d5051436026b864f",
   measurementId: "G-NGYJDELG16"
 };

if (!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}

export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  /*messages follows Gifted Chat's format*/
  componentDidMount() {
   this.setState({
     messages: [
       {
         _id: 3,
         text: 'How are you?',
         createdAt: new Date(),
         user: {
           _id: 2,
           name: 'React Native',
           avatar: 'https://placeimg.com/140/140/any',
         },
       },
       {
         _id: 1,
         text: 'Hello developer',
         createdAt: new Date(),
         user: {
           _id: 2,
           name: 'React Native',
           avatar: 'https://placeimg.com/140/140/any',
         },
       },
       {
      _id: 2,
      text: this.props.route.params.name,
      createdAt: new Date(),
      system: true,
     },
     ],
   })
  }

  /* the message a user has just sent gets appended to the state messages so that it can be displayed in the chat*/
  onSend(messages = []) {
   this.setState(previousState => ({
     messages: GiftedChat.append(previousState.messages, messages),
   }))
  }

  render() {
    let name = this.props.route.params.name;

    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{backgroundColor:this.props.route.params.color, flex: 1}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
  };
}

const styles = StyleSheet.create({


})
