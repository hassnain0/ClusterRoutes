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
import StartRoute from './Screens/StartRoute';
import ListEngineers from './Screens/ListEngineers';
import AdminShowRoute from './Screens/AdminShowRoute';
import AnotherAdminViewMap from './Screens/AnotherViewMapAdmin';
import SplashScreen from './Screens/SplashScreen';
import ForgotScreen from './Screens/ForgotSceen'
import { TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const Stack=createNativeStackNavigator();

export default function App() {
  
  return (
   
   
   
      
   
   
    <NavigationContainer>
        {/* <MyDrawer/> */}
    <Stack.Navigator >
    
    <Stack.Screen name='SplashScreen' component={SplashScreen} options={{  headerShown:false,statusBarColor:'#002F46'}}/>
    <Stack.Screen name='Home' component={Home} options={({navigation }) => ({
            headerTitle:'   Home ',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={{ paddingLeft: 20 }}
              >
              <Ionicons name='menu' size={30} style={{marginLeft:1}}></Ionicons>
              </TouchableOpacity>
              
            ),
          })}/>
    <Stack.Screen name='Login' component={Login} options={{ headerShown:false, statusBarColor:'#002F46'}}/>
    <Stack.Screen name='SelectRoute' component={SelectRoute} options={{title:'Route',statusBarColor:'#002F46'}}/>
    <Stack.Screen name='AdminShowRoute' component={AdminShowRoute} options={{title:'         Engineer Route',statusBarColor:'#002F46'}}/>
    
    <Stack.Screen name='StartRoute' component={StartRoute} options={{title:'              Current Route      ',statusBarColor:'#002F46'}}/>
     
    <Stack.Screen name='ListEngineers' component={ListEngineers} options={{title:'            Engineers List     ',statusBarColor:'#002F46'}}/>
    
    

    <Stack.Screen name='SignUp' component={SignUp} options={{statusBarColor:'#002F46', headerTransparent: true,title:'',
          headerTintColor: 'white',}}

          />
           <Stack.Screen name='ForgotScreen' component={ForgotScreen} options={{statusBarColor:'#002F46', headerTransparent: true,title:'',
          headerTintColor: 'white',}}

          />
    
    <Stack.Screen name='Map' component={Map} options={{title:"         Assigned Route",statusBarColor:'#002F46'}}/>
    <Stack.Screen name='AdminHomeScreen' component={AdminHomeScreen}options={({navigation }) => ({
            headerTitle:'   Admin ',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={{ paddingLeft: 20 }}
              >
              <Ionicons name='menu' size={30} style={{marginLeft:1}}></Ionicons>
              </TouchableOpacity>
              
            ),
          })}/>
    <Stack.Screen name='ViewMap' component={ViewMap} options={{title:"           Admin View",statusBarColor:'#002F46'}}/>
    <Stack.Screen name='ChooseRoute' component={ChooseRoute} options={{statusBarColor:'#002F46'}}/>
    <Stack.Screen name='AnotherAdminViewMap' component={AnotherAdminViewMap} options={{statusBarColor:'#002F46',title:"           Admin View"}}/>
    
  

    </Stack.Navigator>
    <FlashMessage position="top"/>
  </NavigationContainer>
  )
}

