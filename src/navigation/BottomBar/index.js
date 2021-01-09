import React, { Component, useState } from 'react'
import { Text, View, TouchableOpacity, ImageBackground, Image,FlatList } from 'react-native'
// import { FlatList } from 'react-native-gesture-handler'
import Color from '../../utlis/Color';
//icon
import Feather from 'react-native-vector-icons/Feather'
//styles
import BOTTOM from '../../assets/images/bottomview.png'
import { Auth, Constants} from '../../global';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// const [show ,setShow] = useState(false)
const HOME = (<Feather name="home" size={20} />)
const MYBOOKING = (<Feather name="calendar" size={20} />)
const MYACCOUNT = (<Feather name="user" size={20} />)


const BottomBar = (props) => {
 
  const [data, setdata] = useState([
    { img: HOME, name: "Home", selected: true },
    { img: MYBOOKING, name: "MyBooking", selected: false },
    { img: MYACCOUNT, name: "Account", selected: false },
  ])

  const onPressItem = (curruntindex) => {
    let temparr = data
    temparr.forEach((ele, index) => {
      if (index == curruntindex) {
        temparr[curruntindex].selected = true
      } else {
        temparr[index].selected = false
      }
    })
    setdata(temparr)

    if (curruntindex == 0) {
      props.navigation.navigate('Home')
    } else if (curruntindex == 1) {
      props.navigation.navigate('NewBookingTab')
    } else if (curruntindex == 2) {
      props.navigation.navigate('MyAccount')
    }

  }
  return (
    <View>
      <ImageBackground source={require('../../assets/images/bottomview.png')} style={{ height:hp('10%'), alignItems: 'center', width: wp('100%'), flexDirection: 'row',backgroundColor:'#fff',}}>
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          style={{flex:1}}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity style={{ flex:1,alignItems: "center",justifyContent:'space-between',marginHorizontal:wp('10%')}} onPress={() => onPressItem(index)}>
                <Text style={[{size:10, color: item.selected ? Color.AppColor : Color.gray ,size:10}]}>{item.img}</Text>
                <Text style={[{ size:10,color: item.selected ? Color.AppColor : Color.gray ,size:10}]}>{item.name}</Text>
              </TouchableOpacity>
            )
          }}
        />
        
      </ImageBackground>
    </View>
    // <View>
    //   <View style={{ height:hp('10%'), alignItems: 'center', width: wp('100%'), flexDirection: 'row',backgroundColor:'#EFEFEF' ,borderRadius: 20,}}> 
    //   <FlatList
    //     data={data}
    //     showsHorizontalScrollIndicator={false}
    //     style={{flex:1}}
    //     horizontal
    //     renderItem={({ item, index }) => {
    //       return (
    //         <TouchableOpacity style={{ flex:1,alignItems: "center",justifyContent:'space-between',marginHorizontal:wp('10%')}} onPress={() => onPressItem(index)}>
    //           <Text style={[{size:10, color: item.selected ? Color.AppColor : Color.gray ,size:10}]}>{item.img}</Text>
    //           <Text style={[{ size:10,color: item.selected ? Color.AppColor : Color.gray ,size:10}]}>{item.name}</Text>
    //         </TouchableOpacity>
    //       )
    //     }}
    //   />
    // </View>
    // </View>
  )

}

export default BottomBar
