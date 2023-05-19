import React, { useEffect, useState } from 'react';
import {Alert, View, Text, FlatList, TouchableOpacity,TextInput ,Image} from 'react-native';
import { db,firebase } from './Firbase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { showError, showSucess } from './Helper/Helper';
import Spinner from 'react-native-loading-spinner-overlay';

export default function ListEngineersAdmin({ navigation }) {
  const [engineers, setEngineers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [deleteCount, setDeleteCount] = useState(0); 
  const [dataLoaded,setDataLoaded]=useState(true)
 
  
  useEffect(() => {
   
    const collectionRef = db.collection('Usernames').where('Status', '==', 'Enabled').where('Value', '==', 'Engineer');
    collectionRef.get().then((querySnapshot) => {
      const documents = [];
      querySnapshot.forEach((doc) => {
      const data = doc.data();
      documents.push({ ...data, id: doc.id });
      setDataLoaded(false)
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
 
  const handleViewEngineer = (engineer) => {
   
   const Username=engineer.email;
    const fileName = `${Username}.kml`; 
    const storageRef = firebase.storage().ref().child(fileName);
    storageRef.getDownloadURL()
      .then((metadata) => {
       
        navigation.navigate('ViewMap',{
          email:engineer.email,
          
      });
      })
      .catch((error) => {
        if (error.code === 'storage/object-not-found') {
        Alert.alert("Engineer has no any route to covered")
        }
      });
   
  };
  //Method for delete confirmation Engineer
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
          onPress: () =>handleDisableEngineer(item)
        }
      ],
      { cancelable: false,
        titleStyle: { color: 'red' },
        messageStyle: { color: 'blue' }, }
    );
    showSucess("        User is sucessfully disabled")
    return true;
  }
  const handleDisableEngineer=(engineer)=>{
   
    const documentRef = db.collection('Usernames').doc(engineer.id);
    documentRef.update({
      Status:'Disabled',
    })
    .then(() => {
            
   
          setDeleteCount((prev) => prev + 1); 
        
    })
    .catch((error) => {
      console.error('Error updating engineer:', error);
    });
  }
  const handleAssignEngineer = (engineer) => {
   
    navigation.navigate('SelectRoute',{
        email:engineer.email,
        
    });
  };

 
  const renderItem = ({ item }) => (

    

    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
    
      <View style={{ flex: 1 , flexDirection:'row'}}>
      <Spinner
      visible={dataLoaded}
      textContent={'Loading...'}
      textStyle={{ color: '#FFF' }}
    />   
   <Image source={require('../assets/Engineer.png')} style={{width:50,height:50}}></Image>
          <Text style={{ fontWeight: 'bold', fontSize: 16,marginTop:20 }}>      {item.Username}</Text>

      </View>
    
      <TouchableOpacity style={{ padding: 8,marginTop:10 }} onPress={() => handleViewEngineer(item)}>
        <Text style={{ color: 'blue' ,fontSize:17}}>View</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 8,marginTop:10 }} onPress={() => handleAssignEngineer(item)}>
        <Text style={{ color: 'blue' ,fontSize:17}}>Assign</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ padding: 8 ,marginTop:10}} onPress={() => handleConfirm(item)}>
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
          placeholder="            Search Engineer by name"
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
