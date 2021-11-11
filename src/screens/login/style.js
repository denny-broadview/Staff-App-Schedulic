import { StyleSheet } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { Color } from '../../utlis';

export default StyleSheet.create({
    mainView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:wp('90%'),
        alignSelf:'center'
    },
    backgroundImage:{
        flex:1,
        // paddingLeft:22,
        //paddingRight:22
    },
    loginLogo:{
        justifyContent: 'center',
        alignItems: 'center',
      
    },
    loginView:{
        backgroundColor:'#868686',
        marginBottom:20,
        paddingTop:12,
        paddingBottom:12,
        paddingLeft:24,
        paddingRight:24,
        borderRadius:6,
        flexDirection:'row',
        alignItems:"center",
        
    },
    button: {
        alignItems: "center",
        backgroundColor: Color.AppColor,
        padding: 12,
        borderRadius:6,
        width:wp('90%'),
        marginBottom:40
      },
})