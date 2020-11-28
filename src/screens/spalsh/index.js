import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, Image, SafeAreaView} from 'react-native';
import {String} from '../../utlis/String.js';
import styles from './style';
import { useSelector } from 'react-redux';
const Spalsh = (props) => {
  const userToken = useSelector(state => state.user.token)
    console.log('userToken in Splash ----', userToken);
  useEffect(() => {
    TimeOut();

}, [])

function TimeOut() {
    setTimeout(() => {
        if (userToken !== null) {
            props.navigation.replace('Home')
        } else {
            props.navigation.replace('LoginMain')
        }

       // props.navigation.navigate('LoginMain')
    }, 3000);
}
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#424DE4'}}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#424DE4'} />
      <View style={styles.mainView}>
        <Image
          source={require('../../assets/images/spleshscreenlogo1.png')}></Image>
        <Text style={{color: '#fff', marginTop: 10}}>
          {String.login.AppoitmentBookingApp}
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default Spalsh;
