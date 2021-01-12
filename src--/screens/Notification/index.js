import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import HeaderView from '../../component/headerTab';
import {String} from '../../utlis/String';
import {Matrics, Color} from '../../utlis';
import Icon from 'react-native-vector-icons/AntDesign';
import {Theme, Auth, Constants} from '@global';
import {MySpinner} from '../../component/MySpinner';
import {useSelector} from 'react-redux';
const Notification = (props) => {
  const userInfo = useSelector((state) => state.user.user);

  const [data, setData] = useState([]);
  const [loagind, setLoading] = useState(false);
  useEffect(() => {
    getNotification();
  }, []);

  // Api calling All category
  function getNotification() {
    setLoading(true);
    let myForm = new FormData();
    myForm.append('user_id', userInfo.user_id);
    myForm.append('user_type', 'staff');
    console.log('parm notification~~~~~~~~~', myForm);
    Auth.PostCustomerTokenAuth(
      userInfo.token,
      userInfo.user_id,
      myForm,
      Constants.ApiAction.notification,
      (res) => {
        console.log('data--------', res);
        if (res[1].data == true) {
          setLoading(false);
          setData(res[1].response);
        } else {
          setData(res.data);
          setLoading(false);
        }
      },
    );
  }
  function noItemDisplay() {
    return (
      <View
        style={{flex: 1, alignSelf: 'center', marginTop: Matrics.Scale(50)}}>
        <Text style={{fontSize: 20, color: Color.AppColor}}>
          {String.app.datanotfound}
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <HeaderView
        header={true}
        back={true}
        search={false}
        notification={false}
        searchClick={false}
        onPress={() => props.navigation.navigate('Home')}
        headertext={String.account.notification}
      />
      <View style={{justifyContent: 'center'}}>
        <MySpinner size="large" visible={loagind} />
        <FlatList
          style={styles.list}
          ListEmptyComponent={noItemDisplay}
          data={data}
          renderItem={({item, index}) => (
            //<TouchableOpacity onPress={() => props.navigation.replace('BookingServiceDetails', {htitle:item.title.find((i)=>i.title)})}>

            <TouchableOpacity style={styles.menuView}>
              {item.customer !== null ? (
                <Text style={styles.menuname}>{item.customer.fullname}</Text>
              ) : (
                <Text style={styles.menuname}>null</Text>
              )}

              <Icon name="right" style={styles.menu} />
            </TouchableOpacity>
          )}></FlatList>
      </View>
    </View>
  );
};
export default Notification;
