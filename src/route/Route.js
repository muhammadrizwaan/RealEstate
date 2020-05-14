import { createAppContainer, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import home from './../components/home'
import adminSignUp from './../components/admin/adminSignUp'
import buyerSignIn from './../components/buyer/buyerSignIn'
import buyerSignUp from './../components/buyer/buyerSignUp'
import chats from './../components/chat/chats'
import chatBox from './../components/chat/chatBox'
import homeInspectorSignIn from './../components/homeInspector/homeInspectorSignIn'
import homeInspectorSignUp from './../components/homeInspector/homeInspectorSignUp'
import lawyerSingIn from './../components/lawyer/lawyerSingIn'
import lawyerSingUp from './../components/lawyer/lawyerSingUp'
import loanBrokerSignIn from './../components/loanBroker/loanBrokerSignIn'
import loanBrokerSignUp from './../components/loanBroker/loanBrokerSignUp'
import relatorSignIn from './../components/relator/relatorSignIn'
import relatorSignUp from './../components/relator/relatorSignUp'
import Logout from '../components/Logout';
import Splash from '../components/SplashScreen';








const Route = createStackNavigator({
    Splash: {
        screen: Splash,
        navigationOptions: {
            header: null,
        },
    },
    home: {
        screen: home,
        navigationOptions: {
            header: null,
        },
    },
    adminSignUp: {
        screen: adminSignUp,
        navigationOptions: {
            header: null,
        },
    },
    buyerSignIn: {
        screen: buyerSignIn,
        navigationOptions: {
            header: null,
        },
    },
    buyerSignUp: {
        screen: buyerSignUp,
        navigationOptions: {
            header: null,
        },
    },
    chats: {
        screen: chats,
        navigationOptions: {
            header: null,
        },
    },
    chatBox: {
        screen: chatBox,
        navigationOptions: {
            header: null,
        },
    },
    homeInspectorSignIn: {
        screen: homeInspectorSignIn,
        navigationOptions: {
            header: null,
        },
    },
    homeInspectorSignUp: {
        screen: homeInspectorSignUp,
        navigationOptions: {
            header: null,
        },
    },
    lawyerSingIn: {
        screen: lawyerSingIn,
        navigationOptions: {
            header: null,
        },
    },
    lawyerSingUp : {
        screen: lawyerSingUp,
        navigationOptions: {
            header: null,
        },
    },
    loanBrokerSignIn : {
        screen: loanBrokerSignIn,
        navigationOptions: {
            header: null,
        },
    },
    loanBrokerSignUp : {
        screen: loanBrokerSignUp,
        navigationOptions: {
            header: null,
        },
    },
    relatorSignIn : {
        screen: relatorSignIn,
        navigationOptions: {
            header: null,
        },
    },
    relatorSignUp : {
        screen: relatorSignUp,
        navigationOptions: {
            header: null,
        },
    },
    Logout: {
        screen: Logout,
        navigationOptions: {
            header: null,
        },
    },
},
    {
        initialRouteName: 'Splash'
    }
);

export default createAppContainer(Route);