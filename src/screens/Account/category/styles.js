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
    //padding:Matrics.Scale('5')
  },
  menuname: {
    width: wp('80%'),
    color: Color.iconAccount,
    justifyContent: 'center',
    //alignSelf: 'center',
    padding:wp('2'),
    marginLeft: wp('5%'),
  },
  menu: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    color: Color.bleck,
    fontSize: 20,
    fontWeight: '900',
    marginLeft: wp('2%'),
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
    fontWeight:'bold',
    justifyContent:'center',
    alignItems:'center',
    margin:Matrics.Scale(20)
    }
});
