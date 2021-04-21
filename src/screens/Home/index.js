import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, PermissionsAndroid, DeviceEventEmitter } from 'react-native';
import StarRating from 'react-native-star-rating';
import styles from './style';
import Icon from 'react-native-vector-icons/Entypo';
import { String } from '../../utlis/String';
import HeaderView from '../../component/headerTab';
import { MySpinner } from '../../component/MySpinner';
import { Auth, Constants } from '@global';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Task#1: import AsyncStorage
import Geolocation from '@react-native-community/geolocation';
import { setStaffLocation } from '../../store/actions';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

const Home = (props) => {
  const navigation = useNavigation()
  const userImage = useSelector(state => state.user.userImage)
  const userInfo = useSelector(state => state.user.user)
  // console.log('userInfo====================================', userInfo);
  const dispatch = useDispatch()
  const [starCount, setStarCount] = useState(0);
  const [bookingdata, setBookingData] = useState([]);
  const [onGoingdata, setonGoingData] = useState([]);
  const [completeTask, setCompletedTaskData] = useState([]);
  const [loading, setLoading] = useState(false);
  let latitude = 0;
  let longitude = 0;

  useEffect(() => {
    getBooking();
    getOnGoing();
    getComplteTask();
    requestLocationPermission();
    return () => {
      if (watchID) {
        Geolocation.clearWatch(watchID);
      }
    };
  }, []);

  const requestLocationPermission = async () => {

    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      getOneTimeLocation();
      subscribeLocationLocation();
    } else {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: "<h2>Use Location?</h2> \
                    This app wants to change your device settings:<br/><br/>\
                    Use GPS for location<br/><br/>",
        ok: "YES",
        cancel: "NO"
      }).then(function (success) {
        console.log('success ',success);
        setLatlong();
      }.bind(this)
      ).catch((error) => {
        console.log(error.message);
      });

      DeviceEventEmitter.addListener('locationProviderStatusChange', function (status) { // only trigger when "providerListener" is enabled
        console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
        setLatlong();
      });
     
    }
  };

  const setLatlong = async () =>{
   
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //To Check, If Permission is granted
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        alert('Permission Denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const getOneTimeLocation = () => {
   
    Geolocation.getCurrentPosition(
      (position) => {
        // console.log('****Startup coordinates*********',position);
      
        const currentLongitude =
          JSON.stringify(position.coords.longitude);
        const currentLatitude =
          JSON.stringify(position.coords.latitude);
        longitude = currentLongitude;
        latitude = currentLatitude;
        sendLocationCoordinates()
      },
      (error) => {
        alert(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 1000
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        console.log('Location coordinates after change ***********',position);
        const currentLongitude =
          JSON.stringify(position.coords.longitude);
        const currentLatitude =
          JSON.stringify(position.coords.latitude);
        longitude = currentLongitude;
        latitude = currentLatitude;
        sendLocationCoordinates()
      },
      (error) => {
        alert(error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        distanceFilter: 10
      },
    );
  };

  const sendLocationCoordinates = () => {
    let dd = {}
    dd['latitude'] = latitude
    dd['longitude'] = longitude
    console.log('Current location from home', dd)
    dispatch(setStaffLocation(dd))
  }

  useEffect(() => {
    console.log('In Userinfo by Arshad ', userInfo);
    // setStarCount(userInfo.avgRatings == "" ? 0 : userInfo.avgRatings[0].aggregate)
  }, [userInfo])

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getBooking();
      getOnGoing();
      getComplteTask();
      sendLocationCoordinates()
      // setStarCount(userInfo.avgRatings == "" ? 0 : userInfo.avgRatings[0].aggregate)
    });
    return unsubscribe;
  }, [props.navigation]);
  // Api calling for newBookings
  function getBooking() {
    setLoading(true);
    let myForm = new FormData();
    myForm.append('business_id', Constants.businessid);
    console.log('parm booking~~~~~~~~~', myForm);
    Auth.PostCustomerTokenAuth(userInfo.token, userInfo.user_id, myForm, Constants.ApiAction.staffnewbookin, (res) => {
      console.log(' booking data--------', res);
      if (res[1].data == true) {
        setLoading(false);
        setBookingData(res[1].response);
        console.log('legth booking---', bookingdata.length)
      } else {
        setBookingData(res.data);
        setLoading(false);
      }
    });
  }
  // Api calling for onGoing
  function getOnGoing() {
    setLoading(true);
    let myForm = new FormData();
    myForm.append('business_id', Constants.businessid);
    console.log('parm onGoing~~~~~~~~~', myForm);
    Auth.PostCustomerTokenAuth(userInfo.token, userInfo.user_id, myForm, Constants.ApiAction.staffOnGoing, (res) => {
      console.log(' ongoing data--------', res);
      if (res[1].data == true) {
        setLoading(false);
        setonGoingData(res[1].response);
        console.log('legth ongoing---', onGoingdata.length)
      } else {
        setonGoingData(res.data);
        setLoading(false);
      }
    });
  }

  // Api calling for complteTask
  function getComplteTask() {
    setLoading(true);
    let myForm = new FormData();
    myForm.append('business_id', Constants.businessid);
    myForm.append('staff_id', userInfo.user_id);
    myForm.append('status', 'CO')
    console.log('parm complted~~~~~~~~~', myForm);
    Auth.PostCustomerTokenAuth(userInfo.token, userInfo.user_id, myForm, Constants.ApiAction.completTask, (res) => {
      console.log('complete data--------', res);
      if (res[1].data == true) {
        setLoading(false);
        setCompletedTaskData(res[1].response);
        console.log('legth complted---', completeTask.length)
      } else {
        setCompletedTaskData(res.data);
        setLoading(false);
      }
    });
  }

  const fnSearchEnable = () => {
    setEnableSearch(!enable);
    // console.log(enableSearch);
  };
  // searchbar
  const onChange = (e) => {
    setSearchTerm(e?.nativeEvent?.text);
    searchFilterFunction(e?.nativeEvent?.text);
  };
  const onSearchClear = () => {
    console.log('onSearchClear');
    setSearchTerm('');
    setEnableSearch(false);
  };

  // Task#1: Create onTabNavigate method and call on onPress
  const onTabNavigate = async (screenname, tabIndex) => {
    await AsyncStorage.setItem('goToTab', tabIndex);  // Set value in AsyncStorage
    navigation.navigate('My Bookings', { screen: 'TopTabs', params: { screen: screenname } });  // Proper do nested navigation
  }

  return (
    <View style={styles.mainHome}>
      <HeaderView
        header={true}
        back={false}
        search={false}
        notification={true}
        searchClick={false}
        onPressNoti={() => props.navigation.navigate('Notification')}
        headertext={'Home'}
      />
      <ScrollView style={{ flex: 1, }}>
        <View style={styles.topprofiledeatils}>
          <MySpinner size="large" visible={loading} />
          <View style={styles.profileimage}>
            <Image
              style={styles.imageStyle}
              source={{ uri: userImage }}
            />
          </View>
          <View style={{ margin: 12 }}>
            <View style={styles.topHorizontlView}>
              <Text style={styles.hollText}>{String.home.Helloword} </Text>
              <Text style={styles.userText}>{userInfo.full_name}</Text>
            </View>
            <View>
              <StarRating
                maxStars={5}
                rating={starCount}
                // selectedStar={(rating) => _onStarRatingPress(rating)}
                starSize={18}
                fullStarColor="#FFC300"
                emptyStarColor="#CECCCC"
                containerStyle={styles.rating}
                disabled={false}
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomMainprofile}>
          <ImageBackground
            imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
            source={require('../../assets/images/Homebg.png')}
            style={styles.bgimagehome}>
            <View style={{ padding: 20 }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="calendar" style={styles.icon}></Icon>
                <Text style={styles.dateTex}>  {moment().utcOffset('+05:30').format('DD MMM YYYY')}</Text>
              </View>

              <View style={{ marginTop: 20, marginBottom: 60 }}>
                <View style={styles.commonProfile}>
                  <TouchableOpacity style={styles.btnCard} onPress={() => onTabNavigate('NewBookingTab', '0')} >
                    {/* <TouchableOpacity style={styles.btnCard} onPress={()=> navigate('My Bookings', { names: ['NewBookingTab'] })}> */}
                    <View>
                      <Image
                        source={require('../../assets/images/NewBookings.png')}
                        style={styles.imageIcon}
                      />
                    </View>
                    <View style={styles.cardView}>
                      <View>
                        <Text style={styles.cardTextTitel}>
                          {String.home.Newbooking}{' '}
                        </Text>
                        <Text style={styles.cardSubTextTitle}>
                          {String.home.Describtion}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.bookingCount}>{bookingdata != null && bookingdata.length > 0 ? bookingdata.length : 0}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.commonProfile}>
                  <TouchableOpacity style={styles.btnCard} onPress={() => onTabNavigate('OngoingTab', '1')} >
                    <View>
                      <Image
                        source={require('../../assets/images/Ongoing.png')}
                        style={styles.imageIcon}
                      />
                    </View>
                    <View style={styles.cardView}>

                      <View>
                        <Text style={styles.cardTextTitel}>
                          {String.home.Ongoing}
                        </Text>
                        <Text style={styles.cardSubTextTitle}>
                          {String.home.Describtion}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.ongoingCount}> {onGoingdata != null && onGoingdata.length > 0 ? onGoingdata.length : 0} </Text>
                      </View>

                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.commonProfile}>
                  <TouchableOpacity style={styles.btnCard} onPress={() => onTabNavigate('CompletedTab', '2')} >
                    <View>
                      <Image
                        source={require('../../assets/images/TaskCompleted.png')}
                        style={styles.imageIcon}
                      />
                    </View>
                    <View style={styles.cardView}>

                      <View>
                        <Text style={styles.cardTextTitel}>
                          {String.home.TaskCompleted}
                        </Text>
                        <Text style={styles.cardSubTextTitle}>
                          {String.home.Describtion}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.completCount}> {completeTask != null && completeTask.length > 0 ? completeTask.length : 0} </Text>
                      </View>

                    </View>
                  </TouchableOpacity></View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </View >
  );
};
export default Home;
