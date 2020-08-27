import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';

export default class Screen1 extends React.Component {

  constructor(props){
    super(props);
    this.state = { name: ' ' }
  }


  render() {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hello Screen1!</Text>
        <Button
          title="Go to Screen 2"
          onPress={() => this.props.navigation.navigate('Screen2')}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 180}}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          placeholder='Type here ...'
        />
        <Text>You wrote: {this.state.name}</Text>
        <Button
          title="enter"
          onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name })}
        />
      </View>
    )
  }
}
