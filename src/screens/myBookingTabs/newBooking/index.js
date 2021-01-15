import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, SafeAreaView,
  RefreshControl,
  ActivityIndicator} from 'react-native';
import styles from './styles';
import {String} from '../../../utlis/String';
import {Auth, Constants} from '@global';
import {Color, Matrics} from '../../../utlis';
import {MySpinner} from '../../../component/MySpinner';
import {useSelector} from 'react-redux';
import moment from 'moment';
const NewBookingTab = (props) => {
  const [refreshing, setRefreshing] = useState(true);
  const userInfo = useSelector((state) => state.user.user);
  const [data, setData] = useState([]);
  const [loagind, setLoading] = useState(false);
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
  useEffect(() => {
    getBooking();
  }, []);
  useEffect(() => {
    console.log('Data from redux searchKeyFromProbs ~~~~~~', searchKeyFromProbs);
    searchFilterFunction(searchKeyFromProbs);
  }, [searchKeyFromProbs]);
 
  const onRefresh = () => {
    setData([]);
    getBooking();
  };

 //search start
 function searchFilterFunction(text) {
  if (text) {
    const newData = masterDataSource.filter(function (item) {
      const itemData = item.service.service_name
        ? item.service.service_name.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setData(newData);
  } else {
    setData(masterDataSource);
  }
}

  // Api calling for newBookings
  function getBooking() {
    setLoading(true);
    setRefreshing(false);
    let myForm = new FormData();
    myForm.append('business_id', Constants.businessid);
    console.log('parm booking in newBookingpage~~~~~~~~~', myForm);
    Auth.PostCustomerTokenAuth(
      userInfo.token,
      userInfo.user_id,
      myForm,
      Constants.ApiAction.staffnewbookin,
      (res) => {
       // console.log(' booking data--------', res);
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
  function getStatus(id,st) {
    setLoading(true);
    let myForm = new FormData();
    myForm.append('order_item_id',id);
    myForm.append('staff_id',userInfo.user_id);
    myForm.append('order_status',st);
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
          if (st == "R") {
            props.navigation.navigate('Home');
            getBooking();
          } else if (st == "AC"){ props.navigation.navigate('OngoingTab');
          getBooking();}
        } else {
          setLoading(false);
        }
      },
    );
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
            keyExtractor={(item) => item.id}
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
                  <Text style={styles.bookingTimeText}>
                    {moment(item.booking_time, 'HH:mm:ss').format('LT')}
                  </Text>
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
                    <Text style={styles.textTime_dis} key={item.service.service_name}>
                      {item.service == null ? null : item.service.service_name}
                    </Text>
                  </View>
                  <View style={styles.service_dis_btn}>
                    <TouchableOpacity
                      style={styles.btnView}
                      onPress={() =>
                        props.navigation.navigate('NewBookingDetails', {
                          datapass: item,
                          image: item.customer.image,
                        })
                      }>
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
                           // {locale: currencyFrm},
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
                        style={styles.btnViewAccept}
                        onPress={() => getStatus(item.id,"AC")}>
                        <Text style={styles.btnText}>
                          {String.MyBookingTab.accept}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.btnViewReject}>
                      <TouchableOpacity onPress={() => getStatus(item.id,"R")}>
                        <Text style={styles.btnText}>
                          {String.MyBookingTab.reject}
                        </Text>
                      </TouchableOpacity>
                    </View>
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
     
    </View></SafeAreaView>
  );
};
export default NewBookingTab;
