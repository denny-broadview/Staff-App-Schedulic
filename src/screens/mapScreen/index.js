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
  Dimensions
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

const MapScreen = (props) => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyCgvbox9d8q_3iQX_GqtABbyTtDzNsKBvg';
  Geocoder.init('AIzaSyCgvbox9d8q_3iQX_GqtABbyTtDzNsKBvg');

  const [data, setData] = useState({});
  const [customerImage, setCustomerImage] = useState('')
  const [orderId, setOrderId] = useState(0)
  const [coordinates, setCoordinates] = useState([])
  const [distanceMeter, setDistanceMeter] = useState([])
  const [destination, setDestination] = useState({ latitude: null, longitude: null })
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  let mapView = useRef(null);
  const staffLocation = useSelector(
    (state) => state.BookingService.staffLocation,
  );
  // console.log('stafflocation REDUX -------------',staffLocation)
  useEffect(() => {
    if (props.route.params !== null) {
      setData(props.route.params.datapass);
      setCustomerImage(props.route.params.image)
      console.log('item ongoing map-----------', props.route.params.datapass);
      // console.log('item ongoing Order Item-----------', props.route.params.datapass.);
    }
  }, []);

  useEffect(() => {
    // let locAddress=data.orders_info.booking_address;
    // let locCity=data.orders_info.booking_city;
    // let locState=data.orders_info.booking_state;
    // let locZip=data.orders_info.booking_zipcode;



    let locAddress = "piyush point";
    let locCity = "Surat";
    let locState = "Gujarat";
    let locZip = "394601";

    Geocoder.from(locAddress + ", " + locCity + ", " + locState + ", " + locZip)
      .then(json => {
        var location = json.results[0].geometry.location;
        console.log('Map location-----------', location);
        setDestination({ latitude: location.lat, longitude: location.lng })
      })
      .catch(error => console.warn(error));
    setOrderId(data.id);

  }, [data]);

  useEffect(() => {
    // Update the document title using the browser API
    // database()
    //   .ref('trackOrder/currentLocation/')
    //   .orderByChild("orderId")
    //   .equalTo(orderId)
    //   .on('value', snapshot => {
    //     console.log('User snapshot data: ', snapshot.val());
    //     let locArr = [];
    //     let locObj = {};
    //     if (!snapshot == null) {
    //       console.log('snapshot -- >', snapshot);
    //       snapshot.forEach((childSnap) => {
    //         console.log('User data: -------------------', childSnap.val());
    //         let temps = childSnap.val();
    //         locObj = { latitude: temps.lat, longitude: temps.lng }
    //         locArr.push(locObj);
    //       });
    //     }
    //     setCoordinates(locArr)
    //   });
    let locObj = { latitude: staffLocation.lat, longitude: staffLocation.lng };
    let locArr = [];
    locArr.push(locObj);
    setCoordinates(locArr)
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
        onPress={() => props.navigation.goBack()}
      />
      {console.log(' coordinates  ====>', coordinates)}
      {console.log(' destination  ====>', destination)}
      {destination.latitude !== null ? (
        <MapView
          initialRegion={{
            latitude: destination.latitude,
            longitude: destination.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={styles.mapStyle}
          ref={mapView}
          onPress={() => null} >
          {coordinates.length > 0 ? (
            coordinates.map((coordinate, index) =>
              <View>
                <MapView.Marker
                  key={`coordinate_${index}`} coordinate={coordinate}>
                  <View style={{ marginTop: 30, marginLeft: 10 }}>
                    <View style={styles.courseImgView}>
                      <TextAvatar
                        backgroundColor={'#ffff00'}
                        textColor={'#0000ff'}
                        size={60}
                        type={'circle'} // optional
                      >Staff</TextAvatar>
                    </View>
                  </View>
                </MapView.Marker>
                <MapView.Marker
                  key={`coordinate_${index}`} coordinate={destination}>
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
            )) : null}
          <MapViewDirections
            origin={coordinates[0]}
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
                      right: (width / 2),
                      bottom: (height / 2),
                      left: (width / 2),
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
          <IconCall name="md-call-sharp" style={styles.iconbell} />
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
