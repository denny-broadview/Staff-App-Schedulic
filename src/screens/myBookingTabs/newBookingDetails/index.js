import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {String} from '../../../utlis/String';
import HeaderView from '../../../component/headerTab';
import Icon from 'react-native-vector-icons/AntDesign';
import IconCall from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {Auth, Constants} from '@global';
import {MySpinner} from '../../../component/MySpinner';
const NewBookingDetails = (props) => {
  const userInfo = useSelector((state) => state.user.user);
 
  const [loagind, setLoading] = useState(false);
 
  const [data, setData] = useState({});
  var currencyFormatter = require('currency-formatter');
  const currency = useSelector((state) => state.setting.setting.currency);
  const currencySymbolePosition = useSelector(
    (state) => state.setting.setting.currency_symbol_position,
  );
  const currencyFrm = useSelector(
    (state) => state.setting.setting.currency_format,
  );
  useEffect(() => {
    if (props.route.params !== null) {
      setData(props.route.params.datapass);
      console.log('item booking data-----------', props.route.params.datapass);
    }
    console.log('pic-----------', props.route.params.image);
  }, []);

   // Api calling for newBookings update satus
   function getStatus(st) {
    setLoading(true);
    let myForm = new FormData();
    myForm.append('order_item_id',data.id);
    myForm.append('staff_id',userInfo.user_id);
    myForm.append('order_status',st)
    console.log('parm booking status~~~~~~~~~', myForm);
    Auth.PostCustomerTokenAuth(
      userInfo.token,
      userInfo.user_id,
      myForm,
      Constants.ApiAction.status_update,
      (res) => {
        console.log(' booking data status--------', res);
        if (res[1].data == true) {
          setLoading(false);
          if(st == "R"){
            props.navigation.navigate('Home');
          }
          else if(st == "AC")
          props.navigation.navigate('OngoingTab');
        } else {
         
          setLoading(false);
        }
      },
    );
  }
  return (
    <View style={styles.container}>
      <HeaderView
        header={true}
        back={true}
        search={false}
        notification={true}
        searchClick={false}
        onPressNoti={() => props.navigation.navigate('Notification')}
        headertext={String.MyBookingTab.details}
        onPress={() => props.navigation.goBack()}
      />
      <ScrollView style={{flex: 1}}>
        <View style={{justifyContent: 'center', flex: 1}}>
        <MySpinner size="large" visible={loagind} />
          <View style={styles.mainView}>
            <View style={styles.topView}>
              <Text style={styles.textDate_time}>
                {String.MyBookingTab.date_time}
              </Text>
              <Text style={styles.textstatus}>{String.MyBookingTab.satus}</Text>
            </View>
            <View style={styles.topView_dis}>
              {/* <Text style={styles.textDate_dis}>{item.booking_date}</Text> */}
              <Text style={styles.textDate_dis}>
                {moment(data.booking_date).format('DD MMM YYYY')}
              </Text>
              <Text style={styles.textTime_dis}>{moment(data.booking_time, 'HH:mm:ss').format('LT')}</Text>
              {/* <Text style={styles.textstatus_dis}>{data.order_status}</Text> */}
              {data.order_status != null && data.order_status == 'CNF' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Confirm</Text>
                    </View>
                  ) : null}
                  {data.order_status != null && data.order_status == 'P' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Pending</Text>
                    </View>
                  ) : null}
                   {data.order_status != null && data.order_status == 'AC' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Accepted</Text>
                    </View>
                  ) : null}
                  {data.order_status != null && data.order_status == 'OW' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>On The Way</Text>
                    </View>
                  ) : null}
                   {data.order_status != null && data.order_status == 'WS' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Work Started</Text>
                    </View>
                  ) : null}
                  {data.order_status != null && data.order_status == 'C' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Canceled</Text>
                    </View>
                  ) : null}
                   {data.order_status != null && data.order_status == 'RSS' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Rescheduled By Staff</Text>
                    </View>
                  ) : null}
                   {data.order_status != null && data.order_status == 'RSA' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Rescheduled By Admin</Text>
                    </View>
                  ) : null}
                  {data.order_status != null && data.order_status == 'RSC' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Rescheduled By Client</Text>
                    </View>
                  ) : null}
                  {data.order_status != null && data.order_status == 'ITR' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Intrupted</Text>
                    </View>
                  ) : null}
                   {data.order_status != null && data.order_status == 'ITR' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Intrupted</Text>
                    </View>
                  ) : null}
                   {data.order_status != null && data.order_status == 'CC' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Cancel by Client</Text>
                    </View>
                  ) : null}
                  {data.order_status != null && data.order_status == 'CO' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Completed</Text>
                    </View>
                  ) : null}
            </View>
            <View style={styles.service_dis_book}>
              <Text style={styles.textBook_Time_dis}>
                Book on {moment(data.booking_date).format('DD MMM YYYY')}
              </Text>
            </View>
            <View style={styles.service_btn_mainview}>
              <View style={styles.service_dis}>
                <Text style={styles.textDate_time}>
                  {String.MyBookingTab.servicest}
                </Text>
                <Text style={styles.textTime_dis}>
                  {data.service == null ? null : data.service.service_name}
                </Text>
              </View>
            </View>

            <View style={styles.service_btn_mainview}>
              <View>
                <View style={styles.service_dis}>
                  <Text style={styles.textDate_time}>
                    {String.MyBookingTab.amount}
                  </Text>
                  {currencySymbolePosition == 'left' ? (
                    <Text style={styles.textTime_dis}>
                      {currencyFormatter.format(
                        data.total_cost,
                        {code: currency},
                       // {locale: currencyFrm},
                      )}
                    </Text>
                  ) : (
                    <Text style={styles.textTime_dis}>
                      {currencyFormatter.format(
                        data.total_cost,
                       // {locale: currencyFrm},
                        {code: currency},
                      )}
                    </Text>
                  )}
                </View>
                <View style={styles.service_customer}>
                  <Text style={styles.textDate_time}>
                    {String.MyBookingTab.customer}
                  </Text>
                  <Text style={styles.textTime_dis}>
                    {data.customer == null ? null : data.customer.fullname}
                  </Text>
                </View>
              </View>
              <View>
                <View style={styles.service_dis_btn}>
                  <TouchableOpacity
                    style={styles.btnViewAccept}
                    onPress={() =>getStatus("AC")}>
                    <Text style={styles.btnText}>
                      {String.MyBookingTab.accept}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.btnViewReject}>
                  <TouchableOpacity onPress={() =>getStatus("R")}>
                    <Text style={styles.btnText}>
                      {String.MyBookingTab.reject}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.mainView,styles.mainCustomerDetails]}>
            <Text style={styles.textBookingDetails}>
              {String.MyBookingTab.customer_detail}
            </Text>
            <View style={styles.imgView}>
              <View style={styles.courseImgView}>
                {/* {data.customer == null &&
                data.customer.image == undefined &&
                data.customer.image == null ? (
                  <Image
                    source={require('../../../assets/images/profile.jpg')}
                    style={styles.courseImg}
                  />
                ) : (
                  <Image
                    source={{uri:data.customer.image}}
                    style={styles.courseImg}
                  />
                )} */}
                <Image
                     //source={require('../../../assets/images/profile.jpg')}
                     source={{uri:props.route.params.image}}
                    style={styles.courseImg}
                  />
              </View>
              <View>
                <Text style={styles.dataname}>
                  {data.customer == null ? null : data.customer.fullname}
                </Text>
                <Text style={styles.datars}>
                  {data.customer == null ? null : data.customer.email}
                </Text>
              </View>
            </View>
            <View style={styles.call_View}>
              <IconCall name="md-call-sharp" style={styles.call_icon} />
              <Text style={styles.textCall}>
                {data.customer == null ? null : data.customer.phone}
              </Text>
            </View>

            {/* {data.service && data.service.servicesubType == 'at-home' ? (
              <View style={styles.address_View}>
                <Icon name="enviroment" style={styles.call_icon} />
                <Text style={styles.textAddress}>{data.customer.address}</Text>
              </View>
            ) : null} */}
           
              <View style={styles.address_View}>
                <Icon name="enviroment" style={styles.call_icon} />
                <Text style={styles.textAddress}>{data.customer !=null? data.customer.address:"Address not defiend"}</Text>
              </View>
           
          {data.status_notes !== null ? 
            <View style={styles.viewLine} />:null}
            {data.status_notes !== null ? (
              <View style={styles.note_View}>
                <Text style={styles.textNote}>{String.MyBookingTab.note}</Text>
                <Text style={styles.textAddress}>{data.status_notes}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default NewBookingDetails;
