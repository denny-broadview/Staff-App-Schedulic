import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  YellowBox,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {String} from '../../utlis/String.js';

import styles from './style';

const Login = (props) => {
  return (
    <ImageBackground
      source={require('../../assets/images/login-bg.png')}
      style={styles.backgroundImage}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#424DE4'} />
        <View style={styles.mainView}>
          <View style={styles.loginLogo}>
            <Image
              source={require('../../assets/images/login-logo.png')}></Image>
            <Text style={{color: '#A3A3A3', marginTop: 10}}>
              
              {String.login.AppoitmentBookingApp}{' '}
            </Text>
          </View>
          <View style={{marginTop: wp('20%'), width: '100%'}}>
            <View style={styles.loginView}>
              <Image source={require('../../assets/images/login.png')}></Image>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: '500',
                  marginLeft: 12,
                }}>
               
                {String.login.LoginText}{' '}
              </Text>
            </View>
            <View style={styles.loginView}>
              <Image source={require('../../assets/images/signup.png')}></Image>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: '500',
                  marginLeft: 12,
                }}>
                {String.login.SignText}{' '}
              </Text>
            </View>
          </View>
          <View style={{position: 'absolute', bottom: 0}}>
            <TouchableOpacity style={styles.button}>
              <Text style={{color: '#fff', fontSize: 15}}>
                {' '}
                {String.login.ContinueButton}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Login;
