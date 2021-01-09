import { StyleSheet } from 'react-native';
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
    title:{
        width:wp('40%'),
        color: Color.white,
        fontSize: 14,
        justifyContent:'center',
        alignSelf:'center',
        fontWeight:'bold',
        marginTop:Platform.OS === 'ios' ? hp('3%') : null,
        marginLeft:wp('30%')
    },
    topMain:{
        flexDirection:'row',
        backgroundColor:'#F9F9F9'
    },
    nameLest:{
        width:wp('70%'),
        justifyContent:'center',
        alignSelf:'center',
        margin:wp('5%')
    }, 
    username:{
        color:Color.bleck,
    }, 
    emailphone:{
        color:Color.gray,
        fontSize:12
    },
    editimg: {
        justifyContent:'center',
        alignSelf:'center'
    },
    icon: {
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        color: Color.white,
        backgroundColor:Color.AppColor,
        borderRadius:20,
        padding:10,
        fontSize:14,
        fontWeight:'900',
        marginLeft: wp('6.5%'),
        overflow: "hidden"
    },
    menuView:{
        flexDirection:'row',
        marginTop: Matrics.Scale(6),
        marginBottom: Matrics.Scale(6),
    },
    menu:{
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        color: Color.iconAccount,
        padding:10,
        fontSize:20,
        fontWeight:'900',
        marginLeft: wp('2%'),
    },
    menulogout:{
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        color: Color.pink,
        padding:10,
        fontSize:20,
        fontWeight:'900',
        marginLeft: wp('2%'),
    },
    menuname:{
            color:Color.gray,    
            justifyContent:'center',
            alignSelf:'center'
    },
    menunameLogout:{
        color:Color.pink,    
        justifyContent:'center',
        marginTop:hp('2%')
},
    viewBoder:{
        opacity: 1,
        width:wp('90%'),
        height:hp('0.1%'),
        justifyContent:'center',
        marginLeft: wp('5%'),
        marginRight:wp('5%'),
        backgroundColor: "rgba(240, 240, 240, 10)",
    },
    btnPhone:{
        alignSelf:'flex-end',
        justifyContent:'flex-end',
        top:hp('77%'),
        position:'absolute'
      },
    iconbell:{
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        borderRadius:20,
        padding:10,
        fontSize:14,
        fontWeight:'900',
        
      },
})