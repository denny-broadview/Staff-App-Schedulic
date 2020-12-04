import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

// var serviceCart= [];

const Constants = {
  showStatusBar: true,
  businessid: 101,
  businessname: 'BI',
  ApiBaseUrl: 'https://api.schedulic.com/api/',

  ApiAction: {
    timeSetting: 'get-front-setting',
    getTax: 'get-tax',
    mobileLogin: 'user-login',
    postcodeList: 'staff-postal-code',
    staffWorkingHR:'staff-working-hours',
    staffBreck:'staff-break-hours',
    staffservice:'staff-service',
    staffEditProfile:'staff-profile-update',
    staffnewbookin:'staff-new-bookings',
    staffOnGoing:'staff-ongoing-bookings',
    completTask:'staff-booking',
    logout:'logout',
    invoice:'download-invoice',
    sendInvoice:'send-invoice',
    holiday:'staff-holidayslist',
    notification:'get-notification',
    cashpaymant:'staff-payment-update',
    couponcode: 'check-discount-coupon',
    status_update:'staff-update-bookings'

  },
  SplashScreen: {
    Duration: 2000,
  },
};

export default Constants;
