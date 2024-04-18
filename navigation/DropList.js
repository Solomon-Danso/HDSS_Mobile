import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons

const DropList = ({ icon, iconsrc, title, children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const Iconsrc = iconsrc;

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState); // Toggle the value of dropdownOpen
  };

  return (
    <View style={{ marginBottom: 10 }}> 
      <TouchableOpacity onPress={toggleDropdown} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Iconsrc name={icon} size={20} color="white" />
          <Text style={{ color: 'white', fontSize: 20, marginLeft: 35, fontWeight:'bold' }}>{title}</Text>
        </View>
        <Feather name={dropdownOpen ? "chevron-up" : "chevron-down"} size={20} color="white" /> 
      </TouchableOpacity>

      <Animatable.View 
        animation={dropdownOpen ? 'fadeIn' : 'fadeOut'}
        duration={300}
        style={{ marginLeft: 25, marginTop: 5 }} 
      >
        {dropdownOpen && children}
      </Animatable.View>
    </View>
  );
}

export default DropList;
