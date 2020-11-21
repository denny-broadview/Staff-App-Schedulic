import React, {useEffect, useState} from 'react';
import { View, Text,StatusBar,Image,KeyboardAvoidingView,SafeAreaView,StyleSheet,YellowBox,TouchableOpacity,Dimensions} from 'react-native';
import styles from '../..//utlis/String.js';
import styles from './style';
const Spalsh = (props) => {
     
    return(
     <SafeAreaView style={{ flex: 1, backgroundColor: '#424DE4' }}>
          <StatusBar barStyle={"light-content"} backgroundColor={'#424DE4'} />
             <View style={styles.mainView}>
                 
                 <Image source={require('../../assets/images/spleshscreenlogo1.png')}></Image>
    <Text style={{color:'#fff',marginTop:10}}>{String.login.AppoitmentBookingApp}</Text>
             </View>
     </SafeAreaView>
    )
}
export default Spalsh;