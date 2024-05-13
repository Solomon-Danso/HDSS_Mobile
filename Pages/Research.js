import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet,View } from 'react-native';

export default function App() {
  return (
    <View style={{flex:1, backgroundColor:"#26293C", paddingTop:25}}>

    <WebView
      style={styles.container}
      source={{ uri: 'https://chatgpt.com/' }}
    />

<View style={{marginBottom:100}}>

</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});