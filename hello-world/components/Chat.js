import React from 'react';
import { View, Text } from 'react-native';

export default class Chat extends React.Component {

  render() {
    let name = this.props.route.params.name;
    let color = this.props.route.params.color

    console.log('color')

    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{backgroundColor:this.props.route.params.color, flex: 1}}>
        <Text>{name}</Text>
      </View>
    );
  };
}
