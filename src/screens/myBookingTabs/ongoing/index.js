import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, SafeAreaView,
  RefreshControl,
  ActivityIndicator} from 'react-native';
import styles from './styles';
import {String} from '../../../utlis/String';
import {Color, Matrics} from '../../../utlis';
import {MySpinner} from '../../../component/MySpinner';
import {Auth, Constants} from '@global';
import {useSelector} from 'react-redux';
import moment from 'moment';
const OngoingTab = (props) => {
  const userInfo = useSelector((state) => state.user.user);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [loagind, setLoading] = useState(false);


  useEffect(()=>{
    console.log("======================================>",props.route);
  },[])

  //time
  const [curTime, setCurTime] = useState('');
  var timeconvert;
  // search
  const [masterDataSource, setMasterDataSource] = useState([]);
  const searchKeyFromProbs = useSelector(
    (state) => state.BookingService.serachKey,
  );
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
  console.log('currentdate time------------', currenttime);
  console.log('settingReshedultime-----', settingreshedultime);

  console.log('CurrentData~~~~~~~~~~~', currentdate);
  console.log('currentTime~~~~~~~~', crtime);
  useEffect(() => {
    time_convert();

    getOnGoing();
  }, []);
  const onRefresh = () => {
    setData([]);
    getOnGoing();
  };
  useEffect(() => {
    console.log(
      'Data from redux searchKeyFromProbs ~~~~~~',
      searchKeyFromProbs,
    );
    searchFilterFunction(searchKeyFromProbs);
  }, [searchKeyFromProbs]);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getOnGoing();
    });
    return unsubscribe;
  }, [props.navigation]);
  //search start
  function searchFilterFunction(text) {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.service.service_name != null
          ? item.service.service_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
      // setSearchTerm(text);
    } else {
      setData(masterDataSource);
      // setSearchTerm(text);
    }
  }
  function noItemDisplay() {
    // setLoading(false);
    return (
      <View
        style={{flex: 1, alignSelf: 'center', marginTop: Matrics.Scale(50)}}>
        <Text style={{fontSize: 20, color: Color.AppColor}}>
          {String.app.datanotfound}
        </Text>
      </View>
    );
  }

  function covertDateTime(val1, val2) {
    var str = val1 + ' ' + val2;
    const bDate = moment(str, 'YYYY-MM-DD HH:mm:ss');
    return bDate;
  }

  function bookingtimecurrenttime(val1, val2) {
    //  var str = val1 + ' ' + val2;
    var startTime = moment(val2, "HH:mm:ss");
    var endTime = moment(val1, "HH:mm:ss");
    var duration = moment.duration(endTime.diff(startTime));
    // duration in hours
   var hours = parseInt(duration.asHours());
   var minutes = parseInt(duration.asMinutes())%60;
    
    console.log('current time~~~~~~~~~~~~~~', val1);
    console.log('booking time~~~~~~~~~~~~~~', val2);
  //  console.log('difference ~~~~~~~~~~~', difference);
    console.log('diff========', (minutes + (hours*60)));

     return (minutes + (hours*60));
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
  // Api calling for onGoing
  function getOnGoing() {
    setLoading(true);
    setRefreshing(false);
    let myForm = new FormData();
    myForm.append('business_id', Constants.businessid);
    console.log('parm in tabonGoing~~~~~~~~~', myForm);
    Auth.PostCustomerTokenAuth(
      userInfo.token,
      userInfo.user_id,
      myForm,
      Constants.ApiAction.staffOnGoing,
      (res) => {
        console.log(' ongoing data--------', res);
        if (res[1].data == true) {
          setLoading(false);
          setRefreshing(false);
          setData(res[1].response);
          setMasterDataSource(res[1].response);
        } else {
          setData(res.data);
          setLoading(false);
          setRefreshing(false);
        }
      },
    );
  }

  // Api calling for newBookings
  function getStatus(id, st) {
    console.log('usertoken----', userInfo.token);
    setLoading(true);
    let myForm = new FormData();
    myForm.append('order_item_id', id);
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
          getOnGoing();
        } else {
          setLoading(false);
        }
      },
    );
  }
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
        <View style={{justifyContent: 'center', flex: 1}}>
          <MySpinner size="large" visible={loagind} />
          {refreshing ? (
            <ActivityIndicator style={{color: Color.AppColor}} />
          ) : null}
          <FlatList
             ListEmptyComponent={loagind == false  && refreshing == false ? noItemDisplay() : null}
            data={data}
           // inverted={true}
            renderItem={({item, index}) => (
              <View style={styles.mainView}>
                <View style={styles.topView}>
                  <Text style={styles.bookingTextDate}>
                    {String.MyBookingTab.date_time}
                  </Text>
                  <Text style={styles.textstatus}>
                    {String.MyBookingTab.satus}
                  </Text>
                </View>
                <View style={styles.topView_dis}>
                  {/* <Text style={styles.textDate_dis}>{item.booking_date}</Text> */}
                  <Text style={styles.textDate_dis}>
                    {moment(item.booking_date).format('DD MMM YYYY')}
                  </Text>
                  <Text style={styles.bookingTimeText}>{moment(item.booking_time, 'HH:mm:ss').format('LT')}</Text>
                  {item.order_status != null && item.order_status == 'CNF' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Confirm</Text>
                    </View>
                  ) : null}
                  {item.order_status != null && item.order_status == 'P' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Pending</Text>
                    </View>
                  ) : null}
                   {item.order_status != null && item.order_status == 'AC' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Accept</Text>
                    </View>
                  ) : null}
                  {item.order_status != null && item.order_status == 'OW' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>On The Way</Text>
                    </View>
                  ) : null}
                   {item.order_status != null && item.order_status == 'WS' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Work Started</Text>
                    </View>
                  ) : null}
                  {item.order_status != null && item.order_status == 'C' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Canceled</Text>
                    </View>
                  ) : null}
                   {item.order_status != null && item.order_status == 'RSS' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Rescheduled By Staff</Text>
                    </View>
                  ) : null}
                   {item.order_status != null && item.order_status == 'RSA' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Rescheduled By Admin</Text>
                    </View>
                  ) : null}
                  {item.order_status != null && item.order_status == 'RSC' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Rescheduled By Client</Text>
                    </View>
                  ) : null}
                  {item.order_status != null && item.order_status == 'ITR' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Intrupted</Text>
                    </View>
                  ) : null}
                   {item.order_status != null && item.order_status == 'ITR' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Intrupted</Text>
                    </View>
                  ) : null}
                   {item.order_status != null && item.order_status == 'CC' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Cancel by Client</Text>
                    </View>
                  ) : null}
                  {item.order_status != null && item.order_status == 'CO' ? (
                    <View>
                      <Text style={styles.textstatus_dis}>Completed</Text>
                    </View>
                  ) : null}
                </View>
                <View style={styles.service_btn_mainview}>
                  <View style={styles.service_dis}>
                    <Text style={styles.textDate_time}>
                      {String.MyBookingTab.servicest}
                    </Text>
                    <Text style={styles.textTime_dis}>
                      {item.service == null ? null : item.service.service_name}
                    </Text>
                  </View>
                  <View style={styles.service_dis_btn}>
                    {item.order_status == 'OW' &&
                    item.booking_date == currentdate &&
                    bookingtimecurrenttime(crtime,item.booking_time) < 30 ? (
                      <TouchableOpacity
                        style={styles.btnViewWorkstarted}
                        onPress={() => {
                          getStatus(item.id, 'WS');
                        }}>
                        <Text style={styles.btnText}>
                          {String.MyBookingTab.workstarted}
                        </Text>
                      </TouchableOpacity>
                    ) : null}

                    {item.order_status == 'WS' && item.payment != null ? (
                      <View>
                        {item.payment.payment_status == 'unpaid' ? (
                          <TouchableOpacity
                            style={styles.btnViewDetails}
                            onPress={() => {
                              getStatus(item.id, 'CO'),
                                props.navigation.navigate('Payment', {
                                  datapass: item,
                                  image: item.customer.image,
                                });
                            }}>
                            <Text style={styles.btnText}>
                              {String.MyBookingTab.completed}
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={styles.btnViewDetails}
                            onPress={() => {
                              getStatus(item.id, 'CO'),
                                props.navigation.navigate('Home');
                            }}>
                            <Text style={styles.btnText}>
                              {String.MyBookingTab.completed}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    ) : null}

                    {item.order_status == 'AC' &&
                    item.booking_date == currentdate &&
                    bookingtimecurrenttime(crtime,item.booking_time) < 60 ? (
                      <TouchableOpacity
                        style={styles.btnViewOntheWay}
                        onPress={() => {
                          getStatus(item.id, 'OW');
                        }}>
                        <Text style={styles.btnText}>
                          {String.MyBookingTab.ontheway}
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                    <View>
                      {item.order_status == 'OW' &&
                      item.service.service_sub_type == 'at-home' ? (
                        <TouchableOpacity
                          style={styles.btnViewMap}
                          onPress={() =>
                            props.navigation.navigate('MapScreen', {
                              datapass: item,
                              image: item.customer.image,
                            })
                          }>
                          <Text style={styles.btnText}>
                            {String.MyBookingTab.map}
                          </Text>
                        </TouchableOpacity>
                      ) : null}
                    </View>
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
                            item.total_cost,
                            {code: currency},
                            //{locale: currencyFrm},
                          )}
                        </Text>
                      ) : (
                        <Text style={styles.textTime_dis}>
                          {currencyFormatter.format(
                            item.total_cost,
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
                        {item.customer == null ? null : item.customer.fullname}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View style={styles.service_dis_btn}>
                      <TouchableOpacity
                        style={styles.btnViewDetails}
                        onPress={() =>
                          props.navigation.navigate('onGoingDetails', {
                            datapass: item,
                            image: item.customer.image,
                          })
                        }>
                        <Text style={styles.btnText}>
                          {String.MyBookingTab.details}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {covertDateTime(item.booking_date, item.booking_time).diff(currenttime) >= timeconvert ? (
                      <View style={styles.btnViewReject}>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate('Reshedul', {
                              datapass: item,
                            })
                          }>
                          <Text style={styles.btnText}>
                          Reshedul
                            {/* {String.MyBookingTab.reschedule} */}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            )}
             refreshControl={
              <RefreshControl
                //refresh control used for the Pull to Refresh
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            contentContainerStyle={styles.list}></FlatList>
        </View>
   
    </View>
    </SafeAreaView>
  );
};
export default OngoingTab;
