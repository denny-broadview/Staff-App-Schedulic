import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {String} from '../../../utlis/String';
import {Auth, Constants} from '@global';
import {Color, Matrics} from '../../../utlis';
import {MySpinner} from '../../../component/MySpinner';
import { useSelector } from 'react-redux';
import moment from 'moment';
const NewBookingTab = (props) => {
  const userInfo = useSelector(state => state.user.user)
  const [data, setData] = useState([]);
  const [loagind, setLoading] = useState(false);
  const [timeSettingCancel, setTimeSettingCancel] = useState('');
  const [timeSettingReshedulic, setTimeSettingReshedulic] = useState('');
  useEffect(() => {
    getBooking();
  
  }, []);
  // Api calling for newBookings
  function getBooking() {
    setLoading(true);
    let myForm = new FormData();
    myForm.append('business_id',Constants.businessid);
    console.log('parm booking in newBookingpage~~~~~~~~~', myForm);
    Auth.PostCustomerTokenAuth(userInfo.token,userInfo.user_id,myForm, Constants.ApiAction.staffnewbookin, (res) => {
      console.log(' booking data--------', res);
      if (res[1].data == true) {
        setLoading(false);
        setData(res[1].response);
       
      } else {
        setData(res.data);
        setBookingData(false);
      }
    });
  }
  function noItemDisplay() {
    return (
      <View
        style={{flex: 1, alignSelf: 'center', marginTop: Matrics.Scale(50)}}>
        <Text style={{fontSize: 20, color: Color.AppColor}}>No data found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <View style={{justifyContent: 'center', flex: 1}}>
          <MySpinner size="large" visible={loagind} />
          <FlatList
            ListEmptyComponent={noItemDisplay}
            data={data}
            renderItem={({item, index}) => (
              <View style={styles.mainView}>
                <View style={styles.topView}>
                  <Text style={styles.textDate_time}>
                    {String.MyBookingTab.date_time}
                  </Text>
                  <Text style={styles.textstatus}>
                    {String.MyBookingTab.satus}
                  </Text>
                </View>
                <View style={styles.topView_dis}>
                  {/* <Text style={styles.textDate_dis}>{item.booking_date}</Text> */}
                  <Text style={styles.textDate_dis}>{moment(item.booking_date).format('DD MMM YYYY')}</Text>
                  <Text style={styles.textTime_dis}>{item.booking_time}</Text>
                  <Text style={styles.textstatus_dis}>{item.order_status}</Text>
                </View>
                <View style={styles.service_btn_mainview}>
                  <View style={styles.service_dis}>
                    <Text style={styles.textDate_time}>
                      {String.MyBookingTab.servicest}
                    </Text>
                    <Text style={styles.textTime_dis}>{item.service == null ? null:item.service.service_name}</Text>
                  </View>
                  <View style={styles.service_dis_btn}>
                    <TouchableOpacity style={styles.btnView} onPress={()=> props.navigation.navigate('NewBookingDetails',{ datapass: item,image: item.customer.image})}>
                      <Text style={styles.btnText}>
                        {String.MyBookingTab.details}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* <View style={styles.amount_view_dis}>
                  <Text style={styles.text_amount}>
                    {String.MyBookingTab.amount}
                  </Text>
                  <Text style={styles.text_staff}>
                    {String.MyBookingTab.staff}
                  </Text>
                </View>
                <View style={styles.amountView_dis}>
                  <Text style={styles.text_amount_dis}>150</Text>

                  <Text style={styles.textTime_dis}>okk</Text>
                </View> */}
                <View style={styles.service_btn_mainview}>
                  <View style={{marginLeft: 10}}>
                    <View style={styles.service_dis}>
                      <Text style={styles.textDate_time}>
                        {String.MyBookingTab.amount}
                      </Text>

                      <Text style={styles.textTime_dis}>{item.total_cost}</Text>
                    </View>
                    <View style={styles.service_customer}>
                      <Text style={styles.textDate_time}>
                        {String.MyBookingTab.customer}
                      </Text>
                      <Text style={styles.textTime_dis}>{item.customer == null ? null:item.customer.fullname}</Text>
                    </View>
                  </View>
                  <View>
                    <View style={styles.service_dis_btn}>
                      <TouchableOpacity style={styles.btnViewAccept} onPress={() => props.navigation.navigate('OngoingTab')}>
                        <Text style={styles.btnText}>
                          {String.MyBookingTab.accept}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.btnViewReject}>
                      <TouchableOpacity>
                        <Text style={styles.btnText}>
                          {String.MyBookingTab.reject}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}></FlatList>
        </View>
      </ScrollView>
    </View>
  );
};
export default NewBookingTab;
