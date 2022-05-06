import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, SafeAreaView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import styles from './styles';
import { String } from '../../../utlis/String';
import { Auth, Constants } from '@global';
import { Color, Matrics } from '../../../utlis';
import { MySpinner } from '../../../component/MySpinner';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Snackbar from 'react-native-snackbar';
const NewBookingTab = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const userInfo = useSelector((state) => state.user.user);
  const [data, setData] = useState([]);
  const [loagind, setLoading] = useState(false);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

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
    if (searchKeyFromProbs) {
      setPage(1)
      getBooking()
    }
  }, [searchKeyFromProbs]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getBooking();
      setPage(page + 1);
    });
    return unsubscribe;
  }, [props.navigation]);

  const onRefresh = () => {
    setData([]);
    setPage(1)
    getBooking(1);
    setRefreshing(true)
  };
  const loadMoreData = () => {
    if (page <= lastPage) {
      getBooking();
      setPage(page + 1);
    }
  }
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
  function getBooking(pageRef) {
    let myForm = new FormData();
    setLoading(true)
    myForm.append('business_id', Constants.businessid);
    myForm.append('search', '');
    Auth.PostCustomerTokenAuth(
      userInfo.token,
      userInfo.user_id,
      myForm,
      Constants.ApiAction.staffnewbookin + '?page=' + (pageRef === 1 ? 1 : page),
      (res) => {
        setRefreshing(false)
        setLoading(false);
        if (res[1].data == true) {
          let dataRes = res[1].response.data;
          let lastPage = res[1].response.last_page;
          if (dataRes.length > 0) {
            if (pageRef === 1) {
              setData(dataRes)
            } else {
              page === 1 ? setData(dataRes) : setData(data.concat(dataRes))
            }
          }
          setLastPage(lastPage)
          // let resData = res[1].response;
          // setLastPage(res[1].response.last_page)
          // setData(resData.data);
          // setMasterDataSource(resData.data);
        } else {
          setData(res.data);
        }
      },
    );
  }

  // Api calling for newBookings
  function getStatus(id, st) {
    setLoading(true);
    let myForm = new FormData();
    myForm.append('order_item_id', id);
    myForm.append('staff_id', userInfo.user_id);
    myForm.append('order_status', st);
    Auth.PostCustomerTokenAuth(
      userInfo.token,
      userInfo.user_id,
      myForm,
      Constants.ApiAction.status_update,
      (res) => {
        setLoading(false);
        if (res[1].data == true) {
          if (st == "R") {
            setTimeout(() => {
              Snackbar.show({
                text: 'Appointment Updated',
                duration: Snackbar.LENGTH_SHORT
              });
            }, 1000);
          } else if (st == "AC") {
            setTimeout(() => {
              Snackbar.show({
                text: 'Appointment Updated',
                duration: Snackbar.LENGTH_SHORT
              });
            }, 1000);
          }
          // setData([])
          // getBooking();
          // setPage(1);
          setData([]);
          getBooking(1);
          setPage(1)
        }
      },
    );
  }
  function noItemDisplay() {
    // setLoading(false);
    return (
      <View
        style={{ flex: 1, alignSelf: 'center', marginTop: Matrics.Scale(50) }}>
        <Text style={{ fontSize: 20, color: Color.AppColor }}>
          {String.app.datanotfound}
        </Text>
      </View>
    );
  }
  console.log('data:', data)
  const renderFooter = () => {
    return (loagind && !refreshing && <View style={{ flex: 1, height: 50, marginBottom: 50 }}><ActivityIndicator color={Color.AppColor} /></View>);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', flex: 1 }}>
          {refreshing && !loagind ? (
            <ActivityIndicator style={{ color: Color.AppColor }} />
          ) : null}
          <FlatList
            ListEmptyComponent={loagind == false && refreshing == false ? noItemDisplay() : null}
            data={data}
            // inverted={true}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View style={styles.mainView}>
                <View style={styles.topView}>
                  <Text style={styles.bookingTextDate}>
                    {String.MyBookingTab.orderid + 'Order Id : '}
                  </Text>
                  <Text style={styles.textOrderID}>
                    {item.id}
                  </Text>
                </View>
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
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.textDate_dis}>
                      {moment(item.booking_date).format('DD MMM YYYY')}
                    </Text>
                    <Text style={styles.bookingTimeText}>
                      {moment(item.booking_time, 'HH:mm:ss').format('LT')}
                    </Text>
                  </View>
                  <View style={styles.statusView}>
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
                        <Text style={styles.textstatus_dis}>Accepted</Text>
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
                        <Text style={styles.textstatus_dis}>Rescheduled By Customer</Text>
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

                </View>
                <View style={styles.service_btn_mainview}>
                  <View style={styles.service_dis}>
                    <Text style={styles.textDate_time}>
                      {String.MyBookingTab.servicest}
                    </Text>
                    {item.service !== null ?
                      <Text style={styles.textTime_dis} key={item.service.service_name}>
                        {item.service.service_name}
                      </Text> : null}
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
                            { code: currency },
                            // {locale: currencyFrm},
                          )}
                        </Text>
                      ) : (
                        <Text style={styles.textTime_dis}>
                          {currencyFormatter.format(
                            item.total_cost,
                            // {locale: currencyFrm},
                            { code: currency },
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
                        onPress={() => getStatus(item.id, "AC")}>
                        <Text style={styles.btnText}>
                          {String.MyBookingTab.accept}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.btnViewReject}>
                      <TouchableOpacity onPress={() => getStatus(item.id, "R")}>
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
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.01}
            ListFooterComponent={renderFooter}
            contentContainerStyle={styles.list}></FlatList>
        </View>

      </View></SafeAreaView>
  );
};
export default NewBookingTab;
