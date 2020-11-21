import React, {useEffect, useState} from 'react';
import {View, Text, Image,TouchableOpacity, ScrollView} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/Entypo';
import {String} from '../../utlis/String'
const Payment = (props) => {
  return (
     <ScrollView>
       <View style={{backgroundColor:'#fff',  flex:1,}}> 
    <View style={styles.mainPayment}>
        <View style={styles.paymentimage}>
                <Image source={require('../../assets/images/paymentbg.png')} />
        </View>
      
        <View>
                 <View style={styles.commonpayment}>
                    <View>
                         <Text style={{fontSize:22,color:'#484848',}}>{String.payment.cash}</Text>
                    </View>
                    <View> 
                         <Image source={require('../../assets/images/cash.png')} style={{width: 50,height: 50,}}/>
                    </View>
                 </View>
                 <View style={styles.commonpayment}>
                    <View>
                         <Text style={{fontSize:22,color:'#484848',}}>{String.payment.Online}</Text>
                    </View>
                    <View> 
                         <Image source={require('../../assets/images/Online.png')} style={{width: 50,height: 50,}}/>
                    </View>
                 </View>
                 <View style={styles.commonpayment}>
                    <View>
                         <Text style={{fontSize:22,color:'#484848',}}>{String.payment.Instore}</Text>
                    </View>
                    <View> 
                         <Image source={require('../../assets/images/Instore.png')} style={{width: 50,height: 50,}}/>
                    </View>
                 </View>
        </View>
       
           <View>
               <TouchableOpacity style={styles.button}>
                         <Text style={{color:'#fff',fontSize:15,}}> {String.payment.Next} </Text>
               </TouchableOpacity>
          </View>
          <View>
          
          </View>
    </View>
   
    </View>
    </ScrollView>
 
  );
};
export default Payment;
