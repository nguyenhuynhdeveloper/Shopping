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
                listViewRef = ref     // Lôi cái biến này ra ngoài để xử lý thằng flatView
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
                value={typedText}    // Giá trị trong ô text input sẽ hiện là giá trị của biến typedText 
                placeholderTextColor={colors.placeholder}
                
                
            />


            <TouchableOpacity onPress={async () => {       // Khi ấn vào nút send : gửi đi tin nhắn thì 1 loạt hành động sảy ra
                if (typedText.trim().length == 0) {      // Nếu xoá hết khoảng trắng ở đầu và ở cuối mà k có ký tự gì thì không làm gì 
                    return
                }

                let stringUser = await AsyncStorage.getItem("user")     //Lấy dữ liệu user là nguời đăng nhập từ bộ nhớ máy --- 
                let myUserId = JSON.parse(stringUser).userId            // Lấy ra cái userUid của người đang đăng nhâp vào app--- dữ liệu lấy về chỉ là 1 chuỗi string thôi muốn dùng phải chuyển về dạng object  
                let myFriendUserId = props.route.params.user.userId     // Lấy dữ liệu danh sách user người đã đăng ký vào ứng dụng về
                // Component truyền vào component messenger nguyên cái data user thông qua prop.route.params
                //save to Firebase DB
                let newMessengerObject =
                {
                    url: 'https://randomuser.me/api/portraits/men/50.jpg',
                    showUrl: false,
                    messenger: typedText,
                    timestamp: (new Date()).getTime(),    // getTime() lấy dữ liệu hiện tại 
                }

                const newPostKey = push(child(ref(db), 'chats')).key;
                const updates = {};
                updates[`chats/${myUserId}-${myFriendUserId}` + newPostKey] = newMessengerObject;
                update(ref(db), updates).then(() => setTypedText(''))


                // hàm push đẩy dữ liệu lên này tạo key ramdom khó kiểm soát -> k sài được 
                // const postListRef = ref(db, `chats/${myUserId}-${myFriendUserId}`);
                // const newPostRef = push(postListRef, newMessengerObject) ;


                // set() làm thay thế hết các dữ liệu đã có nên không thể sử dụng trong trường hợp này 
                // set(ref(db, `chats/${myUserId}-${myFriendUserId}`), newMessengerObject)
                //     .then(() => setTypedText(''))

                //"id1-id2": {messenger object}
                Keyboard.dismiss()      // gửi xong để bàn phím cụp xuống

                // Khi mà ấn gửi cái là flatView tự động scroll xuống dưới cùng
                listViewRef.scrollToEnd({ animated: true })

                // listViewRef.scrollToItem({viewPosition : 1 , index: messageLength-1 });  
                // listViewRef.scrollToIndex({viewPosition : 1 , index: messageLength-1 });


                // Để nó có thể tự động cuộn lên trên cùng đoạn tin nhắn 
                // listViewRef.scrollToOffset({offset: 20, animated : true})   // Dịch xuống 1 đoạn 20px 
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