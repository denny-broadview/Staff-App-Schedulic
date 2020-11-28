import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import HeaderView from '../../../component/headerTab';
import styles from './styles';
import {String} from '../../../utlis/String';
import {MySpinner} from '../../../component/MySpinner';
import { useDispatch,useSelector } from 'react-redux';
import {setUserData} from '../../../store/actions';
import {Auth, Constants} from '@global';
const AccountDetails = (props) => {
  const userInfo = useSelector(state => state.user.user)
  const [fname, setfName] = useState('');
  const [lname,setlName]= useState('');
  const [email, setEmail] = useState('');
  const [Phonenumber, setPhonenumber] = useState('');
  const [loagind, setLoading] = useState(false);
  const dispatch = useDispatch()
  const onSetUserData = (item) => dispatch(dispatch(setUserData(item)));
  useEffect(() => {
   

    var fullName = userInfo.full_name.split(' '),
    firstName = fullName[0],
    lastName = fullName[fullName.length - 1];

    console.log('fname--',firstName);
    console.log('lname--',lastName);

    setfName(firstName);
    setlName(lastName)
    setEmail(userInfo.email);
    setPhonenumber(userInfo.phone);
   }, []);
 
    // Api calling for breck data
  function editProfile() {
    setLoading(true);
    let myForm = new FormData();
    myForm.append('staff_id', userInfo.user_id);
    myForm.append('firstname',fname);
    myForm.append('lastname',lname);
    myForm.append('email',email);
    myForm.append('phone',Phonenumber)
    console.log('parm Editprofile~~~~~~~~~', myForm);
    Auth.PostCustomerTokenAuth(userInfo.token,userInfo.user_id,myForm, Constants.ApiAction.staffEditProfile, (res) => {
      console.log('data--------', res);
      if (res[1].data == true) {
        setLoading(false)
      //  Auth.ToastMessage(res[1].response);
      onSetUserData(res[1].response);
       
        console.log('Userdata---', onSetUserData(res[1].response));
        props.navigation.replace('MyAccount')
      
      }
    else {
      Auth.ToastMessage(JSON.stringify(res[1].response));
      setLoading(false)
    }
    });
  }
  function validation() {
    console.log(userInfo);
    let regExp = /^(?:[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

    if (fname == '' && lname == '' && email == '' && Phonenumber == '') {
      setLoading(false);
      Auth.ToastMessage(String.loginmain.error_message_allFieldsManatory);
    } else if (fname == '') {
      setLoading(false);

      Auth.ToastMessage(String.loginmain.error_message_fname);
    }
    else if(lname == ''){
      setLoading(false);

      Auth.ToastMessage(String.loginmain.error_message_lname);
    } 
    else if (email == '') {
      setLoading(false);

      Auth.ToastMessage(String.loginmain.error_message_email);
    } else if (regExp.test(email) == false) {
      setLoading(false);

      Auth.ToastMessage(String.loginmain.error_message_email_valid);
    } else if (Phonenumber == '') {
      setLoading(false);

      Auth.ToastMessage(String.loginmain.error_message_phone_no);
    } else if (Phonenumber.length < 10) {
      setLoading(false);

      Auth.ToastMessage(String.login.error_message_phone_length);
    } else {
      editProfile();
    }
  }
  return (
    <View style={styles.container}>
      <HeaderView
        header={true}
        back={true}
        search={false}
        notification={false}
        searchClick={false}
        onPress={() => props.navigation.goBack()}
        headertext={String.account.accountDetails}
      />
      <ScrollView bounces={false} style={{flex: 1}}>
        <KeyboardAvoidingView>
          <View style={styles.mainView}>
            <MySpinner size="large" visible={loagind} />
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View style={styles.inputBorde}>
                <TextInput
                  style={styles.textCode}
                  value={fname}
                  onChangeText={(text) => {
                    setfName(text);
                  }}
                  placeholder={String.account.fname}
                  keyboardType="default"
                />
              </View>
              <View style={styles.inputBorde}>
                <TextInput
                  style={styles.textCode}
                  value={lname}
                  onChangeText={(text) => {
                    setlName(text);
                  }}
                  placeholder={String.account.lname}
                  keyboardType="default"
                />
              </View>
              <View style={styles.inputBorde}>
                <TextInput
                  style={styles.textCode}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                  placeholder={String.loginmain.loginplaceholderEmail}
                  keyboardType="email-address"
                />
              </View>
              <View style={styles.inputBorde}>
                <TextInput
                  style={styles.textMobileNumber}
                  value={Phonenumber}
                  onChangeText={(text) => {
                    setPhonenumber(text);
                  }}
                  placeholder={String.account.mobileNumber}
                  keyboardType="number-pad"
                  maxLength={12}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={styles.loginButtonMainView}>
        <TouchableOpacity
          style={styles.buttonStylupdate}
          onPress={() => validation()}>
          <Text style={styles.textUpdate}>{String.account.update}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AccountDetails;
