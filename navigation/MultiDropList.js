import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { colors } from '../assets/colors/Colors';

const MultiDropList = ({ icon, iconsrc, title, children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const Iconsrc = iconsrc;

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState); // Toggle the value of dropdownOpen
  };

  // Count the number of children
  const numChildren = React.Children.toArray(children).filter(child => {
    // Check if the child has props and if its children are not empty
    if (child.props.children && child.props.children !== <></>) {
        // If the children are not empty, filter out any grandchildren
        const filteredChildren = React.Children.toArray(child.props.children).filter(grandchild => 
            // Check if the grandchild has props and if its children are not empty
            grandchild.props.children && grandchild.props.children !== <></>
        );
        // Count only if there are direct children
        return filteredChildren.length > 0;
    }
    return false; // Otherwise, filter out this child
}).length;



  // Render only if there are children
  if (numChildren === 0) {
    return null;
  }

  return (
    <View style={{ padding: 10, marginBottom:10}}> 
      <TouchableOpacity onPress={toggleDropdown} style={{display:"flex" ,flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
         
          <Iconsrc name={icon}  style={styles.icon}/>

        
          <Text style={{ color: 'white', fontSize: 15, marginLeft: 20,fontFamily: "OpenSans, NotoSans, sans-serif" }}>{title}</Text>
         
        </View>
        <Feather name={dropdownOpen ? "chevron-down" : "chevron-right"} size={20} color="white" /> 
      </TouchableOpacity>

      <Animatable.View 
        animation={dropdownOpen ? 'fadeIn' : 'fadeOut'}
        duration={300}
        style={{ marginLeft: 15, marginTop: 5 }} 
      >
        {dropdownOpen && children}
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon:{
    borderRadius: 50,
  fontSize:18,
  height: 24,
  width: 24, 
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
 
  color:`${colors.icon}`
  },

  title:{
color: `${colors.white}`,
fontSize:"1.3rem",
cursor: "pointer",
paddingTop:"0.3rem",
  }





})

export default MultiDropList;
