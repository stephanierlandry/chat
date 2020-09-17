import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-community/async-storage';

const firebase = require('firebase');
require('firebase/firestore');

/* Firebase configuration */
const firebaseConfig = {
   apiKey: "AIzaSyBJauPjDWcmAnCdlSAqFGZ7XqN4dHyjxCk",
   authDomain: "test-c13bb.firebaseapp.com",
   databaseURL: "https://test-c13bb.firebaseio.com",
   projectId: "test-c13bb",
   storageBucket: "test-c13bb.appspot.com",
   messagingSenderId: "602669976798"
 };

if (!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}

export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: " ",
        name: " ",
        avatar: " ",
      },
      loggedInText: '',
      uid: ' '
    }
  }

  /* messages follows Gifted Chat's format */
  componentDidMount() {

    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        console.log('online');
      } else {
        console.log('offline');
      }
    });

    /* fire.auth adds Firebase Auth to the app*/
    /* onAuthStateChanged is an observer that’s called whenever the user's sign-in state changes and returns an unsubscribe() function*/
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }

      /* update user state with currently active user data */
      this.setState({
        uid: user.uid,
        loggedInText: 'Hello there',
      });
    });

    /* create a reference to the active user's documents (shopping lists) */
    this.referenceMessageUser = firebase.firestore().collection('messages')

    /* listen for collection changes for current user */
    this.unsubscribeMessageUser = this.referenceMessageUser.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);

    this.getMessages();
  }

  componentWillUnmount() {
     /* stop listening to authentication */
     this.authUnsubscribe();
     /* stop listening for changes */
     this.unsubscribeMessageUser();
   }

   /* the message a user has just sent gets appended to the state messages so that it can be displayed in the chat */
   onSend(messages = []) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }), () => {
        this.addMessages();
        this.saveMessages();
      });
    }

  /* retreives data in the messages collection */
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    /* go through each document */
    querySnapshot.forEach((doc) => {
      /* gets the QueryDocumentSnapshot's data */
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
      });
    });
    this.setState({
      messages,
    });
  };

  /* adds message user + message data */
  addMessages() {
    this.referenceMessageUser.add({
      _id: this.state.messages[0]._id,
      text: this.state.messages[0].text || '',
      createdAt: this.state.messages[0].createdAt,
      user: this.state.user,
      uid: this.state.uid,
      sent: true
    });
  }

  /* read the messages in the asyncStorage */
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  /* saves messages to asyncStorage*/
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  /* deletes messages from asyncStorage*/
  async deleteMessages() {
  try {
    await AsyncStorage.removeItem('messages');
    this.setState({
      messages: []
    })
  } catch (error) {
    console.log(error.message);
  }
}

  render() {
    /*  sets user name as title */
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{backgroundColor:this.props.route.params.color, flex: 1}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={this.state.user}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
  };
}
