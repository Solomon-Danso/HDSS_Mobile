import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'

const InnerDItem = ({label,handlePress}) => {
  return (
    <TouchableOpacity onPress={handlePress} style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
        <Text style={{ color: 'white', fontSize: 14, marginLeft: 10 }}>{label}</Text>
  </TouchableOpacity>
  )
}

export default InnerDItem