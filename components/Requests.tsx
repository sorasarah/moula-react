import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { StyleSheet, TextInput, TouchableOpacity, Button, Image, Alert } from 'react-native';
import { Contact, Transaction } from '../types';
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { useState } from 'react';

export default function Requests(transaction: Transaction) {
    const [isFinalized, setIsFinalized] = useState(false);
const handleAccept = () => {
    setIsFinalized(true);
    Alert.alert('Accept')
}

const handleRefuse = () => {
    setIsFinalized(true);
        Alert.alert('Refuse')
}
return (
<View>
    
    {(!transaction.finalized) && <View style={styles.container}>
    {(!transaction.sent) && 
    <View>
    <FontAwesome 
            name="arrow-circle-left"
            size={25}
            color={"green"}
            /> 
    </View>
    }
    {(transaction.sent) && <View>
    <FontAwesome 
            name="arrow-circle-right"
            size={25}
            color={"red"}
            /> 
    </View>

}
{(transaction.contact.url !=null && transaction.contact.url !="") && <Image style={styles.img} source={ {uri:transaction.contact.url}} />}
{(transaction.contact.url !=null && transaction.contact.url =="") && <Image style={styles.img} source={ require('../assets/images/M.png')} />}
<Text style={styles.textStyle}>{transaction.contact.username}</Text>
<Text style={{fontWeight:'bold', margin:5}}>{transaction.amount.toString()} €</Text>
<Text style={{ fontWeight:'bold', marginLeft:5}}>{transaction.date}</Text>

<View style={styles.rowPosition}>
   
<TouchableOpacity onPress={()=>Alert.alert('accept')}>
    <AntDesign 
        name="checkcircle"
        size={25}
        color={"green"}
        style={{ marginLeft: 20}}
    />
</TouchableOpacity>
<TouchableOpacity onPress={()=>Alert.alert('refuse')}>    
    <Entypo 
        name="circle-with-cross"
        size={28}
        color={"red"}
        style={{ marginLeft: 20}}
    /> 
</TouchableOpacity>
</View>
</View>}
</View>

)
}

const styles = StyleSheet.create({
container: {
// flex: 1,
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
margin: 15,
height: 80,
},
textStyle: {
fontSize: 14,
// margin: 5,
// textAlign: 'left',
flex: 1,
},
bouton: {
color : "#000000",
backgroundColor: "#ffffff",
border : "solid",
borderColor: "#ffffff",
borderWidth: 2,
margin: 2,
height: 30,
alignItems: 'center',
},
img: {
width: 70,
height: 70,
margin: 5,
},
rowPosition: {
width: 60,
display: 'flex',
flexDirection: 'row',
justifyContent: 'space-around',
}
});
