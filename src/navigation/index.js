import React, {useEffect, useState} from 'react';
import {
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  YellowBox,
  Dimensions,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {String} from '../utlis/String';
import NetInfo from '@react-native-community/netinfo';
import BottomBar from './BottomBar';
import Spalsh from '../screens/spalsh';
import Login from '../screens/login';
import MyBookingMainView from '../screens/myBookingTabs/MainBookingView';
import LoginMain from '../screens/login/loginmain';
import Home from '../screens/Home';
import MyAccount from '../screens/Account/MyAccount';
import Category from '../screens/Account/category';
import PostalCode from '../screens/Account/postalCode';
import WorkingHours from '../screens/Account/workinghours';
import Breaks from '../screens/Account/brecks';
import TimeOff from '../screens/Account/timeoff';
import AccountDetails from '../screens/Account/AccountDetail';
import NewBookingTab from '../screens/myBookingTabs/newBooking';
import CompletedTab from '../screens/myBookingTabs/completed';
import OngoingTab from '../screens/myBookingTabs/ongoing';
import Payment from '../screens/Payment';
import CashPaymantDetails from '../screens/CashPaymantDetails';
import OnlinePaymantDetails from '../screens/OnlinePaymantDetails';
import PaymantDone from '../screens/PaymantDone';
import MapScreen from '../screens/mapScreen';
import NewBookingDetails from '../screens/myBookingTabs/newBookingDetails';
import onGoingDetails from '../screens/myBookingTabs/onGoingDetails';
import CompletDetails from '../screens/myBookingTabs/completedDetails';
import Reshedul from '../screens/myBookingTabs/Reshedul';
import Invoice from '../screens/myBookingTabs/invoice';
import Notification from '../screens/Notification';
import { useDispatch,useSelector } from 'react-redux';
import { Auth, Constants } from '@global'
import { setSetting,setTax} from '../store/actions'
const {width} = Dimensions.get('window');
const Stack = createStackNavigator();
YellowBox.ignoreWarnings(['']);
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const BookingStack = createStackNavigator();
export default App = () => {
  const [isConnected, setIsConnected] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected == true) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });
  });
  useEffect(()=>{
    allSettingApi();
    getAllTax();
  },[])

  //Get All setting
  function allSettingApi() {
    let myForm = new FormData();
    myForm.append('business_id', Constants.businessid);
    console.log('parm--',myForm)
    Auth.PostServiceAuth(myForm,Constants.ApiAction.timeSetting,
      (res) => {
        if (res[1].data == true) {
          console.log('settingdata------',res[1].response)
          onSetSetting(res[1].response);
          (res[1].response);
        } else {
        }
      },
    );
  }
  const onSetSetting = data =>{
    dispatch(setSetting(data))
  }
  const getAllTax=()=>{
    let myForm = new FormData();
    myForm.append('business_id', Constants.businessid);

    Auth.PostServiceAuth(
      myForm,
      Constants.ApiAction.getTax,
      (res) => {
        if (res[1].data == true) {
          res[1].response
          // console.log(res[1].response)
          onSetTax( res[1].response)
        } 
      },
    );
  }
  const onSetTax = data =>{
    dispatch(setTax(data))
  }

  const BottomTabs = () => {
    return (
      <Tab.Navigator tabBar={(props) => <BottomBar {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="NewBookingTab" component={BookingStackScreen} />
        <Tab.Screen name="MyAccount" component={MyAccount} />
      </Tab.Navigator>
    );
  };
  const BookingStackScreen = () => {
    return (
      <BookingStack.Navigator>
        <BookingStack.Screen name="NewBookingTab" component={TopTabs} options={{ headerShown: false }} />
        <BookingStack.Screen name="NewBookingDetails" component={NewBookingDetails} options={{ headerShown: false }} />
        <BookingStack.Screen name="OngoingTab" component={TopTabs} options={{ headerShown: false }} />
        <BookingStack.Screen name="onGoingDetails" component={onGoingDetails} options={{ headerShown: false }} />
        <BookingStack.Screen name="CompletedTab" component={TopTabs} options={{ headerShown: false }} />
        <BookingStack.Screen name="CompletDetails" component={CompletDetails} options={{ headerShown: false }} />
      </BookingStack.Navigator>
    )
  }
  function TopTabs() {
    return (
  
      <TopTab.Navigator
        tabBar={props => <MyBookingMainView {...props} />}
        swipeEnabled={false}>
        <TopTab.Screen name="NewBookingTab" component={NewBookingTab} />
        <TopTab.Screen name="OngoingTab" component={OngoingTab} />
        <TopTab.Screen name="CompletedTab" component={CompletedTab} />
      </TopTab.Navigator>
  
    );
  }
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Spalsh"
            component={Spalsh}
            options={{headerShown: false}}
            initialRouteName="Spalsh"
          />
          <Stack.Screen
            name="LoginMain"
            component={LoginMain}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={BottomTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Category"
            component={Category}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PostalCode"
            component={PostalCode}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WorkingHours"
            component={WorkingHours}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Breaks"
            component={Breaks}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TimeOff"
            component={TimeOff}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AccountDetails"
            component={AccountDetails}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen
            name="NewBookingTab"
            component={NewBookingTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CompletedTab"
            component={CompletedTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OngoingTab"
            component={OngoingTab}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CashPaymantDetails"
            component={CashPaymantDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OnlinePaymantDetails"
            component={OnlinePaymantDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PaymantDone"
            component={PaymantDone}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen
            name="NewBookingDetails"
            component={NewBookingDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="onGoingDetails"
            component={onGoingDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CompletDetails"
            component={CompletDetails}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name="Invoice"
            component={Invoice}
            options={{headerShown: false}}
          />
           <Stack.Screen name="MyAccount" component={BottomTabs} options={{headerShown: false}}/>
           <Stack.Screen  name="Notification" component={Notification} options={{headerShown:false}}/>
           <Stack.Screen name="Reshedul" component={Reshedul} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      {isConnected == true ? null : (
        <SafeAreaView
          style={[
            styles.netConatiner,
            {
              height: isConnected == false ? 50 : 0,
              display: isConnected == false ? 'flex' : 'none',
            },
          ]}>
          <Text style={styles.netText}>{String.app.Nointernet}</Text>
        </SafeAreaView>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  netConatiner: {
    overflow: 'hidden',
    backgroundColor: 'red',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  netText: {
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontFamily: 'bold',
  },
  tabBar: {
    height: Platform.OS === 'ios' ? 60 : 60,
    marginHorizontal: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    position: 'absolute',
    borderTopWidth: 0,
  },
  backgroundImage: {
    width: '100%',
    resizeMode: 'stretch',
    height: 20,
  },
});
