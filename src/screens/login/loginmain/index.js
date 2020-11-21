import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
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
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/AntDesign';
import {String} from '../../../utlis/String.js';
import styles from './style';

const loginmain = (props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={styles.loginmainarea}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#424DE4'} />
        <View style={styles.loginTopHeading}>
          <Text style={{color: '#484848', fontSize: 20}}>
            {String.loginmain.loginAccount}
          </Text>
          <Text style={{color: '#A3A3A3', fontSize: 18, marginTop: 4}}>
            {String.loginmain.loginDeatils}
          </Text>
        </View>
        <View style={styles.bottomLoginFeilds}>
          <TextInput
            style={{
              height: 50,
              borderColor: '#BBBBBB',
              borderWidth: 1,
              borderRadius: 6,
              padding: 10,
            }}
            placeholder={String.loginmain.loginplaceholderEmail}
            placeholderTextColor="#A3A3A3"></TextInput>
         
          <View style={styles.inputBordePass}>
                         <TextInput
                            secureTextEntry={hidePass ? true : false}
                            style={styles.textCode}
                            onChangeText={(text) => {setPassword(text)} }
                            keyboardType='default'
                            placeholder={String.loginmain.loginplaceholderPassword}
                            placeholderTextColor="#A3A3A3"
                            minLength={8}
                            maxLength={20} />
                            <Icon name={hidePass ? 'eyeo' : 'eye'} style={styles.icon}  onPress={() => setHidePass(!hidePass)} ></Icon>
                         </View>  
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 24,
            }}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <Text style={{color: '#484848', fontSize: 16}}>
              {' '}
              {String.loginmain.Rememberme}{' '}
            </Text>
          </View>
        </View>
        <View style={{position: 'absolute', bottom: 0}}>
          <TouchableOpacity style={styles.button}>
            <Text style={{color: '#fff', fontSize: 15}}>
              {String.loginmain.LoginButtom}{' '}
            </Text>
          </TouchableOpacity>
        </View> 
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default loginmain;
