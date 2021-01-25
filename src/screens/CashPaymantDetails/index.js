import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import styles from './styles';
import {String} from '../../utlis/String';
import HeaderView from '../../component/headerTab';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {MySpinner} from '../../component/MySpinner';
import {Auth, Constants} from '@global';
const axios = require('axios').default;
const CashPaymantDetails = (props) => {
  const userInfo = useSelector((state) => state.user.user);
  const businessdata = useSelector((state) => state.businessDetails.businessDetails);
  var currencyFormatter = require('currency-formatter');
  const currency = useSelector((state) => state.setting.setting.currency);
  const currencySymbolePosition = useSelector(
    (state) => state.setting.setting.currency_symbol_position,
  );
  const currencyFrm = useSelector(
    (state) => state.setting.setting.currency_format,
  );
  const [couponview, setCouponView] = useState(false);
  const [loagind, setLoading] = useState(false);
  const [couponeCode, setCouponeCode] = useState(null);
  let [discountvalue, setDiscountvalue] = useState(null);
  let [discountType, setDiscountType] = useState(null);
  let [discount, setDiscount] = useState(null);
  const [data, setData] = useState({});
  const taxArray = useSelector((state) => state.setting.tax);
  let [calTaxArray, setCalTaxArray] = useState({});
  let amountGST = 0;
  let amountCGST = 0;
  let [grantTotal, setGrantTotal] = useState('');
  let tempsArr = [];
  

  const [payment, setPayment] = useState([]);

  const [taxObject, setTaxObject] = useState([]);
  const [method, setMethod] = useState([]);
  let subtotal = props.route.params.datapass.total_cost;
  let taxSub = 0;
  let GstSgstArr1 = [];
  useEffect(() => {
   
    if (props.route.params !== null) {
      setData(props.route.params.datapass);
      setPayment(props.route.params.payment);
      setMethod(props.route.params.method);
      // console.log('payment in userInfo ', userInfo.email);
    }
  }, []);
  useEffect(() => {
    taxCal();
  }, [data]);

  useEffect(() => {
    let val = fnFinalVal();
    setGrantTotal(val);
    console.log('txtTotla in useEffect  - ', val);
  }, [discountType]);

 
  // coupon code api calling
  function couponeCodeapi() {
    setLoading(true);
    let myForm = new FormData();
    myForm.append('coupon_code', couponeCode);
    myForm.append('business_id', Constants.businessid);
    myForm.append('service_id', props.route.params.datapass.service_id);
    console.log('Object req for coupon ', myForm);
    Auth.PostServiceAuth(myForm, Constants.ApiAction.couponcode, (res) => {
      setLoading(false);
      if (res[1].data == true) {
        setCouponView(true);
        setDiscountvalue(res[1].response.coupon_value);
        setDiscountType(res[1].response.coupon_type);
      } else {
        Auth.ToastMessage(res[1].response);
        setCouponView(false);
      }
      console.log('Object Res for coupon ', res[1].response);
    });
  }

  const taxCal = () => {
    // setAllTax(taxArray);
   

    for (var ii in taxArray) {
      if (ii == 0) {
        amountGST =
          (parseFloat(taxArray[0].value) * parseFloat(subtotal)) / 100;
          GstSgstArr1.push({amount: amountGST});
        taxSub = taxSub + amountGST;
      } else if (ii == 1) {
        amountCGST = (parseFloat(taxArray[1].value) * parseFloat(subtotal)) / 100;
        GstSgstArr1.push({amount:amountCGST});
        taxSub = taxSub + amountCGST;
      }
    }
    for (let i = 0; i < taxArray.length; i++) {
      tempsArr.push({
        name: taxArray[i].name,
        value: taxArray[i].value,
        amount: GstSgstArr1[0].amount
      });
    }
    setCalTaxArray(tempsArr);

    if (taxSub) {
      let val = fnFinalVal();
      setGrantTotal(val);
      console.log('txtTotla arshad tax - ', val);
    }
  };
  const fnFinalVal = () => {
    let val;
    console.log('grantTotal------', grantTotal);
    console.log('subtotal------', subtotal);
    console.log('taxSub------', taxSub);
    console.log('discountvalue------', discountvalue);
    // console.log('discountType------', discountType);
    if (discountvalue && discountType) {
      if (discountType == 'P') {
        let discount =
          (parseFloat(grantTotal) * parseFloat(discountvalue)) / 100;

        val = parseFloat(grantTotal) - parseFloat(discount);
        console.log('discountType------arsh ', discount);
        setDiscount(discount);
      } else {
        val = parseFloat(grantTotal) - parseFloat(discountvalue);
      }
    } else {
      val = parseFloat(taxSub) + parseFloat(subtotal);
    }
    return val;
  };
  const paymentApi = () => {
    let resObject;

    let order = {
      tax: calTaxArray,
      discount_type: discountvalue,
      discount_value: discountvalue,
      discount: discount,
      nettotal: grantTotal,
    };

    if (method == 'cash') {
      resObject = {
        order_item_id: data.id,
        payment: [payment],
        orders: [order],
        orderItem: [order],
      };
    } else {
      resObject = {
        order_item_id: data.id,
        URL: businessdata.payment_url + data.id,
        email: userInfo.email,
        payment: [payment],
        orders: [order],
        orderItem: [order],
      };
    }

    console.log(' resObject ', JSON.stringify(resObject));

    setLoading(true);
    axios
      .post(
        Constants.ApiBaseUrl + Constants.ApiAction.cashpaymant,
        JSON.stringify(resObject),
        {
          headers: {
            'Content-Type': 'application/json',
            'api-token': userInfo.token,
            'staff-id': userInfo.user_id,
          },
        },
      )
      .then((response) => {
        setLoading(false);
        console.log('Payment  update--------', response.data);
        console.log('order id---------', response.data.response);
        // props.navigation.navigate('ViewAppointmant', {id: response.data.response});
        let dataSatus = response.data.data;

        if (dataSatus == true) {
          console.log(response.data.response);
          props.navigation.replace('PaymantDone', {order_id: data.id});
        } else {
          Auth.ToastMessage('Error! while payment Update.');
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        Auth.ToastMessage('Error! while order Booking.');
      });
  };
  return (
    <View style={styles.container}>
      <HeaderView
        header={true}
        back={true}
        search={false}
        notification={true}
        searchClick={false}
        onPressNoti={() => props.navigation.navigate('Notification')}
        headertext={String.payment.paymantDetails}
        onPress={() => props.navigation.goBack()}
      />
      <Text style={styles.serviewText}>{String.cashpaymant.service}</Text>
      <ScrollView>
        <View style={styles.topView}>
          <MySpinner size="large" visible={loagind} />
          <View style={styles.imgView}>
            <View style={styles.courseImgView}>
              <Image
                source={{uri: props.route.params.image}}
                style={styles.courseImg}
              />
            </View>
            <Text style={styles.userNameSyl}>
              {data.customer == null ? null : data.customer.fullname}
            </Text>

            {currencySymbolePosition == 'left' ? (
              <Text style={styles.userAmount}>
                {currencyFormatter.format(
                  data.total_cost,
                  {code: currency},
                  //{locale: currencyFrm},
                )}
              </Text>
            ) : (
              <Text style={styles.userAmount}>
                {currencyFormatter.format(
                  data.total_cost,
                 // {locale: currencyFrm},
                  {code: currency},
                )}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.amountView}>
          <Text style={styles.text_amount}>{String.cashpaymant.amount}</Text>

          {currencySymbolePosition == 'left' ? (
            <Text style={styles.text_rs}>
              {currencyFormatter.format(
                data.total_cost,
                {code: currency},
               // {locale: currencyFrm},
              )}
            </Text>
          ) : (
            <Text style={styles.text_rs}>
              {currencyFormatter.format(
                data.total_cost,
               // {locale: currencyFrm},
                {code: currency},
              )}
            </Text>
          )}
        </View>

        <View>
          <View>
            <FlatList
              data={calTaxArray}
              renderItem={({item, index}) => (
                <View style={styles.amountView}>
                  <Text style={styles.text_amount}>{item.name}{"("}{item.value}{"%)"}</Text>
                  {currencySymbolePosition == 'left' ? (
                    <Text style={styles.text_rs}>
                      {currencyFormatter.format(
                        item.amount,
                        {code: currency},
                       // {locale: currencyFrm},
                      )}
                    </Text>
                  ) : (
                    <Text style={styles.text_rs}>
                      {currencyFormatter.format(
                        item.amount,
                       // {locale: currencyFrm},
                        {code: currency},
                      )}
                    </Text>
                  )}
                </View>
              )}></FlatList>
          </View>
        </View>
        <View style={styles.amountView}>
          <Text style={styles.text_coupon}>{String.cashpaymant.coupon}</Text>
          <View>
            {couponview == true ? (
              <View style={styles.coiponViewApp}>
                <Text style={styles.text_coupon_applied}>
                  {String.cashpaymant.coupon_code_applied}
                </Text>
              </View>
            ) : (
              <View style={styles.coiponView}>
                <TextInput
                  style={styles.textCouponCode}
                  onChangeText={(text) => {
                    setCouponeCode(text);
                  }}
                  placeholder={String.cashpaymant.couponcode}
                  maxLength={10}
                  keyboardType="default"
                />
                <View style={styles.couponIconView}>
                  <Icon
                    name="check"
                    style={styles.inc_coupon}
                    onPress={() => couponeCodeapi()}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={styles.borderView} />
        <View style={styles.totalamountView}>
          <Text style={styles.textTotal}>{String.cashpaymant.total}</Text>
          {currencySymbolePosition == 'left' ? (
            <Text style={styles.textTotalRs}>
              {currencyFormatter.format(
                grantTotal,
                {code: currency},
               // {locale: currencyFrm},
              )}
            </Text>
          ) : (
            <Text style={styles.textTotalRs}>
              {currencyFormatter.format(
                grantTotal,
               // {locale: currencyFrm},
                {code: currency},
              )}
            </Text>
          )}
        </View>
        <View style={styles.add_more_serviceMainView}>
          {method == 'cash' ? (
            <TouchableOpacity
              style={styles.buttonStylpass}
              onPress={() => paymentApi()}>
              <Text style={styles.textChange}>{String.cashpaymant.paid}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.buttonStylpass}
              onPress={() => paymentApi()}>
              <Text style={styles.textChange}>
                {String.cashpaymant.paymantlink}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.proceedtocheckMainView}>
          <TouchableOpacity
            style={styles.buttonStylupdate}
            onPress={() => props.navigation.goBack()}>
            <Text style={styles.textUpdate}>{String.cashpaymant.cancel}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default CashPaymantDetails;
