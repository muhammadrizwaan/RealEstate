import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage, KeyboardAvoidingView, FlatList, ImageBackground, TouchableOpacity, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import firebase from 'firebase';
import axios from 'axios';
import FileSystem from 'expo-file-system';
// import * as Permissions from 'expo-permissions';
import base64 from 'base-64';
import utf8 from 'utf8';


import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';



class chatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: '',
      image: null,
      UserName: '',
      Message: '',
      groupId: props.navigation.getParam('groupId'),
      MessagesList: [],
      showMe: false,
      fbImage: ''
    };
  }


  componentDidMount() {
    this.getPermissionAsync();
    AsyncStorage.getItem("userId").then((id) => {
      this.setState({ UserId: id });
    })
    AsyncStorage.getItem("name").then((name) => {
      this.setState({ UserName: name });
    })

    firebase.database().ref(`messages/${this.state.groupId}`)
      .on('child_added', (value) => {
        this.setState((prevState) => {
          return {
            MessagesList: [...prevState.MessagesList, value.val()]
          }
        })
      })
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
  _pickDocument = async () => {

    result = await DocumentPicker.getDocumentAsync({
      base64: true,
      copyToCacheDirectory: false,
      type: '*/*',
    }); 
    console.log(result);
    if (!result.cancelled) {
      // const { name, uri } = this.state.image;
      const uri = result.uri;
      const name = result.name;
      const uriParts = result.name.split('.');
      const fileType = uriParts[uriParts.length - 1];
      const formData = new FormData();
      formData.append('document', {
        uri,
        name,
        type: `application/${fileType}`,
      });
      console.log(formData);


      // const options = {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'multipart/form-data',
      //   },
      // };



      // const base64 = await FileSystem.readAsStringAsync(
      //   result.uri,
      //   {
      //     encoding: FileSystem.EncodingTypes.Base64,
      //   });

      // console.log(base64.length);
        // await axios.post(`https://realestate.malangis.com/public/api/sendfile`,
        //   {
        //     headers: {
        //       Accept: 'application/json',
        //       'Content-Type': 'multipart/form-data',
        //     },
        //     "image": formData,
        //   }
        // )
        //   .then((response) => { console.log(response.json()) });
    }


  }

  _pickImage = async () => {

    // this.setState({ image: null });
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
    // console.log(result);
  };

  SubmitChatMessage() {


    let msgId = firebase.database().ref('messages').child(this.state.groupId).push().key;
    let updates = {};
    let msg = {
      msg: this.state.Message,
      from: this.state.UserId,
      Name: this.state.UserName,
      image: this.state.image
    }
    updates['messages/' + this.state.groupId + '/' + msgId] = msg;
    firebase.database().ref().update(updates);
    this.setState({ Message: '' });

  }

  renderRow = ({ item }) => {
    return (
      <View style={{
        alignSelf: item.from === this.state.UserId ? 'flex-end' : 'flex-start',
        backgroundColor: item.from === this.state.UserId ? '#DCF8C6' : '#F1F3F4',
        borderRadius: 5,
        marginBottom: 10
      }}>
        <Text style={styles.ReceiveName}>{item.Name}</Text>
        <Text style={styles.ReceiveMessage}>{item.msg}</Text>
        <TouchableOpacity onPress={() => this.setState({ showMe: true, fbImage: item.image })}>
          {item.image && <Image source={{ uri: item.image }} style={{ width: 250, height: 200 }} />}
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, margin: 15, marginTop: 30 }} behavior="padding">
        <ImageBackground style={{ flex: 1 }} source={require('../../images/chatpic.jpg')}>

          <FlatList
            ref="flatList"
            onContentSizeChange={() => this.refs.flatList.scrollToEnd()}
            style={{ padding: 10 }}
            showsHorizontalScrollIndicator={false}
            data={this.state.MessagesList}
            renderItem={this.renderRow}
            keyExtractor={(item, index) => index.toString()}
          />


          <View style={{ flexDirection: 'row', marginHorizontal: 10, marginVertical: 5 }}>
            <View style={styles.TextInputView}>
              <AutoGrowingTextInput style={{ fontSize: 12, width: '70%', paddingHorizontal: 10 }}
                autoCorrect={false}
                placeholder="Type your text"
                value={this.state.Message}
                onChangeText={Message => this.setState({ Message })}
              />
              <Entypo style={{ color: 'black', alignSelf: 'center', marginHorizontal: 10 }} name="attachment" size={20}
                onPress={this._pickDocument}
              />
              <FontAwesome style={{ color: 'black', alignSelf: 'center', marginRight: 8 }} name="camera" size={20}
                onPress={this._pickImage}
              />
            </View>
            <TouchableOpacity style={styles.SendIcon}>
              <Ionicons style={{ color: 'white' }} name="md-send" size={30}
                onPress={() => this.SubmitChatMessage()} />
            </TouchableOpacity>
          </View>


          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showMe}
            onRequestClose={() => this.setState({ showMe: false })}>
            <View style={styles.ModalMainView}>
              {this.state.fbImage && <Image source={{ uri: this.state.fbImage }} style={{ width: '100%', height: '100%' }} />}
              <View style={styles.AbsoluteView}>
                <Ionicons style={{ color: 'black' }} name="md-arrow-round-back" size={30}
                  onPress={() => this.setState({ showMe: false })}
                />
              </View>
            </View>
          </Modal>

        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  TextInputView: {
    flexDirection: 'row', borderWidth: 1, borderRadius: 20,
    height: 50, width: '80%', backgroundColor: 'white'
  },
  SendIcon: {
    marginLeft: 10, alignItems: 'center',
    justifyContent: 'center', width: 50, height: 50, backgroundColor: 'green', borderRadius: 20
  },
  ReceiveName: {
    color: 'red', paddingHorizontal: 7, paddingTop: 7, fontSize: 16
  },
  ReceiveMessage: {
    color: 'black', paddingLeft: 20, paddingRight: 7, paddingBottom: 7, fontSize: 13
  },
  ModalMainView: {
    flex: 1
  },
  AbsoluteView: {
    position: 'absolute',
    top: 20,
    left: 15,
    color: 'black'
  },
});

export default chatBox;
