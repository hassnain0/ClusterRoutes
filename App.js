import { NavigationContainer } from '@react-navigation/native';
import { View,StyleSheet,Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from './Screens/Map';
import Home from './Screens/Home';
import Login from './Screens/Login'
import ForgotScreen from './Screens/ForgotScreen';
import SignUp from './Screens/SignUp'
import TrackerFile from './Screens/TrackerFile'
import ChooseRoute from './Screens/ChooseRoute';
import Temp from './Screens/Temp';
import AnotherFile from './Screens/AnotherFile';
import FirestoreData from './Screens/FirestoreData';
const Stack=createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator >

    <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
    

    <Stack.Screen name='FirestoreData' component={FirestoreData} options={{headerShown:false}}/>
    <Stack.Screen name='ForgotScreen' component={ForgotScreen} options={{headerShown:false}}/>
    <Stack.Screen name='Temp' component={Temp} options={{}}/>
    <Stack.Screen name='SignUp' component={SignUp} options={{title:' Sign Up '}}/>
    <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
    <Stack.Screen name='Map' component={Map} options={{title:"                 Routes"}}/>
    <Stack.Screen name='AnotherFile' component={AnotherFile} options={{title:"         Temp FIle"}}/>
  
    
    
   <Stack.Screen name='ChooseRoute' component={ChooseRoute} options={{}}/>
    
  

    </Stack.Navigator>
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
