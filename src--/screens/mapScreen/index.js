import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import styles from './styles';
import {String} from '../../utlis/String';
import HeaderView from '../../component/headerTab';
import MapView, {Polyline} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import IconCall from 'react-native-vector-icons/Ionicons';

const MapScreen = (props) => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [data, setData] = useState({});
  
  useEffect(() => {
    if (props.route.params !== null) {
      setData(props.route.params.datapass);
      console.log('item ongoing map-----------', props.route.params.datapass);
    }
    console.log(' ongoing pic-----------', props.route.params.image);
  }, []);

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
      <MapView
        style={styles.mapStyle}
        showsUserLocation={false}
        zoomEnabled={true}
        zoomControlEnabled={true}
        isMapReady={true}
        region={{
          latitude: Number(21.1503),
          longitude: Number(72.825),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{latitude: Number(21.1503), longitude: Number(72.825)}}>
          <View style={styles.courseImgView}>
            <Image
              source={{uri:props.route.params.image}}
              style={styles.courseImg}
            />
          </View>
        </Marker>
        <Marker
          coordinate={{latitude: Number(21.2266), longitude: Number(72.8312)}}>
          <View style={styles.courseImgView}>
            <Image
              source={require('../../assets/images/profile.jpg')}
              style={styles.courseImg}
            />
          </View>
        </Marker>
        {/* coordinate={{ latitude: Number(21.2266), longitude: Number(72.8312) }}  
            title={"Sehedulic"}  
            description={"katargam"}  
          >   */}
        <Polyline
          coordinates={[
            {latitude: 21.1503, longitude: 72.825},
            {latitude: 21.2266, longitude: 72.8312},
          ]}
          strokeColor="blue"
          strokeColors={[
            '#7F0000',
            '#00000000', 
          ]}
          strokeWidth={5}
        />
      </MapView>
      <View style={styles.cardView}>
        <View style={styles.distansView}>
          <Text style={styles.text_diatance}>{String.map.distance}</Text>
          <Text style={styles.text_dist}>12 km away from you</Text>
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
