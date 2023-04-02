import React from "react";
import {  StyleSheet} from "react-native";

import { horizontalScale,verticalScale,moderateScale } from "./Dimension";
import MapView, { Marker } from 'react-native-maps';

// import { initializeApp } from "@firebase/app";
// import {getAuth} from '@firebase/auth'


const Temp=({navigation})=>{



  // const app=initializeApp(firebaseConfig);
  // const auth=getAuth(app);
  
  

  return(
      

      
    <MapView
    style={styles.Cardcontainer}
    initialRegion={{
      latitude:25.416868,
      longitude:68.274307,
      latitudeDelta:1.6164,
      longitudeDelta:18.0269,
    }
    
  }
  
  showsUserLocation={true}
  shouldRasterizeIOS={true}
  showsMyLocationButton={true}
  
  >
    
  </MapView>   

  )
}

const styles = StyleSheet.create({
  Cardcontainer: {
    
    flex: 1,
    width:'100%',
   borderBottomEndRadius:100,
    elevation:1,
    borderRadius:20,
    borderColor:'#007ACC',
    color:'#5388CE',    
    shadowOffset:'#33333',
    shadowOpacity:1,
    shadowColor:'#4C5053',
    paddingRight:100,
    paddingTop:80,
    paddingBottom:120,
    alignItems:'center'
    

  
  },
  Container:
{
  paddingBottom:100,
},
  
  
  ImageContainer:{

    paddingHorizontal:horizontalScale(120),
    width:200,
    height:200,
    
  },
  InputContainer:{
    marginTop:15,
    marginBottom:10,
  
    margin:5,
    borderWidth:0.5,
    borderRadius:5,
   width:'90%',
   height:40,
    
    
 
    

  },
  NestedHeader:{
  
  },
  submitButton: {
 
    
    padding:moderateScale(5),
    alignItems: "center",
    margin:1,
    },
    submitButtonText: {
    color: "#fff",
    fontWeight: "100",
    fontSize: 15,
    },

  TextContainer:{
    margin:10,
    color:'#EDEDED',
    fontWeight:'normal',
    fontSize:15,
    
  }

})
export default Temp;