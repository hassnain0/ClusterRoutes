import { showMessage } from "react-native-flash-message";
import { PermissionsAndroid,Platform } from "react-native";


const showError=(message)=>{

showMessage({
    message,
    type:"danger",
    icon:'danger'
})
}
const showAlert=(message)=>{
  showMessage({
    message,
    type:"alert",
    icon:'alert'
})
}
const showSucess=(message)=>{
    showMessage({
        message,
        type:"success",
        icon:'success'
    })
}


//GE


export const locationPermission=()=>new Promise(async(resolve,reject)=>{
  if(Platform.OS=='ios'){
    try{
        const permissionState=await Geolocation.requestAuthorization('whenInUse');
        if(permissionState=='granted'){
            return resolve ("granted")
        }
        reject ("permission rejected")
    }catch(error){
        return reject (error)
    }
  }
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  ).then((granted)=>{
    if(granted===PermissionsAndroid.RESULTS.GRANTED){
        resolve('granted');
    }
    return  reject|('Location Permission denied') 
  }).catch((error)=>{
    console.log('Ask Location permission error ',error );
    return reject(error);
  })
})


export{
showError,
showSucess,
showAlert
}