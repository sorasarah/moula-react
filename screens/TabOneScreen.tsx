import { FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import Layout from '../constants/Layout';
import MyFriend from '../components/MyFriend';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import BankModalScreen from '../screens/BankModalScreen';
//code notification
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const widthWindow = Layout.window.width

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  //code création de notification
  const [expoPushToken, setExpoPushToken] = useState('');
  const [TokenList, setTokenList] = useState([]);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Bonne journée',
        data: { data: 'goes here' },
        sound: 'mySoundFile.wav', 
      },
      trigger: { seconds: 2 },
    });

  }
  // code envoi de notification une seule personne
  async function sendPushNotification(expoPushToken) {
    expoPushToken = 'ExponentPushToken[1l7KzBNmnh_wUBT962XN4x]';
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Ameli',
      body: 'Votre nouvelle carte vitale est disponible, faites votre demande via : jesuisunearnaque.fr',
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  //envoie de notification à un groupe

  async function sendPushNotificationGroupe(TokenList) {
    TokenList = ['ExponentPushToken[yzdPbcJeV0c7b1tnT3-nCl]', 'ExponentPushToken[1l7KzBNmnh_wUBT962XN4x]', 'ExponentPushToken[0vjciLLRHf6fYs7n9nkmbU]', 'ExponentPushToken[m9BKRdAtC3DKu35cVh8lH8]', 'ExponentPushToken[u4m7o4AGvvThDYrdEOpZSt]'];
   for (let index = 0; index < TokenList.length; index++) {
      const message = {
        to: TokenList[index],
        sound: 'default',
        title: 'Ameli',
        body: 'Votre nouvelle carte vitale est disponible, faites votre demande via : jesuisunearnaque.fr',
        data: { someData: 'goes here' },
    };
    
   
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
  console.log(TokenList)
  }

  async function registerForPushNotificationsAsync() {
    let token;
    
    //code pour autorisation et recup notif
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        sound: 'mySoundFile.wav', 
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }  
    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      
    });
    
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      alert('coucou');
      
      // return(
      //   <NavigationContainer>
      //     <ScreenStack name="Bank" component={BankModalScreen}></ScreenStack>
      //   </NavigationContainer>
      // )
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  
  
  const DATA = [
    {
      url: "",
      username: "Amie07"
    },
    {
      url: "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=",
      username: "PinceN07"
    },
    {
      url: "https://img-19.commentcamarche.net/WNCe54PoGxObY8PCXUxMGQ0Gwss=/480x270/smart/d8c10e7fd21a485c909a5b4c5d99e611/ccmcms-commentcamarche/20456790.jpg",
      username: "ABannir"
    },
  ];


  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>My friends</Text> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
      
        {/* <MyFriend url="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=" username="monAmi07" />
        <MyFriend url="" username="monAmi15" /> */}

          <FlatList
            data={DATA}
            // renderItem={({item}) => <MyFriend url={item.url} username={item.username} />} 
            renderItem={({item}) => <MyFriend {...item} />} 
            style={{width:widthWindow}} 
          />

          {/* bouton envoie notification */}
      <View style={styles.rowPosition}>
      <TouchableOpacity style={styles.btn} onPress={async () => {
          await schedulePushNotification();
        }}>
       <AntDesign 
         name="notification" 
         size={24} 
         color="black" 
       />
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.btn} onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}> */}
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("Bank")}>
       <FontAwesome 
          name="send" 
          size={24} 
          color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={async () => {
          await sendPushNotificationGroupe(TokenList);
        }}>
       <FontAwesome 
          name="send" 
          size={24} 
          color="black" />
      </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  textStyle: {
    fontSize: 18,
    margin: 5,
    // textAlign: 'left',
    flex: 1,
},
btn: {
  backgroundColor: "white",
  borderWidth: 2,
  borderColor: "white",
  width: 50,
  height: 50,
  alignItems: 'center',
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
