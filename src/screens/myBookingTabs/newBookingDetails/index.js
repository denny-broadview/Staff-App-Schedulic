import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {String} from '../../../utlis/String';
import HeaderView from '../../../component/headerTab';
import Icon from 'react-native-vector-icons/AntDesign';
import IconCall from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
const NewBookingDetails = (props) => {
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [disable, setdisable] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    if (props.route.params !== null) {
      setData(props.route.params.datapass);
      console.log('item booking data-----------', props.route.params.datapass);
    }
    console.log('pic-----------', props.route.params.image);
  }, []);

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
              <Text style={styles.textDate_dis}>
                {moment(data.booking_date).format('DD MMM YYYY')}
              </Text>
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
                <Text style={styles.textTime_dis}>
                  {data.service == null ? null : data.service.service_name}
                </Text>
              </View>
            </View>

            <View style={styles.service_btn_mainview}>
              <View>
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
                  <Text style={styles.textTime_dis}>
                    {data.customer == null ? null : data.customer.fullname}
                  </Text>
                </View>
              </View>
              <View>
                <View style={styles.service_dis_btn}>
                  <TouchableOpacity
                    style={styles.btnViewAccept}
                    onPress={() => props.navigation.navigate('OngoingTab')}>
                    <Text style={styles.btnText}>
                      {String.MyBookingTab.accept}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.btnViewReject}>
                  <TouchableOpacity>
                    <Text style={styles.btnText}>
                      {String.MyBookingTab.reject}
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
                {/* {data.customer == null &&
                data.customer.image == undefined &&
                data.customer.image == null ? (
                  <Image
                    source={require('../../../assets/images/profile.jpg')}
                    style={styles.courseImg}
                  />
                ) : (
                  <Image
                    source={{uri:data.customer.image}}
                    style={styles.courseImg}
                  />
                )} */}
                <Image
                     //source={require('../../../assets/images/profile.jpg')}
                     source={{uri:props.route.params.image}}
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

            {data.service && data.service.servicesubType == 'at-home' ? (
              <View style={styles.address_View}>
                <Icon name="enviroment" style={styles.call_icon} />
                <Text style={styles.textAddress}>{data.customer.address}</Text>
              </View>
            ) : null}

            <View style={styles.viewLine} />
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
export default NewBookingDetails;
