import React, {useEffect, useState} from 'react';
import {View, Text, Image, ImageBackground, ScrollView,TouchableOpacity} from 'react-native';
import StarRating from 'react-native-star-rating';
import styles from './style';
import Icon from 'react-native-vector-icons/Entypo';
import {String} from '../../utlis/String';
import HeaderView from '../../component/headerTab';
import {MySpinner} from '../../component/MySpinner';
import {Auth, Constants} from '@global';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
const Home = ({ navigation: { navigate } }) => {
  const navigation = useNavigation()
  const userImage = useSelector(state => state.user.userImage)
  const userInfo = useSelector(state => state.user.user)
  // console.log('userInfo====================================',userInfo);
  const [starCount, setStarCount] = useState(0);
  const [bookingdata,setBookingData]= useState([]);
  const [onGoingdata,setonGoingData]=useState([]);
  const [completeTask,setCompletedTaskData] = useState([]);
  const [loagind, setLoading] = useState(false);
  useEffect(() => {
    getBooking();
    getOnGoing();
    getComplteTask();
    // setStarCount(userInfo.avgRatings == "" ? 0 : userInfo.avgRatings[0].aggregate)
  }, []);

   // Api calling for newBookings
   function getBooking() {
    setLoading(true);
    let myForm = new FormData();
    myForm.append('business_id',Constants.businessid);
    console.log('parm booking~~~~~~~~~', myForm);
    Auth.PostCustomerTokenAuth(userInfo.token,userInfo.user_id,myForm, Constants.ApiAction.staffnewbookin, (res) => {
      console.log(' booking data--------', res);
      if (res[1].data == true) {
        setLoading(false);
        setBookingData(res[1].response);
        console.log('legth booking---',bookingdata.length)
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
      myForm.append('business_id',Constants.businessid);
      console.log('parm onGoing~~~~~~~~~', myForm);
      Auth.PostCustomerTokenAuth(userInfo.token,userInfo.user_id,myForm, Constants.ApiAction.staffOnGoing, (res) => {
        console.log(' ongoing data--------', res);
        if (res[1].data == true) {
          setLoading(false);
          setonGoingData(res[1].response);
          console.log('legth ongoing---',onGoingdata.length)
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
      myForm.append('business_id',Constants.businessid);
      myForm.append('staff_id',userInfo.user_id);
      myForm.append('status','CO')
      console.log('parm complted~~~~~~~~~', myForm);
      Auth.PostCustomerTokenAuth(userInfo.token,userInfo.user_id,myForm, Constants.ApiAction.completTask, (res) => {
        console.log('complete data--------', res);
        if (res[1].data == true) {
          setLoading(false);
          setCompletedTaskData(res[1].response);
          console.log('legth complted---',completeTask.length)
        } else {
          setCompletedTaskData(res.data);
          setLoading(false);
        }
      });
    }
  const _onStarRatingPress = (rating) => {
    setStarCount(rating);
  };
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
      <ScrollView style={{flex: 1,}}>
        <View style={styles.topprofiledeatils}>
        <MySpinner size="large" visible={loagind} />
          <View style={styles.profileimage}>
            <Image
              style={styles.imageStyle}
              source={{ uri:userImage }}
            />
          </View>
          <View style={{margin: 12}}>
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
            imageStyle={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}
            source={require('../../assets/images/Homebg.png')}
            style={styles.bgimagehome}>
            <View style={{padding: 20}}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="calendar" style={styles.icon}></Icon>
                <Text style={styles.dateTex}>  {moment().utcOffset('+05:30').format('DD MMM YYYY')}</Text>
              </View>

              <View style={{marginTop: 20,marginBottom:60}}>
                <View style={styles.commonProfile}>
                <TouchableOpacity style={styles.btnCard} onPress={()=> navigation.navigate('My Bookings',{screen:'NewBookingTab'})}>
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
                      <Text style={styles.bookingCount}>{bookingdata !=null && bookingdata.length > 0 ? bookingdata.length:0}</Text>
                    </View>
                  </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.commonProfile}>
                <TouchableOpacity style={styles.btnCard} onPress={() => navigation.navigate('My Bookings',{screen:'OngoingTab'})}>
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
                      <Text style={styles.ongoingCount}> {onGoingdata !=null && onGoingdata.length > 0 ? onGoingdata.length:0} </Text>
                    </View>
                  
                  </View>  
                  </TouchableOpacity>
                </View>
               <View style={styles.commonProfile}>
                <TouchableOpacity style={styles.btnCard} onPress={() => navigation.navigate('My Bookings',{screen:'CompletedTab'})}>
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
                      <Text style={styles.completCount}> {completeTask !=null && completeTask.length > 0 ? completeTask.length : 0} </Text>
                    </View>
                   
                  </View>
                </TouchableOpacity></View> 
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
};
export default Home;
