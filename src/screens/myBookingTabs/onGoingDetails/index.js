import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import styles from './styles';
import {String} from '../../../utlis/String';
import HeaderView from '../../../component/headerTab';
import Icon from 'react-native-vector-icons/AntDesign';
import IconCall from 'react-native-vector-icons/Ionicons';
import {MySpinner} from '../../../component/MySpinner';
import moment from 'moment';
import {Auth, Constants} from '@global';
import {useSelector} from 'react-redux';
import Snackbar from 'react-native-snackbar';
const onGoingDetails = (props) => {
  const userInfo = useSelector((state) => state.user.user);
  const [onTheWayClieck, setOnTheWayClieck] = useState(true);
  const [workStarted, setWorkStarted] = useState(false);
  const [completedClick, setCompletedClick] = useState(false);
  const [note, setNote] = useState('');
  const [data, setData] = useState({});
  const [loagind, setLoading] = useState(false);
  //time
  const [curTime, setCurTime] = useState('');
  var timeconvert;
  var currencyFormatter = require('currency-formatter');
  const currency = useSelector((state) => state.setting.setting.currency);
  const currencySymbolePosition = useSelector(
    (state) => state.setting.setting.currency_symbol_position,
  );
  const currencyFrm = useSelector(
    (state) => state.setting.setting.currency_format,
  );

  const settingreshedultime = useSelector(
    (state) => state.setting.setting.min_reseduling_time,
  );
  const currenttime = moment()
    .utcOffset('+05:30')
    .format('YYYY-MM-DD HH:mm:ss');
  const currentdate = moment().utcOffset('+05:30').format('YYYY-MM-DD');
  const crtime = moment().utcOffset('+05:30').format('HH:mm:ss');
  console.log('CurrentData~~~~~~~~~~~', currentdate);
  console.log('currentTime~~~~~~~~', crtime);
  console.log('currentdate time------------', currenttime);
  console.log('settingReshedultime-----', settingreshedultime);
  useEffect(() => {
    time_convert();
    if (props.route.params !== null) {
      setData(props.route.params.datapass);
      console.log('item ongoing-----------', props.route.params.datapass);
    }
    console.log(' ongoing pic-----------', props.route.params.image);
  }, []);

  // calculetion of booking statuswise
  function bookingtimecurrenttime(val1, val2) {
    var startTime = moment(val2, 'HH:mm:ss');
    var endTime = moment(val1, 'HH:mm:ss');
    var duration = moment.duration(endTime.diff(startTime));
    // duration in hours
    var hours = parseInt(duration.asHours());
    var minutes = parseInt(duration.asMinutes()) % 60;

    console.log('current time~~~~~~~~~~~~~~', val1);
    console.log('booking time~~~~~~~~~~~~~~', val2);
   
    console.log('diff========', minutes + hours * 60);

    return minutes + hours * 60;
  }

  function covertDateTime(val1, val2) {
    var str = val1 + ' ' + val2;
    const bDate = moment(str, 'YYYY-MM-DD HH:mm:ss');
    return bDate;
  }
  function time_convert() {
    const num = settingreshedultime;

    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    var seconds = Math.floor(num * 60 - hours * 3600 - minutes * 60);

    timeconvert = hours + ':' + minutes + ':' + seconds;
    const bDate1 = moment(timeconvert).format('HH:mm:ss');
    console.log('timeconvert-----------', timeconvert);
    console.log('second-----------', seconds);
    return hours + ':' + minutes;
  }

  // Api calling for newBookings
  function getStatus(st) {
    console.log('usertoken----', userInfo.token);
    setLoading(true);
    let myForm = new FormData();
    myForm.append('order_item_id', data.id);
    myForm.append('staff_id', userInfo.user_id);
    myForm.append('order_status', st);
    console.log('parm ongoing status~~~~~~~~~', myForm);
    Auth.PostCustomerTokenAuth(
      userInfo.token,
      userInfo.user_id,
      myForm,
      Constants.ApiAction.status_update,
      (res) => {
        console.log(' ongoing data status--------', res);
        if (res[1].data == true) {
          setLoading(false);
          setTimeout(() => {
            Snackbar.show({
              text: 'Appointment Updated',
              duration: Snackbar.LENGTH_SHORT
            });
            props.navigation.navigate('OngoingTab');
        }, 1000);
          
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
          <View style={styles.mainView}>
            <MySpinner size="large" visible={loagind} />
            <View style={styles.topView}>
              <Text style={styles.textDate_time}>
                {String.MyBookingTab.date_time}
              </Text>
              <Text style={styles.textstatus}>{String.MyBookingTab.satus}</Text>
            </View>
            <View style={styles.topView_dis}>
              <Text style={styles.textDate_dis}>
                {moment(data.booking_date).format('DD MMM YYYY')}
              </Text>
              <Text style={styles.textTime_dis}>{moment(data.booking_time, 'HH:mm:ss').format('LT')}</Text>
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
                  {String.cashpaymant.service}
                </Text>
                <Text style={styles.textTime_dis}>
                  {data.service == null ? null : data.service.service_name}
                </Text>
              </View>
            </View>
            <View style={styles.service_btn_mainview}>
              <View style={{marginLeft: 5}}>
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
                      //  {locale: currencyFrm},
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
              <View style={styles.service_dis_btn}>
                {data.order_status == 'OW' &&
                data.booking_date == currentdate &&
                bookingtimecurrenttime(crtime, data.booking_time) < 30 ? (
                  <TouchableOpacity
                    style={styles.btnViewWorkstarted}
                    onPress={() => getStatus('WS')}>
                    <Text style={styles.btnText}>
                      {String.MyBookingTab.workstarted}
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {data.order_status == 'WS' && data.payment != null ? (
                  <TouchableOpacity
                    style={styles.btnViewDetails}
                    onPress={() => {
                      getStatus('CO'),
                        props.navigation.navigate('Payment', {
                          datapass: props.route.params.datapass,
                          image: props.route.params.image,
                        });
                    }}>
                    <Text style={styles.btnText}>
                      {String.MyBookingTab.completed}
                    </Text>
                  </TouchableOpacity>
                ) : null}

                {data.order_status == 'AC' 
                // &&
                // data.booking_date == currentdate &&
                // bookingtimecurrenttime(crtime, data.booking_time) < 60 
                ? (
                  <TouchableOpacity
                    style={styles.btnViewOntheWay}
                    onPress={() => getStatus('OW')}>
                    <Text style={styles.btnText}>
                      {String.MyBookingTab.ontheway}
                    </Text>
                  </TouchableOpacity>
                 ) : null}
                {data.order_status == 'OW' &&
                data.service.service_sub_type == 'at_home' ? (
                  <TouchableOpacity
                    style={styles.btnViewMap}
                    onPress={() =>
                      props.navigation.navigate('MapScreen', {
                        datapass: props.route.params.datapass,
                        image: props.route.params.image,
                      })
                    }>
                    <Text style={styles.btnText}>
                      {String.MyBookingTab.map}
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {covertDateTime(data.booking_date, data.booking_time).diff(
                  curTime,
                ) >= timeconvert ? (
                  <View style={styles.btnViewReject}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('Reshedul', {
                          datapass: props.route.params.datapass,
                        })
                      }>
                      <Text style={styles.btnText}>
                        {String.MyBookingTab.reschedule}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
          <View style={[styles.mainView,styles.mainCustomerDetails]}>
            <Text style={styles.textBookingDetails}>
              {String.MyBookingTab.customer_detail}
            </Text>
            <View style={styles.imgView}>
              <View style={styles.courseImgView}>
                <Image
                  source={{uri: props.route.params.image}}
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
                <Text style={styles.textAddress}>jsgsg</Text>
              </View>
            ) : null} */}
            <View style={styles.address_View}>
                <Icon name="enviroment" style={styles.call_icon} />
                <Text style={styles.textAddress}>{data.customer !=null ? data.customer.address:"Address not defiend"}</Text>
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
export default onGoingDetails;
