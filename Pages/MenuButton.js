import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'
import {StatusBar} from "expo-status-bar"
import Drawer from "../navigation/DrawerNav"

const MenuButton = () => {
  return (
    <View style={{flex:1, backgroundColor:"#26293C",paddingTop:20}}>
    <StatusBar style="light"/>
     <Drawer/>
      
      
    </View>
  )
}

export default MenuButton