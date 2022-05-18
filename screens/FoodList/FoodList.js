import React, {useState, useEffect} from 'react';
import {
    Text, 
    View,
    Image,
    TouchableOpacity,
    TextInput,    
    FlatList,
    SafeAreaView
} from 'react-native'
import {images, colors, icons, fontSizes} from '../../constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import FoodItem from './FoodItem'
import {UIHeader} from '../../components'

function FoodList(props) {
    const {navigation, route} = props
    const {navigate, goBack} = navigation

    const [foods, setFoods] = useState([        
        {
            name: 'Thịt Gà mới luộc thơm phức',
            url:images.foodThitGaHap,
            status: 'Opening soon',
            stars: 4.8,
            address: 2,
            time:4,
            discountCoupon: 40,           
            price:99,
            reviews: 30 ,
            sold:20
          
           

        },
        {
            name: 'Thịt Gà hấp ngon tuyệt',
            url: images.foodThitGaluoc,
            status: 'Opening Now',
            stars: 5,
            address:3, 
            time: 2,
            discountCoupon: 15,    
            sold:20,
            price:99,
            reviews: 30
        },
        {
            name: 'Đậu bắp luộc',
            url:images.foodRauLuoc,
            status: 'Opening Now',
            stars: 3,
            address:4,
            time: 6,
            discountCoupon: 50,    
            sold:20,
            price:99,
            reviews: 30
        },
        {
            name: 'Ngô luộc ',
            url: images.foodBapLuoc,
            status: 'Closing soon',
            stars: 4,
            address: 3,
            time: 1,
            discountCoupon: 15,    
            sold:20,
            price:99,
            reviews: 30
        },
        {
            name: 'Bánh Trưng ',
            url: images.foodBanhChung,
            status: 'Comming soon',
            stars: 5,
            address: 4,
            time: 2,
            discountCoupon: 70,    
            sold:20,
            price:99,
            reviews: 30
        },
        {
            name: 'Bánh kem sinh nhật-Láng Hạ',
            url: images.foodBanhKem,
            status: 'Closing soon',
            stars: 2,
            address: 2,
            time: 1,
            discountCoupon: 15,    
            sold:20,
            price:99,
            reviews: 30
        },
        {
            name: 'Bánh rán đường - Quán Bà Già',
            url: images.foodBanhRanDuong,
            status: 'Closing soon',
            stars: 3,
            address: 7, 
            time: 2,
            discountCoupon: 15,    
            sold:20,
            price:99,
            reviews: 30
        },
        {
            name: 'Rượu vang đà lạt - Đỗ Quang,',
            url: images.foodWineVang,
            status: 'Closing soon',
            stars: 1,
            address: 6,
            time: 7,
            discountCoupon: 15,    
            sold:20,
            price:99,
            reviews: 30
        },
        {
            name: 'CoCa - Sfood',
            url: images.foodCoca,
            status: 'Closing soon',
            stars: 4,
            address: 8,
            time: 7,
            discountCoupon: 30,    
            sold:20,
            price:99,
            reviews: 30
        },
        {
            name: 'Sprite - Sfood',
            url: images.foodSprite,
            status: 'Closing soon',
            stars: 5,
            address: 10,
            time: 19,
            discountCoupon: 15,    
            sold:20,
            price:99,
            reviews: 30
        },
        {
            name: 'Nước Cam - Sfood',
            url: images.foodNuocCam,
            status: 'Closing soon',
            stars: 4.7,
            address: 1,
            time: 40,
            discountCoupon: 15,    
            sold:20,
            price:99,
            reviews: 30
        },
        {
            name: 'Nước Hoa Quả - Sfood',
            url: images.foodNuocHoaQua,
            status: 'Closing soon',
            stars: 2,
            address: 1,
            time: 50,
            discountCoupon: 15,    
            sold:20,
            price:99,
            reviews: 30
        },
     

    ])
    const [categories, setCategories] = useState([
        {
            name: 'Hot dogs',
            url: images.hotdog,
        },
        {
            name: 'Dinner',
            url: images.dinner,
        },
        {
            name: 'Beverages',
            url: images.beverages,
        },
        {
            name: 'Dessert',
            url: images.desert,
        },
        {
            name: 'Wine',
            url: images.wine, 
        },
        {
            name: 'Barbecue',
            url: images.barbecue,
        }, 
        {
            name: 'BBQ',
            url: images.bbq, 
        },
        {
            name: 'Breakfast',
            url: images.breakfast, 
        },
        {
            name: 'Coffee',
            url:images.coffee,
        },
        {
            name: 'Noodles',
            url: images.noodles,
        },
               
    ])
    const [searchText, setSearchText] = useState('')
    const filteredFoods = () => foods.filter(eachFood => eachFood.name.toLowerCase()
                                    .includes(searchText.toLowerCase()))
    return <View style={{flex: 1, backgroundColor: 'white'}}>

            <UIHeader 
            title={"FoodList"} 
            leftIconName={"angle-left"}
            onPressLeftIcon={()=>{
               goBack()
            }}
        />
    
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View>
            <View style={{                
                marginHorizontal: 10, 
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Icon 
                    name='search' 
                    size={15} color={'black'} 
                    style={{
                        position: 'absolute',
                        top: 12,
                        left: 10
                    }}
                />
                <TextInput
                    autoCorrect={false}
                    onChangeText={(text) => {
                        setSearchText(text)
                    }}
                    style={{
                        backgroundColor: colors.inactive,
                        height: 40,
                        flex: 1,
                        marginEnd: 8,
                        borderRadius: 5,
                        opacity: 0.8,
                        paddingStarst: 30
                    }} />
                <Icon name='bars' size={30} color={'black'} />
            </View>
            <View style={{
                height: 100,
            }}>
                <View style={{
                    height: 1, 
                    backgroundColor: colors.inactive,                    
                }} />
                <FlatList 
                    horizontal
                    data={categories}
                    keyExtractor={item => item.name}
                    renderItem={({item}) => {
                        return <TouchableOpacity
                            onPress={()=>{
                                alert(`press ${item.name}`)
                            }}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Image
                                style={{
                                    width: 40,
                                    height: 40,
                                    resizeMode: 'cover',
                                    borderRadius: 25,
                                    margin: 10
                                }}
                                source={
                                   item.url
                                } />
                            <Text style={{
                                color: 'black',
                                fontSize: fontSizes.h6 * 0.8
                            }}>{item.name}</Text>
                        </TouchableOpacity>
                    }}
                    style={{flex: 1}}>

                </FlatList>
                <View style={{height: 1, backgroundColor: colors.inactive}} />
            </View>

            </View >  
                               
            {filteredFoods().length > 0 ? <FlatList 
                data={filteredFoods()}
                renderItem={({item}) => <FoodItem 
                    onPress={()=> {                        
                        navigate('ProductDesFood', {food: item})
                    }}
                    food = {item} key={item.name}/>}
                keyExtractor={eachFood => eachFood.name}
            /> : <View style={{
                    flex: 1, 
                    justifyContent: 'center', 
                    alignItems: 'center',                    
                 }}>
                <Text style={{
                    color: 'black',
                    fontSize: fontSizes.h3 
                }}>No food found</Text>
            </View>}        
    </SafeAreaView>
    </View>
}
export default FoodList