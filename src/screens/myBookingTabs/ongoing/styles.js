import { StyleSheet, Dimensions } from 'react-native';
import { Matrics, Color } from '../../../utlis';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const widthConst = Dimensions.get('screen').width;
export default StyleSheet.create({
  container: {
    height: "94%",
    backgroundColor: Color.white,
  },
  header: {
    width: wp('30%'),
    marginStart: wp('15%')
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    width: widthConst,
  },
  mainView: {

    backgroundColor: Color.white,
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('90%'),
    margin: wp('2%'),
    elevation: 4,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    borderRadius: Matrics.Scale(10),
    padding: Matrics.Scale(5),
    paddingBottom: "5%"

  },
  topView: {
    flexDirection: 'row',
    width: wp('80%'),
    marginTop: hp('2%'),
    marginLeft: wp('3%')
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
    // marginStart: wp('5%')

  },
  textDate_time: {
    color: Color.AppColor,
    fontSize: Matrics.Scale(16),
    width: wp('45%'),
    fontWeight: '800',
    marginBottom: Matrics.Scale(5),
    marginTop: Matrics.Scale(8),

  },
  bookingTextDate: {
    color: Color.AppColor,
    fontSize: Matrics.Scale(16),
    width: wp('45%'),
    fontWeight: '800',
    // marginTop: Matrics.Scale(4),
    // backgroundColor: 'red'
  },
  textDate_dis: {
    color: Color.ligthGray,
    fontSize: Matrics.Scale(16),
    width: wp('28%'),
    fontWeight: '800',
    marginBottom: Matrics.Scale(4),
    marginLeft: wp('16%'),

  },
  textTime_dis: {
    color: Color.ligthGray,
    fontSize: Matrics.Scale(16),
    width: wp('30%'),
    fontWeight: '800',
  },
  bookingTimeText: {
    color: Color.ligthGray,
    fontSize: Matrics.Scale(16),
    width: wp('20%'),
    fontWeight: '800',
    marginBottom: Matrics.Scale(4),
  },
  textstatus: {
    color: Color.AppColor,
    fontSize: Matrics.Scale(16),
    fontWeight: '800',
    width: wp('35%'),
    textAlign:'right',
    marginLeft: wp('-1%'),
  },
  textstatus_dis: {
    color: Color.ligthGray,
    fontSize: Matrics.Scale(16),
    fontWeight: '800',
    width: wp('30%'),
    textAlign:'right',
    marginRight: wp('17%'),

  },
  service_btn_mainview: {
    flexDirection: 'row',
    width: wp('80%'),
    alignSelf: 'center',
    justifyContent: 'center'
  },
  service_dis: {
    width: wp('50%'),
  },
  service_customer: {
    width: wp('50%'),
  },
  service_dis_btn: {
    width: wp('30%'),
    marginTop: wp('5%')
  },
  btnView: {
    borderRadius: Matrics.Scale(5),
    backgroundColor: Color.AppColor,
    justifyContent: 'center',
    marginTop: Matrics.Scale(8),
  },
  btnViewWorkstarted: {
    borderRadius: Matrics.Scale(5),
    backgroundColor: Color.workstarted,
    justifyContent: 'center',
  },
  btnViewDetails: {
    borderRadius: Matrics.Scale(5),
    backgroundColor: Color.AppColor,
    justifyContent: 'center',
    marginTop: Matrics.Scale(8)
  },
  btnViewOntheWay: {
    borderRadius: Matrics.Scale(5),
    backgroundColor: Color.ontheway,
    justifyContent: 'center',
    marginTop: hp('1%'),

  },
  btnViewMap: {
    borderRadius: Matrics.Scale(5),
    backgroundColor: Color.aqeva,
    justifyContent: 'center',
    marginTop: hp('1%'),

  },
  btnViewReject: {
    borderRadius: Matrics.Scale(5),
    backgroundColor: Color.gray,
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
    width: wp('20%'),
    marginLeft: wp('1%')

  },
  reschedulic_View: {
    flexDirection: 'row',

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
    top: hp('70%'),
    position: 'absolute',
    marginEnd: wp('2%')


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
  statusView:{
    alignContent:'flex-end',
    alignItems:'flex-end',
    // flex:1
  },
})