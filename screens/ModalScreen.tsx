import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Profil } from '../types';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModalScreen() {
  const [image, setImage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [imgFetched, setImgFetched] = useState(false);

  const handleDate = (event, selectedDate) => {
    const currentDate = selectedDate;
        setBirthday(currentDate);
  }
 const changLastName = (selectedDate) => {
  const currentLastName = selectedDate;
        setLastName(currentLastName);
 }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
   
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setMyImage(result.assets[0].uri);
      
      console.log(setMyImage);
      console.log("patate")
    }
   
  }

  const setMyImage = async (image) => {
    try {
      await AsyncStorage.setItem('@storage_Key', image)
      console.log(image)
    } catch (e) {
      // saving error
      
    }
  }

  const getMyImage = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        // value previously stored
        setImgFetched(true)
        setImage(value)
        // console.log(value)
      }
    } catch(e) {
      // error reading value
    }
  }
      useEffect(() => {
      
          getMyImage();
       console.log('toto')
      }, [])

  // console.log(getMyImage)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <View>
        {image && !imgFetched && <Image source={{ uri:image}} style={styles.img} />}
        {image == '' && <Image source={require('../assets/images/M.png')} style={styles.img} />}
        <TouchableOpacity onPress={pickImage}>
          <AntDesign 
            name="edit"
            size={25}
            color="white"
          />
        </TouchableOpacity>
        
      </View>
      <View style={styles.positionRow}>
        <Text>Nom : {lastName}</Text>
        <TextInput value={lastName} style={styles.input} onChangeText={changLastName}/>
      </View>
      <View style={styles.positionRow}>
        <Text>Prénom : {}</Text>
        <TextInput style={styles.input}>{}</TextInput>
      </View>
      <View style={styles.positionRow}>
        <Text>Pseudo : {}</Text>
        <TextInput style={styles.input}>{}</TextInput>
      </View>
      <View style={styles.positionRow}>
        <Text>Date de naissance : {birthday.toString()}</Text>

        {/* {visible && <DateTimePicker value={new Date()} />} */}
        {/* <TextInput style={styles.input}>{}</TextInput> */}
      </View>
        <RNDateTimePicker mode="date" value={birthday} display="spinner" onChange={handleDate}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  img: {
    width: 100,
    height: 100,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 2,
    borderColor: 'white',
}, 
input: {
  width: 100,
  height: 30,
  borderColor: 'white',
  borderBottomWidth: 2,
  marginLeft: 40,
  marginRight: 40,
  color: 'white',
},
positionRow: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}
});
