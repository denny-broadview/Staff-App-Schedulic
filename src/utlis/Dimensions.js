import { Platform, Dimensions, StatusBar } from 'react-native';
import { moderateScale, scale, verticalScale,Margin } from 'react-native-size-matters';
import IPhoneXhelper from './IPhoneXhelper'
export default {
  moderateScale,
  scale,
  IPhoneXhelper,
  verticalScale,
  Spacing: {
    extraTiny: moderateScale(2),
    tiny: moderateScale(4),
    small: moderateScale(8),
    medium: moderateScale(12),
    large: moderateScale(16),
    extraLarge: moderateScale(24),
    huge: moderateScale(28),
    extraHuge: moderateScale(32),
    giant: moderateScale(40)
  },
  FontSize: {
    // extraTiny: moderateScale(8),
     tiny: moderateScale(10),
     small: moderateScale(12.5),
    medium: moderateScale(14),
    large: moderateScale(16),
    fonsize17:moderateScale(17),
    mediumlarge:moderateScale(18),
    extraLarge: moderateScale(20),
    fonsize23:moderateScale(23),
    fonsize24:moderateScale(24),
    fonsize25:moderateScale(25),
    huge: moderateScale(30),
    fontsize35:moderateScale(35),
    fontsize:moderateScale(40),
    extraHuge:moderateScale(50),
  },
  Flax:{
    flax1:1,
    flax2:2,
    flax3:3,
    flax4:4,
    flax5:5
  },
  
  NavBar: {
    height: Platform.OS === 'ios' ? 64 : 56
  },
  screenWidth: () => Dimensions.get('window').width,
  screenHeight: () => Dimensions.get('window').height
};
