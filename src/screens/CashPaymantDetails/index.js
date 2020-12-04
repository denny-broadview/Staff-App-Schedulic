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
const CashPaymantDetails = (props) => {
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
  const [couponeCode, setCouponeCode] = useState('');
  let [discountvalue, setDiscountvalue] = useState('');
  const [data, setData] = useState({});
  const taxArray = useSelector((state) => state.setting.tax);
  const [taxAll, setAllTax] = useState([]);
  let [calTaxArray, setCalTaxArray] = useState({});
  let [valTexArrary, setValTexArrary] = useState([]);
  let amountGST = 0;
  let amountCGST = 0;
  console.log('tax-----', taxArray);

  useEffect(() => {
    if (props.route.params !== null) {
      setData(props.route.params.datapass);
      console.log(
        'item ongoing in paymant screen-----------',
        props.route.params.datapass,
      );
      taxCal();
    }
    console.log(' ongoing pic-----------', props.route.params.image);
  }, []);

  // coupon code api calling
  function couponeCodeapi() {
    setLoading(true);
    let myForm = new FormData();
    myForm.append('coupon_code', couponeCode);
    myForm.append('business_id', Constants.businessid);
    myForm.append('service_id', props.route.params.datapass.id);
    Auth.PostServiceAuth(myForm, Constants.ApiAction.couponcode, (res) => {
      setLoading(false);
      if (res[1].data == true) {
        setCouponView(true);
        setDiscountvalue(res[1].response.coupon_value);
        console.log('discount======', discountvalue);
      } else {
        Auth.ToastMessage(res[1].response);
        setCouponView(false);
      }
    });
  }

  const taxCal = () => {
    setAllTax(taxArray);
    let tempsArr = [];
    let valuArr = [];
    let GstSgstArr = [];

    let subtotal = data.total_cost;
    console.log('subtotal----', subtotal);

    for (var i in taxAll) {
      if (i == 0) {
        amountGST = (parseFloat(taxAll[0].value) * parseFloat(subtotal)) / 100;
        GstSgstArr.push({amount: amountGST});
      } else if (i == 1) {
        amountCGST = (parseFloat(taxAll[1].value) * parseFloat(subtotal)) / 100;
        GstSgstArr.push({amount: amountCGST});
      }
    }

    console.log('GstSgstArr-----', GstSgstArr);

    taxAll.forEach((element) => {
      // GstSgstArr.forEach((gstelemant) => {
      //   let val = parseFloat(element.value);
      //   tempsArr.push({
      //     name: element.name,
      //     value: val,
      //     amount: gstelemant.amount,
      //   });
      //   valuArr.push(val);
      // });
      let val = parseFloat(element.value);
      tempsArr.push({
        name: element.name,
        value: val,
        amount: 0,
      });
      valuArr.push(val);
    });
    setCalTaxArray(tempsArr);
    console.log('tex array---', tempsArr);
    console.log('amountGST====', amountGST);
    console.log('amountCGST=====', amountCGST);
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
                style={styles.courseImg}/>
            </View>
            <Text style={styles.userNameSyl}>
              {data.customer == null ? null : data.customer.fullname}
            </Text>

            {currencySymbolePosition == 'left' ? (
              <Text style={styles.userAmount}>
                {currencyFormatter.format(
                  data.total_cost,
                  {code: currency},
                  {locale: currencyFrm},
                )}
              </Text>
            ) : (
              <Text style={styles.userAmount}>
                {currencyFormatter.format(
                  data.total_cost,
                  {locale: currencyFrm},
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
                {locale: currencyFrm},
              )}
            </Text>
          ) : (
            <Text style={styles.text_rs}>
              {currencyFormatter.format(
                data.total_cost,
                {locale: currencyFrm},
                {code: currency},
              )}
            </Text>
          )}
        </View>

        <View>
          {/* <View style={styles.amountView}>
          <Text style={styles.text_amount}>GST</Text>

          <Text style={styles.text_rs}>{amountGST}</Text>
        </View>
        <View style={styles.amountView}>
          <Text style={styles.text_amount}>CGST</Text>

            <Text style={styles.text_rs}>{amountCGST}</Text>
        </View> */}

          <View>
            <FlatList
              data={calTaxArray}
              renderItem={({item, index}) => (
                <View style={styles.amountView}>
                  <Text style={styles.text_amount}>{item.name}</Text>
                  {currencySymbolePosition == 'left' ? (
                    <Text style={styles.text_rs}>
                      {currencyFormatter.format(
                        item.value,
                        {code: currency},
                        {locale: currencyFrm},
                      )}
                    </Text>
                  ) : (
                    <Text style={styles.text_rs}>
                      {currencyFormatter.format(
                        item.value,
                        {locale: currencyFrm},
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

          <Text style={styles.textTotalRs}>152</Text>
        </View>
        <View style={styles.add_more_serviceMainView}>
          <TouchableOpacity
            style={styles.buttonStylpass}
            onPress={() => props.navigation.replace('PaymantDone')}>
            <Text style={styles.textChange}>{String.cashpaymant.paid}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.proceedtocheckMainView}>
          <TouchableOpacity style={styles.buttonStylupdate}>
            <Text style={styles.textUpdate}>{String.cashpaymant.cancel}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default CashPaymantDetails;
