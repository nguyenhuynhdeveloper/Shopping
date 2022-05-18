import React, {Component} from 'react'
import {
    TouchableOpacity, 
    Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {colors} from '../constants'
import {images, icons, fontSizes} from '../constants'


function UIButton(props) {
    const {onPress, title, isSelected , colors, fontSize} = props
    return <TouchableOpacity
        onPress={onPress}
        style={{
            borderColor: 'white',
            borderWidth: 1,
            height: 45,
            borderRadius: 5,
            marginHorizontal: 15,
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isSelected == true ? '#87CEFA': null,
          
        }}>
        {isSelected == true && <Icon
            size={20}
            name={"check-circle"} style={{
                color: 'green',
                position: 'absolute',
                left: 10,
                top: 10
            }} />}
        <Text style={{
            color: isSelected == true ? colors.primary : colors,
            fontSize: fontSize ? fontSize:fontSizes.h3*0.75,
            fontFamily: "Times New Roman"

        }}>{title}</Text>
    </TouchableOpacity>
}
export default UIButton