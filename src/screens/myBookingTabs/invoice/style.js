import { StyleSheet, Platform } from 'react-native';
import { Matrics,Color } from '../../../utlis';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
 
 
export default StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: Color.white,
        },
        
     sendinvoice:{
          padding:16,
          shadowColor: "#000",
          shadowOffset: {
               width: 0,
               height: 10,
          },
          shadowOpacity: 0.40,
          shadowRadius: 10.32,
          elevation: 8,
          backgroundColor:'#fff'
     
     },
     button: {
          alignItems: "center",
          backgroundColor: "#169A23",
          padding: 12,
          borderRadius:6,
          width:wp('90%'),
        },
     invoicebottom:{
          shadowColor: "#000",
          shadowOffset: {
               width: 0,
               height: 10,
          },
          shadowOpacity: 0.60,
          shadowRadius: 10.32,
          elevation: 8,
          backgroundColor:'#fff',
          height:600,
          marginTop:20,
          borderRadius:2
     },
     commontopheading:{
          fontSize:16,
          color:'#1273F6',
     },
     commoncartdetails:{
          fontSize:16,
          color:'#6D5959', 
     },
     totalDetails:{
          flexDirection:'row',
          width:'100%',
          height:36,
          justifyContent:'space-between'
     }

})