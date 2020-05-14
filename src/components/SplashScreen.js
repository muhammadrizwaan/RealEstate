import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    Text,
    Dimensions,
    ActivityIndicator,
    Alert,
    AsyncStorage,

} from 'react-native';
import firebase from 'firebase';

 class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.decisionToNavigate = this.decisionToNavigate.bind(this);
    }

    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        var firebaseConfig = {
            apiKey: "AIzaSyD-lVyQbm7kEhgvmokuqvocK4w3chTX0jA",
            authDomain: "realestate-40c09.firebaseapp.com",
            databaseURL: "https://realestate-40c09.firebaseio.com",
            projectId: "realestate-40c09",
            storageBucket: "realestate-40c09.appspot.com",
            messagingSenderId: "1028586225154",
            appId: "1:1028586225154:web:c2122630e81d651a41311b"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
          
        setTimeout(() => {

            this.decisionToNavigate();

        }, 3000);
    }

    decisionToNavigate() {
        const {navigate} = this.props.navigation;
        AsyncStorage.getItem("userId").then((value) => {
            if (value) {
                    const {navigate} = this.props.navigation;
                    navigate("chats");
            }
            else {
                navigate("home");
            }
        }).catch(function (err) {
            Alert.alert(err.toString())
        }).done();
    }

    render() {
        return (
            <ImageBackground
                style={styles.container}
                source={require('../images/build.png')}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignSelf: 'center'
                    }}>
                        
                    <ActivityIndicator size={"large"}/>
                    {/* <Image source={require('../images/build.png')} style={{width:50, height:50}}/> */}
                </View>

             </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF'
    }

});

export default SplashScreen;