import { StyleSheet } from 'react-native';
import { Matrics, Color } from '../../../utlis';
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
    // width: wp('30%'),
    // marginStart: wp('15%')
  },
  txtxname: {
    fontSize: 18,
    fontWeight: '400'
  },
  underLine: {
    height: 4,
    borderRadius: 50,
    marginTop: 5,
    width: 100,
    alignItems: 'center',
    backgroundColor: Color.AppColor
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    width: wp('90%'),
    margin: wp('5%'),
    elevation: 2,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: Matrics.Scale(10),

  },
  topView: {
    flexDirection: 'row',
    width: wp('80%'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('2%')

  },
  amount_view: {
    flexDirection: 'row',
    width: wp('80%'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('2%')
  },
  topView_dis: {
    flexDirection: 'row',
    width: wp('80%'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('1%'),
    marginStart: wp('5%')
  },
  textDate_time: {
    color: Color.AppColor,
    fontSize: Matrics.Scale(18),
    width: wp('60%'),
    fontWeight: '800'

  },
  textDate_dis: {
    color: Color.ligthGray,
    fontSize: Matrics.Scale(18),
    width: wp('30%'),
    fontWeight: '800',

  },
  textTime_dis: {
    color: Color.ligthGray,
    fontSize: Matrics.Scale(18),
    width: wp('30%'),
    fontWeight: '800',

  },
  textstatus: {
    color: Color.AppColor,
    fontSize: Matrics.Scale(18),
    fontWeight: '800',
    width: wp('20%')
  },
  textstatus_dis: {
    color: Color.ligthGray,
    fontSize: Matrics.Scale(18),
    fontWeight: '800',
    width: wp('25%'),

  },
  service_btn_mainview: {
    flexDirection: 'row',
    width: wp('80%'),
    alignSelf: 'center',
    marginTop: hp('2%'),
    justifyContent: 'center'
  },
  service_dis: {
    width: wp('50%'),
  },
  service_dis_btn: {
    width: wp('30%'),

  },
  btnView: {
    borderRadius: Matrics.Scale(5),
    backgroundColor: Color.AppColor,
    justifyContent: 'center',
    marginTop: hp('5%'),

  },
  btnView_pay: {
    borderRadius: Matrics.Scale(5),
    backgroundColor: Color.AppColor,
    justifyContent: 'center',
    marginTop: hp('1%')
  },
  btnText: {
    color: Color.white,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: Matrics.Scale(10)
  },
  amount_view_dis: {
    flexDirection: 'row',
    width: wp('50%'),
    justifyContent: 'center',
    marginLeft: wp('5%'),
    marginTop: hp('2%')
  },
  text_amount: {
    color: Color.AppColor,
    fontSize: Matrics.Scale(18),
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('30%'),
    fontWeight: '800'
  },
  text_staff: {
    color: Color.AppColor,
    fontSize: Matrics.Scale(18),
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('20%'),
    fontWeight: '800'
  },
  amountView_dis: {
    flexDirection: 'row',
    width: wp('50%'),
    marginStart: wp('5%')
  },
  text_amount_dis: {
    color: Color.ligthGray,
    fontSize: Matrics.Scale(18),
    width: wp('30%'),
    fontWeight: '800',
  },
  can_reschedulic_View: {
    flexDirection: 'row',
    width: wp('50%'),
    marginLeft: wp('3%')

  },
  inc_dec_icon: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    color: Color.pink,
    padding: Matrics.Scale(10),
    fontSize: Matrics.Scale(16),
    fontWeight: '900',
  },
  time_icon: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    color: Color.green,
    padding: Matrics.Scale(10),
    fontSize: Matrics.Scale(16),
    fontWeight: '900',
  },
  textcancel: {
    color: Color.pink,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  text_reschedule: {
    color: Color.green,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  btnPhone: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    top: hp('80%'),
    position: 'absolute'
  },
  iconbell: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    fontSize: 14,
    fontWeight: '900',

  },

})