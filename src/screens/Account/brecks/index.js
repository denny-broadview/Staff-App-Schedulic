import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import HeaderView from '../../../component/headerTab';
import {String} from '../../../utlis/String';
import {Matrics, Color} from '../../../utlis';
import {Theme, Auth, Constants} from '@global';
import {MySpinner} from '../../../component/MySpinner';

const Breaks = (props) => {
  const [data, setData] = useState([
    {name: 'Sunday',Time:'8:00 am To 6:00 pm'},
    {name: 'Monday',Time:'10:00 am To 4:00 pm'},
    {name: 'Tuesday',Time:'Day off'},
  ]);
  const [loagind, setLoading] = useState(false);
  useEffect(() => {}, []);

  // Api calling for breck data
  function getBreack() {
    setLoading(true);
    let myForm = new FormData();
    myForm.append('staff_id', userInfo.user_id);
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
        <Text style={{fontSize: 20, color: Color.AppColor}}>No data found</Text>
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
                <Text style={styles.menuname}>{item.name}</Text>
                <Text style={styles.menu}>{item.Time}</Text>
                {/* <Icon name="right" style={styles.menu} /> */}
              </TouchableOpacity>
            </View>
          )}></FlatList>
      </View>
    </View>
  );
};
export default Breaks;
