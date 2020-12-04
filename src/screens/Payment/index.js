import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import styles from './style';
import {String} from '../../utlis/String';
import HeaderView from '../../component/headerTab';
const Payment = (props) => {
  const [data, setData] = useState({});
  useEffect(() => {
    if (props.route.params !== null) {
      setData(props.route.params.datapass);
      console.log('item ongoing in paymant screen-----------', props.route.params.datapass);
    }
    console.log(' ongoing pic-----------', props.route.params.image);
  }, []);
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
                onPress={() => props.navigation.navigate('CashPaymantDetails',{datapass: props.route.params.datapass,image:props.route.params.image})}>
                <View>
                  <Text style={styles.textView}>{String.payment.cash}</Text>
                </View>
                <View>
                  <Image
                    source={require('../../assets/images/cash.png')}
                    style={{width: 40, height: 40}}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View >
              <TouchableOpacity style={styles.commonpayment}
              onPress={()=> props.navigation.navigate('OnlinePaymantDetails')}>
              <View>
                <Text style={styles.textView}>{String.payment.Online}</Text>
              </View>
              <View>
                <Image
                  source={require('../../assets/images/Online.png')}
                  style={{width: 40, height: 40}}
                />
              </View></TouchableOpacity>
            </View>
            <View style={styles.commonpayment}>
              <View>
                <Text style={styles.textView}>{String.payment.Instore}</Text>
              </View>
              <View>
                <Image
                  source={require('../../assets/images/Instore.png')}
                  style={styles.imageIcon}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.btnText}>{String.payment.Next}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Payment;
