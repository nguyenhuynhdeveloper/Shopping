import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native'
import { images, colors, icons, fontSizes } from '../../constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { UIHeader } from '../../components'
import MessengerItem from './MessengerItem'
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    auth,
    onAuthStateChanged,
    ref,
    set,
    db,
    onValue,
    push,
    update,

} from '../../firebase/firebase'

import { child } from 'firebase/database'

function Messenger(props) {
    const { url, name } = props.route.params.user
    const receiver = props.route.params.user.userId

    const { navigation, route } = props
    const { navigate, goBack } = navigation

    const [send, setSend] = useState('')
    const [typedText, setTypedText] = useState(true)
    const [chatHistory, setChatHistory] = useState([
        {
        }
    ])
    const [keyboardIsShown, setKeyboardIsShown] = useState(false)
    let listViewRef;
    const [messageLength, setMessageLength] = useState(2)



    useEffect(() => {
        //componentDidMount        
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsShown(true)
        })
        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsShown(false)
        })
    })


    useEffect(() => {        
        onValue(ref(db, 'chats'), async (snapshot) => {   
            if (snapshot.exists()) {              
                let snapshotObject = snapshot.val()  

                let stringUser = await AsyncStorage.getItem("user")    
                let myUserId = JSON.parse(stringUser).userId   

                let updatedMessengerReceive = Object.keys(snapshotObject)
                    .filter(item => (item.includes(`${receiver}-${myUserId}`)))
                let updatedMessengerSend = Object.keys(snapshotObject)
                    .filter(item => (item.includes(`${myUserId}-${receiver}`)))

                let updatedChatHistory = updatedMessengerReceive.concat(updatedMessengerSend)
                    .map(eachKey => {
                        let eachObject = snapshotObject[eachKey]
                        return {
                            ...eachObject,   
                            isSender: eachKey.split('-')[0] == myUserId,   
                            url: 'https://www.w3schools.com/howto/img_avatar.png',
                        }
                    })
                    .sort((a, b) => a.timestamp - b.timestamp)  


                for (let i = 0; i < updatedChatHistory.length; i++) {
                    let item = updatedChatHistory[i]
                    if (i == 0) { item.showUrl = true }
                    else {
                        if (item.isSender != updatedChatHistory[i - 1].isSender) { item.showUrl = true }   
                    }
                }
                let numberMessage = updatedChatHistory.length

                setChatHistory(updatedChatHistory)
                setMessageLength(numberMessage)


            } else {
                console.log('No data available')
            }
        })
    }, [])
     
    useEffect( () => {
        keyboardIsShown ? listViewRef.scrollToEnd({ animated: true }) : null
    },[keyboardIsShown]
    )

    return <KeyboardAvoidingView style={{
        flexDirection: 'column',
        flex: 1,
    }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <UIHeader
            title={name}
            leftIconName={"arrow-left"}
            rightIconName={"ellipsis-v"}
            onPressLeftIcon={() => {
                goBack()
            }}
            onPressRightIcon={() => {
                alert('press right icon')
            }}
        />


        <FlatList style={{
            flex: 1,
            marginBottom: 20
        }}
            data={chatHistory}
            renderItem={({ item }) => <MessengerItem
                onPress={() => {
                    alert(`You press item's name: ${item.timestamp}`)
                }}
                item={item}
                key={`${item.timestamp}`} />}
            ref={(ref) => {
                listViewRef = ref     
            }}
        />

        <View style={{
            height: 60,
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <TextInput
                onChangeText={(typedText) => {
                    setTypedText(typedText)
                  
                }}
                style={{
                    color: 'black',
                    paddingStart: 10,
                }}
                placeholder='Enter your message here'
                value={typedText}    
                placeholderTextColor={colors.placeholder}
                
                
            />


            <TouchableOpacity onPress={async () => {       
                if (typedText.trim().length == 0) {      
                    return
                }

                let stringUser = await AsyncStorage.getItem("user")    
                let myUserId = JSON.parse(stringUser).userId          
                let myFriendUserId = props.route.params.user.userId     

                let newMessengerObject =
                {
                    url: 'https://randomuser.me/api/portraits/men/50.jpg',
                    showUrl: false,
                    messenger: typedText,
                    timestamp: (new Date()).getTime(),  
                }

                const newPostKey = push(child(ref(db), 'chats')).key;
                const updates = {};
                updates[`chats/${myUserId}-${myFriendUserId}` + newPostKey] = newMessengerObject;
                update(ref(db), updates).then(() => setTypedText(''))

                Keyboard.dismiss()     
                listViewRef.scrollToEnd({ animated: true })
            }}


            >
                <Icon
                    style={{
                        padding: 10,
                    }}
                    name='paper-plane' size={20} color={colors.primary} />
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
}
export default Messenger