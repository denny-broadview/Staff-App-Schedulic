import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import styles from './styles';
import {String} from '../../../utlis/String';
import HeaderView from '../../../component/headerTab';
import Icon from 'react-native-vector-icons/AntDesign';
import IconCall from 'react-native-vector-icons/Ionicons';
import TimeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import {useSelector} from 'react-redux';
import {Matrics, Color} from '../../../utlis';
const onGoingDetails = (props) => {
  const [timeSettingCancel, setTimeSettingCancel] = useState('');
  const [timeSettingReshedulic, setTimeSettingReshedulic] = useState('');
  const [modalReshedulVisible, setReshedulVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [onTheWayClieck, setOnTheWayClieck] = useState(true);
  const [workStarted, setWorkStarted] = useState(false);
  const [completedClick, setCompletedClick] = useState(false);
  const [note, setNote] = useState('');
  const [data, setData] = useState({});
  const maxDate = new Date(2040, 1, 1);
  const minDate = new Date();
  const [calenderClick, setcalenderClick] = useState();
  const [limit, setlimit] = useState('');
  const [finaldate, setFinalDate] = useState('');
  const [fdate, setfdate] = useState('');
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
      console.log('item ongoing-----------', props.route.params.datapass);
    }
    console.log(' ongoing pic-----------', props.route.params.image);
  }, []);
  function btnClick() {
    setOnTheWayClieck(false);
    setWorkStarted(true);
  }
  function btnworkStarted() {
    setCompletedClick(true);
    setWorkStarted(false);
    setOnTheWayClieck(false);
  }

  const _startFinal = (date) => {
    var firstDate = moment(date._d).format('YYYY-MM-DD');
    const startDate = date ? date.toString() : '';
    //day
    let setectDay = startDate.slice(0, 3);
    //day date
    let selectstartdate = startDate.slice(7, 10);
    //month
    let selectstartmonth = startDate.slice(3, 7);
    //year
    let selectstartyear = startDate.slice(10, 15);
  
    setlimit(startDate);
    setfdate(firstDate);
    setFinalDate(firstDate);
    setDateShow(setectDay + ',' + selectstartmonth + '' + selectstartdate);
    console.log('firstdate~~~~~~~~', firstDate);
  
  };

  function _onDateChange(date) {
    {
      calenderClick == true ? _startFinal(date) : null;
    }
  }

  function calenderview() {
    setModalVisible()
    return (
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableHighlight
              style={{...styles.closeButton}}
              onPress={() => {
                setModeltimeVisible(!modalVisible);
              }}>
              <Icon name="closecircle" style={styles.closeIcon} />
            </TouchableHighlight>
            <View>
              <Text style={styles.textSelectedTextDia}>
                {String.MyBookingTab.select_date}
              </Text>
            </View>
            <CalendarPicker
              textStyle={{
                color: Color.bleck,
                justifyContent: 'center',
                alignContent: 'center',
              }}
              weekdaysColor="#424DE4"
              weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
              previousTitle="<"
              nextTitle=">"
              onDateChange={_onDateChange}
              selectedDayColor="#424DE4"
              selectedDayTextColor="#FFFFFF"
              minDate={calenderClick == true ? minDate : limit}
              maxDate={maxDate}
             
            />
            <TouchableHighlight
              style={{
                ...styles.nextButton,
                backgroundColor: Color.AppColor,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>
                {String.MyBookingTab.next}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
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
            <View style={styles.topView}>
              <Text style={styles.textDate_time}>
                {String.MyBookingTab.date_time}
              </Text>
              <Text style={styles.textstatus}>{String.MyBookingTab.satus}</Text>
            </View>
            <View style={styles.topView_dis}>
             
              <Text style={styles.textDate_dis}>{moment(data.booking_date).format('DD MMM YYYY')}</Text>
              <Text style={styles.textTime_dis}>{data.booking_time}</Text>
              <Text style={styles.textstatus_dis}>{data.order_status}</Text>
            </View>
            <View style={styles.service_dis_book}>
              <Text style={styles.textBook_Time_dis}>
                Book on {moment(data.booking_date).format('DD MMM YYYY')}
              </Text>
            </View>
            <View style={styles.service_btn_mainview}>
              <View style={styles.service_dis}>
                <Text style={styles.textDate_time}>
                  {String.MyBookingTab.services}
                </Text>
                <Text style={styles.textTime_dis}>{data.service == null ? null : data.service.service_name}</Text>
              </View>
            </View>
            <View style={styles.service_btn_mainview}>
              <View style={{marginLeft: 10}}>
                <View style={styles.service_dis}>
                  <Text style={styles.textDate_time}>
                    {String.MyBookingTab.amount}
                  </Text>
                  {currencySymbolePosition == 'left' ? (
                    <Text style={styles.textTime_dis}>
                      {currencyFormatter.format(
                        data.total_cost,
                        {code: currency},
                        {locale: currencyFrm},
                      )}
                    </Text>
                  ) : (
                    <Text style={styles.textTime_dis}>
                      {currencyFormatter.format(
                        data.total_cost,
                        {locale: currencyFrm},
                        {code: currency},
                      )}
                    </Text>
                  )}
                 
                </View>
                <View style={styles.service_customer}>
                  <Text style={styles.textDate_time}>
                    {String.MyBookingTab.customer}
                  </Text>
                  <Text style={styles.textTime_dis}> {data.customer == null ? null : data.customer.fullname}</Text>
                </View>
              </View>
              <View style={styles.service_dis_btn}>
                {onTheWayClieck == false ? (
                  <TouchableOpacity
                    style={styles.btnViewWorkstarted}
                    onPress={() => btnworkStarted()}>
                    <Text style={styles.btnText}>
                      {String.MyBookingTab.workstarted}
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {completedClick == true ? (
                  <TouchableOpacity
                    style={styles.btnViewDetails}
                    onPress={() => props.navigation.navigate('Payment',{datapass: props.route.params.datapass,image:props.route.params.image})}>
                    <Text style={styles.btnText}>
                      {String.MyBookingTab.completed}
                    </Text>
                  </TouchableOpacity>
                ) : null}

                {onTheWayClieck == true ? (
                  <TouchableOpacity
                    style={styles.btnViewOntheWay}
                    onPress={() => btnClick()}>
                    <Text style={styles.btnText}>
                      {String.MyBookingTab.ontheway}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.btnViewMap}
                    onPress={() => props.navigation.navigate('MapScreen',{datapass: props.route.params.datapass,image:props.route.params.image})}>
                    <Text style={styles.btnText}>
                      {String.MyBookingTab.map}
                    </Text>
                  </TouchableOpacity>
                )}
                <View style={styles.btnViewReject}>
                  <TouchableOpacity
                    onPress={() =>  props.navigation.navigate('Reshedul',{datapass: props.route.params.datapass})}>
                    <Text style={styles.btnText}>
                      {String.MyBookingTab.reschedule}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        

          <View style={styles.mainView}>
            <Text style={styles.textBookingDetails}>
              {String.MyBookingTab.customer_detail}
            </Text>
            <View style={styles.imgView}>
              <View style={styles.courseImgView}>
                <Image
                  source={{uri:props.route.params.image}}
                  style={styles.courseImg}
                />
              </View>
              <View>
                <Text style={styles.dataname}>{data.customer == null ? null : data.customer.fullname}</Text>
                <Text style={styles.datars}>{data.customer == null ? null : data.customer.email}</Text>
              </View>
            </View>
            <View style={styles.call_View}>
              <IconCall name="md-call-sharp" style={styles.call_icon} />
              <Text style={styles.textCall}>{data.customer == null ? null : data.customer.phone}</Text>
            </View>
            {data.service && data.service.servicesubType == 'at-home' ? (

            <View style={styles.address_View}>
              <Icon name="enviroment" style={styles.call_icon} />
              <Text style={styles.textAddress}>jsgsg</Text>
            </View>):null}
            <View style={styles.viewLine} />
            {data.status_notes !== null ? (

            <View style={styles.note_View}>
              <Text style={styles.textNote}>{String.MyBookingTab.note}</Text>
              <Text style={styles.textAddress}>{data.status_notes}</Text>
            </View>):null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default onGoingDetails;
