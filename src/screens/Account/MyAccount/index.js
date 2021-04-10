import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, Alert,Linking } from 'react-native';
import styles from './styles'
import HeaderView from '../../../component/headerTab';
import { String } from '../../../utlis/String';
import Icon from 'react-native-vector-icons/Feather';
import IconAddress from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconTimeOff from 'react-native-vector-icons/MaterialCommunityIcons';
import IconTime from 'react-native-vector-icons/Ionicons';
import IconShare from 'react-native-vector-icons/AntDesign'
import Share from "react-native-share";
import {MySpinner} from '../../../component/MySpinner';
import { useDispatch,useSelector } from 'react-redux';
import {Auth, Constants} from '@global';
import { logout } from '../../../store/actions'

const MyAccount = (props) => {
    const userInfo = useSelector(state => state.user.user)
    const [loagind, setLoading] = useState(false);
    // console.log('userdata===',userInfo);
    const dispatch = useDispatch()
    const signOut = () =>{
        dispatch(dispatch(logout()))
        props.navigation.replace('LoginMain');
    }
    const myCustomShare = async () => {
        const shareOptions = {
            message: 'This is a Schedulic staff'
            //https://www.youtube.com/watch?v=vXzpEJeVmi8
        }
        try {
            const ShareResponse = await Share.open(shareOptions)
        }
        catch (error) {
            console.log("Error =>", error)
        }
    }
    // shareToWhatsApp = (text) => {
    //     Linking.openURL(`whatsapp://send?text=${text}`);
    // }
    function ToastMessage() {
        return (
        Alert.alert(
            String.app.App,
            String.account.logoutMessage,
            [
                
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                    {text: 'Yes', onPress: () => signOut()}
                
            ],
            
            { cancelable: false })
        )
    }
    function logOut() {
        setLoading(true);
         Auth.PostCustomerTokenAuth(
          userInfo.token,
          userInfo.user_id,
        '',
          Constants.ApiAction.logout,
          (res) => {
            console.log(' logout--------', res);
            if (res[1].data == true) {
              setLoading(false);
              signOut()
             
            } else {
              setLoading(false);
            
            }
          },
        );
      }
   
    return (
        <View style={styles.container}>
            <HeaderView header={true}  searchClick ={false}  search={false} notification={true} onPressNoti={() => props.navigation.navigate('Notification')} headertext={String.account.MyAccount}/>

            {/* <Toolbar  backButton={false} title={String.account.my_account} notification={true} search={true} /> */}
            <ScrollView style={{ flex: 1 }} bounces={false} showsVerticalScrollIndicator={false}>
                <View>
               
                    <View style={styles.topMain}>
                    <MySpinner size="large" visible={loagind} />
                        <View style={styles.nameLest}>
                            <Text style={styles.username}>{userInfo.full_name}</Text>
                            <Text style={styles.emailphone}>{userInfo.email}</Text>
                            <Text style={styles.emailphone}>{userInfo.phone}</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', alignSelf: 'center' }}>
                            <TouchableOpacity style={styles.editimg} onPress={()=> props.navigation.navigate('AccountDetails')}>
                                <Icon name="edit-3" style={styles.icon} ></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.menuView} onPress={()=> props.navigation.navigate('Category')}>
                            <Icon name="grid" style={styles.menu}></Icon>
                            <Text style={styles.menuname}>{String.account.category}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewBoder}></View>
                    <View >
                        <TouchableOpacity style={styles.menuView} onPress={()=> props.navigation.navigate('PostalCode')}>
                            <IconAddress name="location-searching" style={styles.menu}></IconAddress>
                            <Text style={styles.menuname}>{String.account.postlCode}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewBoder}></View>
                    <View >
                        <TouchableOpacity style={styles.menuView} onPress={()=> props.navigation.navigate('WorkingHours')}>
                            <IconTime name="timer-outline" style={styles.menu}></IconTime>
                            <Text style={styles.menuname}>{String.account.workinghr}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewBoder}></View>
                    <View >
                        <TouchableOpacity style={styles.menuView} onPress={()=> props.navigation.navigate('Breaks')}>
                            <IconFontAwesome5 name="utensils" style={styles.menu}></IconFontAwesome5>
                            <Text style={styles.menuname}>{String.account.breaks}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewBoder}></View>
                    <View>
                        <TouchableOpacity style={styles.menuView} onPress={()=> props.navigation.navigate('TimeOff')}>
                            <IconTimeOff name="timer-off-outline" style={styles.menu}></IconTimeOff>
                            <Text style={styles.menuname}>{String.account.timeoff}</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.viewBoder}></View>
                    <View >
                        <SafeAreaView style={{ height: 50 }}>
                            <TouchableOpacity style={styles.menuView} onPress={() => myCustomShare()}>
                                <IconShare name="sharealt" style={styles.menu}></IconShare>
                                <Text style={styles.menuname}>{String.account.shareApp}</Text>
                            </TouchableOpacity>
                        </SafeAreaView>

                    </View>
                    <View style={styles.viewBoder}></View>
                    <View>
                        <TouchableOpacity style={styles.menuView}>
                            <IconShare name="staro" style={styles.menu}></IconShare>
                            <Text style={styles.menuname}>{String.account.rateus}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewBoder}></View>
                    <View>
                        <TouchableOpacity style={styles.menuView} onPress={() => ToastMessage()}>
                            <IconShare name="poweroff" style={styles.menulogout}></IconShare>
                            <Text style={styles.menunameLogout}>{String.account.logout}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default MyAccount;