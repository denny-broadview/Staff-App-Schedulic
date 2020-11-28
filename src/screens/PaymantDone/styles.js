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
        bottom: hp('-1%'),
       
      },
      buttonStylupdate: {
        borderWidth: 1,
        borderColor: 'rgba(66, 77, 228, 1)',
        borderRadius: Matrics.Scale(5),
        backgroundColor: Color.AppColor,
        borderRadius: Matrics.Scale(5),
        width: wp('90%'),
        height: Platform.OS == 'ios' ? hp('6%') : hp('8%'),
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
      },
      textUpdate: {
        justifyContent: 'center',
        color: '#fff',
        fontWeight: '500',
        fontSize: Matrics.Scale(18),
        textAlign: 'center',
        top: Platform.OS === 'ios' ? hp('1%') : hp('2%'),
      },

})