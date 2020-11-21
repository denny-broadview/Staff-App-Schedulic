import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import styles from './style';
import {String} from '../../../utils/String';

import Icon from 'react-native-vector-icons/AntDesign';



const ongoing = (props) => {
  const [data, setData] = useState([]);
  const [loagind, setLoading] = useState(false);
  const [timeSettingCancel,setTimeSettingCancel] = useState('');
  const [timeSettingReshedulic,setTimeSettingReshedulic] = useState('');

  const [curTime ,setCurTime] = useState('');
  useEffect(() => {
    
   


  }, []);
  

  
  function noItemDisplay() {
    return (
      <View
        style={{flex: 1, alignSelf: 'center', marginTop: Matrics.Scale(50)}}>
        <Text style={{fontSize: 20, color: Color.AppColor}}>No data found</Text>
      </View>
    );
  }



  // cancel time
  function timeConvert(timeSettingCancel) {
    var num = timeSettingCancel;
    console.log('timeg cancel--------',num)
    var hours = (num / 3600) ;
    var rhours = Math.floor(hours);
    console.log('time hr--------',rhours)
    return num + " minutes = " + rhours + " hour(s)";
    
    }
 // reshedulic time   

 function timeConvertReshedulic(timeSettingReshedulic) {
  var num = timeSettingReshedulic;
  console.log('time reshedulic--------',num)
  var hours = (num / 3600) ;
  var rhours = Math.floor(hours);
  console.log('time hr res--------',rhours)
  return num + " minutes = " + rhours + " hour(s) and ";
  
  }

function time_convert(timeSettingCancel)
 { 
   var num = timeSettingCancel;
  // const startDate = num ? num.toString() : '';
  // let settime = startDate.slice(0, 2);
 // console.log('timegbgb--------',settime)
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  console.log('min-------',minutes)
  return hours + ":" + minutes;         
}
function covertDateTime(val1,val2){
  var str=val1+' '+val2;
  const bDate=moment(str,'YYYY-MM-DD hh:mm:ss')
  return bDate;
}
    
  return (
    <View style={styles.container}>
      {/* <HeaderView  tstyle={styles.header}header={true} map={false} search={true} notification={true} onPressNoti={() => props.navigation.replace('Notification')} headertext={String.MyBookingTab.myBooking}/> */}
      <ScrollView style={{flex: 1}}>
        <View style={{justifyContent: 'center', flex: 1}}>
      
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
                  <Text style={styles.textDate_dis}>{item.booking_date}</Text>
                  <Text style={styles.textTime_dis}>{item.booking_time}</Text>
                  <Text style={styles.textstatus_dis}>{item.order_status}</Text>
                </View>
                <View style={styles.service_btn_mainview}>
                  <View style={styles.service_dis}>
                    <Text style={styles.textDate_time}>
                      {String.MyBookingTab.services}
                    </Text>
                    <Text style={styles.textTime_dis}>
                      {item.service.service_name}
                    </Text>
                  </View>
                  <View style={styles.service_dis_btn}>
                    <TouchableOpacity
                      style={styles.btnView}
                      onPress={() =>
                        props.navigation.navigate('MyBookingsTabDetails', {
                          booking_date: item.booking_date,
                          booking_time: item.booking_time,
                          order_status: item.order_status,
                          total_cost: item.total_cost,
                          created_at: item.created_at,
                          firstname: item.staff.firstname,
                          email: item.customer.email,
                          fullname: item.customer.fullname,
                          phone: item.customer.phone,
                          address: item.customer.address,
                          state: item.customer.state,
                          city: item.customer.city,
                          image: item.customer.image,
                          booking_notes: item.customer.booking_notes,
                          service_name: item.service.service_name,
                        })
                      }>
                      <Text style={styles.btnText}>
                        {String.MyBookingTab.details}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnView_pay}
                      onPress={() => props.navigation.navigate('Payment',{total_cost: item.total_cost})
                      }>
                      <Text style={styles.btnText}>
                        {String.MyBookingTab.pay}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.amount_view_dis}>
                  <Text style={styles.text_amount}>
                    {String.MyBookingTab.amount}
                  </Text>
                  <Text style={styles.text_staff}>
                    {String.MyBookingTab.staff}
                  </Text>
                </View>
                <View style={styles.amountView_dis}>
                  <Text style={styles.text_amount_dis}>
                    {'\u20B9'}
                    {item.total_cost}
                  </Text>
                  <Text style={styles.textTime_dis}>
                    {item.customer.fullname}
                  </Text>
                </View>
                <View style={styles.can_reschedulic_View}>
                 
        { 
        covertDateTime (item.booking_date,item.booking_time).diff(curTime) >= time_convert(timeSettingCancel)
          ?
                  <TouchableOpacity
                    style={styles.can_reschedulic_View}
                    onPress={() =>
                     // props.navigation.navigate('CancelAppointmant',{order_id:ite})
                      props.navigation.navigate('CancelAppointmant', {id:item.id})
                    }>
                    <Icon name="closecircle" style={styles.inc_dec_icon}></Icon>
                    <Text style={styles.textcancel}>
                      {String.MyBookingTab.cancel}
                    </Text>
                  </TouchableOpacity>:null}
                  <TouchableOpacity
                    style={styles.reschedulic_View}
                    onPress={() => props.navigation.navigate('AddServices')}>
                    <Icon name="clockcircle" style={styles.time_icon}></Icon>
                    <Text style={styles.text_reschedule}>
                      {String.MyBookingTab.reschedule}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}></FlatList>
        </View>
      </ScrollView>
      {/* <TouchableOpacity style={styles.btnPhone} onPress={() => props.navigation.replace('MyCart')}>
             <Image source={require('../../../assets/images/cart.png')}
                    style={styles.iconbell}/>
    </TouchableOpacity> */}
    </View>
  );
};
export default ongoing;
