import React,{useState, useEffect} from 'react';
import { Button, View, Text, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import HomeScreen from "../Pages/HomeScreen"
import NotificationScreen from "../Pages/NotificationScreen"
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import { getItem, removeItem, setItem } from '../utils/asyncStorage';


const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {

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




  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Image
          source={{ uri: apiMedia + userInfo?.ProfilePic }}
          style={{ width: 100, height: 100, borderRadius:50}}
        />
        <Text style={{ color: 'white', marginTop: 10 }}>{userInfo?.FullName}</Text>
      </View>
     
     <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('Home')}
        icon={({ color, size }) => <Feather name="home" size={size} color="white" />}
        style={{ color: 'gray', fontWeight: 'bold', fontSize: 16 }} // Set the style for Home drawer item
        labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} // Set the label style for Home drawer item
        activeLabelStyle={{ color: 'green', fontWeight: 'bold', fontSize: 18 }} // Set the active label style for Home drawer item
      
      />
      <DrawerItem
        label="Notifications"
        onPress={() => props.navigation.navigate('Notifications')}
        icon={({ color, size }) => <Feather name="bell" size={size} color="white" />}
        style={{ color: 'gray', fontWeight: 'bold', fontSize: 16 }} // Set the style for Notifications drawer item
        labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} // Set the label style for Notifications drawer item
        activeLabelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 18 }} // Set the active label style for Notifications drawer item
      />

    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "#26293C", // Set the header background color to black
        },
        headerTintColor: 'white', // Set the text color of header titles to white
        drawerStyle: {
          backgroundColor: "#2D334A", // Set the background color of the drawer container to red
        },
        drawerIcon: ({ focused, color, size }) => {
          let iconName;

          switch(route.name){
            case "Home":
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Notifications':
              iconName = focused ? 'bell' : 'bell-outline';
              break;
            default:
              iconName = focused ? 'home' : 'home-outline';
          }

          // You can return any component that you like here!
          return <Feather name={iconName} size={size} color={color} />;
          return <Octicons name={iconName} size={size} color={color} />;

        },
      })}
      drawerContentOptions={{
        activeTintColor: 'red', // Set the active text color in the drawer to white
        inactiveTintColor: 'green', // Set the inactive text color in the drawer to gray
        labelStyle: {
          color: 'red', // Set the default color of drawer labels to gray
          fontWeight: 'bold', // Set the default font weight of drawer labels to bold
          fontSize: 16, // Set the default font size of drawer labels to 16
        },
        activeLabelStyle: {
          color: 'green', // Set the color of drawer labels when focused to white
          fontWeight: 'bold', // Set the font weight of drawer labels when focused to bold
          fontSize: 18, // Set the font size of drawer labels when focused to 18
        },
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationScreen} />
    </Drawer.Navigator>
  );
}
