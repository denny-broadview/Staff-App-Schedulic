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
    justifyContent:'space-between',
    flexDirection: 'row',
    padding:hp('1%'),
    margin:hp('1%'),
    paddingLeft:hp('3%')
  },
  menuname:{
    color: Color.iconAccount,
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: Matrics.Scale(5),
    textTransform:'capitalize'
  },
  menu:{
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    color: Color.iconAccount,
  },
  border: {
    justifyContent: 'center',
    width: wp('90%'),
    height: hp('0.1%'),
    backgroundColor: "rgba(240, 240, 240, 10)",
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
