import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import styles from './style';
import HeaderView from '../../../component/headerTab';
import {String} from '../../../utlis/String';
import PDFView from 'react-native-view-pdf';
import {MySpinner} from '../../../component/MySpinner';
import {connect} from 'react-redux';
import {Auth, Constants} from '@global';

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      id: props.route.params.id,
      email: props.route.params.email,
      orderid:props.route.params.orderid,
      userProfileData: props.userProfileData,

      
    };
    console.log('id----',this.state.orderid);
    console.log('email id----',this.state.email);
  }

  render() {

 const getinvoice = () => {
      let myForm = new FormData();
      myForm.append('order_item_id', this.state.orderid);
      myForm.append('email', this.state.email);
      console.log('parm send invoice===', myForm);
      Auth.PostCustomerTokenAuth(
        this.state.userProfileData.token,
        this.state.userProfileData.user_id,
        myForm,
        Constants.ApiAction.sendInvoice,
        (res) => {
          console.log(' send invoice--------', res);
          if (res[1].data == true) {
            Auth.ToastMessage(res[1].response);
          } else {
            Auth.ToastMessage(res.data);
          }
        },
      );
    }

    return (
      <View style={styles.container}>
        <HeaderView
          header={true}
          back={true}
          search={false}
          notification={false}
          searchClick={false}
          headertext={String.MyBookingTab.invoice}
          onPress={() => this.props.navigation.goBack()}
        />
        <View style={styles.sendinvoice}>
          <TouchableOpacity style={styles.button} onPress={() => getinvoice()}>
            <Text style={{color: '#fff', fontSize: 16}}>
              {String.invoice.Sendinvoice}
            </Text>
          </TouchableOpacity>
        </View>
        <MySpinner size="large" visible={this.state.loading} />
        <PDFView
          fadeInDuration={50.0}
          resource={this.state.id}
          onError={() => alert('PDF is not open?')}
          style={styles.pdf}
        />
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    userProfileData: state.user.user,
  };
}
export default connect(mapStateToProps)(Invoice);
