import React, {useEffect, useState} from 'react';
import {View, Text, Image, ImageBackground,ScrollView} from 'react-native';
import StarRating from 'react-native-star-rating'
import styles from './style';
import Icon from 'react-native-vector-icons/Entypo';
import {String} from '../../utlis/String';
const Home = (props) => {
  const [starCount, setStarCount] = useState(0);
  const _onStarRatingPress = (rating) => {
    setStarCount(rating);
  };
  return (
    <View style={styles.mainHome}>
      <View style={styles.topprofiledeatils}>
        <View style={styles.profileimage}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 100,
              borderWidth: 5,
              borderColor: '#fff',
            }}
            source={require('../../assets/images/profile.jpg')}
          />
        </View>
        <View style={{margin: 12}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 24, color: '#424DE4'}}>{String.home.Helloword} </Text>
            <Text style={{color: '#484848', fontSize: 16, marginTop: 5}}>
              Rahul Gupta
            </Text>
          </View>
          <View>
            <StarRating
              maxStars={5}
              rating={starCount}
              selectedStar={(rating) => _onStarRatingPress(rating)}
              starSize={18}
              fullStarColor="#FFC300"
              emptyStarColor="#CECCCC"
              containerStyle={styles.rating}
              disabled={false}
            />
          </View>
        </View>
      </View>
      <View style={styles.bottomMainprofile}>
      <ImageBackground imageStyle={{ borderTopLeftRadius:20,borderTopRightRadius:20}} source={require('../../assets/images/Homebg.png')} style={styles.bgimagehome}>
          
          <View style={{padding:20}}>
            <View style={{flexDirection:'row',}}>
               <Icon name='calendar' style={styles.icon}></Icon>
               <Text style={{fontSize:20,color:'#fff'}}> 10 Sep 2020 </Text>
            </View>
            <ScrollView style={{marginBottom:30}}>
            <View style={{marginTop:30}}>
                 <View style={styles.commonProfile}>
                      <View> 
                          <Image source={require('../../assets/images/NewBookings.png')} style={{width: 70,height: 70}}/>
                     </View>
                     <View style={{margin: 10,flexDirection:'row',flex:2,justifyContent:'space-between'}}>
                         <View>
                              <Text style={{fontSize: 18, color: '#484848'}}>{String.home.Newbooking} </Text>
                              <Text style={{color: '#A8A8A8', fontSize: 12, marginTop: 2,marginLeft:4}}>
                                        {String.home.Describtion}
                              </Text>
                         </View>
                         <View>
                              <Text style={{fontSize:28,color:'#FF0088',fontWeight:'bold'}}> 10 </Text>
                         </View>
                      </View>
                 </View>
                 <View style={styles.commonProfile}>
                      <View> 
                          <Image source={require('../../assets/images/Ongoing.png')} style={{width: 70,height: 70}}/>
                     </View>
                     <View style={{margin: 10,flexDirection:'row',flex:2,justifyContent:'space-between'}}>
                         <View>
                              <Text style={{fontSize: 18, color: '#484848'}}>{String.home.Ongoing} </Text>
                              <Text style={{color: '#A8A8A8', fontSize: 12, marginTop: 2,marginLeft:4}}>
                                        {String.home.Describtion}
                              </Text>
                         </View>
                         <View>
                              <Text style={{fontSize:28,color:'#0ECCC5',fontWeight:'bold'}}> 02 </Text>
                         </View>
                      </View>
                 </View>
                  <View style={styles.commonProfile}>
                      <View> 
                          <Image source={require('../../assets/images/TaskCompleted.png')} style={{width: 70,height: 70}}/>
                     </View>
                     <View style={{margin: 10,flexDirection:'row',flex:2,justifyContent:'space-between'}}>
                         <View>
                              <Text style={{fontSize: 18, color: '#484848'}}>{String.home.TaskCompleted} </Text>
                              <Text style={{color: '#A8A8A8', fontSize: 12, marginTop: 2,marginLeft:4}}>
                                        {String.home.Describtion}
                              </Text>
                         </View>
                         <View>
                              <Text style={{fontSize:28,color:'#FFA000',fontWeight:'bold'}}> 08 </Text>
                         </View>
                      </View>
                 </View>
                
                 
            </View>
            </ScrollView>
          </View>
         
      </ImageBackground>

      </View>
    </View>
  );
};
export default Home;
