import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../assets/colors/Colors';
import { getItem, removeItem, setItem } from '../utils/asyncStorage';
import { OneButton } from '../utils/Alerts.';


const StraightLink = ({icon, iconsrc, title,handlePress}) => {
  
    const Iconsrc = iconsrc;

    const [userInfo, setuserInfo] = useState({});
    const [apiServer, SetApiServer] = useState('');
    const [apiMedia, SetApiMedia] = useState('');
  
    useEffect(async () => {
      let server = await getItem('apiServer');
      SetApiServer(server);
  
      let apiMed = await getItem('apiMedia');
      SetApiMedia(apiMed);
  
  
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const user = await getItem('userInfo');
          if (user !== null) {
            setuserInfo(JSON.parse(user));
          }
        } catch (error) {
          console.error('Error fetching user info: ', error);
        }
      };
  
      fetchData();
    }, []); 
  
  
    const [RoleList, setRoleList] = useState([])
   
    useEffect(()=>{
      handleRoles()
    
    },[userInfo])
  
    
    const handleRoles = async () => {
     
     
      try {
        const formData = new FormData();
  
        const CompanyId = userInfo.CompanyId;
        const UserId = userInfo.UserId;
      
        formData.append("CompanyId",CompanyId)
        formData.append("UserId",UserId)
  
    
        const response = await fetch(apiServer+"ViewUserDetailedRole", {
          method: "POST",
          body: formData
        });
  
        const data = await response.json();
    
        if (response.ok) {
          
         
          setRoleList(data)
           
          

          
        } else {
        
        }
      } catch (error) {
  
        Show.Attention("An error has occurred");
        
        window.location.reload()
      }
  
  }
  
  const checkRole = (role) => {
   
    return RoleList.includes(role);
  };
  
   if(checkRole("Student")==false) {

    return null;

   }




  




  
    return (
    <TouchableOpacity onPress={handlePress} style={{display:"flex" ,flexDirection: 'row', justifyContent: 'space-between',marginBottom:15, padding:10}}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
     
      <Iconsrc name={icon}  style={styles.icon}/>

     
      <Text style={{ color: 'white', fontSize: 18, marginLeft: 20,fontFamily: "OpenSans, NotoSans, sans-serif" }}>{title}</Text>
     
    </View>
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    icon:{
      borderRadius: 50,
    fontSize:24,
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

export default StraightLink