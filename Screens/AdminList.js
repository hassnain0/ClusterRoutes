import React, { useEffect, useState } from 'react';
import {Alert, View, Text, FlatList, TouchableOpacity,TextInput ,Image} from 'react-native';
import { db,firebase } from './Firbase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { showSucess } from './Helper/Helper';

export default function AdminList({ navigation }) {
  const [engineers, setEngineers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [deleteCount, setDeleteCount] = useState(0); 

  useEffect(() => {
   
    const collectionRef = db.collection('Usernames').where('Status', '==', 'Enabled').where('Value', '==', 'Admin');
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

  const filteredEngineers = engineers.filter(
    (engineer) =>
      engineer.Username.toLowerCase().includes(searchText.toLowerCase())
  );
 
  const handleDisbaleAdmin=(engineer)=>{
    const documentRef = db.collection('Usernames').doc(engineer.id);
    documentRef.update({
      Status:'Disabled',
    })
    .then(() => {
  
      showSucess("        User is successfully disabled")
          setDeleteCount((prev) => prev + 1); 
    })
    .catch((error) => {
      console.error('Error updating engineer:', error);
    });
  }

 
 
  const renderItem = ({ item }) => (

    

    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
    
      <View style={{ flex: 1 , flexDirection:'row'}}>
    
   <Image source={require('../assets/Engineer.png')} style={{width:50,height:50}}></Image>
          <Text style={{ fontWeight: 'bold', fontSize: 16,marginTop:20 }}>      {item.Username}</Text>

      </View>
    
      <TouchableOpacity style={{ padding: 8,marginTop:10 }} onPress={() => handleDisbaleAdmin(item)}>
        <Text style={{ color: 'red' ,fontSize:17}}>Disable</Text>
      </TouchableOpacity>
      
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
          placeholder="            Search Admin by name"
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
