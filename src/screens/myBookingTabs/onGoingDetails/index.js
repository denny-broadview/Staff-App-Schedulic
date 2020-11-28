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
import {Color, Matrics} from '../../../utlis';
import moment from 'moment';

const onGoingDetails = (props) => {
  const [timeSettingCancel, setTimeSettingCancel] = useState('');
  const [timeSettingReshedulic, setTimeSettingReshedulic] = useState('');
  const [modalReshedulVisible, setReshedulVisible] = useState(false);
  const [onTheWayClieck, setOnTheWayClieck] = useState(true);
  const [workStarted, setWorkStarted] = useState(false);
  const [completedClick, setCompletedClick] = useState(false);
  const [note, setNote] = useState('');
  const [data, setData] = useState({});
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

  return (
    <View style={styles.container}>
      <HeaderView
        header={true}
        back={true}
        search={false}
        notification={true}
        searchClick={false}
        onPressNoti={() => props.navigation.navigate('Home')}
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
              {/* <Text style={styles.textDate_dis}>{item.booking_date}</Text> */}
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
                  <Text style={styles.textTime_dis}>{data.total_cost}</Text>
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
                    onPress={() => props.navigation.navigate('Payment')}>
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
                    onPress={() => props.navigation.navigate('MapScreen')}>
                    <Text style={styles.btnText}>
                      {String.MyBookingTab.map}
                    </Text>
                  </TouchableOpacity>
                )}
                <View style={styles.btnViewReject}>
                  <TouchableOpacity
                    onPress={() => {
                      setReshedulVisible(true);
                    }}>
                    <Text style={styles.btnText}>
                      {String.MyBookingTab.reschedule}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          {/* Reshedulic click open dialog*/}
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalReshedulVisible}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Text style={styles.textSelectedTextDia}>
                        {String.MyBookingTab.reschedule}
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                          setReshedulVisible(!modalReshedulVisible);
                        }}>
                        <Icon name="closecircle" style={styles.closeIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>
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
                      <Text style={styles.servicenametext}> Haircut</Text>
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
                        onPress={() => {}}>
                        <Icon name="calendar" style={styles.timeDateIcon} />
                        <Text style={styles.textDate}>Select Date</Text>
                        {/* {startDate == '' && startMonth == '' ? (
                            <Text style={styles.textDate}>Select Date</Text>
                          ) : (
                            <View style={{flexDirection: 'row'}}>
                              <Text style={styles.textDate}>{startDate}</Text>
                              <Text style={styles.textDate}>{startMonth}</Text>
                              <Text style={styles.textDate}>{startYear}</Text>
                            </View>
                          )} */}
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={styles.menuView}
                        onPress={() => {}}>
                        <TimeIcon
                          name="clock-time-ten-outline"
                          style={styles.timeDateIcon}
                        />
                        <Text style={styles.textDate}>Select Time</Text>
                        {/* {startDate == '' && startMonth == '' ? (
                            <Text style={styles.textDate}>Select Date</Text>
                          ) : (
                            <View style={{flexDirection: 'row'}}>
                              <Text style={styles.textDate}>{startDate}</Text>
                              <Text style={styles.textDate}>{startMonth}</Text>
                              <Text style={styles.textDate}>{startYear}</Text>
                            </View>
                          )} */}
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={styles.addnoteText}>
                    {String.MyBookingTab.addnote}
                  </Text>
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
                      setReshedulVisible(!modalReshedulVisible);
                    }}>
                    <Text style={styles.textBtnStyle}>
                      {String.MyBookingTab.reschedule}
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
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
