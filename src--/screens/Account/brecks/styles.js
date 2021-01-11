import {StyleSheet} from 'react-native';
import {Matrics, Color} from '../../../utlis';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  header: {
    width: wp('40%'),
  },

  viewBoder: {
    opacity: 1,
    width: wp('90%'),
    height: hp('0.1%'),
    justifyContent: 'center',
    margin: wp('5%'),
    backgroundColor: 'rgba(240, 240, 240, 10)',
  },
  menuView: {
    flexDirection: 'row',
    width: wp('90%'),
    padding:hp('1%'),
    
  },
  menuname: {
    width: wp('55%'),
    color: Color.iconAccount,
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: wp('5%'),
  },
  menu: {
  
   textAlign:'right',
    color: Color.iconAccount,
  
  
  },
  border: {
    justifyContent: 'center',
    width: wp('90%'),
    height: hp('0.1%'),
    backgroundColor: Color.ligthGray,
    marginLeft: wp('5%'),
  },
  categoryText:{
    color:Color.darkGray,
    fontSize:16,
    fontWeight:'400',
    justifyContent:'center',
    alignItems:'center',
    margin:hp('2%')  }
});
