import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Transaction } from '../types';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Transactions(transaction: Transaction) {

    return (
        
        <View>
            {(transaction.finalized) && <View style={[styles.container, {borderColor: transaction.accepted ? 'green' : 'red'}]}>
            {(transaction.contact.url !=null && transaction.contact.url !="") && <Image style={styles.img} source={ {uri:transaction.contact.url}} />}
            {(transaction.contact.url !=null && transaction.contact.url =="") && <Image style={styles.img} source={ require('../assets/images/M.png')} />}
            <Text style={styles.textStyle}>{transaction.contact.username}</Text>
            <Text style={{fontWeight:'bold', margin:10}}>{transaction.amount.toString()} €</Text>
            <Text style={{ fontWeight:'bold', marginLeft:10}}>{transaction.date}</Text>
            {(transaction.sent) && 
            <Text style={{ color: "green", marginLeft:10}}>{transaction.sent.toString()}</Text>
            && <View>
                    <FontAwesome 
                        name="arrow-circle-right"
                        size={25}
                        color={"red"}
                        style={{ marginLeft: 15}}
                    />
                    <AntDesign 
                        name="checkcircle"
                        size={25}
                        color={"green"}
                        style={{ marginLeft: 15}}
                    />
            </View>
            }
            {(!transaction.sent) && 
            <View>
                    <FontAwesome 
                        name="arrow-circle-left"
                        size={25}
                        color={"green"}
                        style={{ marginLeft: 15}}
                    />
                    <AntDesign 
                        name="checkcircle"
                        size={25}
                        color={"green"}
                        style={{ marginLeft: 15}}
                    />
            </View>}
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
        height: 80,
        borderWidth: 2,
        marginTop: 10,
    },
    textStyle: {
        fontSize: 14,
        margin: 5,
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
        margin: 15,
    }
  });
  