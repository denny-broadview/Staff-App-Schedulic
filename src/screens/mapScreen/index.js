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
import CustomOrderID from '../../utlis/CustomOrderID';

const MapScreen = (props) => {

  // const GOOGLE_MAPS_APIKEY = 'AIzaSyCgvbox9d8q_3iQX_GqtABbyTtDzNsKBvg';
  const GOOGLE_MAPS_APIKEY = 'AIzaSyA8RwRCpG7ajbR-pl0D58oUGzi83c6RCYk';
  Geocoder.init('AIzaSyA8RwRCpG7ajbR-pl0D58oUGzi83c6RCYk');
  // Geocoder.init('AIzaSyCgvbox9d8q_3iQX_GqtABbyTtDzNsKBvg');

  const [data, setData] = useState({});
  const [customerImage, setCustomerImage] = useState('')
  const [orderId, setOrderId] = useState(0)
  const [coordinates, setCoordinates] = useState([])
  const [distanceMeter, setDistanceMeter] = useState(0)
  const [destination, setDestination] = useState({ latitude: 0, longitude: 0 })
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  let mapView = useRef(null);

  let sdd = coordinates.data
  let dd = null;
  if (sdd && sdd.length > 0) {
    dd = { "latitude": parseFloat(sdd[0]), "longitude": parseFloat(sdd[1]) }
  }
  let origin = dd
  
  const staffLocation = useSelector(
    (state) => state.BookingService.staffLocation,
  );
  // console.log('stafflocation REDUX -------------', staffLocation)
  useEffect(() => {
  
    if (props.route.params !== null) {
      let receivedData = props.route.params.datapass
      setData(receivedData);
      setCustomerImage(props.route.params.image)
      // console.log('item ongoing map-----------', receivedData);
      // console.log('item ongoing Order Item-----------', props.route.params.datapass.);
      console.log('Map location address ++++++++++++-----------', receivedData.orders_info.booking_address);
    }
    addCoordinates()
  }, []);

  const addCoordinates = () => {
   
    let latitude = staffLocation.latitude
    let longitude = staffLocation.longitude
    let orderId = props.route.params.datapass.id
    CustomOrderID.setOrderID(orderId)
    var postListRef = firebaseApp.database()
      .ref('trackOrder/currentLocation/')
    postListRef.child(orderId).set(
      { latitude, longitude, orderId }
    )
      .then((data) => {
        readCoordinateData(data)
      }).catch((error) => {
        console.log('error ---', error)
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
    let key = props.route.params.datapass.id
    firebaseApp.database().ref('trackOrder/currentLocation/' + key)
      .on('value', function (snapshot) {

        console.log('Response FB COOOOOOOR### ', JSON.stringify(snapshot.val()))
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
    console.log('Destination Address -', locAddress + ", " + locCity + ", " + locState + ", " + locZip);
    if (locAddress !== null && locCity !== null) {
      Geocoder.from(locAddress + ", " + locCity + ", " + locState + ", " + locZip)
        .then(json => {
          var location = json.results[0].geometry.location;
          console.log('Map location-----------', location);
          setDestination({ latitude: location.lat, longitude: location.lng })
        })
        .catch(error => console.warn(error));
    }else{
      Alert.alert("Booking address is not available! So you can't find Route.");
      setDestination({ latitude: 0, longitude: 0 })
    }

    setOrderId(receivedData.id);

  }, [data]);

  useEffect(() => {
    addCoordinates()
    readCoordinateData()

  }, [destination])

  function callNow(phone) {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
      //phoneNumber='9727024373'
      console.log('callNumber ----> ', phoneNumber);
    } else {
      phoneNumber = `tel:${phone}`;
      console.log('call android-------', phoneNumber);
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
        onPress={() => props.navigation.goBack()}/>
      {console.log(' origin  ====>', origin)}
      {console.log(' coordinates index  ====>', coordinates)}
      {console.log(' destination  ====>', destination)}
      {console.log(' orderid  ====>', orderId)}
      { destination.latitude !== null && origin !== null ? (
        <MapView
          initialRegion={{
            latitude: parseFloat(origin.latitude),
            longitude: parseFloat(origin.longitude),
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
              console.log('GOT AN ERROR' + errorMessage);
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
          onPress={() => callNow(props.route.params.datapass.customer.phone_office)}>
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
