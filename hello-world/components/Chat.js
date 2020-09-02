import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'

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
