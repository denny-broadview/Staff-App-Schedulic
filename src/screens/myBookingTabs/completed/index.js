import React, {useState, useEffect} from 'react';
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
import {String} from '../../../utlis/String';
import {Color, Matrics} from '../../../utlis';
import {Auth, Constants} from '@global';
//import { MySpinner } from '../../../component/MySpinner';
import {useSelector} from 'react-redux';
import moment from 'moment';
//import Snackbar from 'react-native-snackbar';
const CompletedTab = (props) => {
  const userInfo = useSelector((state) => state.user.user);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [loagind, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  // search
  const searchKeyFromProbs = useSelector(
    (state) => state.BookingService.serachKey,
  );
  var currencyFormatter = require('currency-formatter');
  const currency = useSelector((state) => state.setting.setting.currency);

  const currencySymbolePosition = useSelector(
    (state) => state.setting.setting.currency_symbol_position,
  );

  const loadMoreData = () => {
    if (page <= lastPage) {
      getComplteTask();
      setPage(page + 1);
    }
    console.log('loadMoreData');
  };
  const onRefresh = () => {
    setData([]);
    setPage(1);
    getComplteTask(1);
    setRefreshing(true);
  };
  useEffect(() => {
    if (searchKeyFromProbs) {
      setPage(1);
      getComplteTask();
    }
  }, [searchKeyFromProbs]);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getComplteTask();
    });
    return unsubscribe;
  }, [props.navigation]);

  // Api calling for complteTask
  function getComplteTask(pageRef) {
    setLoading(true);
    let myForm = new FormData();
    myForm.append('business_id', Constants.businessid);
    myForm.append('staff_id', userInfo.user_id);
    myForm.append('status', 'CO');
    myForm.append('search', '');
    Auth.PostCustomerTokenAuth(
      userInfo.token,
      userInfo.user_id,
      myForm,
      Constants.ApiAction.completTask + '?page=' + (pageRef === 1 ? 1 : page),
      (res) => {
        setLoading(false);
        setRefreshing(false);
        if (res[1].data == true) {
          let dataRes = res[1].response.data;
          let lastPage = res[1].response.last_page;
          if (dataRes.length > 0) {
            if (pageRef === 1) {
              setData(dataRes);
            } else {
              page === 1 ? setData(dataRes) : setData(data.concat(dataRes));
            }
          }
          setLastPage(lastPage);
          // setRefreshing(false);
          // setData(res[1].response);
          // setMasterDataSource(res[1].response);
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
  const renderFooter = () => {
    return (
      loagind &&
      !refreshing && (
        <View style={{height: 50}}>
          <ActivityIndicator color={Color.AppColor} />
        </View>
      )
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {refreshing && !loagind ? (
          <ActivityIndicator style={{color: Color.AppColor}} />
        ) : null}
        <FlatList
          ListEmptyComponent={
            loagind == false && refreshing == false ? noItemDisplay() : null
          }
          data={data && data}
          // inverted={true}
          renderItem={({item, index}) => (
            <View style={styles.mainView}>
              <View style={styles.topView}>
                <Text style={styles.bookingTextDate}>
                  {String.MyBookingTab.orderid + 'Order Id'}
                </Text>
                <Text style={styles.textOrderID}>{/* {item.id} */}</Text>
              </View>

              <View style={styles.topView_dis}>
                <Text style={styles.textOrderID}>{item.id}</Text>
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
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.textDate_dis}>
                    {moment(item.booking_date).format('DD MMM YYYY')}
                  </Text>
                  <Text style={styles.bookingTimeText}>
                    {/* {moment(item.booking_time, 'HH:mm:ss').format('LT')} */}
                    {moment(item.booking_time, 'h:mm A').format('HH:mm')}
                  </Text>
                </View>
                <View style={styles.statusView}>
                  <Text style={styles.textstatus_dis}>
                    {item.order_status == 'CO'
                      ? 'Completed'
                      : item.order_status}
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
                        image: item.customer ? item.customer.image : '',
                      })
                    }>
                    <Text style={styles.btnText}>
                      {String.MyBookingTab.details}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{marginLeft: 15}}>
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
    </SafeAreaView>
  );
};
export default CompletedTab;
