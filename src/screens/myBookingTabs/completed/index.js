import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {String} from '../../../utlis/String';
import {Color, Matrics} from '../../../utlis';
import {Auth, Constants} from '@global';
import {MySpinner} from '../../../component/MySpinner';
import { useSelector } from 'react-redux';
import moment from 'moment';

const CompletedTab = (props) => {
  const userInfo = useSelector(state => state.user.user)
  const [data, setData] = useState([]);
  const [loagind, setLoading] = useState(false);

  useEffect(() => {
    getComplteTask();
  
  }, []);
 // Api calling for complteTask
 function getComplteTask() {
  setLoading(true);
  let myForm = new FormData();
  myForm.append('business_id',Constants.businessid);
  myForm.append('staff_id',userInfo.user_id);
  myForm.append('status','CO')
  console.log('parm Tabcomplted~~~~~~~~~', myForm);
  Auth.PostCustomerTokenAuth(userInfo.token,userInfo.user_id,myForm, Constants.ApiAction.completTask, (res) => {
    console.log('completetab data--------', res);
    if (res[1].data == true) {
      setLoading(false);
      setData(res[1].response);
     
    } else {
      setData(res.data);
      setLoading(false);
    }
  });
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
      <ScrollView style={{flex: 1}}>
        <View style={{justifyContent: 'center', flex: 1}}>
          <MySpinner size="large" visible={loagind} />
          <FlatList
            ListEmptyComponent={noItemDisplay}
            data={data}
            renderItem={({item, index}) => (
              <View style={styles.mainView}>
                <View style={styles.topView}>
                  <Text style={styles.textDate_time}>
                    {String.MyBookingTab.date_time}
                  </Text>
                  <Text style={styles.textstatus}>
                    {String.MyBookingTab.satus}
                  </Text>
                </View>
                <View style={styles.topView_dis}>
                  {/* <Text style={styles.textDate_dis}>{item.booking_date}</Text> */}
                  <Text style={styles.textDate_dis}>{moment(item.booking_date).format('DD MMM YYYY')}</Text>
                  <Text style={styles.textTime_dis}>{item.booking_time}</Text>
                  <Text style={styles.textstatus_dis}>{item.order_status}</Text>
                </View>
                <View style={styles.service_btn_mainview}>
                  <View style={styles.service_dis}>
                    <Text style={styles.textDate_time}>
                      {String.MyBookingTab.servicest}
                    </Text>
                    <Text style={styles.textTime_dis}>{item.service == null ? null:item.service.service_name}</Text>
                  </View>
                  <View style={styles.service_dis_btn}>
                    <TouchableOpacity
                      style={styles.btnView}
                      onPress={() =>
                        props.navigation.navigate('CompletDetails',{datapass: item,image: item.customer.image})
                      }>
                      <Text style={styles.btnText}>
                        {String.MyBookingTab.details}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{marginLeft: 10}}>
                  <View style={styles.service_dis}>
                    <Text style={styles.textDate_time}>
                      {String.MyBookingTab.amount}
                    </Text>

                    <Text style={styles.textTime_dis}>{item.total_cost}</Text>
                  </View>
                  <View style={styles.service_customer}>
                    <Text style={styles.textDate_time}>
                      {String.MyBookingTab.customer}
                    </Text>
                    <Text style={styles.textTime_dis}>{item.customer == null ? null:item.customer.fullname}</Text>
                  </View>
                </View>
              </View>
            )}></FlatList>
        </View>
      </ScrollView>
    </View>
  );
};
export default CompletedTab;
