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
    Alert,
} from 'react-native';
import styles from './styles';
import { String } from '../../../utlis/String';
import { Color, Matrics } from '../../../utlis';
import { MySpinner } from '../../../component/MySpinner';
import { Auth, Constants } from '@global';
import { useSelector, useDispatch } from 'react-redux';
import { setStaffLocation } from '../../../store/actions';
import moment from 'moment';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';
import { isRecheduleTimeIsAvailable } from '../../../utlis/function';
const OngoingTab = (props) => {
    const userInfo = useSelector((state) => state.user.user);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('')
    const [reference, setReference] = useState('')
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const onGoingFromRedux = useSelector(
        (state) => state.BookingService.onGoingData,
    );
    const { min_advance_booking_time } = useSelector(
        (state) => state.setting.setting,
    );
    const dispatch = useDispatch();
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

    const settingreshedultime = useSelector(
        (state) => state.setting.setting.min_reseduling_time,
    );

    const currentdate = moment().utcOffset('+05:30').format('YYYY-MM-DD');
    const crtime = moment().utcOffset('+05:30').format('HH:mm:ss');

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

    const onRefresh = () => {
        setData([]);
        setPage(1)
        getOnGoing(1);
        setRefreshing(true)
    };
    const loadMoreData = () => {
        if (page <= lastPage) {
            getOnGoing();
            setPage(page + 1);
        }
    }
    useEffect(() => {
        if (searchKeyFromProbs) {
            setPage(1)
            getOnGoing()
        }
    }, [searchKeyFromProbs]);
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getOnGoing();
            setPage(page + 1);
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
        } else {
            setData(masterDataSource);
        }
    }

    function noItemDisplay() {
        return (
            <View style={
                { flex: 1, alignSelf: 'center', marginTop: Matrics.Scale(50) }} >
                <Text style={
                    { fontSize: 20, color: Color.AppColor }} > {String.app.datanotfound}
                </Text>
            </View>
        );
    }

    function bookingtimecurrenttime(val1, val2) {
        //  var str = val1 + ' ' + val2;
        var startTime = moment(val2, "HH:mm:ss");
        var endTime = moment(val1, "HH:mm:ss");
        var duration = moment.duration(endTime.diff(startTime));
        // duration in hours
        var hours = parseInt(duration.asHours());
        var minutes = parseInt(duration.asMinutes()) % 60;
        return (minutes + (hours * 60));
    }
    // Api calling for onGoing
    function getOnGoing(pageRef) {
        setLoading(true);
        setRefreshing(false);
        let myForm = new FormData();
        myForm.append('business_id', Constants.businessid);
        Auth.PostCustomerTokenAuth(
            userInfo.token,
            userInfo.user_id,
            myForm,
            Constants.ApiAction.staffOnGoing + '?page=' + (pageRef === 1 ? 1 : page),
            (res) => {
                if (res[1].data === true) {
                    setRefreshing(false)
                    setLoading(false)
                    let dataRes = res[1].response.data;
                    let lastPage = res[1].response.last_page;
                    if (dataRes.length > 0) {
                        if (pageRef === 1) {
                            setData(dataRes)
                        } else {
                            page === 1 ? setData(dataRes) : setData(data.concat(dataRes))
                        }
                    }
                    setLastPage(lastPage)

                    // let tempdata = JSON.stringify(res[1].response);
                    // setLoading(false);
                    // setRefreshing(false);
                    // setData(JSON.parse(tempdata));
                    // setMasterDataSource(res[1].response);
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
                            // getStaffLatLng();
                        }
                        if (st === 'CO' && sType === 'at_home') {
                            // removeLocationUpdates()
                        }

                    }, 1000);

                } else {
                    setLoading(false);
                }
            },
        );
    }

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

    const renderFooter = () => {
        return (loading && !refreshing && <View style={{ flex: 1, height: 50, }}><ActivityIndicator color={Color.AppColor} /></View>);
    }
    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', flex: 1 }} >
                    {/* <MySpinner size="large"
                        visible={loading} /> */}
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
                                        {item.order_status != null && item.order_status == 'OW' ?
                                            <View>
                                                <Text style={styles.textstatus_dis} > On The Way </Text>
                                            </View>
                                            : null}
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
                                                                // removeLocationUpdates()
                                                            }
                                                        } >
                                                        <Text style={styles.btnText} > {String.MyBookingTab.completed} </Text>
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                            : null}
                                        {item.order_status == 'AC' && item.service.service_sub_type === 'at_home' &&
                                            item.booking_date == currentdate &&
                                            bookingtimecurrenttime(crtime, item.booking_time) < parseInt(min_advance_booking_time) ?
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
                                        {(isRecheduleTimeIsAvailable(item.booking_date + ' ' + item.booking_time, settingreshedultime)) ? (
                                            // {covertDateTime(item.booking_date, item.booking_time).diff(currenttime) >= timeconvert ? (
                                            <View style={styles.btnViewReject} >
                                                <TouchableOpacity onPress={() =>
                                                    props.navigation.navigate('Reshedul', {
                                                        datapass: item,
                                                    })
                                                } >
                                                    <Text style={styles.btnText}> Reschedule </Text>
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
                        onEndReached={loadMoreData}
                        onEndReachedThreshold={0.01}
                        ListFooterComponent={renderFooter}
                        contentContainerStyle={styles.list} >
                    </FlatList>
                </View>

            </View>
        </SafeAreaView>
    );
};
export default OngoingTab;