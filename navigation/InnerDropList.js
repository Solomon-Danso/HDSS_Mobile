import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Feather,Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons

const DropList = ({ icon, iconsrc, title, children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const Iconsrc = iconsrc;

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState); // Toggle the value of dropdownOpen
  };

  // Count the number of children
  const numChildren = React.Children.toArray(children).filter(child => child.props.children && child.props.children !== <></>).length;

  // Render only if there are children
  if (numChildren === 0) {
    return null;
  }

  return (
    <View style={{ marginBottom: 5, marginTop:5}}> 
      <TouchableOpacity onPress={toggleDropdown} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 15, marginLeft: 35,fontFamily: "OpenSans, NotoSans, sans-serif" }}>{title}</Text>
         
        </View>
        <Ionicons name={!dropdownOpen ? "arrow-forward-circle" : "arrow-down-circle"} size={20} color="white" /> 
      </TouchableOpacity>

      <Animatable.View 
        animation={dropdownOpen ? 'fadeIn' : 'fadeOut'}
        duration={300}
        style={{ marginLeft: 45, marginTop: 5 }} 
      >
        {dropdownOpen && children}
      </Animatable.View>
    </View>
  );
}

export default DropList;
