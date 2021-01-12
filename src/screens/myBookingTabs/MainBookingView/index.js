import React, {Component, useState} from 'react';
import {View, Text, Alert, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import {String} from '../../../utlis/String';
import HeaderView from '../../../component/headerTab';

import {Color, Matrics} from '../../../utlis';
import { useDispatch } from 'react-redux';
import { setSearchKey } from '../../../store/actions'
const MyBookingMainView = ({navigation}) => {
  return renderMainView({navigation});
};

const onPressItem = (curruntindex, {navigation, data, setdata}) => {
  let temparr = data;
  temparr.forEach((ele, index) => {
    if (index == curruntindex) {
      temparr[curruntindex].selected = true;
    } else {
      temparr[index].selected = false;
    }
    setdata(temparr);
  });

  if (curruntindex == 0) {
    navigation.navigate('NewBookingTab');
  } else if (curruntindex == 1) {
    navigation.navigate('OngoingTab');
  } else if (curruntindex == 2) {
    navigation.navigate('CompletedTab');
  }
};

const renderMainView = ({navigation}) => {
  return (
    <View>
      {renderHeader({navigation})}
      {renderTopBar({navigation})}
    </View>
  );
};

const renderHeader = (props) => {
  /// Searchbar
  let [enableSearch, setEnableSearch] = useState(false);
  let [enable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  
   // searchbar 
   const fnSearchEnable = () => {
    setEnableSearch(!enable)
    // console.log(enableSearch);
  }
  const onSearchClear = () => {
    console.log("onSearchClear");
    setSearchTerm("");
    setEnableSearch(false)
    onSetSearchkey('')

  }
  const onChange = (e) => {
    setSearchTerm(e?.nativeEvent?.text);
    onSetSearchkey(e?.nativeEvent?.text)
    // searchFilterFunction(e?.nativeEvent?.text);

  };

  const onSetSearchkey = key =>
    dispatch(setSearchKey(key))

  return (
    <HeaderView
      header={true}
      back={false}
      notification={true}
      onPressNoti={() => props.navigation.replace('Notification')}
      headertext={String.MyBookingTab.myBooking}
      //Sreachbar
      onPressSearch={() => fnSearchEnable()}
      search={true}
      searchClick={enableSearch}
      onSearchClear={onSearchClear}
      onChangeSearch={onChange}
      searchTerm={searchTerm}
    />
  );
};

const renderTopBar = ({navigation, arshad}) => {
  const [data, setdata] = useState([
    {name: 'New Bookings', selected: true},
    {name: 'Ongoing', selected: false},
    {name: 'Completed', selected: false},
  ]);

  return (
    <View style={{backgroundColor: Color.white}}>
      <FlatList
        data={data}
        horizontal
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-around',
          backgroundColor: Color.white,
          marginTop: 10,
        }}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => onPressItem(index, { navigation, data, setdata },arshad)}>
              <Text style={[styles.txtxname, { color: item.selected ? Color.AppColor : Color.iconAccount}]}>{item.name}</Text>
              {item.selected && <View style={styles.underLine} />}
            </TouchableOpacity>
          );
        }}
      />
      <View style={{ width: '90%', height: 1, backgroundColor: Color.linecolor, alignSelf: 'center' }}></View>
    </View>
  )
}
export default MyBookingMainView;
