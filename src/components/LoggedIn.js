import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { width, height, totalSize } from 'react-native-dimension';
import { Input, Icon } from 'react-native-elements'

const LoggedIn = (props)=>{
    return (
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <Text>{this.props.user}</Text>
            <Text>Hello</Text>
        </View>
      );
}
  
export default LoggedIn;
