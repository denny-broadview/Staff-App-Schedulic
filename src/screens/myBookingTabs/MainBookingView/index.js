
import React, {  useState } from 'react';
import { View,  TouchableOpacity } from 'react-native';
import styles from './styles';
import { String } from '../../../utlis/String';
import HeaderView from '../../../component/headerTab';

import { Color, Matrics } from '../../../utlis';
import { useDispatch } from 'react-redux';
import { setSearchKey } from '../../../store/actions'
import Animated from 'react-native-reanimated';


function MyBookingMainView(props) {
  const { state, descriptors, navigation, position } = props;
  let [enableSearch, setEnableSearch] = useState(false);
  let [enable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch()

  const fnSearchEnable = () => {
    setEnableSearch(!enable)
  }
  const onSearchClear = () => {
    setSearchTerm("");
    setEnableSearch(false)
    onSetSearchkey('')

  }
  const onChange = (e) => {
    setSearchTerm(e?.nativeEvent?.text);
    onSetSearchkey(e?.nativeEvent?.text)
  };

  const onSetSearchkey = key => dispatch(setSearchKey(key))
  return (
    <View style={styles.container}>
      <HeaderView
        tstyle={styles.header}
        header={true}
        map={false}
        back={false}
        notification={true}
        onPressNoti={() => navigation.navigate('Notification')}
        headertext={String.MyBookingTab.myBooking}
        //Sreachbar
        onPressSearch={() => fnSearchEnable()}
        search={true}
        searchClick={enableSearch}
        onSearchClear={onSearchClear}
        onChangeSearch={onChange}
        searchTerm={searchTerm}
      />
      <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          const inputRange = state.routes.map((_, i) => i);
          const opacity = Animated.interpolate(position, {
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0.9)),
          });

          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 15, backgroundColor: 'white' }}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}

              >
                <Animated.Text
                  style={{
                    opacity,
                    fontSize: 16,
                    color: isFocused ? Color.AppColor : Color.gray
                  }}
                >
                  {label}
                </Animated.Text>

              </TouchableOpacity>
              {isFocused ? <View style={styles.underLine} /> : <View style={styles.inactiveIndicator} />}
            </View>
          );
        })}
      </View>
    </View>

  );
}
export default MyBookingMainView;
