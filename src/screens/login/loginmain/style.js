import { StyleSheet, Platform } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export default StyleSheet.create({
     loginmainarea:{  
       width:wp('90%'),
       flex:1,
       alignSelf:'center',
     },
     loginTopHeading:{
     marginTop:'20%',
     marginBottom:'10%'
    },
    checkboxContainer: {
     flexDirection: "row",
     marginBottom: 20,
   },
   button: {
     alignItems: "center",
     backgroundColor: "#424DE4",
     padding: 12,
     borderRadius:6,
     width:wp('90%'),
     marginBottom:40
   },
   inputBordePass:{
      flexDirection:'row',
      borderWidth: 1,
      borderColor: "rgba(187, 187, 187, 1)",
      borderRadius:5,
      marginTop:20,
      width: wp('90%'),
   },
   textCode:{
      justifyContent:'center', 
      color:'#000',
      width: wp('80%'),
      marginLeft:wp('2%')
     
    },
    icon: {
      alignSelf:'center',
      color:'#ccc',
      fontSize: 22,
      fontWeight:'bold'
  },
})