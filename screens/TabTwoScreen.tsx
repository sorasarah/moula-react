import { Alert, FlatList, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Layout from '../constants/Layout';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Transactions from '../components/Transactions';
import Requests from '../components/Requests';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

const widthWindow = Layout.window.width

export default function TabTwoScreen() {
   const [balance, setBalance]= useState(200);

    const sending = () => {
      // const debiter = prompt("Somme à débiter");
      if(balance >= 10){
        setBalance(balance - 10);
        alert("😢 💸 ✅")
      }else if(balance == 0){
        alert("Tu n'as pas assez de solde 🙁")
      }
    }
    const recieve = () => {
      // const crediter = prompt("Somme à créditer", 0);
      setBalance(balance + 10);
      alert("😀 💰 ✅")
    }

    const renderBalance = ()=> (<View style={styles.rowPosition}>
      <Text style={{width: 100, fontWeight:'bold', fontSize:24}}>{balance.toString()} €</Text>
      <TouchableOpacity 
      onPress={recieve} >
        <FontAwesome 
        name="plus-circle"
        size={24}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={sending} disabled={balance < 10 ? true : false}>
        <FontAwesome 
        name="minus-circle"
        size={24}
        />
      </TouchableOpacity>
    </View>)

  const transactionData = [
     {
      contact:{url:'', username:'machin'},
      amount: 200,
      date: "23 Oct 22",
      finalized: true,
      sent: true,
      accepted: true,
     },
     {
      contact:{url:'https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=', username:'Profile01'},
      amount: 200,
      date: "23 Oct 22",
      finalized: true,
      sent: true,
      accepted: false,
     },
     {
      contact:{url:'https://img-19.commentcamarche.net/WNCe54PoGxObY8PCXUxMGQ0Gwss=/480x270/smart/d8c10e7fd21a485c909a5b4c5d99e611/ccmcms-commentcamarche/20456790.jpg', username:'Exception'},
      amount: 200,
      date: "23 Oct 22",
      finalized: true,
      sent: false,
      accepted: true,
     },
     {
      contact:{url:'', username:'Friend'},
      amount: 200,
      date: "23 Oct 22",
      finalized: true,
      sent: false,
      accepted: false,
     },
     {
      contact:{url:'https://img-19.commentcamarche.net/WNCe54PoGxObY8PCXUxMGQ0Gwss=/480x270/smart/d8c10e7fd21a485c909a5b4c5d99e611/ccmcms-commentcamarche/20456790.jpg', username:'quelqu\'un'},
      amount: 50,
      date: "23 Nov 22",
      finalized: false,
      sent: true,
      accepted: false,
     },
     {
      contact:{url:'https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=', username:'Guys22'},
      amount: 150,
      date: "23 Jul 22",
      sent: false,
      finalized: false,
      accepted: false,
     },
  ]
  return (
    <SafeAreaView style={styles.container} >
      <ScrollView>
      <Text style={styles.title}>Ma Mula</Text>
      <View>
        <Text style={styles.title}>Mon Solde</Text>

      </View>
      </ScrollView>
      <View>
      <FlatList
       data={transactionData}
       renderItem={({item}) => <Requests {...item} />}  
       style={{width:widthWindow}} 
       ListHeaderComponent={renderBalance}
       //StickyHeaderComponent={() => <Text style={styles.titre}>Les Requêtes</Text>}
       />
      <FlatList
       data={transactionData}
       renderItem={({item}) => <Transactions {...item} />}  
       ListHeaderComponent={() => <Text style={styles.titre}>Historique des transactions</Text>}
       />
        </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  titre: {
    textAlign: 'center',
    fontSize:18,
    fontWeight:'bold',
    margin: 15,
  },
  rowPosition: {
    width:300,
    height: 80,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    marginRight:"auto",
    marginLeft:"auto",
    borderWidth:2,

  }
});
