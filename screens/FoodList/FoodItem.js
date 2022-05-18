import React, {useState, useEffect} from 'react';
import {
    Text, 
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native'
import {images, colors, icons, fontSizes} from '../../constants'
import Icon from 'react-native-vector-icons/FontAwesome5'

function _getColorFromStatus(status) {
  
    return status.toLowerCase().trim() == 'opening now' ? colors.success :
            (status.toLowerCase().trim() == 'closing soon' ? colors.alert : 
            (status.toLowerCase().trim() == 'comming soon' ? colors.warning : colors.success))
}
function FoodItem(props) {
    let { 
        name, 
        stars, 
        address, 
        time, 
        url, 
        status,   
        discountCoupon      
    } = props.food   
    const {onPress} = props

                        
    return ( <View style={{height: 120 , flexDirection: 'column'}}> 
    <View style={{backgroundColor: colors.blue, width: '100%', height: 10}}></View>    
    <TouchableOpacity 
        onPress={onPress}
        style={{
        height: 110,                 
        paddingTop: 5,
        paddingStart: 10,
        flexDirection: 'row',
        backgroundColor: colors.white
    }}>
        <Image 
            style={{
                width: 90, 
                height: 90,
                resizeMode: 'cover',
                borderRadius: 10,
                marginRight: 15
            }}
            source={
                url
        } />
        <View style={{                    
            flex: 1,
            marginRight: 10
        }}>
             <View style={{flexDirection: 'row'}}>
             <Icon 
                    name='utensils' 
                    style={{paddingEnd: 5}}
                    size={18} 
                    color={colors.inactive} />
            <Text style={{
                color: 'black',
                fontSize: fontSizes.h6,
                fontWeight: 'bold'
            }}>{name}</Text>
            </View>
            <View style={{
                height: 1,
                backgroundColor: 'black',                        
            }} />
            
            <View style={{flexDirection: 'row'}}>
                <Text style={{
                    color: colors.inactive,
                    fontSize: fontSizes.h6,
                }}>Status: </Text>
                <Text style={{
                    color: _getColorFromStatus(status),
                    fontSize: fontSizes.h6* 0.9,
                }}>{status.toUpperCase()}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
             <Icon 
                    name='star' 
                    style={{paddingEnd: 5}}
                    size={14} 
                    color={colors.orange}
                    />
            <Text style={{
                    color: 'gray' ,
                    fontSize: fontSizes.h6,
                    
                  
                    
            }}>{stars}</Text>
            <View style ={{height : '100%' , width: 1, backgroundColor: colors.alert , marginHorizontal: 10}}></View>
                 <Icon 
                    name='location-arrow' 
                    style={{paddingEnd: 5, marginTop: 2}}
                    size={14} 
                    color={colors.gray} />
            <Text style={{
                    color: colors.gray,
                    fontSize: fontSizes.h6,
            }}>{address}</Text>
            <View style ={{height : '100%' , width: 1, backgroundColor: colors.alert , marginHorizontal: 10}}></View>

             <Icon 
                    name='clock' 
                    style={{paddingEnd: 5}}
                    size={14} 
                    color={colors.gray} />
            <Text style={{
                    color: colors.gray,
                    fontSize: fontSizes.h6,
            }}>{time}</Text>
             </View>
            <View style ={{ height: 20}}></View>
             <View style={{ height: 20, width: 90 , borderWidth: 0.4, borderColor: colors.orange}}>
             <Text style={{
                    color: '#FFA500',
                    fontSize: fontSizes.h6,
            }}>Mã giảm {discountCoupon}k</Text>
             </View>

        
        </View>     
    </TouchableOpacity>
               
    </View>)
}
export default FoodItem