/**
*@description this component handles the chat page
*@requires React
*@requires React-Native
*@requires React-Native-Gifted-Chat
*@requires React-Native-Maps
*@requires React-Native-Community/Async-Storage
*@requires React-Native-Community/NetInfo
*@requires CustomActions
*@requires Firebase
*@requires Firestore
*/

import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';

import { GiftedChat, InputToolbar, Image } from 'react-native-gifted-chat';
import MapView from 'react-native-maps';

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
        _id: '',
        name: '',
        avatar: '',
      },
      uid: ' ',
      isConnected: false,
      image: null,
      location: null
    }

    /* Firebase configuration */

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyBJauPjDWcmAnCdlSAqFGZ7XqN4dHyjxCk',
        authDomain: 'test-c13bb.firebaseapp.com',
        databaseURL: 'https://test-c13bb.firebaseio.com',
        projectId: 'test-c13bb',
        storageBucket: 'test-c13bb.appspot.com',
        messagingSenderId: '602669976798',
        appId: '1:602669976798:web:fc0ec7d5051436026b864f',
        measurementId: 'G-NGYJDELG16'
      });
    }

    this.referenceMessageUser = firebase.firestore().collection('messages')
  }

  /* messages follows Gifted Chat's format
   fire.auth adds Firebase Auth to the app
   onAuthStateChanged is an observer that’s called whenever the user's sign-in state changes
   and returns an unsubscribe() function
   this.referenceMessageUser creates a reference to the active user's documents (messages)
  this.unsubscribeMessageUsers listens for collection changes for current user */

  componentDidMount() {
    NetInfo.fetch().then((connection) => {
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
      } else {
        this.setState({
          isConnected: false
        });
        this.getMessages();
      }
    });
  }

  /* stop listening to authentication */
  /* stop listening for changes */
  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribeMessageUser();
  }

  /**
  * the message a user has just sent gets appended to the state messages so that
  *it can be displayed in the chat
  *@function onSend
  *@param {object} messages
  */
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessages();
      this.saveMessages();
    });
  }

  /**
  * retreives data in the messages collection
  *@function onCollectionUpdate
  *@param {string} _id
  *@param {string} text
  *@param {number} createdAt
  *@param {object} user
  *@param {string} user._id
  *@param {string} user.name
  *@param {string} user.avatar
  *@param {string} image
  *@param {string} location
  */
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    /* go through each document */
    querySnapshot.forEach((doc) => {
      /* gets the QueryDocumentSnapshot's data */
      const data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
        image: data.image || '',
        location: data.location || ''
      });
    });
    this.setState({
      messages,
    });
  };

  /**
  * read the messages in the asyncStorage
  *@function getMessages
  *@async
  */
  getMessages = async () => {
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

  /**
  * saves messages to asyncStorage
  *@function saveMessages
  *@async
  */
 saveMessages = async () => {
   try {
     await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
   } catch (error) {
     console.log(error.message);
   }
 }

  /**
   * deletes messages from asyncStorage
   *@function deleteMessages
   *@async
   */
  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
  * adds message user + message data
  *@function addMessages
  *@param {string} _id
  *@param {string} text
  *@param {string} createdAt
  *@param {string} user
  *@param {string} uid
  *@param {boolean} sent
  *@param {string} image
  *@param {string} location
  */
  addMessages() {
    this.referenceMessageUser.add({
      id: this.state.messages[0]._id,
      text: this.state.messages[0].text || '',
      createdAt: this.state.messages[0].createdAt,
      user: this.state.user,
      uid: this.state.uid,
      sent: true,
      image: this.state.messages[0].image || null,
      location: this.state.messages[0].location || null,
    });
  }

  /**
   * hides InputToolbar if user is offline. makes it so that users cannot send messages if offline
   *@function renderInputToolbar
   */
  renderInputToolbar = (props) => {
    if (this.state.isConnected === false) {
    } else {
      return(
        <InputToolbar
        {...props}
        />
      );
    }
  }

  /**
   *renders the map
   *@function renderCustomView
   */
  renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={
            {
              width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3
            }
          }
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  /**
   *renders the communication features
   *(take a picture, choose a picture from user library, share location)
   *@function renderCustomActions
   */
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  render() {
    /*  sets user name as title */
    const name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{ backgroundColor:this.props.route.params.color, flex: 1 }}>
        {this.state.image &&
        <Image
          source={{ uri: this.state.image.uri }}
          style={{ width: 200, height: 200 }}
        />}
        <GiftedChat
          messages={this.state.messages}
          image={this.state.image}
          user={this.state.user}
          onSend={(messages) => this.onSend(messages)}
          renderInputToolbar={(props) => this.renderInputToolbar(props)}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
}
}
