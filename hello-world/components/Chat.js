import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Chat extends React.Component {

  render() {
    let name = this.props.route.params.name;

    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{backgroundColor:this.props.route.params.color, flex: 1, alignItems:'center'}}>
        <Text style={styles.text}> hello {name}</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({

  text:{
    color:'white',
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    margin:50,
    fontSize: 24
  }
})
