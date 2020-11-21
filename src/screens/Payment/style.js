import { StyleSheet, Platform } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export default StyleSheet.create({
     mainPayment:{
          flex:1,
          justifyContent:'center',
          width:wp('90%'),
          alignSelf:'center',
     },
   paymentimage:{
     justifyContent:'center',
     alignSelf:'center',
     paddingTop:60,
     paddingBottom:60
   },
   commonpayment:{
     backgroundColor:'#424de414',
     padding:16,
     borderRadius:8,
     flexDirection:'row',
     alignItems:'center',
     marginTop:8,
     marginBottom:8,
     justifyContent:'space-between'
 },
 button: {
     alignItems: "center",
     backgroundColor: "#424DE4",
     padding: 12,
     borderRadius:6,
     width:wp('90%'),
     marginBottom:40,
     alignSelf:'center',
     justifyContent:'center',
     alignItems:'center',
     marginTop:20
     
   },


})