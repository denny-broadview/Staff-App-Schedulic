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
    width: wp('30%'),
    marginStart: wp('15%'),
  },
  mainView: {
    flex: 1,
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignSelf: 'center',
    margin: wp('2%'),
    elevation: 4,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {width: 0, height: 2},
    borderRadius: Matrics.Scale(10),
    padding: Matrics.Scale(5),
  },
  topView: {
    flexDirection: 'row',
    width: wp('80%'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('2%'),
  },
  service_dis_btn: {
    width: wp('30%'),
  },
  service_customer: {
    width: wp('50%'),
    marginTop: hp('1%'),
    marginLeft: wp('5%'),
  },
  btnView: {
    borderRadius: Matrics.Scale(5),
    backgroundColor: Color.AppColor,
    justifyContent: 'center',
    marginTop: hp('5%'),
  },
  btnViewWorkstarted: {
    borderRadius: Matrics.Scale(5),
    backgroundColor: Color.workstarted,
    justifyContent: 'center',
    marginTop: hp('5%'),
  },
  btnViewDetails: {
    borderRadius: Matrics.Scale(5),
    backgroundColor: Color.AppColor,
    justifyContent: 'center',
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
  amount_view: {
    flexDirection: 'row',
    width: wp('80%'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('2%'),
  },
  topView_dis: {
    flexDirection: 'row',
    width: wp('80%'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('1%'),
    marginStart: wp('5%'),
  },
  textDate_time: {
    color: Color.AppColor,
    fontSize: Matrics.Scale(18),
    width: wp('60%'),
    fontWeight: '800',
  },
  textDate_dis: {
    color: Color.ligthGray,
    fontSize: Matrics.Scale(18),
    width: wp('30%'),
    fontWeight: '800',
  },
  textBook_Time_dis: {
    marginTop: hp('2%'),
    color: Color.ligthGray,
    fontSize: Matrics.Scale(18),
    width: wp('50%'),
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
    width: wp('20%'),
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

    marginTop: hp('2%'),
  },
  service_dis_book: {
    width: wp('50%'),
    marginLeft: wp('5%'),
    marginTop: hp('1%'),
  },
  service_dis: {
    width: wp('40%'),
    marginLeft: wp('5%'),
    marginTop: hp('1%'),
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
    marginTop: hp('1%'),
  },
  btnViewReject: {
    borderRadius: Matrics.Scale(5),
    backgroundColor: Color.gray,
    justifyContent: 'center',
    marginTop: hp('1%'),
  },
  btnText: {
    color: Color.white,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: Matrics.Scale(10),
  },
  amount_view_dis: {
    flexDirection: 'row',
    width: wp('50%'),
    justifyContent: 'center',
    marginLeft: wp('5%'),
    marginTop: hp('2%'),
  },
  text_amount: {
    color: Color.AppColor,
    fontSize: Matrics.Scale(18),
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('30%'),
    fontWeight: '800',
  },
  text_staff: {
    color: Color.AppColor,
    fontSize: Matrics.Scale(18),
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('20%'),
    fontWeight: '800',
  },
  amountView_dis: {
    flexDirection: 'row',
    width: wp('50%'),
    marginStart: wp('5%'),
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
    marginLeft: wp('3%'),
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
  textBookingDetails: {
    margin: wp('5%'),
    color: Color.AppColor,
    fontSize: Matrics.Scale(18),
    width: wp('60%'),
    fontWeight: '800',
  },
  imgView: {
    backgroundColor: Color.white,
    marginLeft: wp('2%'),

    flexDirection: 'row',
    width: wp('70%'),
  },
  courseImg: {
    width: Matrics.Scale(80),
    height: Matrics.Scale(80),
    borderRadius: 80 / 2,
    resizeMode: 'cover',
  },
  courseImgView: {
    backgroundColor: 'lightgray',
    borderRadius: 80 / 2,
    zIndex: 0,
  },
  dataname: {
    marginTop: hp('3%'),
    marginLeft: wp('3%'),
    fontSize: 16,
    fontWeight: '500',
    color: Color.bleck,
  },
  datars: {
    marginLeft: wp('3%'),
    fontSize: 14,
    color: Color.gray,
  },
  call_View: {
    flexDirection: 'row',
    marginLeft: wp('5%'),
    marginTop: hp('2%'),
  },
  address_View: {
    flexDirection: 'row',
    marginLeft: wp('5%'),
  },
  note_View: {
    flexDirection: 'row',
    marginLeft: wp('5%'),
    marginBottom: hp('5%'),
  },
  call_icon: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    color: Color.AppColor,
    padding: Matrics.Scale(10),
    fontSize: Matrics.Scale(24),
    fontWeight: '900',
  },
  textCall: {
    fontSize: 16,
    fontWeight: '500',
    color: Color.gray,
    marginTop: hp('1%'),
  },
  textAddress: {
    fontSize: 16,
    fontWeight: '500',
    color: Color.gray,
    marginTop: hp('1%'),
    width: wp('80%'),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  viewLine: {
    width: wp('80%'),
    backgroundColor: Color.ligthGray,
    height: hp('0.1%'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('3%'),
  },
  textNote: {
    color: Color.AppColor,
    marginTop: hp('1%'),
    fontSize: Matrics.Scale(20),
    fontWeight: '900',
  },
  trackView: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('90%'),
    marginTop: hp('3%'),
    marginBottom: hp('3%'),
  },
  buttonStyltrack: {
    backgroundColor: 'rgba(66, 77, 228, 1)',
    borderRadius: Matrics.Scale(5),
    width: wp('90%'),
    height: Platform.OS == 'ios' ? hp('6%') : hp('8%'),
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  textTrack: {
    justifyContent: 'center',
    color: Color.white,
    fontWeight: '500',
    fontSize: Matrics.Scale(18),
    textAlign: 'center',
    top: Platform.OS === 'ios' ? hp('1%') : hp('2%'),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalView: {
    height: hp('65%'),
    width: wp('95%'),
    backgroundColor: 'white',
    borderRadius: Matrics.Scale(10),
    padding: wp('5%'),
    shadowColor: Color.ligthGray,
    marginTop: hp('20%'),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },
  closeButton: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    color: Color.white,
    position: 'absolute',
    fontSize: 16,
  },
  textseledat_tim:{
    flexDirection: 'row', 
    width: wp('45%')
  },
  textSelectedTextDia: {
    color: Color.darkGray,
    fontSize: 20,
    width: wp('85%'),
  },
  textService: {
    color: Color.ligthGray,
    fontSize: 16,
    width: wp('85%'),
  },
  closeIcon: {
    justifyContent: 'center',
    color: Color.ligthGray,
    padding: 10,
    fontSize: 20,
    fontWeight: '900',
  },
  textDesDialog: {
    marginTop: hp('1%'),
    color: Color.ligthGray,
    fontSize: 16,
  },
  servicenametext: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    color: Color.darkGray,
    position: 'absolute',
    fontSize: 16,
  },
  priseView: {
    flexDirection: 'row',
    width: wp('90%'),
    marginTop:hp('1%')
   
  },
  topTitle: {
    marginTop: hp('5%'),
    marginLeft: wp('3%'),
    color: Color.bleck,
    fontSize: 16,
  },
  menuView: {
    flexDirection: 'row',
    width: wp('40%'),
    borderWidth: 1,
    borderRadius: Matrics.Scale(5),
    borderColor: Color.ligthGray,
    marginLeft: wp('4%'),
  },
  timeDateIcon: {
    justifyContent: 'center',

    color: Color.ligthGray,
    padding: 5,
    fontSize: 16,
    fontWeight: '900',
  },
  textDate: {
    color: Color.darkGray,
    justifyContent: 'center',
    alignItems:'center',
    fontSize: 14,
  },
  inputBordeNote: {
  
    borderWidth: 1,
    borderColor: Color.ligthGray,
    borderRadius: Matrics.Scale(5),
    marginTop:hp('2%'),
    width: wp('85%'),
    height: Platform.OS == 'ios'? hp('6%') : hp('20%'),
    justifyContent:'center',
    alignSelf:'center'
},
textCodeAddress:{
    
  color: Color.bleck,
  fontSize: Matrics.Scale(18),
  width: wp('80%'),
  height: Platform.OS == 'ios'? hp('6%') : hp('20%'),
  marginLeft:wp('2%'),
 
},
addnoteText: {
 marginTop:hp('2%'),
  marginLeft: wp('3%'),
  color: Color.bleck,
  fontSize: 16,
},
nextButton: {
  width:wp('40%'),
  padding:hp('1%'),
  justifyContent:'flex-end',
  alignSelf:'flex-end',
  margin:hp('2%'),
  backgroundColor: Color.pink,
  borderRadius: Matrics.Scale(40)
},
textBtnStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
  fontSize: 16
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
  fontSize: 16
}, 
 textdateshow:{
  color:Color.bleck,
  width:wp('30%'),
  fontSize:16,
  justifyContent:'center',
  alignSelf:'center'
},
listManu:{
  justifyContent:'center',
   marginTop:hp('2%'),
   marginEnd:wp('2%'),
  alignSelf:'center',
  width:wp('25%'),
  borderWidth: 1,
  borderColor: Color.bleck,
  borderRadius: Matrics.Scale(5),
},
textListData:{
  color:Color.bleck,
  justifyContent:'center',
  alignSelf:'center',
  fontSize:14,
  padding:hp('1%')

  },
  confirmButton: {
    width:wp('40%'),
    padding:hp('1%'),
    justifyContent:'flex-end',
    alignSelf:'flex-end',
    marginTop:hp('1%'),
    marginEnd:wp('2%'),
   
    borderRadius: Matrics.Scale(40)
  },
});
