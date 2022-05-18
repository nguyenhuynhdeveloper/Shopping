import React,{Component} from 'react'
import {
    TouchableOpacity, 
    Text,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {colors, fontSizes} from '../constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context' 
function SafeArea(props) {
    const {
        title, 
        leftIconName,
        rightIconName,
        onPressLeftIcon,
        onPressRightIcon
    } = props
    const safeAreaInsets = useSafeAreaInsets()

    return <View style ={{ height: safeAreaInsets.top - 12 } }/ >   
    }

 export default SafeArea