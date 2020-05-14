import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity , ImageBackground, KeyboardAvoidingView} from 'react-native';
import { Input, Icon } from 'react-native-elements'
import { width, height, totalSize } from 'react-native-dimension';
import axios from 'axios';
import SpinnerScreen from '../Spinner'; 

class loanBrokerSignIn extends Component {
  constructor(props) {
    super(props);
    this.state= {
      email: '',
      password:'',
      errorText:'',
      loading: false,
  }
  }
  


async onSignin(email, password){
    
    this.setState({errorText:'', loading:true});

    if(this.state.email==='' || this.state.password === '')
    {
        this.onLoginFail();
    }
    else {
     await axios.post(`http://www.tohfayhut.com/realestate/public/api/brokerlogin`,
      {
        "email": email,
        "password": password
      }
      )
      .then((response) => {
        // console.log(response);
        if (response.data.message === "Incorrect email or password") {
          this.setState({loading:false})
          this.onLoginFail();
        }
        else {
          try {
            AsyncStorage.setItem("userId",JSON.stringify(response.data.data.id));
            AsyncStorage.setItem("name",response.data.data.name);
         } catch (e) {
           console.log("error in set id");
         }
          this.onLoginSuccess();
        }
    })
    .catch((error) => {
      Alert.alert("Please Check Your Internet Connection");
  });
  }
 }
renderButton (){
    if(this.state.loading){
        return <SpinnerScreen/>
    }
    return (
    <TouchableOpacity style={{borderRadius:45,marginTop:height(0), width:width(75), height:height(8), marginHorizontal:width(9),  justifyContent:'center',alignItems:'center',backgroundColor:'#E61E26'}}
      onPress={()=> this.onSignin(this.state.email, this.state.password)}
    >
      <Text style={{color:'white', fontSize:18,alignSelf:'center',  }} >LogIn</Text>
    </TouchableOpacity>
    )
};
onLoginFail(){
    this.setState({errorText:"Incorrect email or password" ,loading:false})
}
onLoginSuccess(){
    this.setState({
        email:'',
        password:'',
        loading:false,
        errorText:''
        
    })
    this.props.navigation.navigate('chats');
}

  render() {
    return (
      <KeyboardAvoidingView style={{flex:1, alignItems:'center', justifyContent:'center'}} behavior="padding">
        <ImageBackground source={require('./../../images/app2.png')} style={{width:width(100), height:height(100)}}>
        <View style={{ width:width(90), alignItems:'center', backgroundColor:'white', marginHorizontal:width(5), height:height(80), marginVertical: height(10),elevation:5, borderRadius:3, }}>
        <Text style={{color:'black', fontSize:30,marginVertical:height(6), fontWeight:'100'}}>Sign In</Text>
        <View style={{marginVertical: height(4), width:width(35), marginVertical:height(2), justifyContent:'center', alignItems:'center'}}>
        <Icon
            name='home'
            type='font-awesome'
            color='#E61E26'
            size={45}
          />
          <Text style={{fontSize:17, color:'#E61E26', marginVertical:height(1) }}>Loan Broker</Text>
        </View>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={email=> this.setState({email})}

            placeholder='Email'
            placeholderTextColor='black'
            inputContainerStyle={{marginHorizontal:'5%', borderColor:'#1B1464'}}
            inputStyle={{marginLeft:'3%', fontSize:15}}
            leftIcon={<Icon
            name='user'
            type='font-awesome'
            color='black'
            size={20}
          />}
          containerStyle={{marginTop:'5%'}}  
          />
          <Input
            secureTextEntry
            value={this.state.password}
            onChangeText={password=> this.setState({password})}
            
            placeholder='Password'
            placeholderTextColor='black'
             inputContainerStyle={{marginHorizontal:'5%', borderColor:'#1B1464'}}
             inputStyle={{marginLeft:'3%', fontSize:15}}
            leftIcon={<Icon
              name='lock'
              type='font-awesome'
              color='black'
              size={20}
            />}
            containerStyle={{marginTop:'5%'}} 
          />        
          <Text style={{color:'red', fontSize: 20, alignSelf:'center', marginTop:15}}>{this.state.errorText}</Text>
                {this.renderButton()} 
                {/* <TouchableOpacity style={{borderRadius:45,marginTop:height(6), width:width(75), height:height(8), marginHorizontal:width(9),  justifyContent:'center',alignItems:'center',backgroundColor:'#E61E26'}}>
                    <Text style={{color:'white', fontSize:18,alignSelf:'center',  }} onPress={()=>{this.props.navigation.navigate('home')}}>LogIn</Text>
                  </TouchableOpacity> */}
                <TouchableOpacity style={{flexDirection:'row',marginVertical:'3%',height:height(5)}} onPress={()=>{this.props.navigation.navigate('loanBrokerSignUp')}}>
                  <Text style={{color:'black', fontSize:14}}>Don't have Account?</Text>
                  <Text style={{color:'black',fontWeight:'bold', fontSize:16}}> Register</Text>
                  </TouchableOpacity>
        </View>
        </ImageBackground>
        </KeyboardAvoidingView>
    );
  }
}
export default loanBrokerSignIn;
