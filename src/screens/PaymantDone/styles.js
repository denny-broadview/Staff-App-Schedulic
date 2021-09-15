import { Platform, StyleSheet } from 'react-native';
import { Matrics,Color } from '../../utlis';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  
    container: {
        flex: 1,
        backgroundColor: Color.white
      },
      rigthIocnView:{
          marginTop:hp('20%'),
          justifyContent:'center',
          alignSelf:'center'
      },
      icon: {
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        color: Color.AppColor,
        backgroundColor:Color.white,
        fontSize:84
     },
     thankyouView:{
         justifyContent:'center',
         alignSelf:'center',
         marginTop:hp('5%')
     },
     topText:{        
        fontSize:22,
        color:Color.bleck,
        fontWeight:'bold',
        justifyContent:'center',
        alignSelf:'center'
    },
    descriptionText:{
      marginTop:hp('1%'),
        fontSize:14,
        color:Color.ligthGray,
        justifyContent:'center',
        alignSelf:'center'
    },
    orderidView:{
        marginTop:hp('2%'),
        justifyContent:'center',
        alignSelf:'center',
        flexDirection:'row'
    },
   
    logo:{
        justifyContent:'center',
        alignSelf:'center',
        resizeMode:'stretch',
      
    },
    proceedtocheckMainView: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: wp('90%'),
        bottom: hp('-5%'),
       
      },
      buttonStylupdate: {
        borderRadius: Matrics.Scale(5),
        backgroundColor: Color.AppColor,
        width: wp('90%'),
        height: Platform.OS == 'ios' ? hp('6%') : hp('6%'),
        alignItems: 'center',
        justifyContent: 'center'
      },
      textUpdate: {
        color: '#fff',
        fontWeight: '500',
        fontSize: Matrics.Scale(16),
      },

})