import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  
} from 'react-native';
import HeaderView from '../../../component/headerTab';
import {MySpinner} from '../../../component/MySpinner';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/AntDesign';
import {String} from '../../../utlis/String.js';
import styles from './style';
import {Auth, Constants} from '@global';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setUserData,
  setUserToken,
  setUserImage,
  setUserId,
} from '../../../store/actions';
import Validate from '../../../utlis/Validate';
// import firebase from 'react-native-firebase';

var fcmToken;
const LoginMain = (props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loding, setLoding] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // _checkPermission();
  }, []);
  async function _checkPermission() {
    // const enabled = await firebase.messaging().hasPermission();
    // _getToken();
  }

  // async function _getToken() {
  //   fcmToken = await firebase.messaging().getToken();
  //   console.log('fcmtoken------------', fcmToken);
  //   await AsyncStorage.setItem('fcmToken', fcmToken);
  //   const channel = new firebase.notifications.Android.Channel(
  //     'general',
  //     'General',
  //     firebase.notifications.Android.Importance.Max,
  //   ).setDescription('general notification channel');
  //   firebase.notifications().android.createChannel(channel);
  // }

  function mobileLogin() {
    let myForm = new FormData();
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('device_token', fcmToken);
    console.log('mobileLogin req =====>', myForm);
    setLoding(true);
    Auth.PostServiceAuth(myForm, Constants.ApiAction.mobileLogin, (res) => {
      setLoding(false);
      console.log('mobileLogin api=====>', res);
      console.log('mobileLogin api status=====>', res[1].data);

      if (res[1].data === true) {
        onSetUserId(res[1].response.user_id);
        onSetUserData(res[1].response);
        onSetUserToken(res[1].response.token);
        onSetUserImage(res[1].response.image);
        console.log('onSetUserToken---', onSetUserToken(res[1].response.token));

        props.navigation.navigate('Home'); 
      } else {
        // console.log('else ',res[1].response);
        Auth.ToastMessage(res[1].response);
      }
    });
  }

  const onSetUserId = (id) => dispatch(dispatch(setUserId(id)));
  const onSetUserData = (item) => dispatch(dispatch(setUserData(item)));
  const onSetUserToken = (item) => dispatch(dispatch(setUserToken(item)));
  const onSetUserImage = (item) => dispatch(dispatch(setUserImage(item)));
  // validation
  function validation() {
    if (Validate.isEmpty(email) && Validate.isEmpty(password)) {
      setLoding(false);
      Auth.ToastMessage(String.loginmain.error_message_allFieldsManatory);
    } else if (Validate.isEmpty(email)) {
      setLoding(false);
      Auth.ToastMessage(String.loginmain.error_message_email);
    } else if (!Validate.isEmail(email)) {
      setLoding(false);
      Auth.ToastMessage(String.loginmain.error_message_email_valid);
    } else if (Validate.isEmpty(password)) {
      setLoding(false);
      Auth.ToastMessage(String.loginmain.error_message_password);
    } else if (Validate.isLessThen(password)) {
      setLoding(false);
      Auth.ToastMessage(String.loginmain.error_message_password_length);
    } else {
      setLoding(true);
      mobileLogin();
    }
  }
  return (
    <View style={{flex: 1}}>
      <HeaderView
        header={true}
        back={false}
        search={false}
        notification={false}
        headertext={String.loginmain.LoginButtom}
        searchClick={false}
      />
      <ScrollView>
        <View style={styles.loginmainarea}>
          <MySpinner size="large" visible={loding} />
          <View style={styles.loginTopHeading}>
            <Text style={styles.loginTopText}>
              {String.loginmain.loginAccount}
            </Text>
            <Text style={styles.loginTextDetail}>
              {String.loginmain.loginDeatils}
            </Text>
          </View>
          <View style={styles.bottomLoginFeilds}>
            <View style={styles.inputBordePass}>
              <TextInput
                style={styles.textInpute}
                placeholder={String.loginmain.loginplaceholderEmail}
                onChangeText={(text) => {
                  setEmail(text);
                }}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputBordePass}>
              <TextInput
                secureTextEntry={hidePass ? true : false}
                style={styles.textInpute}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                keyboardType="default"
                placeholder={String.loginmain.loginplaceholderPassword}
                minLength={8}
                maxLength={20}
              />
              <Icon
                name={hidePass ? 'eyeo' : 'eye'}
                style={styles.icon}
                onPress={() => setHidePass(!hidePass)}></Icon>
            </View>
            {/* <View
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
            <Text style={styles.checkText}>{String.loginmain.Rememberme}</Text>
          </View> */}
          </View>
          <View style={styles.buttoView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => validation()}>
              <Text style={styles.buttonText}>
                {String.loginmain.LoginButtom}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginMain;