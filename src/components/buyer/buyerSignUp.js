import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView, Alert,  } from 'react-native';
import { Input, Icon } from 'react-native-elements'
import { width, height, totalSize } from 'react-native-dimension';
import axios from 'axios';
import SpinnerScreen from '../Spinner';


class buyerSignUp extends Component {
  constructor(props) {
    super(props);
    this.state= {
      // CompanyName:'',
      Name:'',
      CellPhone:'',
      email: '',
      password: '',
      type: '',
      loading: false
  }
  }

  onSignup(CompanyName, Name, CellPhone, email, password){
    try{
        // if(this.state.CompanyName === ''){
        //    alert("Please Enter Company Name");
        //    return;
        // }
        // else 
        if(this.state.name===''){
          alert("Please enter Name");
          return;
        }
        else if(this.state.CellPhone===''){
          alert("Please enter Cell Phone");
          return;
       }
       else if(this.state.email===''){
        alert("Please enter Email");
        return;
      }
        else if(this.state.password.length < 6){
            alert("Please enter atleast 6 character Password");
            return;
        }
        else{
          this.setState({loading:true})
          axios.post(`http://www.tohfayhut.com/realestate/public/api/registerbuyer`,
          {
            // "companyname": CompanyName,
            "name": Name,
            "cellphone": CellPhone,
            "email": email,
            "password": password
          }
          )
          .then((response) => {
            console.log(response);
            if (response.data.message === "Email already taken") {
              this.setState({loading:false})
                Alert.alert("User Already Exist");

            }
            else {
              this.props.navigation.navigate('buyerSignIn');
            }
        })
          .catch(error => {
            console.log(error);
          })
        }
    }
    catch(error){
        console.log(error)
    }
}

renderButton (){
  if(this.state.loading){
      return <SpinnerScreen/>
  }
  return (
    <TouchableOpacity style={{marginVertical:height(5),borderRadius:45,width:width(75), height:height(8), marginHorizontal:width(9),  justifyContent:'center',alignItems:'center',backgroundColor:'#E61E26'}}
      onPress={()=> this.onSignup(this.state.CompanyName, this.state.Name, this.state.CellPhone,this.state.email, this.state.password)}>
      <Text style={{color:'white', fontSize:18,alignSelf:'center',  }}>SignUp</Text>
    </TouchableOpacity>
  )
};


  render() {
    return (
      <KeyboardAvoidingView style={{flex:1, alignItems:'center', justifyContent:'center'}} behavior="padding">
      <ImageBackground source={require('./../../images/app2.png')} style={{width:width(100), height:height(100)}}>
        <View style={{ width:width(90), alignItems:'center', backgroundColor:'white', marginHorizontal:width(5), height:height(80), marginVertical: height(10),elevation:5, borderRadius:3, }}>
        <Text style={{color:'black', fontSize:30, fontWeight:'100', marginVertical:height(3)}}>Sign Up</Text>
        <View style={{marginVertical: height(6), width:width(35), marginVertical:height(2), justifyContent:'center', alignItems:'center'}}>
        <Icon
            name='user-circle'
            type='font-awesome'
            color='#E61E26'
            size={45}
          />
          <Text style={{fontSize:17, color:'#E61E26', }}>buyer</Text>
        </View>
          {/* <Input
            placeholder='Company Name'
            placeholderTextColor='black'
            inputContainerStyle={{marginHorizontal:'5%', borderColor:'black'}}
            inputStyle={{marginLeft:'3%', fontSize:15}}

            value={this.state.CompanyName}
            onChangeText={CompanyName=> this.setState({CompanyName})}

            leftIcon={<Icon
            name='building'
            type='font-awesome'
            color='black'
            size={20}
          />}
          containerStyle={{marginTop:'1%'}}  
          /> */}
           <Input
            placeholder='Name'
            placeholderTextColor='black'
            inputContainerStyle={{marginHorizontal:'5%', borderColor:'black'}}
            inputStyle={{marginLeft:'3%', fontSize:15}}

            value={this.state.Name}
            onChangeText={Name=> this.setState({Name})}

            leftIcon={<Icon
            name='user'
            type='font-awesome'
            color='black'
            size={20}
          />}
          containerStyle={{marginTop:'1%'}}  
          />
           <Input
            placeholder='Cell Phone'
            placeholderTextColor='black'
            inputContainerStyle={{marginHorizontal:'5%', borderColor:'black'}}
            inputStyle={{marginLeft:'3%', fontSize:15}}

            value={this.state.CellPhone}
            onChangeText={CellPhone=> this.setState({CellPhone})}

            leftIcon={<Icon
            name='mobile'
            type='font-awesome'
            color='black'
            size={25}
          />}
          containerStyle={{marginTop:'1%'}}  
          />
           <Input
            placeholder='Email'
            placeholderTextColor='black'
            inputContainerStyle={{marginHorizontal:'5%', borderColor:'black'}}
            inputStyle={{marginLeft:'3%', fontSize:15}}
            
            autoCorrect={false}
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={email=> this.setState({email})}

            leftIcon={<Icon
            name='envelope'
            type='font-awesome'
            color='black'
            size={20}
          />}
          containerStyle={{marginTop:'1%'}}  
          />
          <Input
            placeholder='Password'
            placeholderTextColor='black'
             inputContainerStyle={{marginHorizontal:'5%', borderColor:'black'}}
             inputStyle={{marginLeft:'3%', fontSize:15}}
            
             secureTextEntry
             value={this.state.password}
            onChangeText={password=> this.setState({password})}

            leftIcon={<Icon
              name='lock'
              type='font-awesome'
              color='black'
              size={20}
            />}
            containerStyle={{marginTop:'1%'}} 
          />        
            {this.renderButton()}
                {/* <TouchableOpacity style={{marginVertical:height(5),borderRadius:45,width:width(75), height:height(8), marginHorizontal:width(9),  justifyContent:'center',alignItems:'center',backgroundColor:'#E61E26'}}>
                    <Text style={{color:'white', fontSize:18,alignSelf:'center',  }} onPress={()=>{this.props.navigation.navigate('buyerSignIn')}}>SignUp</Text>
                  </TouchableOpacity> */}
        </View>
        </ImageBackground>
        </KeyboardAvoidingView>
    );
  }
}

export default buyerSignUp;

