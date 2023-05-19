import React, { useEffect, useState } from 'react';
import {Alert, View, Text, FlatList, TouchableOpacity,TextInput ,Image} from 'react-native';
import { db,firebase } from './Firbase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { showSucess } from './Helper/Helper';
import { Picker } from "@react-native-picker/picker";
import { moderateScale } from './Dimension';
export default function Request({ navigation }) {
  const [engineers, setEngineers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [deleteCount, setDeleteCount] = useState(0); // new state variable to keep track of the number of times user has been deleted
  const [identity,setIdentity]=useState();
  
  useEffect(() => {
   
    const collectionRef = db.collection('Usernames').where('Status', '==', 'Disabled');
    collectionRef.get().then((querySnapshot) => {
      const documents = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        documents.push({ ...data, id: doc.id });
      });
      setEngineers(documents)}).catch((error) => {
      console.log('Error getting engineers:', error);
    })
   
  }, [deleteCount]);

  const handleSearch = (text) => {
    setSearchText(text);
  };
 const handlePickerValueChange=(itemValue,item)=>{
  console.log(itemValue)
   if(itemValue==='Admin'){
  PickValue(item,'Admin')
   }
   else if (itemValue==='Engineer'){
    PickValue(item,'Engineer')
   }
  }

  const PickValue=(engineer,Identity)=>{
  const documentRef = db.collection('Usernames').doc(engineer.id);
  documentRef.update({
    Value:Identity,
  })
  .catch((error) => {
    console.error(error);
  }); 
}
  const filteredEngineers = engineers.filter(
    (engineer) =>
      engineer.Username.toLowerCase().includes(searchText.toLowerCase())
  );
 
  const handleAble = (engineer) => {
    const documentRef = db.collection('Usernames').doc(engineer.id);
    documentRef.update({
      Status:'Enabled',
    })
    .then(() => {
  
      showSucess("        User is successfully enabled")
          setDeleteCount((prev) => prev + 1); 
    })
    .catch((error) => {
      console.error('Error updating engineer:', error);
    });
  };
  const handleConfirm=(item)=>{
    Alert.alert(
      'Delete User',
      'Are you sure you want  to delete user?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () =>handleDelete(item)
        }
      ],
      { cancelable: false,
        titleStyle: { color: 'red' },
        messageStyle: { color: 'blue' }, }
    );
    return true;
  }
  const handleDelete = (engineer) => {
    const documentToDelete = db.collection('Usernames').where('email', '==', engineer.email);

// Delete the document
documentToDelete.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    doc.ref.delete().then(() => {
      showSucess("                   User deleted")
      setDeleteCount((prev) => prev + 1); 
    }).catch((error) => {
      console.error('Error deleting document: ', error);
    });
  });
});
  };
  const renderItem = ({ item }) => (

    

    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
    
      <View style={{ flex: 1 , flexDirection:'row'}}>
    
   <Image source={require('../assets/Engineer.png')} style={{width:50,height:50}}></Image>
          <Text style={{ fontWeight: 'bold', fontSize: 16,marginTop:20 }}>      {item.Username}</Text>

      </View>
    
      <TouchableOpacity style={{ padding: 8,paddingTop:20 }} onPress={() => handleAble(item)}>
        <Text style={{ color: 'green' ,fontSize:17}}>Enable</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 8,paddingTop:20 }} onPress={() => handleConfirm(item)}>
        <Text style={{ color: 'red' ,fontSize:17}}>Decline</Text>
      </TouchableOpacity>
      <Picker
selectedValue={identity}
        onValueChange={(itemValue) => handlePickerValueChange(itemValue, item)}
        style={{paddingRight:moderateScale(50),textShadowColor:'#ffff',backgroundColor:'#EBECF0',}}
        
      >
        <Picker.Item label="Select Engineer Role" value="" />  
        <Picker.Item label="Engineer" value="Engineer" /> 
        <Picker.Item label="Admin" value="Admin" />

      </Picker>
  
    </View>
  );

  return (
    
    <View>
  <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 8,
          backgroundColor: '#fff',
          borderRadius: 8,
          margin: 16,
        }}
      >
        <Icon name="search" size={25} color="#ccc" style={{ padding: 8 }} />
        <TextInput
          style={{ flex: 1, height: 40, padding: 6 }}
          placeholder="            Search user by name"
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
    <FlatList
      data={filteredEngineers}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  </View>
  );
}
