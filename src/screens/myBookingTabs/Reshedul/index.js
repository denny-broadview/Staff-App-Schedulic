import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  ScrollView,
  TextInput,
  FlatList,
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
import {Auth, Constants} from '@global';
import {MySpinner} from '../../../component/MySpinner';
const Reshedul = (props) => {
  const userInfo = useSelector((state) => state.user.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTimeVisible, setModeltimeVisible] = useState(false);

  const [note, setNote] = useState('');
  const [data, setData] = useState({});
  const [datatime, setDataTime] = useState([]);
  const minDate = new Date();
  const [startDate, setStartDate] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  let [hourss, setHours] = useState('');
  const [calenderClick, setcalenderClick] = useState();
  const [limit, setlimit] = useState('');
  const [finaldate, setFinalDate] = useState('');
  const [fdate, setfdate] = useState('');
  const [dateshow, setDateShow] = useState('');

  const [offdayindex, setOffDayIndex] = useState('');
  const [temp, setTemp] = useState([]);
  const [holidayData, setHolidayData] = useState([]);
  const [OffdaySaveData, setOffdaySaveData] = useState([]);
  const [offData, setOffdata] = useState([]);
  const [loagind, setLoading] = useState(false);
  const [selectTime, setselectTime] = useState('');
  let [curTime, setCurTime] = useState('');
  const [selected, setSelected] = useState('');
  var month;
  var year;
  let dates;
  const maxBookingRes = useSelector(
    (state) => state.setting.setting.max_advance_booking_time,
  );
  useEffect(() => {
    if (props.route.params !== null) {
      setData(props.route.params.datapass);
      console.log('item ongoing  re-----------', props.route.params.datapass);
    }

    getHoliday();
    offdays(offdayindex);
    dates = new Date().getDate(); //Current Date
    month = new Date().getMonth() + 1; //Current Month
    year = new Date().getFullYear(); //Current Year
    var date = moment().utcOffset('+05:30').format('DD-MM-YYYY');
    setCurTime(dates + '/' + month + '/' + year);
  }, []);

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
    setStartDate(selectstartdate);
    setStartMonth(selectstartmonth);
    setStartYear(selectstartyear);
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

  //holiday
  function addDays(dates, hourss) {
    const result = new Date(dates);
    result.setDate(result.getDate() + hourss);
    return result;
  }

  // calender show to offday ex. adminside 0 means sunday and 1 means monday etc...
  function offdays(offdayindex) {
    var datess = moment().utcOffset('+05:30').format('YYYY-MM-DD');
    var start = moment(datess), // ex Sept. 1st
      end = moment(addDays(new Date(), hourss)), // ex Nov. 2nd
      day = offdayindex; // Sunday

    var result = [];
    var current = start.clone();

    while (current.day(7 + day).isBefore(end)) {
      result.push(current.clone());
    }
    setOffdaySaveData(result.map((m) => m.format('YYYY-MM-DD')));
    holidayData.push(...OffdaySaveData);
    setTemp(holidayData);
  }

  function timeConvert(maxBookingRes) {
    var num = maxBookingRes;
    var hours = num / 1440;
    var rhours = Math.floor(hours);
    setHours(rhours);
    return num + ' minutes = ' + rhours + ' hour(s) and ';
  }
  
  // api call holiday and Offday
  function getHoliday() {
    setLoading(true);
    let myForm = new FormData();
    myForm.append('business_id', Constants.businessid);
    console.log('holiday parm----', myForm);
    Auth.PostServiceAuth(myForm, Constants.ApiAction.listHoliday, (res) => {
      if (res[1].data == true) {
        setLoading(false);
        console.log('holiday api call--------', res);
        timeConvert(maxBookingRes);

        setHolidayData(res[1].response.holidays);
        setOffdata(res[1].response.offday[0]);

        setOffDayIndex(res[1].response.offday[0]);
        offdays(res[1].response.offday[0]);
        offdays(offdayindex);
      } else {
        setLoading(false);
        setHolidayData(res.data);
      }
    });
  }

  function timeListClick() {
    if (startDate == '' && startMonth == '' && startYear == '') {
      Auth.ToastMessage(String.MyBookingTab.error_message_select_startdate);
    } else {
      setModeltimeVisible(true);
      setcalenderClick(true);
      getTimeList();
    }
  }

  // api calling Timelist
  function getTimeList() {
    setLoading(true);
    let myForm = new FormData();
    myForm.append('business_id', Constants.businessid);
    myForm.append('selected_date', finaldate);
    myForm.append('api_type', 'app');
    console.log('time sloat parm------', myForm);
    Auth.PostServiceAuth(myForm, Constants.ApiAction.getListTiming, (res) => {
      if (res[1].data == true) {
        console.log('time res----', res);
        setLoading(false);
        setDataTime(res[1].response);
      } else {
        setLoading(false);
        setDataTime(res.data);
      }
    });
  }

  //reshedul order Apicalling
  function reshedul(sDate, sTime) {
    setLoading(true);
    let myForm = new FormData();
    myForm.append('order_item_id', props.route.params.datapass.id);
    myForm.append('staff_id', userInfo.user_id);
    myForm.append('book_date', sDate);
    myForm.append('book_time', sTime);
    myForm.append('book_notes', note);
    console.log(' parm reshedul--------', myForm);
    Auth.PostCustomerTokenAuth(
      userInfo.token,
      userInfo.user_id,
      myForm,
      Constants.ApiAction.resedule,
      (res) => {
        console.log(' Reshedu--------', res);
        if (res[1].data == true) {
          setLoading(false);
          props.navigation.navigate('NewBookingTab');
          setselectTime('');
          setStartDate('');
          setStartMonth('');
          setStartYear('');
          setSelectStaffName('');
          setSelectStaffId('');
          setStaffShow(false);
          // setData(res[1].response);
        } else {
          setLoading(false);
          ToastMessage();
        }
      },
    );
  }
  function staffList(time, index) {
    setselectTime(time);
    setSelected(index);
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
      <HeaderView
        header={true}
        back={true}
        search={false}
        notification={true}
        searchClick={false}
        onPressNoti={() => props.navigation.navigate('Notification')}
        headertext={String.MyBookingTab.reschedule}
        onPress={() => props.navigation.goBack()}
      />
      <ScrollView style={{flex: 1}}>
        <View style={styles.mainView}>
          <MySpinner size="large" visible={loagind} />
          <Text style={styles.textDesDialog}>
            Work can&apos;t be completed due to some{'\n'}resone
          </Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View>
              <Text style={styles.textService}>
                {String.MyBookingTab.services}
              </Text>
            </View>
            <View>
              <Text style={styles.servicenametext}>
                {data.service == null ? null : data.service.service_name}
              </Text>
            </View>
          </View>
          <View style={styles.priseView}>
            <View style={styles.textseledat_tim}>
              <Text style={styles.topTitle}>
                {String.MyBookingTab.select_date}
              </Text>
            </View>
            <View style={styles.textseledat_tim}>
              <Text style={styles.topTitle}>
                {String.MyBookingTab.select_time}
              </Text>
            </View>
          </View>
          <View style={styles.priseView}>
            <View>
              <TouchableOpacity
                style={styles.menuView}
                onPress={() => {
                  setModalVisible(true), setcalenderClick(true),getHoliday();
                  offdays(offdayindex);
                }}>
                <Icon name="calendar" style={styles.timeDateIcon} />

                {startDate == '' && startMonth == '' ? (
                  <Text style={styles.textDate}>Select Date</Text>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <Text style={styles.textDate}>{startDate}</Text>
                    <Text style={styles.textDate}>{startMonth}</Text>
                    <Text style={styles.textDate}>{startYear}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.menuView}
                onPress={() => timeListClick()}>
                <TimeIcon
                  name="clock-time-ten-outline"
                  style={styles.timeDateIcon}
                />
                {selectTime == '' ? (
                  <Text style={styles.textDate}>
                    {String.MyBookingTab.select_time}
                  </Text>
                ) : (
                  <Text style={styles.textDate}>{selectTime}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          {/* time dialog */}
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalTimeVisible}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableHighlight
                    style={{...styles.closeButton}}
                    onPress={() => {
                      setModeltimeVisible(!modalTimeVisible);
                    }}>
                    <Icon name="closecircle" style={styles.closeIcon} />
                  </TouchableHighlight>
                  <View>
                    <Text style={styles.textSelectedTextDia}>
                      {String.MyBookingTab.select_time}
                    </Text>
                  </View>
                  <Text style={styles.textdateshow}>{dateshow}</Text>
                  <View style={styles.fltList}>
                    <FlatList
                      //keyExtractor={(item) => item.id.toString()}
                      ListEmptyComponent={noItemDisplay}
                      data={datatime}
                      numColumns={3}
                      renderItem={({item, index}) => (
                        <TouchableOpacity
                          style={[
                            styles.listManu,
                            {
                              backgroundColor:
                                selected == index
                                  ? Color.AppColor
                                  : Color.white,
                            },
                          ]}
                          onPress={() => staffList(item.value, index)}>
                          <Text
                            style={[
                              styles.textListData,
                              {
                                color:
                                  selected == index ? Color.white : Color.bleck,
                              },
                            ]}>
                            {item.value}
                          </Text>
                        </TouchableOpacity>
                      )}></FlatList>
                  </View>
                  <TouchableHighlight
                    style={{
                      ...styles.confirmButton,
                      backgroundColor: Color.AppColor,
                    }}
                    onPress={() => {
                      setModeltimeVisible(!modalTimeVisible);
                    }}>
                    <Text style={styles.textStyle}>
                      {String.MyBookingTab.confirm}
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
          {/* Calender dialog */}

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
                      setModalVisible(!modalVisible);
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
                    weekdaysColor={Color.AppColor}
                    weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
                    previousTitle="<"
                    nextTitle=">"
                    onDateChange={_onDateChange}
                    selectedDayColor={Color.AppColor}
                    selectedDayTextColor="#FFFFFF"
                    minDate={calenderClick == true ? minDate : limit}
                    maxDate={addDays(new Date(), hourss)}
                    disabledDates={temp}
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
          <Text style={styles.addnoteText}>{String.MyBookingTab.addnote}</Text>
          <View style={styles.inputBordeNote}>
            <TextInput
              style={styles.textCodeAddress}
              onChangeText={(text) => {
                setNote(text);
              }}
              placeholder={String.MyBookingTab.addnote}
              numberOfLines={5}
              multiline={true}
              keyboardType="default"
            />
          </View>
          <TouchableHighlight
            style={styles.nextButton}
            onPress={() => {
              selectTime == '' && finaldate == '' && note == ''
                ? Auth.ToastMessage(
                    String.loginmain.error_message_allFieldsManatory,
                  )
                : reshedul(finaldate, selectTime);
            }}>
            <Text style={styles.textBtnStyle}>
              {String.MyBookingTab.reschedule}
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
};
export default Reshedul;
