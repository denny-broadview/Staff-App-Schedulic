import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import HeaderView from '../../../component/headerTab';
import {String} from '../../../utlis/String';
import {Matrics, Color} from '../../../utlis';
import {Theme, Auth, Constants} from '@global';
import {MySpinner} from '../../../component/MySpinner';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
const PostalCode = (props) => {
  const userInfo = useSelector(state => state.user.user)
  const [data, setData] = useState([]);
  const [loagind, setLoading] = useState(false);
  useEffect(() => {
    getPostalcodeApi();
  }, []);

   // api calling postalcode
   function getPostalcodeApi() {
    setLoading(true);
    console.log("token--",userInfo.token);
    console.log("userid---",userInfo.user_id);
    Auth.PostCustomerTokenAuth(userInfo.token,
      userInfo.user_id,"", Constants.ApiAction.postcodeList, (res) => {
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
        onPress={() => props.navigation.navigate('MyAccount')}
        headertext={String.account.postlCode}
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
                <View style={{flexDirection:'row'}}> 
                <Icon name="map-marker-alt" style={styles.menu} />
                <Text style={styles.menuname}>{item.area}</Text>
                </View>
                <View> 
                <Text style={styles.menu}>{item.postal_code}</Text>
                {/* <Icon name="right" style={styles.menu} /> */}
                </View>
              </TouchableOpacity>
            </View>
          )}></FlatList>
      </View>
    </View>
  );
};
export default PostalCode;
