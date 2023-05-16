import { StyleSheet } from 'react-native';
import { Matrics, Color } from '../../utlis';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },

  serviewText: {
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.darkGray,
    margin: hp('2%'),
  },

  courseImgView: {
    backgroundColor: Color.white,
    borderRadius: 50 / 2,
    zIndex: 0,
    width: wp('10%')
  },
  courseImg: {
    width: Matrics.Scale(50),
    height: Matrics.Scale(50),
    borderRadius: 50 / 2,
    resizeMode: 'cover',
    backgroundColor: Color.white,
  },
  topView: {
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('90%'),
    borderRadius: Matrics.Scale(10),
    // borderWidth:1,
    elevation: 1,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 2 },
    padding: hp('1%')
  },
  imgView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  userNameSyl: {
    width: wp('50%'),
    marginLeft: wp('10%'),
    color: Color.gray,
  },
  userAmount: {
    marginLeft: wp('3%'),
    color: Color.gray,

  },
  date: {
    color: Color.ligthGray,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  time: {
    color: Color.ligthGray,
    marginLeft: wp('2%'),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  dateTimeView: {
    flexDirection: 'row',
    marginLeft: wp('3%'),
  },
  qtyView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    width: wp('25%'),
  },
  inc_dec_icon: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    color: Color.AppColor,
    padding: Matrics.Scale(10),
    fontSize: Matrics.Scale(16),
    fontWeight: '900',
  },
  textQty: {
    color: Color.AppColor,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  amountView: {
    marginTop: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('70%'),
  },

  text_amount: {
    color: Color.bleck,
    width: wp('70%'),
    fontSize: Matrics.Scale(16),
    fontWeight: '600',
  },
  text_rs: {
    color: Color.bleck,
    width: wp('20%'),
    fontSize: Matrics.Scale(16),
    fontWeight: '600',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  text_coupon: {
    color: Color.bleck,
    width: wp('45%'),
    fontSize: Matrics.Scale(16),
    fontWeight: '600',
  },
  text_coupon1: {
    color: Color.bleck,
    width: wp('30%'),
    fontSize: Matrics.Scale(16),
    fontWeight: '600',
  },
  text_coupon_applied: {
    alignSelf: 'center',
    color: Color.AppColor,
    // width: wp('35%'),
    fontSize: Matrics.Scale(18),
    fontWeight: '600',
    marginRight: Matrics.Scale(10),
    marginLeft: hp('3%')
  },

  coiponView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Color.white,
    borderWidth: 1,
    borderColor: 'rgba(187, 187, 187, 1)',
    borderRadius: Matrics.Scale(5),
    width: wp('45%'),
    height: Platform.OS == 'ios' ? hp('6%') : hp('6%'),
  },
  coiponViewApp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Color.white,
    width: wp('60%'),
    height: Platform.OS == 'ios' ? hp('6%') : hp('6%'),
    marginBottom: hp('3%')
  },
  textCouponCode: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: Color.bleck,
    fontSize: Matrics.Scale(16),
    width: wp('35%'),
    height: Platform.OS == 'ios' ? hp('6%') : hp('6%'),
    paddingLeft: 10
  },
  couponIconView: {
    backgroundColor: Color.AppColor,
    borderWidth: 1,
    borderColor: Color.AppColor,
    borderTopEndRadius: Matrics.Scale(5),
    borderBottomEndRadius: Matrics.Scale(5),
  },
  inc_coupon: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    color: Color.white,
    padding: Matrics.Scale(10),
    fontSize: Matrics.Scale(16),
    fontWeight: 'bold',
  },
  inc_coupon_close: {
    alignSelf: 'center',
    color: Color.red,
    fontSize: Matrics.Scale(18),
    fontWeight: 'bold',
    marginRight: Matrics.Scale(5),
  },
  borderView: {
    borderWidth: 1,
    borderColor: Color.ligthGray,
    borderRadius: Matrics.Scale(5),
    borderStyle: 'dashed',
    width: wp('90%'),
    margin: wp('4%'),
  },
  totalamountView: {
    flexDirection: 'row',
    backgroundColor: Color.ligthGray,
    borderRadius: Matrics.Scale(5),
    width: wp('90%'),
    height: Platform.OS == 'ios' ? hp('6%') : hp('6%'),
    alignSelf: 'center',
  },
  textTotal: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: Matrics.Scale(16),
    width: wp('50%'),
    marginLeft: wp('2%'),
    fontWeight: '900',
  },
  textTotalRs: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('30%'),
    fontSize: Matrics.Scale(16),
    marginLeft: wp('15%'),
    fontWeight: '900',
  },
  add_more_serviceMainView: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('90%'),
    marginTop: hp('20%'),
  },
  buttonStylpass: {

    backgroundColor: Color.AppColor,
    borderRadius: Matrics.Scale(5),
    width: wp('90%'),
    // height: Platform.OS == 'ios' ? hp('6%') : hp('6%'),
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    // flex:1,
    padding:15
  },
  textChange: {
    
    alignSelf: 'center',
    alignItems:'center',
    color: Color.white,
    fontWeight: '500',
    fontSize: Matrics.Scale(16),
    // textAlign: 'center',
    // top: Platform.OS === 'ios' ? hp('1%') : hp('1%'),
  },
  proceedtocheckMainView: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('90%'),
    marginTop: hp('3%'),
    marginBottom: hp('3%'),
  },
  buttonStylupdate: {
    borderWidth: 1,
    borderColor: '#00A89B',
    borderRadius: Matrics.Scale(5),
    backgroundColor: Color.white,
    width: wp('90%'),
    // height: Platform.OS == 'ios' ? hp('6%') : hp('6%'),
    // alignItems: 'center',
    // alignContent: 'center',
    // alignSelf: 'center',
    textAlign: 'center',
    padding:15
  },
  textUpdate: {
    justifyContent: 'center',
    color: Color.AppColor,
    fontWeight: '500',
    fontSize: Matrics.Scale(16),
    textAlign: 'center',
    // top: Platform.OS === 'ios' ? hp('1%') : hp('1%'),
  },
});
