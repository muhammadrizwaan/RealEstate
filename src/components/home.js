import React, { Component } from 'react';
import { View, Text , Image} from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { Input, Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
       friends : [
        {id:1, name: 'buyer', iconName:'user-circle', screenName:'buyerSignUp'},
        {id:2, name: 'Loan Broker', iconName:'home',screenName:'loanBrokerSignUp'},
        {id:3, name: 'Realtor', iconName:'user-secret',screenName:'relatorSignUp'},
        {id:4, name: 'Home Inspector',iconName:'h-square',screenName:'homeInspectorSignUp'},
        {id:5, name: 'Lawyer',iconName:'balance-scale',screenName:'lawyerSingUp'},
        {id:6, name: 'Admin',iconName:'user',screenName:'adminSignUp'}
    ],
    };
  }
  ScreenNavigate=(id)=>{
    switch (id) {
      case 1:
        this.props.navigation.navigate('buyerSignIn')
        break;
        case 2:
          this.props.navigation.navigate('loanBrokerSignIn')
          break;
          case 3:
            this.props.navigation.navigate('relatorSignIn')
            break;
            case 4:
              this.props.navigation.navigate('homeInspectorSignIn')
              break;
              case 5:
                this.props.navigation.navigate('lawyerSingIn')
                break;
                case 6:
                  this.props.navigation.navigate('adminSignUp')
                  break;
      default:
        break;
    }
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#EFEFED', justifyContent:'center', alignItems:'center'}}>
        <Image source={require('./../images/ico.png')} style={{width:width(45), height:height(15)}}></Image>
      <Text style={{fontSize:20,fontWeight:'bold', marginVertical:height(2)}}>Login As</Text>
      <View style={{marginHorizontal:width(18),alignItems:'center', flexWrap: 'wrap', flexDirection:'row'}}>
     {
       this.state.friends.map((item,key)=>
        <TouchableOpacity onPress={()=>{this.ScreenNavigate(item.id)}} key={key} style={{ width:width(30),height:height(12), justifyContent:'center', alignItems:'center'}}>
        <Icon
            name={item.iconName}
            type='font-awesome'
            color='#E71E26'
            size={30}
           
          />
          <Text style={{fontSize:14, color:'black' }}>{item.name}</Text>
        </TouchableOpacity>
       )
     }
      </View>
      <Image source={require('./../images/build.png')} style={{width:width(100), height:height(40)}}></Image>

      </View>
    );
  }
}

export default Home;
