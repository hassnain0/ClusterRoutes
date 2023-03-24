import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from './Screens/Map';
import Home from './Screens/Home';
import Login from './Screens/Login'
import SignUp from './Screens/SignUp'
import FlashMessage from "react-native-flash-message";
import ChooseRoute from './Screens/ChooseRoute';
import AdminHomeScreen from './Screens/AdminHomeScreen';
import ViewMap from './Screens/ViewMap'
import SelectRoute from './Screens/SelectRoute';
import ListEngineers from './Screens/ListEngineers';


import SplashScreen from './Screens/SplashScreen';
import ForgotScreen from './Screens/ForgotSceen'





const Stack=createNativeStackNavigator();

export default function App() {

  
  return (
   
   
   
      
   
   
    <NavigationContainer>
    
    <Stack.Navigator >
     
    <Stack.Screen name='SplashScreen' component={SplashScreen} options={{  headerShown:false,statusBarColor:'#002F46'}}/>
    <Stack.Screen name='Home' component={Home} options={( ) => ({headerBackVisible:false,title:'                            Home',
            statusBarColor:'#002F46'
           
          })}/> 
    <Stack.Screen name='Login' component={Login} options={{ headerShown:false, statusBarColor:'#002F46'}}/>
    <Stack.Screen name='SelectRoute' component={SelectRoute} options={{title:'               Route',statusBarColor:'#002F46'}}/>
   
   
    <Stack.Screen name='ListEngineers' component={ListEngineers} options={{title:'         Engineers List     ',statusBarColor:'#002F46'}}/>
    
    

    <Stack.Screen name='SignUp' component={SignUp} options={{statusBarColor:'#002F46', headerTransparent: true,title:'',
          headerTintColor: 'white',}}

          />
           <Stack.Screen name='ForgotScreen' component={ForgotScreen} options={{statusBarColor:'#002F46', headerTransparent: true,title:'',
          headerTintColor: 'white',}}

          />
    
    <Stack.Screen name='Map' component={Map} options={{title:"         Assigned Route",statusBarColor:'#002F46'}}/>
    <Stack.Screen name='AdminHomeScreen' component={AdminHomeScreen} options={( ) => ({headerBackVisible:false,title:'                          Home',
            statusBarColor:'#002F46'
           
          })}/> 
    <Stack.Screen name='ViewMap' component={ViewMap} options={{title:"           Admin View",statusBarColor:'#002F46'}}/>
    <Stack.Screen name='ChooseRoute' component={ChooseRoute} options={{statusBarColor:'#002F46',title:"           Choose Route"}}/>
  
    
  

    </Stack.Navigator>
    <FlashMessage position="top"/>
  </NavigationContainer>
  )
}

