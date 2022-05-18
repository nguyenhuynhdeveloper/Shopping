import React, {Component} from 'react'
import {
    TouchableOpacity, 
    Text,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {colors, fontSizes} from '../constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context' 
function UIHeader(props) {
    const {
        title, 
        leftIconName,
        rightIconName,
        onPressLeftIcon,
        onPressRightIcon
    } = props
    const safeAreaInsets = useSafeAreaInsets()

    return <View>
        <View style ={{ height: safeAreaInsets.top - 12 } }/ >    
         <View style={{
        height: 40,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }}>
        {leftIconName != undefined ? <Icon            
            name={leftIconName}
            style={{ padding: 10 }}
            size={23} color={'white'}
            onPress={onPressLeftIcon}
        /> : <View style={{width: 50, height: 50 }}/>}
        <Text style={{
            fontSize: fontSizes.h5,
            alignSelf:'center',
            lineHeight: 45,
            color: 'white'
        }}>{title}</Text>
        {rightIconName != undefined ? <Icon            
            name={rightIconName}
            style={{ padding: 10 }}
            size={18} color={'white'}
            onPress={onPressRightIcon}
        /> : <View style={{width: 50, height: 50, }}/>}        
    </View>
    </View>
}
export default UIHeader