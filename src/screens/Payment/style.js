import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  mainView:{
    backgroundColor: '#fff', flex: 1
  },
  mainPayment: {
    flex: 1,
    justifyContent: 'center',
    width: wp('90%'),
    alignSelf: 'center',
  },
  textView:{
    fontSize: 18, 
    color: '#484848'
  },
  btnText:{
    color: '#fff', fontSize: 15
  },
  paymentimage: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: 60,
    paddingBottom: 60,
  },
  imageIcon:{
    width:wp('5%'), height: hp('5%')
  },
  commonpayment: {
    backgroundColor: '#00A89B14',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#00A89B',
    padding: 12,
    borderRadius: 6,
    width: wp('90%'),
    marginBottom: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
