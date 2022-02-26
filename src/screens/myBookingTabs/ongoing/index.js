import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    RefreshControl,
    PermissionsAndroid,
    ActivityIndicator,
    ToastAndroid,
    Alert,
    Linking,
    Platform
} from 'react-native';
import styles from './styles';
import { String } from '../../../utlis/String';
import { Color, Matrics } from '../../../utlis';
import { MySpinner } from '../../../component/MySpinner';
import { Auth, Constants } from '@global';
import { useSelector, useDispatch } from 'react-redux';
import { setGoingOnData, setStaffLocation } from '../../../store/actions';
import moment from 'moment';
import Snackbar from 'react-native-snackbar';
import Geolocation from 'react-native-geolocation-service';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import database from '@react-native-firebase/database';
import firebaseApp from '@database/FirebaseConfig';
const OngoingTab = (props) => {
    const userInfo = useSelector((state) => state.user.user);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [loading, setLoading] = useState(false);
    const [foregroundService, setForegroundService] = useState(true)
    const [updatesEnabled, setUpdatesEnabled] = useState(false)
    const [location, setLocation] = useState({})
    const [watchId, setWatchId] = useState(false)
    const [orderId, setOrderId] = useState('')
    const [reference, setReference] = useState('')
    const onGoingFromRedux = useSelector(
        (state) => state.BookingService.onGoingData,
    );
    const staffLocation = useSelector(
        (state) => state.BookingService.staffLocation,
    );
    const dispatch = useDispatch();
    // console.log('order id on ongoing open --- ', data);
    //time
    const [curTime, setCurTime] = useState('');
    var timeconvert;
    // search
    const [masterDataSource, setMasterDataSource] = useState([]);
    const searchKeyFromProbs = useSelector(
        (state) => state.BookingService.serachKey,
    );
    var currencyFormatter = require('currency-formatter');
    const currency = useSelector((state) => state.setting.setting.currency);

    const currencySymbolePosition = useSelector(
        (state) => state.setting.setting.currency_symbol_position,
    );

    const currencyFrm = useSelector(
        (state) => state.setting.setting.currency_format,
    );

    const settingreshedultime = useSelector(
        (state) => state.setting.setting.min_reseduling_time,
    );
    const currenttime = moment()
        .utcOffset('+05:30')
        .format('YYYY-MM-DD HH:mm:ss');

    const currentdate = moment().utcOffset('+05:30').format('YYYY-MM-DD');
    const crtime = moment().utcOffset('+05:30').format('HH:mm:ss');

    useEffect(() => {
        console.log('onGoingFromRedux --- ', onGoingFromRedux);
        console.log('staffLocation --- ', staffLocation);
    }, [])
    useEffect(() => {

        // if (location?.coords?.latitude != undefined && location?.coords?.longitude != undefined) {

        //     let currentData = {
        //         lat: 21.1515, 
        //         lng: 72.8543,
        //         // lat: location.coords.latitude,
        //         // lng: location.coords.longitude,
        //         // sId: userInfo.id,
        //         orderId: orderId,
        //     }
        //     let key = props.route.params.datapass.id
        //     var postListRef = firebaseApp.database()
        //     //  database()
        //             .ref('trackOrder/currentLocation/')
        //             // .orderByChild("orderId")
        //             // .equalTo(orderId)
        //             postListRef.child(key).set(
        //                 { currentData }
        //               )
        //             //   .set('value')
        //             .then(function (snapshot) {
        //         console.log('------------location-------------', JSON.stringify(snapshot.val()));
        //         if (snapshot.val() !== null) {
        //             console.log("orderId exists")
        //             // handle error
        //             updateLocation(currentData);
        //         } else {
        //             console.log("orderId do not exists")
        //             // push record to Firebase
        //             addLocation(currentData);
        //         }
        //     });
        // }
    }, [location])

    // const addLocation = data => {
    //     let refData = firebaseApp.database()
    //         .ref('trackOrder/currentLocation/')
    //                 // .orderByChild("orderId")
    //                 // .equalTo(orderId)
    //         refData.child(key).set(
    //                     { data }
    //                   )
    //         // .push(data, response => {
    //         //     response
    //         // }).key;
    //     if (refData) {
    //         let reduxData = {
    //             reference: refData,
    //             orderId: orderId
    //         }
    //         dispatch(setGoingOnData(reduxData))
    //         dispatch(setStaffLocation(data))
    //         setReference(refData);
    //     }
    // };
    // const addLocation = () => {
    //     // if (location?.coords?.latitude != undefined && location?.coords?.longitude != undefined) {
    //         console.log('Order ID addlocation: ', orderId)
    //         let key = orderId
    //         let currentData = {
    //             lat: 21.1515, 
    //             lng: 72.8543,
    //             // lat: location.coords.latitude,
    //             // lng: location.coords.longitude,
    //             // sId: userInfo.id,
    //             orderId: 235
    //             // orderId,
    //         }
    //         let latitude = 21.1515 
    //         let longitude= 72.8543
    //         var refData = firebaseApp.database()
    //         .ref('trackOrder/currentLocation/')
    //                 // .orderByChild("orderId")
    //                 // .equalTo(orderId)
    //         refData
    //         // .child(key)
    //         .set(
    //                     { latitude, longitude , orderId }
    //                   )
    //                   console.log('User snapshot data: ', refData)
    //         // .push(data, response => {
    //         //     response
    //         // }).key;
    //     // if (refData) {
    //     //     let reduxData = {
    //     //         reference: refData,
    //     //         orderId: orderId
    //     //     }
    //     //     dispatch(setGoingOnData(reduxData))
    //     //     dispatch(setStaffLocation(data))
    //     //     setReference(refData);
    //     //  }
    // // }
    // };

    const updateLocation = data => {
        console.log('In Update ', reference)
        if (onGoingFromRedux.reference !== '') {
            dispatch(setStaffLocation(data))
            database()
                .ref('trackOrder')
                .child(`currentLocation/${reference}`)
                .update(data, response => {
                    response
                })
        } else {
            updateReferenceKeyToDatabaseRT();
        }
    };

    const updateReferenceKeyToDatabaseRT = () => {
        if (orderId !== '') {
            let myForm = new FormData();
            myForm.append('business_id', Constants.businessid);
            myForm.append('order_item_id', orderId);
            myForm.append('refrence_key', reference);
            console.log('parm in updateReferenceKeyToDatabaseRT~~~~~~~~~', myForm);
            Auth.PostCustomerTokenAuth(
                userInfo.token,
                userInfo.user_id,
                myForm,
                Constants.ApiAction.addReferenceKey,
                (res) => {
                    console.log(' ongoing data--------', JSON.stringify(res));
                    if (res[1].data == true) { }
                },
            );
        } else {
            Auth.ToastAndroid('Error! while updating current location.');
        }
    }

    useEffect(() => {
        time_convert();

        getOnGoing();
    }, []);
    const onRefresh = () => {
        setData([]);
        getOnGoing();
    };
    useEffect(() => {
        console.log(
            'Data from redux searchKeyFromProbs ~~~~~~',
            searchKeyFromProbs,
        );
        searchFilterFunction(searchKeyFromProbs);
    }, [searchKeyFromProbs]);
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getOnGoing();
        });
        return unsubscribe;
    }, [props.navigation]);
    //search start
    function searchFilterFunction(text) {
        if (text) {
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.service.service_name != null ?
                    item.service.service_name.toUpperCase() :
                    ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setData(newData);
            // setSearchTerm(text);
        } else {
            setData(masterDataSource);
            // setSearchTerm(text); 
        }
    }

    function noItemDisplay() {
        // setLoading(false);
        return (
            <View style={
                { flex: 1, alignSelf: 'center', marginTop: Matrics.Scale(50) }} >
                <Text style={
                    { fontSize: 20, color: Color.AppColor }} > {String.app.datanotfound}
                </Text>
            </View>
        );
    }

    function covertDateTime(val1, val2) {
        var str = val1 + ' ' + val2;
        const bDate = moment(str, 'YYYY-MM-DD HH:mm:ss');
        return bDate;
    }

    function bookingtimecurrenttime(val1, val2) {
        //  var str = val1 + ' ' + val2;
        var startTime = moment(val2, "HH:mm:ss");
        var endTime = moment(val1, "HH:mm:ss");
        var duration = moment.duration(endTime.diff(startTime));
        // duration in hours
        var hours = parseInt(duration.asHours());
        var minutes = parseInt(duration.asMinutes()) % 60;

        console.log('current time~~~~~~~~~~~~~~', val1);
        console.log('booking time~~~~~~~~~~~~~~', val2);
        //  console.log('difference ~~~~~~~~~~~', difference);
        console.log('diff========', (minutes + (hours * 60)));

        return (minutes + (hours * 60));
    }

    function time_convert() {
        const num = settingreshedultime;

        var hours = Math.floor(num / 60);
        var minutes = num % 60;
        var seconds = Math.floor(num * 60 - hours * 3600 - minutes * 60);

        timeconvert = hours + ':' + minutes + ':' + seconds;
        const bDate1 = moment(timeconvert).format('HH:mm:ss');
        console.log('timeconvert-----------', timeconvert);
        console.log('second-----------', seconds);
        return hours + ':' + minutes;
    }
    // Api calling for onGoing
    function getOnGoing() {
        setLoading(true);
        setRefreshing(false);
        let myForm = new FormData();
        myForm.append('business_id', Constants.businessid);
        console.log('parm in tabonGoing~~~~~~~~~', myForm);
        Auth.PostCustomerTokenAuth(
            userInfo.token,
            userInfo.user_id,
            myForm,
            Constants.ApiAction.staffOnGoing,
            (res) => {
                // console.log(' ongoing data Res--------', res);
                // console.log(' ongoing data arshad--------', res[1].response);
                if (res[1].data === true) {

                    let tempdata = JSON.stringify(res[1].response);
                    // console.log('ongoing else -------------', tempdata);
                    setLoading(false);
                    setRefreshing(false);
                    setData(JSON.parse(tempdata));
                    setMasterDataSource(res[1].response);
                } else {

                    setData(res.data);
                    setLoading(false);
                    setRefreshing(false);
                }
            },
        );
    }

    // Api calling for newBookings
    function getStatus(id, st, sType) {

        // setOrderId(id);
        console.log('usertoken----', userInfo.token);
        setLoading(true);
        let myForm = new FormData();
        myForm.append('order_item_id', id);
        myForm.append('staff_id', userInfo.user_id);
        myForm.append('order_status', st);
        console.log('parm ongoing status~~~~~~~~~', myForm);
        Auth.PostCustomerTokenAuth(
            userInfo.token,
            userInfo.user_id,
            myForm,
            Constants.ApiAction.status_update,
            (res) => {
                console.log(' ongoing data status--------', res);
                if (res[1].data == true) {
                    setLoading(false);
                    setTimeout(() => {
                        Snackbar.show({
                            text: 'Appointment Updated',
                            duration: Snackbar.LENGTH_SHORT
                        });
                        getOnGoing();
                        if (st === 'OW' && sType === 'at_home') {
                            getStaffLatLng();
                        }
                        if (st === 'CO' && sType === 'at_home') {
                            removeLocationUpdates()
                        }

                    }, 1000);

                } else {
                    setLoading(false);
                }
            },
        );
    }
    // const getStaffLatLng = () => {
    //     if (Platform.OS === 'android' && foregroundService) {
    //         startForegroundService();
    //     }
    //     if (!updatesEnabled && watchId === null) {

    //         let watchIdTemp =
    //             Geolocation.watchPosition(
    //                 (position) => {
    //                     setLocation(position)
    //                 },
    //                 (error) => {
    //                     console.log(error);
    //                 }, {
    //                 accuracy: {
    //                     android: 'balanced',
    //                     ios: 'hundredMeters',
    //                 },
    //                 enableHighAccuracy: true,
    //                 distanceFilter: 0,
    //                 interval: 5000,
    //                 fastestInterval: 2000,
    //                 forceRequestLocation: true,
    //                 showLocationDialog: true,
    //                 useSignificantChanges: false,
    //             },
    //             );
    //         setWatchId(watchIdTemp)
    //     }
    // };

    // const startForegroundService = () => {
    //     if (Platform.Version >= 26) {
    //         VIForegroundService.createNotificationChannel({
    //             id: 'locationChannel',
    //             name: 'Location Tracking Channel',
    //             description: 'Tracks location of user',
    //             enableVibration: false,
    //         });
    //     }

    //     return VIForegroundService.startService({
    //         channelId: 'locationChannel',
    //         id: 420,
    //         title: "Schedulics",
    //         text: 'Tracking location updates lat --> ' + staffLocation.lat + " Lng --> " + staffLocation.lng,
    //         icon: 'ic_launcher',
    //     });
    // };

    // const removeLocationUpdates = () => {

    //     if (watchId !== null) {
    //         stopForegroundService();
    //         Geolocation.clearWatch(watchId);
    //         setWatchId(null);
    //         setUpdatesEnabled(false)
    //     }
    // };

    // const stopForegroundService = () => {
    //     if (foregroundService) {
    //         VIForegroundService.stopService().catch((err) => err);
    //     }
    // };

    const gotoMap = async (item) => {
        try {
            console.log('gotoMap press');
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Schedulics Geolocation Permission',
                    'message': 'Schedulics needs access to your current location so you can share or track for a ride'
                });
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                props.navigation.navigate('MapScreen', {
                    datapass: item,
                    image: item.customer.image,
                })
            } else {
                console.log("Geolocation permission denied");
                Alert.alert('Geolocation permission denied');
            }
        } catch (err) {
            console.warn(err)
        }
    }


    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', flex: 1 }} >
                    <MySpinner size="large"
                        visible={loading} />
                    {
                        refreshing ?
                            <ActivityIndicator style={{ color: Color.AppColor }} />
                            : null
                    }
                    <FlatList ListEmptyComponent={loading == false && refreshing == false ? noItemDisplay() : null}
                        data={data}
                        // inverted={true}
                        renderItem={({ item, index }) => (
                            <View style={styles.mainView} >
                                <View style={styles.topView} >
                                    <Text style={styles.bookingTextDate} > {String.MyBookingTab.date_time} </Text>
                                    <Text style={styles.textstatus} > {String.MyBookingTab.satus}</Text>
                                </View>
                                <View style={styles.topView_dis} >
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={styles.textDate_dis} >
                                            {moment(item.booking_date).format('DD MMM YYYY')}
                                        </Text>
                                        <Text style={styles.bookingTimeText} >
                                            {moment(item.booking_time, 'HH:mm:ss').format('LT')}
                                        </Text>
                                    </View>
                                    <View style={styles.statusView}>
                                        {item.order_status != null && item.order_status == 'CNF' ?
                                            <View >
                                                <Text style={styles.textstatus_dis}> Confirm </Text>
                                            </View>
                                            : null}
                                        {item.order_status != null && item.order_status == 'P' ?
                                            <View>
                                                <Text style={styles.textstatus_dis} > Pending </Text>
                                            </View>
                                            : null}
                                        {item.order_status != null && item.order_status == 'AC' ?
                                            <View>
                                                <Text style={styles.textstatus_dis} > Accepted </Text>
                                            </View>
                                            : null}
                                        {/* {item.order_status != null && item.order_status == 'OW' ? */}
                                        <View>
                                            <Text style={styles.textstatus_dis} > On The Way </Text>
                                        </View>
                                        {/* : null} */}
                                        {item.order_status != null && item.order_status == 'WS' ?
                                            <View>
                                                <Text style={styles.textstatus_dis} > Work Started </Text>
                                            </View>
                                            : null}
                                        {item.order_status != null && item.order_status == 'C' ?
                                            <View>
                                                <Text style={styles.textstatus_dis} > Canceled </Text>
                                            </View>
                                            : null}
                                        {item.order_status != null && item.order_status == 'RSS' ?
                                            <View>
                                                <Text style={styles.textstatus_dis}> Rescheduled By Staff </Text>
                                            </View>
                                            : null}
                                        {item.order_status != null && item.order_status == 'RSA' ?
                                            <View>
                                                <Text style={styles.textstatus_dis} > Rescheduled By Admin </Text>
                                            </View>
                                            : null}
                                        {item.order_status != null && item.order_status == 'RSC' ?
                                            <View>
                                                <Text style={styles.textstatus_dis} > Rescheduled By Client </Text>
                                            </View>
                                            : null}
                                        {item.order_status != null && item.order_status == 'ITR' ?
                                            <View>
                                                <Text style={styles.textstatus_dis} > Intrupted </Text>
                                            </View>
                                            : null}
                                        {item.order_status != null && item.order_status == 'CC' ?
                                            <View>
                                                <Text style={styles.textstatus_dis} > Cancel by Client </Text>
                                            </View>
                                            : null}
                                        {item.order_status != null && item.order_status == 'CO' ?
                                            <View >
                                                <Text style={styles.textstatus_dis} > Completed </Text>
                                            </View>
                                            : null}
                                    </View>
                                </View>
                                <View style={styles.service_btn_mainview} >
                                    <View style={styles.service_dis} >
                                        <Text style={styles.textDate_time} >
                                            {String.MyBookingTab.servicest}
                                        </Text>
                                        <Text style={styles.textTime_dis} >
                                            {
                                                item.service == null ? null :
                                                    item.service.service_name
                                            }
                                        </Text>
                                    </View>
                                    <View style={styles.service_dis_btn} >
                                        {item.order_status == 'OW' &&
                                            item.booking_date == currentdate &&
                                            bookingtimecurrenttime(crtime, item.booking_time) < 30 ?
                                            <TouchableOpacity style={styles.btnViewWorkstarted}
                                                onPress={
                                                    () => {
                                                        getStatus(item.id, 'WS', "");
                                                    }
                                                } >
                                                <Text style={styles.btnText} > {String.MyBookingTab.workstarted}
                                                </Text>
                                            </TouchableOpacity>
                                            : null}
                                        {item.order_status == 'WS' && item.payment != null ?
                                            <View>
                                                {item.payment.payment_status == 'unpaid' ?
                                                    <TouchableOpacity style={styles.btnViewDetails}
                                                        onPress={() => {
                                                            getStatus(item.id, 'CO', item.service.service_sub_type),
                                                                props.navigation.navigate('Payment', {
                                                                    datapass: item,
                                                                    image: item.customer.image,
                                                                });
                                                        }}
                                                    >
                                                        <Text style={styles.btnText} >
                                                            {String.MyBookingTab.completed}
                                                        </Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity style={styles.btnViewDetails}
                                                        onPress={
                                                            () => {
                                                                getStatus(item.id, 'CO', item.service.service_sub_type),
                                                                    props.navigation.navigate('Home');
                                                                removeLocationUpdates()
                                                            }
                                                        } >
                                                        <Text style={styles.btnText} > {String.MyBookingTab.completed} </Text>
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                            : null}
                                        {item.order_status == 'AC' &&
                                            item.booking_date == currentdate &&
                                            bookingtimecurrenttime(crtime, item.booking_time) < 60 ?
                                            <TouchableOpacity style={styles.btnViewOntheWay}
                                                onPress={
                                                    () => {
                                                        getStatus(item.id, 'OW', item.service.service_sub_type);
                                                    }
                                                } >
                                                <Text style={styles.btnText} > {String.MyBookingTab.ontheway} </Text>
                                            </TouchableOpacity>
                                            : null
                                        }
                                        <View>
                                            {item.order_status == 'OW' && item.service.service_sub_type == 'at_home' ?
                                                <TouchableOpacity style={styles.btnViewMap}
                                                    onPress={() => gotoMap(item)} >
                                                    <Text style={styles.btnText} > {String.MyBookingTab.map} </Text>
                                                </TouchableOpacity>
                                                : null}
                                        </View>
                                    </View>

                                </View>

                                <View style={styles.service_btn_mainview} >
                                    <View >
                                        <View style={styles.service_dis} >
                                            <Text style={styles.textDate_time} >
                                                {String.MyBookingTab.amount}
                                            </Text>

                                            {currencySymbolePosition == 'left' ?
                                                <Text style={styles.textTime_dis} >
                                                    {currencyFormatter.format(item.total_cost, { code: currency })}
                                                </Text>
                                                :
                                                <Text style={styles.textTime_dis} >
                                                    {currencyFormatter.format(item.total_cost, { code: currency })}
                                                </Text>
                                            }
                                        </View>
                                        <View style={styles.service_customer} >
                                            <Text style={styles.textDate_time} >
                                                {String.MyBookingTab.customer}
                                            </Text>
                                            <Text style={styles.textTime_dis} >
                                                {item.customer == null ? null : item.customer.fullname}
                                            </Text>
                                        </View>
                                    </View>
                                    <View >
                                        <View style={styles.service_dis_btn} >
                                            <TouchableOpacity
                                                style={styles.btnViewDetails}
                                                onPress={() => props.navigation.navigate('onGoingDetails', {
                                                    datapass: item,
                                                    image: item.customer.image,
                                                })} >
                                                <Text style={styles.btnText} > {String.MyBookingTab.details}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        {covertDateTime(item.booking_date, item.booking_time).diff(currenttime) >= timeconvert ? (
                                            <View style={styles.btnViewReject} >
                                                <TouchableOpacity onPress={() =>
                                                    props.navigation.navigate('Reshedul', {
                                                        datapass: item,
                                                    })
                                                } >
                                                    <Text style={styles.btnText}> Reshedul</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ) : null
                                        }
                                    </View>
                                </View>
                            </View>
                        )}
                        refreshControl={
                            <RefreshControl
                                //refresh control used for the Pull to Refresh
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        contentContainerStyle={styles.list} >
                    </FlatList>
                </View>

            </View>
        </SafeAreaView>
    );
};
export default OngoingTab;