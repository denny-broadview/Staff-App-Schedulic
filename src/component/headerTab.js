import React, { useState } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import IconSearch from 'react-native-vector-icons/Fontisto';
import IconNotification from 'react-native-vector-icons/Fontisto';
import { Color, Dimensions, Matrics } from '../utlis'
import SearchComponent from "react-native-search-component";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const HeaderTab = (props) => {
    const { onPress, onPressSearch, onPressNoti, header, headertext, search, searchClick, searchTerm, onChangeSearch, onSearchClear, notification, back } = props;

    return (
        <View style={[styles.container, {
            flexDirection: 'row',
            alignItems: 'center', justifyContent: searchClick ? 'flex-start' : 'flex-end'
        }]}>
            <StatusBar backgroundColor={'#00A89B'} barStyle='light-content' />

            {back == true ?
                (<TouchableOpacity style={[styles.backimg, { alignItems: 'center', alignSelf: 'center' }]} onPress={onPress}>
                    <Icon name="arrowleft" style={styles.icon} ></Icon>
                </TouchableOpacity>) : null
            }
            {header == true && searchClick == false ?
                <View style={styles.titleView}>
                    <Text style={styles.text}>{headertext}</Text>
                </View> : null
            }
            {search == true && searchClick == true ?
                <View style={styles.searchIconView}>
                    <SearchComponent
                        customSearchInputStyle={{ backgroundColor: '#fff' }}
                        cancelColor='#fff'
                        value={searchTerm}
                        onChange={onChangeSearch}
                        onSearchClear={onSearchClear}
                    />
                </View>
                : null
            }

            {search == true && searchClick == false ?
                <View style={styles.flexDir}>
                    <TouchableOpacity style={styles.endIconView} onPress={onPressSearch}>
                        <IconSearch name="search" style={styles.iconSearch} />
                    </TouchableOpacity>
                </View>
                :
                null
            }

            {notification == true && searchClick == false ?
                <View style={styles.notifIconView}>
                    <TouchableOpacity onPress={onPressNoti}>
                        <IconNotification name="bell" style={styles.iconbell} />
                    </TouchableOpacity>
                </View>
                : null}
        </View>
    )
}
export default HeaderTab
const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.AppColor,
        height: Platform.OS === 'ios' ? Matrics.Scale(90) : Matrics.Scale(60),
        // flex:1,
    },
    backimg: {

        backgroundColor: Color.AppColor,
        alignSelf: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: Platform.OS === 'ios' ? Matrics.Scale(12) : null,

    },
    icon: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        color: Color.white,
        fontSize: Matrics.Scale(20),
        marginLeft: Matrics.Scale(10),
        marginTop: Platform.OS === 'ios' ? Matrics.Scale(12) : null,
        fontWeight: 'bold'
    },
    titleView: {
        // width: wp('20%'),
        flex: 1,
        marginLeft: Matrics.Scale(10),
        justifyContent: 'flex-start',
        alignSelf: 'center',

    },
    text: {
        color: Color.white,
        fontSize: Matrics.Scale(18),
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginTop: Platform.OS === 'ios' ? hp('3%') : null

    },
    endIconView:
    {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        marginEnd: wp('2%'),
        marginTop: Platform.OS === 'ios' ? hp('3%') : null
    },
    searchIconView: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginBottom: Matrics.Scale(5),
        justifyContent: 'flex-start',
    },
    iconSearch: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        color: Color.AppColor,
        backgroundColor: Color.white,
        borderRadius: Matrics.Scale(18),
        padding: Matrics.Scale(10),
        fontSize: Matrics.Scale(14),
        fontWeight: '900', 
        width: Matrics.Scale(35), 
        height: Matrics.Scale(35),
        overflow: "hidden"
    },
    notifIconView: { 
        flexDirection: 'row', 
        alignItems: 'flex-end',
        justifyContent: 'center', 
        alignSelf: 'flex-end',
        marginRight: Matrics.Scale(10),
        marginBottom: Matrics.Scale(14.5), 
    },
    iconbell: {
        textAlign: 'center',
        color: Color.AppColor,
        backgroundColor: Color.white,
        borderRadius: Matrics.Scale(18),
        padding: Matrics.Scale(10),
        fontSize: Matrics.Scale(14),
        fontWeight: '900',
        width: Matrics.Scale(35), 
        height: Matrics.Scale(35),
        overflow: "hidden",
    },
    searchbarStyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
    flexDir: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'flex-end',
        height: Matrics.Scale(35),
    },
    flexDirSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
});