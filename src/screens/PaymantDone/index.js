import React, {useEffect,useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import {String} from '../../utlis/String';
import { MySpinner } from '../../component/MySpinner';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from 'react-native-snackbar';
import {Auth, Constants} from '@global';
const PaymantDone = (props) => {
  const orderId = props.route.params.order_id;
  const userInfo = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false)
  // console.log('props ---  ',props);

  useEffect(() => {
   console.log('orderId ---  ',orderId);
  }, [orderId]);

    // Api calling for newBookings
    function getStatus() {
      console.log('usertoken----', userInfo.token);
      setLoading(true);
      let myForm = new FormData();
      myForm.append('order_item_id', orderId);
      myForm.append('staff_id', userInfo.user_id);
      myForm.append('order_status', 'CO');
      console.log('parm ongoing status~~~~~~~~~', myForm);
      Auth.PostCustomerTokenAuth(
          userInfo.token,
          userInfo.user_id,
          myForm,
          Constants.ApiAction.status_update,
          (res) => {
              console.log(' ongoing data status--------', res);
              if (res[1].data == true) {
                setLoading(false);
                  setTimeout(() => {
                      Snackbar.show({
                          text: 'Appointment Updated',
                          duration: Snackbar.LENGTH_SHORT
                      });
                  }, 1000);
                  props.navigation.replace('Home')
              }
              else{
                setLoading(false);
              }
          },
      );
  }

  return (
    <View style={styles.container}>
       <MySpinner size="large"
        visible={loading} />
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
        <Text style={styles.topText}>{orderId}</Text>
      </View>
      <View style={styles.proceedtocheckMainView}>
        <TouchableOpacity style={styles.buttonStylupdate}  onPress={() => getStatus()}>
          <Text style={styles.textUpdate}>{String.success.done}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PaymantDone;
