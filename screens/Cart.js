import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView
} from 'react-native'
import { images, colors, icons, fontSizes } from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome5'


import { useDispatch, useSelector, getState } from 'react-redux'
import { store } from './../redux/redux'

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

} from '../firebase/firebase'


import { child } from 'firebase/database'
import { color } from 'react-native-reanimated';







export default function Cart(props) {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const [orders, setOrders] = useState()

    useEffect(() => {
        onValue(ref(db, 'carts'), async (snapshot) => {
            if (snapshot.exists()) {
                let snapshotObject = snapshot.val()

                let stringUser = await AsyncStorage.getItem("user")
                let myUserId = JSON.parse(stringUser).userId

                let newOrderArray = Object.keys(snapshotObject) 
                    .filter(item => (item.includes(`${myUserId}`)))
                    .map(eachKey => {
                        let eachObject = snapshotObject[eachKey]
                        return {
                            ...eachObject,
                        }
                    })

                function countElement(array, x) {
                    let count = 0;
                    for (let i = 0; i < array.length; i++) {
                        if (array[i].name == x.name)
                            count++;
                    }
                    return count
                }

                function loc(arr, item) {
                    for (i = 0; i < arr.length; i++) {
                        if (arr[i].name == item.name) {
                            return false
                        }
                    }
                    return true
                }

                function unique(arr) {

                    var newArr = []
                    newArr = arr.reduce(function (total, item) {
                        const soLan = countElement(arr, item)
                        elementOfArray = { ...item, quantity: soLan }
                        return [...total, elementOfArray]
                    }, [])
                        .filter(function (item) {
                            return loc(newArr, item) ? newArr.push(item) : ''
                        })
                    return newArr
                }

                const newOrder = unique(newOrderArray)

                setOrders(newOrder)

            } else {
                console.log('No data available')
            }
        })
    }, [])

    var QuantityBuy = store.getState()  

    return <View style={{ flex: 1, backgroundColor: colors.white }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon name={'arrow-left'} size={20} color={'orange'} onPress={() => goBack()}> </Icon>
                    <Text> Giỏ hàng </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text> Sửa </Text>
                    <Icon name={'comments'} size={20} color={'orange'} style={{}} onPress={() => navigate('Chat')} > </Icon>
                </View>
            </View>
            <View style={{ height: 4, backgroundColor: colors.primaryBlur }}></View>
            <View style={{ height: 40, backgroundColor: colors.primaryBlur1, flexDirection: 'row' }}>
                <Image source={images.freeShip} style={{ height: 30, width: 60, resizeMode: 'contain' }} />
                <Text style={{ flex: 1 }}>Nhấn vào mục Mã giảm giá Ở cuối trang để hưởng miễn phí vận chuyển bạn nhé!</Text>
            </View>

            <FlatList style={{
                flex: 1,
                marginBottom: 20,
                backgroundColor: colors.white
            }}
                data={orders}
                renderItem={({ item }) => <View style={{ width: '100%', height: 80, backgroundColor: colors.primaryBlur1, }}>
                    <View style={{ flexDirection: 'row', width: '100%', height: 75, backgroundColor: colors.white }}>

                        <Image source={item.url} style={{ width: 70, height: 70, borderRadius: 6, resizeMode: 'contain', borderColor: colors.primaryBlur, borderWidth: 1 , marginEnd: 20}} />
                        <View>
                            <View style={{ flexDirection: 'row', width: "100%"}}>
                            <Image source={images.freeShip1 } style={{ width : 50 , height: 15 , marginEnd: 15}}></Image>
                            <Text style={{ fontSize: 12,}}> {item.name}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 12, color: colors.gray, textDecorationLine: 'line-through' }}> {item.price * 3}.000k</Text>
                                <Text style={{ fontSize: 12, color: colors.red }}> {item.price}.000k</Text>
                            </View>
                            <View style={{ height: 20, width: 70, flexDirection: 'row', borderWidth: 1, borderColor: colors.primaryBlur  , marginTop: 10}}>
                                <View style={{ height: 20, width: 20, flexDirection: 'row', borderRightWidth: 1, borderColor: colors.primaryBlur }}>
                                    <Text> - </Text>
                                </View>
                                <Text style={{ fontSize: 12, flex: 1 }}> {item.quantity}</Text>
                                <View style={{ height: 20, width: 20, flexDirection: 'row', borderLeftWidth: 1, borderColor: colors.primaryBlur }}>
                                    <Text> + </Text>
                                </View>


                            </View>
                        </View>
                    </View>


                </View>

                }
                ref={(ref) => {
                }}
            />
            <View style={{ height: 1, backgroundColor: colors.primaryBlur }}></View>

            <View style={{ flexDirection: 'row', height: 60, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Icon name={'square'} color={colors.primary} size={20} />
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>Tất cả</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ fontSize: 16, marginEnd: 10 }}> Tổng thanh toán </Text>
                    <View style={{ height: 60, width: 90, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}>
                        <Text style={{ fontSize: 16 }}> Mua hàng </Text>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    </View>
}