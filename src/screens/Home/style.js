import { StyleSheet, Platform } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { Matrics,Color } from '../../utlis';

export default StyleSheet.create({

     mainHome:{
          flex:1,
          justifyContent:'center',
          alignContent:'center',
          alignSelf:'center',
     },
     topprofiledeatils:{
          padding:20,
          flexDirection:'row',
          marginBottom:'8%',
          marginTop:'4%',
     },
     profileimage:{
          height:80,
          width:80,
          shadowColor: Color.bleck,
          shadowOffset: {
               width: 0,
               height: 8,
          },
          shadowOpacity: 0.44,
          shadowRadius: 10.32,
          elevation: 8,
          borderRadius:50
     },
     imageStyle:{
          width: '100%',
          height: '100%',
          borderRadius: 100,
          borderWidth: 5,
          borderColor: Color.white,
     },
     topHorizontlView:{
          flexDirection: 'row', 
          alignItems: 'center'
     },
     hollText:{
          fontSize: 24, 
          color: Color.AppColor,
          fontFamily:"BAHNSCHRIFT",
     },
     userText:{
          color: Color.bleck, 
          fontSize: 16,
          marginTop:8,
          fontFamily:"BAHNSCHRIFT",
          textTransform:"capitalize"
     },
     rating: {
          width: wp('30%'),
        },
     
     bgimagehome:{
          height:hp('70%'),
          width:wp('100%'),
         
     },
     dateTex:{
          fontSize:20,
          color:Color.white
     },
     imageIcon:{
          width: 70,
          height: 70
     },
     icon: {
          alignSelf:'center',
          color:Color.white,
          fontSize: 22,
          fontWeight:'bold'
      },
      bottomMainprofile:{
           marginBottom:"14%"
      },
      commonProfile:{
          backgroundColor:Color.white,
          padding:24,
          borderRadius:8,
          flexDirection:'row',
          alignItems:'center',
          marginTop:8,
          marginBottom:8,
      },
      btnCard:{
          flexDirection:'row',
          alignItems:'center',
      },
      cardView:{
          margin: 10,
          flexDirection:'row',
          flex:2,
          justifyContent:'space-between'
      },
      cardTextTitel:{
          fontSize: 18, 
          color: Color.darkGray,
          fontFamily:"BAHNSCHRIFT", 
      },
      cardSubTextTitle:{
          color: Color.silver,
          fontSize: 14,
          marginTop:Matrics.Scale(1),
          fontWeight:"500",
          fontFamily:"BAHNSCHRIFT",
      },
      bookingCount:{
          fontSize:28,
          color:Color.pink,
          fontWeight:'bold',
          fontFamily:"BAHNSCHRIFT",
      },
      ongoingCount:{
          fontSize:28,
          color:Color.ligthGreen,
          fontWeight:'bold'
      },
      completCount:{
          fontSize:28,
          color:Color.yellow,
          fontWeight:'bold'
      }
})