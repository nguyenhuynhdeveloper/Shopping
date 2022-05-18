import React, {useState, useEffect} from 'react';
import {
    Text, 
    View,
    Image,
    TouchableOpacity,
    TextInput,    
    FlatList
} from 'react-native'
import {images, colors, icons, fontSizes} from '../../constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import FiveStars from './FiveStars';
import {screenWidth, screenHeight} from '../../utilies/Device'

function GridItem(props) {
    const {item, index, onPress} = props
    return <TouchableOpacity style={{
        flex: 0.5,
        marginLeft: index % 2 == 0 ? 10 : 0,
        marginTop: 5,
        marginRight: 10,
        marginBottom: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.inactive,
        backgroundColor: 'white'
    }}
    onPress={onPress}>
        <View style={{
            width: screenWidth /2 -10 ,
            height: screenWidth /2 -10,
            marginTop: 10,
            marginHorizontal: 5
        }}>
            <Image
                style={{
                    width: screenWidth /2 -30 ,
                    height: screenWidth /2 -30,
                    resizeMode: 'contain',
                    borderRadius: 20,
                    marginRight: 15
                }}
                source={
                    item.url
                } />         
        </View>
              

        <Text style={{
            color: colors.primary,
            fontWeight: 'bold',
            fontSize: fontSizes.h6,
            marginHorizontal: 10,
            marginTop: 5,
        }}> {item.name}
        </Text>
        {
            item.specifications.map(specification =>
                <Text
                    key={specification}
                    style={{
                        color: 'black',
                        fontSize: fontSizes.h6,
                        paddingHorizontal: 10,
                        paddingBottom: 10,
                    }}>* {specification}</Text>)
        }
             
        
        <View style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row', 
                padding: 10,
                alignItems: 'flex-end'
            }}>
                <View style = {{ justifyContent: 'flex-start' }}>
                <FiveStars numberOfStars={item.stars} />
                <Text style={{
                    color: colors.success,
                    fontSize: fontSizes.h6 * 0.8,
                    textAlign: 'left',
                    paddingTop: 5
                }}>{item.reviews} reviews</Text>
                  <Text style={{
                    color: colors.success,
                    fontSize: fontSizes.h6 * 0.8,
                    textAlign: 'left',
                    paddingTop: 5
                }}>{item.sold} sold</Text>
                </View>
            

            <TouchableOpacity
                onPress={onPress}
                style={{ flexDirection: 'row' ,
                justifyContent: 'flex-end',
                
                }}>
                <Icon
                    name='heart'
                    style={{ marginEnd: 5 }}
                    size={22} color={
                        item.isSaved == undefined || item.isSaved == false ?
                            colors.inactive : 'red'} />
                <Text style={{
                    color: item.isSaved == undefined || item.isSaved == false ?
                        colors.inactive : 'red',
                    fontSize: fontSizes.h6 * 0.8,
                    width: 50
                }}>Saved for later</Text>
            </TouchableOpacity>
            </View>
          
    </TouchableOpacity>
}
export default GridItem