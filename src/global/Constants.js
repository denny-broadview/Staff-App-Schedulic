import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
// var serviceCart= [];
const Constants = {
  showStatusBar: true,
  businessid: 119,
  businessname: 'BI',
  ApiBaseUrl: 'https://api.schedulic.com/api/',
  GOOGLE_MAPS_APIKEY: "AIzaSyBXIPD2yTHyA66hLrXfuHoHbqg-bCt13xo",
  ApiAction: {
    timeSetting: 'get-front-setting',
    getTax: 'get-tax',
    mobileLogin: 'user-login',
    postcodeList: 'staff-postal-code',
    staffWorkingHR:'staff-working-hours',
    staffBreck:'staff-break-hours',
    staffservice:'staff-service',
    staffEditProfile:'staff-profile-update',
    // staffnewbookin:'staff-new-bookings',
    staffnewbookin:'staff-new-bookings-app',

    staffOnGoing:'staff-ongoing-bookings-app',
    completTask:'staff-booking-app',
    logout:'logout',
    invoice:'download-invoice',
    sendInvoice:'send-invoice',
    holiday:'staff-holidayslist',
    notification:'get-notification',
    cashpaymant:'staff-payment-update',
    couponcode: 'check-discount-coupon',
    status_update:'staff-update-bookings',
    listHoliday:'list-holidays',
    getListTiming:'list-availabel-timings',
    resedule:'staff-resedule-bookings',
    emailCheck:'admin-staff-email-check',
    getBusiness:'get-business',
    getCategoryService:'staff-category-service',
    getCatgorywithService:'staff-category-services',
    addReferenceKey:'add-refrence-key'
  },
  SplashScreen: {
    Duration: 2000,
  },
};

export default Constants;
