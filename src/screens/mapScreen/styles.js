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

  header: {
    width: wp('30%'),
    marginStart: wp('15%')
  },
  mapStyle: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardView: {
    backgroundColor: 'white',
    width: wp('85%'),

    borderRadius: Matrics.Scale(15),
    bottom: hp('5%'),
    position: 'absolute',
    elevation: 4,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 2 },
    marginStart: wp('5%'),
    marginEnd: wp('5%'),
    paddingTop:Matrics.Scale(20),
    paddingBottom:Matrics.Scale(20),
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  distansView: {
    flexDirection: 'row',
    width: wp('80%'),
    marginBottom: Matrics.Scale(8),
  },
  text_diatance: {
    fontSize: Matrics.Scale(18),
    color: Color.AppColor,
    width: wp('25%'),
    marginLeft: wp('4%'),
  },
  text_dist: {
    fontSize: Matrics.Scale(18),
    color: Color.gray,
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('50%')
  },
  staffView: {
    flexDirection: 'row',
    width: wp('80%'),
  },
  btnPhone: {
    position: 'absolute',
    left: wp('80%'),
  },
  btnPhoneView: {
    backgroundColor: Color.AppColor,
    borderRadius: 25, 
    width: wp('10%'), 
    height: wp('10%'), 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  iconbell: {
    color: Color.white,
    padding: 10,
    fontSize: 14,
    fontWeight: '900',
  },
  courseImgView: {
    borderRadius: 90 / 2,
    borderWidth: 4,
    borderColor: Color.white,
    shadowColor: Color.AppColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  courseImg: {
    width: Matrics.Scale(70),
    height: Matrics.Scale(70),
    borderRadius: 80 / 2,
    resizeMode: 'cover',
    backgroundColor: Color.AppColor,

  },

})