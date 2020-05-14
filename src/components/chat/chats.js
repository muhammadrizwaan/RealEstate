import React, { Component } from 'react';
import { View, Text, AsyncStorage, FlatList, TouchableOpacity, ImageBackground, Modal, SafeAreaView } from 'react-native';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
// import { width, height, totalSize } from 'react-native-dimension';
import { Input, Icon } from 'react-native-elements'

class chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Value: [],
    };
  }
  componentDidMount() {
    try {
      AsyncStorage.getItem('userId').then((id) => {
        if (id === '1') {
          axios.get('http://www.tohfayhut.com/realestate/public/api/groupslist')
            .then((response) =>
              this.setState({ Value: response.data }))
            .catch((error) => {
              Alert.alert("Please Check Your Internet Connection");
            });

        }
        else {
          axios.get(`http://www.tohfayhut.com/realestate/public/api/usergroup/${id}`)
            .then((response) =>
              this.setState({ Value: response.data }))
            .catch((error) => {
              Alert.alert("Please Check Your Internet Connection");
            });
        }
      })
    }
    catch (e) {
      console.log("error in get id")
    }
  }
  render() {
    return (
      
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground style={{ flex: 1 }} source={require('../../images/chatpic.jpg')}>
          <View style={{ backgroundColor: '#000', height: '4%' }}></View>
          <View style={{
            backgroundColor: 'red', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 20, height: 50, flexDirection: 'row'
          }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 15 }}>Chats</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Groups</Text>
            <Feather style={{ color: 'white', marginRight: 15, }} name="power" size={22}
              onPress={() => this.props.navigation.navigate("Logout")} />
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={this.state.Value}
            keyExtractor={item => item.groupid}
            renderItem={({ item }) =>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('chatBox', { groupId: item.groupid })}>
                <View style={{ flexDirection: 'row', marginLeft: 15, marginBottom: 10 }}>
                  <Icon
                    name='user-circle'
                    type='font-awesome'
                    color='#1B1464'
                    size={45}
                  />
                  <View style={{ width: '80%', justifyContent: 'center', borderBottomWidth: 1, marginRight: 15, marginLeft: 10 }}>
                    <Text style>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>

            }
          />
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default chats;
