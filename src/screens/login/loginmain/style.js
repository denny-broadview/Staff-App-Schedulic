import { StyleSheet, Platform } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { Matrics,Color } from '../../../utlis';
export default StyleSheet.create({
     loginmainarea:{  
       width:wp('90%'),
       flex:1,
       alignSelf:'center',
     },
     loginTopHeading:{
     marginTop:hp('5%'),
     marginBottom:hp('5%')
    },
    loginTopText:{
      color: Color.darkGray, 
      fontSize: 20
    },
    loginTextDetail:{
      color: Color.ligthGray, 
      fontSize: 18,
       marginTop: 4
    },
    checkboxContainer: {
     flexDirection: "row",
     marginBottom: 20,
   },
   button: {
     alignItems: "center",
     backgroundColor: Color.AppColor,
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
   textInpute:{
      justifyContent:'center', 
      color:Color.bleck,
      width: wp('80%'),
      marginLeft:wp('2%')
     
    },
    icon: {
      alignSelf:'center',
      color:Color.ligthGray,
      fontSize: 22,
      fontWeight:'bold'
  },
  checkText:{
    color: Color.darkGray, 
    fontSize: 16
  },
  buttoView:{
    position: 'absolute', 
    bottom: 0
  },
  buttonText:{
    color: Color.white,
     fontSize: 16
  }
})