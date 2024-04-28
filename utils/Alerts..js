import { View, Text,Alert } from 'react-native'
import React from 'react'


export const Icon = ({Iconsrc, name}) => {

    return (
      <View style={{
        borderRadius: 100,
        backgroundColor: "#E7F0FE",
        width: 50, // Assuming you want a fixed size for the rounded icon
        height: 50, // Adjust as needed
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Iconsrc
          name={name}
          size={28}
          color="#264C62"
        />
      </View>
    );
  };
 
  export const IconSmall = ({Iconsrc, name}) => {

    return (
      <View style={{
        borderRadius: 100,
        backgroundColor: "#E7F0FE",
        width: 24, // Assuming you want a fixed size for the rounded icon
        height: 24, // Adjust as needed
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Iconsrc
          name={name}
          size={16}
          color="#264C62"
        />
      </View>
    );
  };



export const TwoButton = (Title, Msg, Ok, Cancel) =>
  Alert.alert(Title, Msg, [
    {
      text: 'OK',
      onPress: Ok,
      style:'ok'
    },
    {
      text: 'Cancel',
      onPress: Cancel,
      style: 'cancel',
    },
  ]);

  export const OneButton = (Title, Msg) =>
  Alert.alert(Title, Msg, [
    {
      text: 'OK',
     
    }
    
  ]);


