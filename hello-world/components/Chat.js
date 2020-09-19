import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

import CustomActions from './CustomActions';

const firebase = require('firebase');
require('firebase/firestore');
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
      uid: ' ',
      isConnected: false
    }

    /* Firebase configuration */

    if (!firebase.apps.length){
    firebase.initializeApp({
        apiKey: "AIzaSyBJauPjDWcmAnCdlSAqFGZ7XqN4dHyjxCk",
        authDomain: "test-c13bb.firebaseapp.com",
        databaseURL: "https://test-c13bb.firebaseio.com",
        projectId: "test-c13bb",
        storageBucket: "test-c13bb.appspot.com",
        messagingSenderId: "602669976798",
        appId: "1:602669976798:web:fc0ec7d5051436026b864f",
        measurementId: "G-NGYJDELG16"
      });
    }

    this.referenceMessageUser = firebase.firestore().collection('messages')
  }



  /* messages follows Gifted Chat's format */
  /* fire.auth adds Firebase Auth to the app*/
  /* onAuthStateChanged is an observer that’s called whenever the user's sign-in state changes and returns an unsubscribe() function*/
  /* this.referenceMessageUser creates a reference to the active user's documents (shopping lists) */
  /* this.unsubscribeMessageUsers listens for collection changes for current user */
  componentDidMount() {
    NetInfo.fetch().then(connection => {
    if (connection.isConnected) {
      this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
          await firebase.auth().signInAnonymously();
        }

        this.setState({
          uid: user.uid,
          messages: [],
          isConnected: true
        });

        this.unsubscribeMessageUser = this.referenceMessageUser
          .orderBy('createdAt', 'desc')
          .onSnapshot(this.onCollectionUpdate);
      });
      console.log('online');
    } else {
      this.setState({
        isConnected: false
      });
      this.getMessages();
      console.log('offline');
    }
    });
  }

    /* stop listening to authentication */
    /* stop listening for changes */
  componentWillUnmount() {


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

renderInputToolbar(props) {
  if (this.state.isConnected === false) {
  } else {
    return(
      <InputToolbar
      {...props}
      />
    );
  }
}

renderCustomActions = (props) => {
   return <CustomActions {...props} />;
 };

  render() {
    /*  sets user name as title */
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    console.log( this.authU)

    return (
      <View style={{backgroundColor:this.props.route.params.color, flex: 1}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={this.state.user}
          renderInputToolbar={(props) => this.renderInputToolbar(props)}
          renderActions={this.renderCustomActions}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
  };
}
