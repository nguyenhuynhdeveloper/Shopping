import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    FlatList
} from 'react-native'
import { images, colors, icons, fontSizes } from '../../constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { UIHeader } from '../../components'
import ChatItem from './ChatItem'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    onAuthStateChanged,
    ref,
    set,
    db,
    auth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    child,
    get,
    onValue,     // Đọc dữ liệu khi có bất kỳ sự thay đổi dữ liệu nào 

} from '../../firebase/firebase'
function Chat(props) {
    const [users, setUsers] = useState([
        // {
        //     url: 'https://randomuser.me/api/portraits/men/70.jpg',
        //     name: '',
        //     message: '',
        //     numberOfUnreadMessages: 2
        // },        
    ])

    const { navigation, route } = props
    const { navigate, goBack } = navigation
    useEffect(() => {
        onValue(ref(db, 'users'), async (snapshot) => {

            if (snapshot.exists()) {
                let snapshotObject = snapshot.val()

                let stringUser = await AsyncStorage.getItem("user")
                let myUserId = JSON.parse(stringUser).userId

                setUsers(Object.keys(snapshotObject)
                    .filter(item => item != myUserId).map(eachKey => {
                        let eachObject = snapshotObject[eachKey]
                        return {
                            url: 'https://www.w3schools.com/howto/img_avatar.png',
                            name: eachObject.email,
                            email: eachObject.email,
                            accessToken: eachObject.accessToken,
                            numberOfUnreadMessages: 0,
                            userId: eachKey,
                        }
                    }))

            } else {
                console.log('No data available')
            }
        })
    }, [])
    return <View style={{
        flexDirection: 'column'
    }}>
        <UIHeader
            title={"Notifications"}
            leftIconName={"arrow-left"}
            rightIconName={"search"}
            onPressLeftIcon={() => {
                goBack()
            }}
            onPressRightIcon={() => {
                alert('press right icon')
            }}
        />
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingStart: 10
        }}>
            <Text style={{
                color: 'black',
                fontSize: fontSizes.h6,
                marginStart: 10,
            }}>6 unread messages</Text>
            <Icon
                name={'search'}
                style={{ padding: 15 }}
                size={15} color={'black'}
                onPress={() => {
                    alert('You pressed Delete')
                }}
            />
        </View>

        <FlatList style={{
        }}
            data={users}
            renderItem={({ item }) => <ChatItem
                onPress={() => {
                    navigate('Messenger', { user: item })
                }}
                user={item}
                key={item.url} />}
        />
    </View>
}
export default Chat