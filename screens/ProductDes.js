import React, { useState, useEffect, useRef } from 'react'
import { Text, StyleSheet, View, Image, ImageBackground, TouchableOpacity, TextInput, Animated, Easing } from 'react-native'
import { UIHeader, SafeArea } from '../components'
import { screenWidth, screenHeight } from '../utilies/Device'
import FiveStars from './ProductGrid/FiveStars'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { images, colors, icons, fontSizes } from '../constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'


import { useDispatch, useSelector, getState } from 'react-redux'
import { store } from './../redux/redux'

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
var nameGlobal
var urlGlobal
var starsGlobal
var soldGlobal
var priceGlobal
var reviewsGlobal
var specificationsGlobal


const addProduct = async () => {
  let stringUser = await AsyncStorage.getItem("user")
  let myUserId = JSON.parse(stringUser).userId

  let newOrderObject =
  {
    name: nameGlobal,
    url: urlGlobal,
    stars: 'stars',
    sold: 'sold',
    price: priceGlobal,
    reviews: 'reviews',
    specifications: 'specifications',
  }

  const newPostKey = push(child(ref(db), 'carts')).key;
  const updates = {};
  updates[`carts/${myUserId}` + newPostKey] = newOrderObject;
  update(ref(db), updates).then(() => alert('Đã thêm vào giỏ hàng'))
}

export default function ProductDes(props) {
  const { navigation, route } = props
  const { navigate, goBack } = navigation
  const { product, food } = props.route.params
  const { name, url, stars, sold, price, reviews, specifications } = product
  nameGlobal = name
  urlGlobal = url
  priceGlobal = price

  const safeAreaInsets = useSafeAreaInsets()
  const topMotion = useRef(new Animated.Value(600)).current;
  const rightMotion = useRef(new Animated.Value(0)).current;
  const heightMotion = useRef(new Animated.Value(60)).current;
  const widthMotion = useRef(new Animated.Value(60)).current;

  const [quantity, setQuantity] = useState(true)

  const dispatch = useDispatch();

  var QuantityBuy = store.getState()


  const book = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(topMotion, {
          toValue: 50,
          duration: 5000,
          useNativeDriver: false

        }),
        Animated.timing(rightMotion, {
          toValue: screenWidth - 30,
          duration: 5000,
          useNativeDriver: false

        }),
        Animated.timing(heightMotion, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: false

        }),
        Animated.timing(widthMotion, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: false

        }),
      ]),
      Animated.parallel([
        Animated.timing(topMotion, {
          toValue: 600,
          duration: 0,
          useNativeDriver: false

        }),
        Animated.timing(rightMotion, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false

        }),
        Animated.timing(heightMotion, {
          toValue: 60,
          duration: 0,
          useNativeDriver: false

        }),
        Animated.timing(widthMotion, {
          toValue: 60,
          duration: 0,
          useNativeDriver: false

        }),
      ])])
      .start();
  };


  return (<View style={{ backgroundColor: 'white', height: '100%' }}>
    <SafeArea></SafeArea>

    <View style={{ height: screenWidth, width: screenWidth, flexDirection: 'row' }}>




      <ImageBackground source={url} style={{ resizeMode: 'contain', height: '100%', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>

        <View style={{ borderRadius: 30, backgroundColor: colors.blueBlur, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', left: 5, top: 5, }}>
          <Icon name={'arrow-left'} size={20} onPress={() => goBack()} style={{ padding: 8, position: 'absolute' }} />
        </View>
        <View style={{ borderRadius: 30, backgroundColor: colors.blueBlur, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', left: 5, top: 5, marginRight: 10 }}>
          <Icon name={'opencart'} size={20} onPress={() => navigate('Cart')} style={{ padding: 8, position: 'absolute', }} />

          <View style={{ width: 20, height: 20, position: 'absolute', top: -10, right: 0, color: 'red', borderRadius: 10, borderWidth: 1, backgroundColor: colors.orange, boxSizing: 'border-box', borderColor: colors.orange }} >
            <Text style={{ color: 'red', fontSize: fontSizes.h3 * 0.8, textAlign: 'center', boxSizing: 'border-box' }}>{QuantityBuy}</Text>
          </View>
        </View>

      </ImageBackground>
    </View>
    <View style={{ backgroundColor: colors.white }}>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <View style={{ backgroundColor: colors.red, height: 20, width: 70 }}>
          <Text style={{ color: 'white' }}> Yêu thích </Text>
        </View>
        <Text style={{ fontSize: fontSizes.h3, fontFamily: "Times New Roman" }}> {name}</Text>

      </View>
      <Text style={{ fontSize: fontSizes.h3 * 0.8, fontFamily: "Times New Roman", marginLeft: 10 }}> {specifications}</Text>

      <Text style={{ color: colors.red, fontSize: fontSizes.h3 * 0.8, fontFamily: 'Times New Roman' }}> đ {price}.000</Text>
      <Text style={{ color: colors.gray, fontSize: fontSizes.h3 * 0.8, fontFamily: 'Times New Roman', textDecorationLine: 'line-through' }}> đ {price * 3}.000</Text>
      <View style={{ flexDirection: 'row', backgroundColor: colors.grayBlur, marginBottom: 10 }}>
        <Image source={images.giCungRe} style={{ width: 60, height: 20, marginTop: 5 }}></Image>
        <View>
          <Text style={{ color: colors.red, fontSize: fontSizes.h3 * 0.8, fontFamily: 'Times New Roman' }} > Gì cũng rẻ </Text>
          <Text style={{ color: colors.black, fontSize: fontSizes.h3 * 0.5, fontFamily: 'Times New Roman' }}> Gía tốt nhất so với các sản phẩm cùng loại trên shopping  </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginVertical: 10 }}>

        <FiveStars numberOfStars={stars} size={16} > </FiveStars>
        <Text style={{ marginLeft: 10, fontSize: fontSizes.h5 * 0.8 }}> {stars}</Text>

        <View style={{ height: '100%', width: 2, backgroundColor: colors.gray, marginLeft: 10 }}></View>

        <Text style={{ marginLeft: 10, fontSize: fontSizes.h5 * 0.8 }}>  Đã bán {sold}k </Text>
        <Text style={{ marginLeft: 10, fontSize: fontSizes.h5 * 0.8, justifyContent: 'flex-end', marginLeft: 50 }}> Lượt đánh giá {reviews}</Text>
      </View>
    </View>


    <Animated.Image source={url} style={{ resizeMode: 'contain', height: heightMotion, width: widthMotion, position: 'absolute', top: topMotion, left: rightMotion }} />



    <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, marginBottom: safeAreaInsets.bottom - 10 }}>
      <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flex: 0.5 }}
        onPress={() => navigate('Chat')}
      >
        <Icon name={'comment'} size={24} > </Icon>
        <Text style={{ marginTop: 4 }}>Nhắn Tin</Text>
      </TouchableOpacity>

      <View style={{ height: '100%', width: 2, backgroundColor: colors.gray, marginLeft: 10 }}></View>

      <TouchableOpacity style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center' }}
        onPress={() => { book(); setQuantity(!quantity); dispatch({ type: 'counter/incremented' }); addProduct() }} >

        <Image source={images.themVaoCart} style={{ width: 30, height: 30 }} />
        <Text>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ backgroundColor: colors.red, justifyContent: 'center', alignItems: 'center', flex: 1 }}
        onPress={() => alert('Developing Feature')}
      >
        <Text>Mua với voucher</Text>
      </TouchableOpacity>
    </View>

  </View>


  )
}


const styles = StyleSheet.create({})