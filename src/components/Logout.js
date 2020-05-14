import React from 'react';
import { StyleSheet, AsyncStorage, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
class LogoutScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount (){
        try {
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('name');
            this.props.navigation.navigate('home')
        } catch (e) {
            console.log("error in set id");
        }
    }
    // Remove = async () =>{
    //     try {
    //         await AsyncStorage.removeItem('userId');
    //         await AsyncStorage.removeItem('name');
    //         this.props.navigation.navigate('home')
    //     } catch (e) {
    //         console.log("error in set id");
    //     }
    // }

    render() {
        return (
            <View>
                
            </View>

        )
    }

};

const styles = StyleSheet.create({

});

export default LogoutScreen;