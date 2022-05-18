
import React, {Component, useState} from 'react'
import {
    SafeAreaView, 
    Text, 
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    FlatList,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StackRouter } from 'react-navigation'
import { Provider } from 'react-redux'; 
import { store } from '../redux/redux'
import {Welcome, Login, Register, Messenger , FoodList, ProductDes, ProductDesFood} from '../screens'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer'

const Stack = createNativeStackNavigator()
import UITab from './UITab'
function App(props) {
    return  <Provider store={store}>   
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={"Welcome"} component={Welcome}/>
            <Stack.Screen name={"Login"} component={Login}/>
            <Stack.Screen name={"Register"} component={Register}/>
            <Stack.Screen name={"UITab"} component={UITab}/>     
            <Stack.Screen name={"Messenger"} component={Messenger}/>             
            <Stack.Screen name={"FoodList"} component={FoodList}/>             
            <Stack.Screen name={"ProductDes"} component={ProductDes}/>             
            <Stack.Screen name={"ProductDesFood"} component={ProductDesFood}/>             
        </Stack.Navigator>
    </NavigationContainer>
    </Provider>
}
export default App