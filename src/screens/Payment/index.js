import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './style';
import { String } from '../../utlis/String';
import HeaderView from '../../component/headerTab';
const Payment = (props) => {
  const [data, setData] = useState({});
  const [payment, setPayment] = useState([]);
  const [payJson, setPayJson] = useState({});
  useEffect(() => {
    if (props.route.params !== null) {
      setData(props.route.params.datapass);
      setPayJson(props.route.params.datapass.payment);
    }
  }, []);
  useEffect(() => {
    if (payJson && payJson != null && payJson != undefined) {
      let js = {
        "reference_id": payJson.reference_id,
        "transactionId": payJson.transaction_id,
        "payment_datetime": payJson.payment_date,
        "payment_method": payJson.payment_mode,
        "amount": payJson.amount,
        "paymentnotes": payJson.payment_notes
      }
      setPayment(js)
    }

  }, [data])
  return (
    <View style={styles.mainView}>
      <HeaderView
        header={true}
        back={true}
        search={false}
        notification={true}
        searchClick={false}
        onPressNoti={() => props.navigation.navigate('Notification')}
        headertext={String.payment.paymants}
        onPress={() => props.navigation.goBack()}
      />
      <View style={styles.mainPayment}>
        <ScrollView>
          <View style={styles.paymentimage}>
            <Image source={require('../../assets/images/paymentbg.png')} />
          </View>
          <View>
            <View>
              <TouchableOpacity style={styles.commonpayment}
                onPress={() => props.navigation.navigate('CashPaymantDetails', {
                  datapass: props.route.params.datapass,
                  payment: payment,
                  method: 'cash',
                  image: props.route.params.image
                })}>
                <View>
                  <Text style={styles.textView}>{String.payment.cash}</Text>
                </View>
                <View>
                  <Image
                    source={require('../../assets/images/cash.png')}
                    style={{ width: 40, height: 40 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View >
              <TouchableOpacity style={styles.commonpayment}
                // onPress={()=> props.navigation.navigate('OnlinePaymantDetails')}>
                onPress={() => props.navigation.navigate('CashPaymantDetails', {
                  datapass: props.route.params.datapass,
                  payment: payment,
                  method: 'online',
                  image: props.route.params.image
                })}>
                <View>
                  <Text style={styles.textView}>{String.payment.Online}</Text>
                </View>
                <View>
                  <Image
                    source={require('../../assets/images/Online.png')}
                    style={{ width: 40, height: 40 }}
                  />
                </View></TouchableOpacity>
            </View>
            {/* <View style={styles.commonpayment}>
              <View>
                <Text style={styles.textView}>{String.payment.Instore}</Text>
              </View>
              <View>
                <Image
                  source={require('../../assets/images/Instore.png')}
                  style={styles.imageIcon}
                />
              </View>
            </View> */}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default Payment;
