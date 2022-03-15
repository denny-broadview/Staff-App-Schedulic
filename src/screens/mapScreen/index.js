import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  Dimensions,
} from 'react-native';
import styles from './styles';
import { String } from '../../utlis/String';
import HeaderView from '../../component/headerTab';
import MapView, { Polyline, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import database from '@react-native-firebase/database';
import IconCall from 'react-native-vector-icons/Ionicons';
import Geocoder from 'react-native-geocoding';
import TextAvatar from 'react-native-text-avatar';
import { Color } from '../../utlis';
import { useSelector, useDispatch } from 'react-redux';
import firebaseApp from '@database/FirebaseConfig';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import Geolocation from 'react-native-geolocation-service';
import Constants from '../../global/Constants';

const MapScreen = (props) => {
  const GOOGLE_MAPS_APIKEY = Constants.GOOGLE_MAPS_APIKEY;
  Geocoder.init(Constants.GOOGLE_MAPS_APIKEY);
  const [data, setData] = useState({});
  const [customerImage, setCustomerImage] = useState('')
  const [orderId, setOrderId] = useState(0)
  const [coordinates, setCoordinates] = useState([])
  const [distanceMeter, setDistanceMeter] = useState([])
  const [destination, setDestination] = useState({ latitude: 0, longitude: 0 })
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  let mapView = useRef(null);
  let sdd = coordinates.data
  let dd = { "latitude": 21.134464, "longitude": 72.857223 }
  if (sdd && sdd.length > 0) {
    dd = { "latitude": Number(sdd[0]), "longitude": Number(sdd[1]) }
  }
  let origin = dd;
  const staffLocation = useSelector(
    (state) => state.BookingService.staffLocation,
  );
  useEffect(() => {
    if (props.route.params !== null) {
      let receivedData = props.route.params.datapass
      setData(receivedData);
      setCustomerImage(props.route.params.image)
    }
    addCoordinates()
  }, []);

  const addCoordinates = () => {
    let latitude = staffLocation.latitude
    let longitude = staffLocation.longitude
    let orderId = props.route.params.datapass.order_id
    var postListRef = firebaseApp.database()
      .ref('trackOrder/currentLocation/')
    postListRef.child(orderId).set(
      { latitude, longitude, orderId }
    )
      .then((data) => {
        // readCoordinateData(data)
      }).catch((error) => {
        console.log('error ', error)
      })
  }
  const snapshotToArray = obj => {
    let returnArr = [];

    obj.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  };

  const readCoordinateData = () => {
    let key = props.route.params.datapass.order_id
    console.log('key --', key);
    firebaseApp.database().ref('trackOrder/currentLocation/' + key)
      .on('value', function (snapshot) {
        setCoordinates({ data: snapshotToArray(snapshot) })
      });
  }

  useEffect(() => {
    let receivedData = props.route.params.datapass
    let locAddress = receivedData.orders_info.booking_address;
    let locCity = receivedData.orders_info.booking_city;
    let locState = receivedData.orders_info.booking_state;
    let locZip = receivedData.orders_info.booking_zipcode;

    // let locAddress = "piyush point";
    // let locCity = "Surat";
    // let locState = "Gujarat";
    // let locZip = "394601";

    Geocoder.from(locAddress + ", " + locCity + ", " + locState + ", " + locZip)
      .then(json => {
        var location = json.results[0].geometry.location;
        setDestination({ latitude: location.lat, longitude: location.lng })
      })
      .catch(error => console.warn(error));
    setOrderId(receivedData.order_id);

  }, [data]);

  useEffect(() => {
    addCoordinates()
    readCoordinateData()

  }, [destination])


  function callNow(item) {
    let ph = item.customer.phone;
    let phoneNumber = ph;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${ph}`;
    } else {
      phoneNumber = `tel:${ph}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <View style={styles.container}>
      <HeaderView
        header={true}
        back={true}
        search={false}
        notification={true}
        searchClick={false}
        onPressNoti={() => props.navigation.navigate('Notification')}
        headertext={String.map.map}
        onPress={() => props.navigation.goBack()}
      />
      {destination.latitude !== null ? (
        <MapView
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={styles.mapStyle}
          ref={mapView}
          onPress={() => null} >
          <View>
            <MapView.Marker
              coordinate={origin}>
              <View style={{ marginTop: 30, marginLeft: 10 }}>
                <View style={styles.courseImgView}>
                  <TextAvatar
                    backgroundColor={'#ffff00'}
                    textColor={'#0000ff'}
                    size={60}
                    type={'circle'} // optional
                  >{'Staff'}</TextAvatar>
                </View>
              </View>
            </MapView.Marker>
            <MapView.Marker
              coordinate={destination}>
              <View style={{ marginTop: 30, marginLeft: 10 }}>
                <View style={styles.courseImgView}>
                  <Image
                    source={{ uri: customerImage }}
                    style={styles.courseImg}
                  />
                </View>
              </View>
            </MapView.Marker>
          </View>
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor={Color.AppColor}
            optimizeWaypoints={true}
            mode='DRIVING'
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              setDistanceMeter(result.distance);
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)
              {
                setTimeout(() => {
                  typeof mapView.current.fitToCoordinates(
                    result.coordinates, {
                    edgePadding: {
                      right: (width / 5),
                      bottom: (height / 5),
                      left: (width / 5),
                      top: (height / 5),
                    },
                  });
                }, 1000);
              }
            }}
            onError={(errorMessage) => {
              console.log('GOT AN ERROR ' + errorMessage);
            }}
          />
        </MapView>) : null}
      <View style={styles.cardView}>
        <View style={styles.distansView}>
          <Text style={styles.text_diatance}>{String.map.distance}</Text>
          <Text style={styles.text_dist}>{distanceMeter} km away from you</Text>
        </View>
        <TouchableOpacity
          style={styles.btnPhone}
          onPress={() => callNow(props.route.params.datapass)}>
          <View style={styles.btnPhoneView}>
            <IconCall name="md-call-sharp" style={styles.iconbell} />
          </View>
        </TouchableOpacity>
        <View style={styles.staffView}>
          <Text style={styles.text_diatance}>{String.map.customer}</Text>
          <Text style={styles.text_dist}>{props.route.params.datapass.customer.fullname}</Text>
        </View>
      </View>
    </View>
  );
};
export default MapScreen;
