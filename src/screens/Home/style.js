import { StyleSheet, Platform } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export default StyleSheet.create({

     mainHome:{
          flex:1,
          justifyContent:'center',
          alignContent:'center',
     },
     topprofiledeatils:{
          padding:20,
          flexDirection:'row',
          marginBottom:'10%',
          marginTop:'6%'  
     },
     profileimage:{
          height:80,
          width:80,
          shadowColor: "#000",
          shadowOffset: {
               width: 0,
               height: 8,
          },
          shadowOpacity: 0.44,
          shadowRadius: 10.32,
          elevation: 8,
          borderRadius:50
     },
     rating: {
          width: wp('30%'),
          marginLeft:wp('2%'),
        },
     bgimagehome:{
          height:hp('70%'),
          width:wp('100%'),
     },
     icon: {
          alignSelf:'center',
          color:'#fff',
          fontSize: 22,
          fontWeight:'bold'
      },
      commonProfile:{
          backgroundColor:'#fff',
          padding:20,
          borderRadius:8,
          flexDirection:'row',
          alignItems:'center',
          marginTop:8,
          marginBottom:8,
      },
     

})