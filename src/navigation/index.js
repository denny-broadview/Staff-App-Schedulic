import React, { useEffect, useState } from 'react';
import {
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  YellowBox,
  Dimensions,
  View,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { String } from '../utlis/String';
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
import { useDispatch, useSelector } from 'react-redux';
import { Auth, Constants } from '@global'
import { setSetting, setTax, setBusiness } from '../store/actions'
import Icon from 'react-native-vector-icons/Feather';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import AsyncStorage from '@react-native-async-storage/async-storage';  // Task#1: import AsyncStorage

const { width } = Dimensions.get('window');
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
  useEffect(() => {
    allSettingApi();
    getAllTax();
    getBusiness();
  }, [])

  //Get All setting
  function allSettingApi() {
    let myForm = new FormData();
    myForm.append('business_id', Constants.businessid);
    console.log('parm--', myForm)
    Auth.PostServiceAuth(myForm, Constants.ApiAction.timeSetting,
      (res) => {
        if (res[1].data == true) {
          // console.log('settingdata------',res[1].response)
          onSetSetting(res[1].response);
          (res[1].response);
        } else {
        }
      },
    );
  }
  const onSetSetting = data => {
    dispatch(setSetting(data))
  }
  const getAllTax = () => {
    let myForm = new FormData();
    myForm.append('business_id', Constants.businessid);

    Auth.PostServiceAuth(
      myForm,
      Constants.ApiAction.getTax,
      (res) => {
        if (res[1].data == true) {
          res[1].response
          // console.log(res[1].response)
          onSetTax(res[1].response)
        }
      },
    );
  }
  const onSetTax = data => {
    dispatch(setTax(data))
  }

  const onSetBusiness = data => {
    dispatch(setBusiness(data))
  }
  // get business api call use of paymant url
  function getBusiness() {

    let myForm = new FormData();
    myForm.append('business_id', Constants.businessid);
    Auth.PostServiceAuth(myForm, Constants.ApiAction.getBusiness, (res) => {
      if (res[1].data == true) {
        console.log('business------', res[1].response)
        onSetBusiness(res[1].response);
      } else {
        Auth.ToastMessage(res[1].data);
      }
    });
  }
  const BottomTabs = () => {
    return (
      <Tab.Navigator tabBar={(props) => <AdminOrdersTabBar {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="My Bookings" component={BookingStackScreen} listeners={({ navigation, route }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
          tabPress: async (e) => {
            await AsyncStorage.setItem('goToTab', '0'); // Task#1: Set value in AsyncStorage
            // navigation.navigate('NewBookingTab');
          },
        })} />
        <Tab.Screen name="Account" component={MyAccount} /> 
      </Tab.Navigator>
    );
  };
  const BookingStackScreen = () => {
    return (
      <BookingStack.Navigator>
        <BookingStack.Screen name="TopTabs" component={TopTabs} options={{ headerShown: false }} />
        <BookingStack.Screen name="NewBookingDetails" component={NewBookingDetails} options={{ headerShown: false }} />
        {/* <BookingStack.Screen name="OngoingTab" component={TopTabs} options={{ headerShown: false }} /> */}
        <BookingStack.Screen name="onGoingDetails" component={onGoingDetails} options={{ headerShown: false }} />
        {/* <BookingStack.Screen name="CompletedTab" component={TopTabs} options={{ headerShown: false }} /> */}
        <BookingStack.Screen name="CompletDetails" component={CompletDetails} options={{ headerShown: false }} />
      </BookingStack.Navigator>
    )
  }
  function AdminOrdersTabBar({ state, descriptors, navigation }) {
    return (
      // <View style={{}}>
      <View style={{ height: hp('10%'), alignItems: 'center', width: wp('100%'), flexDirection: 'row', backgroundColor: '#EFEFEF', borderTopLeftRadius: 20, borderTopRightRadius: 20, position: 'absolute', bottom: 0 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;

            const isFocused = state.index === index;
            let icon = null;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };


            return (
              <TouchableOpacity
                key={index.toString()}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                {index === 0 ?
                  <Text style={[{
                    color: !isFocused ? '#9C9C9C' : '#00A89B',
                    size: 20,
                  }]}><Icon name="home" fill={isFocused ? '#00A89B' : '#A3A3A3'} size={20} /></Text>
                  : null}
                {index === 1 ?
                  <Text style={[{
                    color: !isFocused ? '#9C9C9C' : '#00A89B',
                    size: 20,
                  }]}><Icon name="calendar" fill={isFocused ? '#00A89B' : '#A3A3A3'} size={20} /></Text>
                  : null}
                {index === 2 ?
                  <Text style={[{
                    color: !isFocused ? '#9C9C9C' : '#00A89B',
                    size: 20,
                  }]}><Icon name="user" fill={isFocused ? '#00A89B' : '#A3A3A3'} size={20} /></Text>
                  : null}
                <Text style={[{
                  color: !isFocused ? '#9C9C9C' : '#00A89B',
                  size: 12,
                }]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      // </View>
    );
  }

  function TopTabs() {
    return (
      <TopTab.Navigator
        tabBar={props => <MyBookingMainView {...props} />}
        swipeEnabled={false}>
        <TopTab.Screen name="NewBookingTab" options={{ title: 'New Bookings' }} component={NewBookingTab} />
        <TopTab.Screen name="OngoingTab" options={{ title: 'Upcoming' }} component={OngoingTab} />
        <TopTab.Screen name="CompletedTab" options={{ title: 'Completed' }} component={CompletedTab} />
      </TopTab.Navigator>

    );
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Spalsh"
            component={Spalsh}
            options={{ headerShown: false }}
            initialRouteName="Spalsh"
          />
          <Stack.Screen
            name="LoginMain"
            component={LoginMain}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Category"
            component={Category}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PostalCode"
            component={PostalCode}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WorkingHours"
            component={WorkingHours}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Breaks"
            component={Breaks}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TimeOff"
            component={TimeOff}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AccountDetails"
            component={AccountDetails}
            options={{ headerShown: false }}
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
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CashPaymantDetails"
            component={CashPaymantDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnlinePaymantDetails"
            component={OnlinePaymantDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PaymantDone"
            component={PaymantDone}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{ headerShown: false }}
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
            options={{ headerShown: false }}
          />
          <Stack.Screen name="MyAccount" component={BottomTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
          <Stack.Screen name="Reshedul" component={Reshedul} options={{ headerShown: false }} />
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
