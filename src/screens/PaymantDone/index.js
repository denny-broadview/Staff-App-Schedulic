import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import {String} from '../../utlis/String';
import Icon from 'react-native-vector-icons/AntDesign';
const PaymantDone = (props) => {
 
  useEffect(() => {
   
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.rigthIocnView}>
        <Icon name="checkcircle" style={styles.icon} />
      </View>
      <View style={styles.thankyouView}>
        <Text style={styles.topText}>{String.success.paymantdone}</Text>
        <Text style={styles.descriptionText}>
          {String.success.bookDes}
        </Text>
      </View>
      <View style={styles.orderidView}>
     
        <Text style={styles.topText}>{String.success.orderid}</Text>
        <Text style={styles.topText}>125102</Text>
      </View>
      <View style={styles.proceedtocheckMainView}>
        <TouchableOpacity style={styles.buttonStylupdate}  onPress={() => props.navigation.replace('Home')}>
          <Text style={styles.textUpdate}>{String.success.done}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PaymantDone;
