import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function BankModalScreen(){
  

  return(
    <View>
      <Text style={styles.title}>BankModalScreen</Text>
      <Text style={styles.texte}>UserName</Text>
      <TextInput style={styles.input}>Entrez la somme en €</TextInput>
      <View>
         <TouchableOpacity style={styles.input}><Text style={{textAlign:'center'}}> Valider </Text></TouchableOpacity>
      </View>

    </View>
  )

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
    textAlign:'center',
    marginBottom: 20,
  },
  texte: {
    fontSize: 14,
    fontWeight: '700',

  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input:{
    width: 250,
    height: 50,
    borderWidth: 2,
    borderColor: "black",
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    textAlign:'center',
    color: "white"
  }
});