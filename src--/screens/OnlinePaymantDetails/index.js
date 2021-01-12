import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import styles from './styles';
import {String} from '../../utlis/String';
import HeaderView from '../../component/headerTab';
import Icon from 'react-native-vector-icons/AntDesign';
const OnlinePaymantDetails = (props) => {
  const [couponview, setCouponView] = useState(false);
  const [couponeCode, setCouponeCode] = useState('');

  return (
    <View style={styles.container}>
      <HeaderView
        header={true}
        back={true}
        search={false}
        notification={true}
        searchClick={false}
        onPressNoti={() => props.navigation.navigate('Notification')}
        headertext={String.payment.paymantDetails}
        onPress={() => props.navigation.goBack()}
      />
      <Text style={styles.serviewText}>{String.cashpaymant.service}</Text>

      <View style={styles.topView}>
        <View style={styles.imgView}>
          <View style={styles.courseImgView}>
            <Image
              source={require('../../assets/images/profile.jpg')}
              style={styles.courseImg}
            />
          </View>
          <Text style={styles.userNameSyl}>siddharth</Text>
          <Text style={styles.userAmount}>500</Text>
        </View>
      </View>
      <View style={styles.amountView}>
        <Text style={styles.text_amount}>{String.cashpaymant.amount}</Text>
        <Text style={styles.text_rs}> 150 </Text>
      </View>

      <View>
        <View style={styles.amountView}>
          <Text style={styles.text_amount}>GST</Text>

          <Text style={styles.text_rs}>152</Text>
        </View>
      </View>
      <View style={styles.amountView}>
        <Text style={styles.text_coupon}>{String.cashpaymant.coupon}</Text>
        <View>
          {couponview == true ? (
            <View style={styles.coiponViewApp}>
              <Text style={styles.text_coupon_applied}>
                {String.cashpaymant.coupon_code_applied}
              </Text>
            </View>
          ) : (
            <View style={styles.coiponView}>
              <TextInput
                style={styles.textCouponCode}
                onChangeText={(text) => {
                  setCouponeCode(text);
                }}
                placeholder={String.cashpaymant.couponcode}
                maxLength={10}
                keyboardType="default"
              />
              <View style={styles.couponIconView}>
                <Icon name="check" style={styles.inc_coupon} />
              </View>
            </View>
          )}
        </View>
      </View>
      <View style={styles.borderView} />
      <View style={styles.totalamountView}>
        <Text style={styles.textTotal}>{String.cashpaymant.total}</Text>

        <Text style={styles.textTotalRs}>152</Text>
      </View>
      <View style={styles.add_more_serviceMainView}>
        <TouchableOpacity
          style={styles.buttonStylpass}
          onPress={() => props.navigation.replace('PaymantDone')}>
          <Text style={styles.textChange}>{String.cashpaymant.paymantlink}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.proceedtocheckMainView}>
        <TouchableOpacity style={styles.buttonStylupdate} >
          <Text style={styles.textUpdate}>{String.cashpaymant.cancel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default OnlinePaymantDetails;
