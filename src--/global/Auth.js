import {Constants} from '@global'
import{Alert} from 'react-native';
import {String} from '../utlis/String';

const Auth = {
    PostCustomerTokenAuth:PostCustomerTokenAuth,
    PostServiceAuth:PostServiceAuth,
    ToastMessage:ToastMessage
};

function PostServiceAuth(data,action, cb) {
    fetch(Constants.ApiBaseUrl + action, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data'
      }),
      body: data,
    })
      .then(response => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(responseJson => {
        cb(responseJson);
      })
      .catch(error => {
        cb(error);
        console.error(error);
      });
  }
  function PostCustomerTokenAuth(token,id,data,action,cb){
    fetch(Constants.ApiBaseUrl + action, {
      method: 'POST',
      headers: new Headers({
        'api-token':token,
        'staff-id':id
        
      }),
      body: data,
    })
      .then(response => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(responseJson => {
        cb(responseJson);
      })
      .catch(error => {
        cb(error);
        console.error(error);
      });
  }

  function ToastMessage(message) {
    return (
    Alert.alert(
        String.app.App,
        message,
        [
            {
                text: "Ok",
                onPress: () => console.log("Cancel Pressed"),
            }
        ],
        
        { cancelable: false })
    )
}
  
  export default Auth;
