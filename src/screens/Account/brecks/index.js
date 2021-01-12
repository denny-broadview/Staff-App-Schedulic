import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import HeaderView from '../../../component/headerTab';
import {String} from '../../../utlis/String';
import {Matrics, Color} from '../../../utlis';
import {Auth, Constants} from '@global';
import {MySpinner} from '../../../component/MySpinner';
import { useSelector } from 'react-redux';
const Breaks = (props) => {
  const userInfo = useSelector(state => state.user.user)
  const [data, setData] = useState([]);
  const [loagind, setLoading] = useState(false);
  useEffect(() => {
    getBreack();
  }, []);

  // Api calling for breck data
  function getBreack() {
    setLoading(true);
    let myForm = new FormData();
    myForm.append('mobile', '');
    console.log('parm Workinghours~~~~~~~~~', myForm);
    Auth.PostCustomerTokenAuth(userInfo.token,userInfo.user_id,myForm, Constants.ApiAction.staffBreck, (res) => {
      console.log('data--------', res);
      if (res[1].data == true) {
        setLoading(false);
        setData(res[1].response);
      } else {
        setData(res.data);
        setLoading(false);
      }
    });
  }
  
  function noItemDisplay() {
    return (
      <View
        style={{flex: 1, alignSelf: 'center', marginTop: Matrics.Scale(50)}}>
        <Text style={{fontSize: 20, color: Color.AppColor}}>{String.app.datanotfound}</Text>
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
        onPress={() => props.navigation.goBack()}
        headertext={String.account.breaks}
      />
      <View style={{justifyContent: 'center'}}>
        <MySpinner size="large" visible={loagind} />
      
        <FlatList
          ListEmptyComponent={noItemDisplay}
          data={data}
          renderItem={({item, index}) => (
            //<TouchableOpacity onPress={() => props.navigation.replace('BookingServiceDetails', {htitle:item.title.find((i)=>i.title)})}>
            <View>
              <View style={styles.border} />
              <TouchableOpacity style={styles.menuView}>
              <Text style={styles.menuname}>{item.days}</Text>
                {item.break_start_time == null && item.break_end_time == null ? <Text style={styles.menu}>Day Off</Text> : <Text style={styles.menu}>{item.break_start_time} {String.account.to} {item.break_end_time }</Text>}         
              </TouchableOpacity>
            </View>
          )}></FlatList>
      </View>
    </View>
  );
};
export default Breaks;
