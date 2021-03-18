import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import { String } from '../../../utlis/String';
import { Color, Matrics } from '../../../utlis';
import { Auth, Constants } from '@global';
import { MySpinner } from '../../../component/MySpinner';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Snackbar from 'react-native-snackbar';
const CompletedTab = (props) => {
  const userInfo = useSelector((state) => state.user.user);
  const [refreshing, setRefreshing] = useState(true);
  const [data, setData] = useState([]);
  const [loagind, setLoading] = useState(false);
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

  useEffect(() => {
    getComplteTask();
  }, []);
  const onRefresh = () => {
    setData([]);
    getComplteTask();
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
      getComplteTask();
    });
    return unsubscribe;
  }, [props.navigation]);
  //search start
  function searchFilterFunction(text) {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData =
          item.service.service_name != null
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
  // Api calling for complteTask
  function getComplteTask() {
    setLoading(true);
    setRefreshing(false);
    let myForm = new FormData();
    myForm.append('business_id', Constants.businessid);
    myForm.append('staff_id', userInfo.user_id);
    myForm.append('status', 'CO');
    console.log('parm Tabcomplted~~~~~~~~~', myForm);
    Auth.PostCustomerTokenAuth(
      userInfo.token,
      userInfo.user_id,
      myForm,
      Constants.ApiAction.completTask,
      (res) => {
        console.log('completetab data--------', res);
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <MySpinner size="large" visible={loagind} />
        {refreshing ? (
          <ActivityIndicator style={{ color: Color.AppColor }} />
        ) : null}
        <FlatList
          ListEmptyComponent={
            loagind == false && refreshing == false ? noItemDisplay() : null
          }
          data={data}
          // inverted={true}
          renderItem={({ item, index }) => (
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
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.textDate_dis}>
                    {moment(item.booking_date).format('DD MMM YYYY')}
                  </Text>
                  <Text style={styles.bookingTimeText}>
                    {moment(item.booking_time, 'HH:mm:ss').format('LT')}
                  </Text>
                </View>
                <View style={styles.statusView}>
                  <Text style={styles.textstatus_dis}>
                    {item.order_status == 'CO' ? 'Completed' : item.order_status}
                  </Text>
                </View>
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
                  <TouchableOpacity
                    style={styles.btnView}
                    onPress={() =>
                      props.navigation.navigate('CompletDetails', {
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

              <View style={{ marginLeft: 15 }}>
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
    </SafeAreaView>
  );
};
export default CompletedTab;
