import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { SafeAreaView,useColorScheme , StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import * as Animatable from 'react-native-animatable';
import {colors} from "../assets/colors/Colors"
import MainPage from "../Pages/MainPage"
import MenuButton from "../Pages/MenuButton"
import { useTheme } from '@react-navigation/native';
import Research from '../Pages/Research';
import Profile from '../Pages/Profile';
import VideoCall from '../Pages/VideoCall';
import ChatSystem from '../Pages/ChatSystem';

const TabArr = [
  { route: 'Home', label: 'Home', type: Feather, icon: 'home', component: MenuButton, color: colors.primary, alphaClr: colors.primaryAlpha },
  { route: 'Research', label: 'Research', type: Feather, icon: 'search', component: Research, color: colors.green, alphaClr: colors.greenAlpha },
  { route: 'Profile', label: 'Profile', type: FontAwesome, icon: 'user-circle-o', component: Profile, color: colors.purple, alphaClr: colors.purpleAlpha },
  { route: 'Classroom', label: 'Classroom', type: FontAwesome, icon: 'video-camera', component: VideoCall, color: colors.red, alphaClr: colors.redAlpha },
  { route: 'Chat', label: 'Chat', type: FontAwesome, icon: 'whatsapp', component: ChatSystem, color: colors.red, alphaClr: colors.redAlpha },

];

const Tab = createBottomTabNavigator();

export const Icon = ({ type, name, color, size = 24, style }: IconProps) => {
  const fontSize = 24;
  const Tag = type;
  return (
      <>
          {type && name && (
              <Tag name={name} size={size || fontSize} color={color} style={style} />
          )}
      </>
  )
}

const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const isDarkMode = useColorScheme () === 'dark';

  const { colors } = useTheme()
  const color = isDarkMode ? colors.white : colors.black;
  const bgColor = colors.background;

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <View style={[styles.btn, { borderColor: bgColor, backgroundColor: bgColor }]}>
          <Animatable.View
            ref={circleRef}
            style={styles.circle} />
          <Icon type={item.type} name={item.icon} color={focused ? "#00CFE7" : "#26293C"} />
        </View>
        <Animatable.Text
          ref={textRef}
          style={{color:"white"}}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

export default function AnimTab1() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}
        initialRouteName="Profile"
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen key={index} name={item.route} component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />
              }}
            />
          )
        })}
      </Tab.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    margin: 16,
    borderRadius: 16,
    backgroundColor:`${colors.card}`,
    
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: colors.white,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#26293C",
    borderRadius: 25,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: "white",
    fontWeight: '500'
  }
})