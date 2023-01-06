import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { StyleSheet, TextInput, TouchableOpacity, Button, Image, Alert } from 'react-native';
import { Contact } from '../types';
import { FontAwesome } from '@expo/vector-icons';

export default function MyFriend (friend: Contact) {

    return (
        <View style={styles.container}>
            {(friend.url !=null && friend.url !="") && <Image style={styles.img} source={ {uri:friend.url}} />}
            {(friend.url !=null && friend.url =="") && <Image style={styles.img} source={ require('../assets/images/M.png')} />}
            <Text style={styles.textStyle}>{friend.username}</Text>
            <TouchableOpacity onPress={()=>Alert.alert('send')}>
                    <FontAwesome 
                        name="arrow-circle-left"
                        size={25}
                        color={"red"}
                        style={{ marginLeft: 15}}
                    />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>Alert.alert('Request')}>
                    <FontAwesome 
                        name="arrow-circle-right"
                        size={25}
                        color={"green"}
                        style={{ marginLeft: 15}}
                    />
            </TouchableOpacity>
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
        fontSize: 18,
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
  