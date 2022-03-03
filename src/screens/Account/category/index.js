import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import HeaderView from '../../../component/headerTab';
import { String } from '../../../utlis/String';
import { Matrics, Color } from '../../../utlis';
import { Auth, Constants } from '@global';
import { MySpinner } from '../../../component/MySpinner';
import { useSelector } from 'react-redux';
const Category = (props) => {
  const userInfo = useSelector(state => state.user.user)
  const [data, setData] = useState([]);
  const [loagind, setLoading] = useState(false);
  // console.log("userInfo-----------", userInfo);
  useEffect(() => {
    getService();
  }, []);

  // Api calling for breck data
  function getService() {
    setLoading(true);
    Auth.PostCustomerTokenAuth(userInfo.token, userInfo.user_id, '', Constants.ApiAction.getCatgorywithService, (res) => {
      console.log('data--------', res);
      if (res[1].data == true) {
        setLoading(false);
        setData(res[1].response);
      } else {
        // setData(res.data);
        setLoading(false);
      }
    });
  }
  function noItemDisplay() {
    return (
      <View
        style={{ flex: 1, alignSelf: 'center', marginTop: Matrics.Scale(50) }}>
        <Text style={{ fontSize: 20, color: Color.AppColor }}>{String.app.datanotfound}</Text>
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
        headertext={String.account.category}
      />
      <View style={{ justifyContent: 'center' }}>
        <MySpinner size="large" visible={loagind} />
        {/* <Text style={styles.categoryText}>{String.account.category}</Text> */}
        <FlatList
          ListEmptyComponent={noItemDisplay}
          data={data}
          renderItem={({ item, index }) => (
            //<TouchableOpacity onPress={() => props.navigation.replace('BookingServiceDetails', {htitle:item.title.find((i)=>i.title)})}>
            <View>

              <TouchableOpacity style={styles.menuView}>
                <Text style={styles.categoryText}>{item.category_title}</Text>
                {/* <Icon name="right" style={styles.menu} /> */}
              </TouchableOpacity>
              <FlatList
                data={item.services}
                renderItem={({ item }) =>
                  <View>
                    <View style={styles.border} />
                    <Text style={styles.menuname}>{item.service_name}</Text>
                  </View>
                }
                keyExtractor={item => item.id}
              />
            </View>
          )}></FlatList>
      </View>
    </View>
  );
};
export default Category;
