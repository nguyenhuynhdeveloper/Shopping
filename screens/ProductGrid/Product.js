import React, {useState, useEffect} from 'react';
import {
    Text, 
    View, 
    Image,
    TextInput,    
    FlatList,
    TouchableOpacity,
    SafeAreaView
} from 'react-native'
import {images, colors, icons, fontSizes} from '../../constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useSafeAreaInsets } from 'react-native-safe-area-context' 


import GridItem from './GridItem';
function Product(props) {
    const {navigation , route} = props
    const {navigate, goBack} = navigation
    const safeAreaInsets = useSafeAreaInsets()

    const [categories, setCategories] = useState([
        {
            name: 'FoodNow',
            url:  images.traSua
        },
        {
            name: 'Thời Trang Nam',
            url:  images.thoiTrangNam
        },
        {
            name: 'Thời Trang Nữ',
            url: images.thoiTrangNu
        },
        {
            name: 'Điện thoại & Phụ Kiện',
            url: images.dienThoai
        },
        {
            name: 'Mẹ & Bé',
            url: images.meVaBe
        },
        {
            name: 'Thiết Bị Điện Tử',
            url: images.thietBiDienTu
        },
        {
            name: 'Nhà Cửa Và Đời Sống',
            url: images.nhaCua
        },
        {
            name: 'Máy Tính & Laptop',
            url: images.mayTinh
        },
        {
            name: 'Sắc Đẹp',
            url: images.sacDep
        },
        {
            name: 'Máy Ảnh & Máy Quay Phim',
            url: images.mayAnh
        },
        {
            name: 'Sức Khoẻ',
            url: images.sucKhoe
        },   
        {
            name: 'Đồng Hồ',
            url: images.dongHo
        },
        {
            name: 'Giày Dép Nữ',
            url: images.giayDepNu
        },
        {
            name: 'Giày Dép Nam',
            url: images.giayDepNam
        },
        {
            name: 'Túi Ví Nữ',
            url: images.tuiViNu
        },
        {
            name: 'Thiết Bị Điện & Dân Dụng',
            url: images.thietBiDienGiaDung
        },
        {
            name: 'Phụ Kiện & Trang Sức',
            url: images.phuKienTrangSucNu
        },
        {
            name: 'Thể Thao & Du Lịch',
            url: images.theThao
        },
        {
            name: 'Bách Hoá Online',
            url: images.bachHoaOnline
        },
        {
            name: 'Ô Tô & Xe Máy & Xe Đạp',
            url: images.OTo
        },
        {
            name: 'Nhà sách Online',
            url: images.nhaSachOnline
        },       
    ])
    const [searchText, setSearchText] = useState('')
    
    const filteredCategories = () => categories.filter(each => each.name.toLowerCase()
    .includes(searchText.toLowerCase()))

    const filteredProduct = () => products.filter(each => each.name.toLowerCase()
    .includes(searchText.toLowerCase()))
    
    const [products, setProducts] = useState([
        {
            name: 'Iphone 13 pro Max',
            url: images.iphone13,
            price: 149.000,            
            specifications: [
                'iPhone 13 Pro Max giá rẻ nhất', 
                'Nhận hàng sớm',
                'Trả góp 0%'
            ],
            sold: 19,
            stars: 5,
            reviews : 30            
        },
        {
            name: 'MacBook Pro M1',
            url: images.macbook,
            price: 1149.000,            
            specifications: [
                'Mua Office Home & Student 2021', 
                'Thu cũ lên đời - Trợ giá 1 triệu',
             
            ],
            sold: 120,
            stars: 4,
            reviews : 30
        },
        {
            name: 'Máy Tính bảng SamSung',
            url: images.tablet,
            price: 1149.000,            
            specifications: [
                '.Miễn phí giao hàng Hà Nội', 
                'Tặng sạc dự phòng',                
            ],
            sold: 146,
            stars: 3,
            reviews : 30
        },
        {
            name: 'Vest Nam công sở',
            url: images.vestNam,
            price: 1149.000,            
            specifications: [
                'Áo vest Andy may sẵn tôn dáng', 
                'Sang trọng đủ size từ 50- 85kg',
                'Trẻ trung, lịch sự',
                'Heavy'
            ],
            sold: 546,
            stars: 1,
            reviews : 30
        },
        {
            name: 'Sơ mi nam',
            url: images.soMiNam,
            price: 149.000,            
            specifications: [
                'Màu sắc đa dạng', 
                "Lụa Gấm cao cấp đem lại cảm giác thoải mái",
                "Tặng thêm bao gồm 01 quần âu"
            ],
            sold: 66,
            stars: 5,
            reviews : 30
        },
        {
            name: 'Áo phông nam',
            url: images.aoPhongNam,
            price: 149.000,            
            specifications: [
                'Đi làm công sở, đi chơi', 
                'Áo  may sẵn tôn dáng',                
            ],
            sold: 698,
            stars: 3,
            reviews : 30
        },
        {
            name: 'Dầu Gội đầu Clear',
            url: images.dauGoiDau,
            price: 149.000,            
            specifications: [
                'Dầu gội thương hiệu  được sản xuất trực tiếp tại Mỹ,',
                'Lớp bọt mịn giàu dưỡng chất',
                'Mang đến cho bạn mái tóc suôn mượt, óng ả',
              
            ],
            sold: 1,
            stars: 1,
            reviews : 30
        },
        {
            name: 'Sữa tắm trắng da',
            url: images.suaTam,
            price: 149.000,            
            specifications: [
                'Hương thơm tươi mát cho cảm giác thoải mái', 
                'Giúp bạn tự tin suốt ngày dài',                
            ],
            sold: 1,
            stars: 3,
            reviews : 30
        },
        {
            name: 'Sơ mi nữ',
            url: images.soMiNu,
            price: 149.000,            
            specifications: [
                'Vải thun cao cấp', 
                'Áo thun thiết kế ngắn tay',
                'Có thể mặc đi làm, đi sự kiện'
            ],
            sold: 232,
            stars: 2,
            reviews : 30
        },
        {
            name: 'Váy Nữ siêu xinh',
            url: images.vayNu,
            price: 1,            
            specifications: [
                'Chân váy dạ kẻ hồng dáng A', 
                'Vừa ấm áp vừa tôn lên vẻ trẻ trung, tươi tắn của các chị em',
                'Thể hiện sự thanh lịch, nhẹ nhàng'
            ],
            sold: 321,
            stars: 3,
            reviews : 30
        },
        {
            name: 'Chân Váy Nữ ',
            url: images.chanVayNu,
            specifications: [
                'Tạo vẻ trẻ trung, hiện đại cho người mặc', 
                'Thoải mái và tự tin',
                'Kiểu chân váy tôn dáng'
            ],
            price: 135.000,            
            sold: 12,
            stars: 1,
            reviews : 30
        },
        {
            name: 'Kẹp tóc nữ',
            url: images.kepToc,
            specifications: [
                'Cho nàng thêm xinh đẹp và sành điệu mỗi ngày', 
                'Món đồ không thể thiếu trong tủ đồ của các chị em',
               
            ],
            price: 135.000,            
            sold: 12,
            stars: 1,
            reviews : 30
        },
        {
            name: 'Khăn tắm thiên nhiên ',
            url: images.khanTam,
            specifications: [
                'Khăn tắm, khăn tay, khăn mặt cho khách sạn, spa, resort', 
                'Khăn bông, khăn quà tặng cao cấp.',
                'In logo theo yêu cầu.'
            ],
            price: 135.000,            
            sold: 12,
            stars: 1,
            reviews : 30
        },
    ])
    return <View
    style={{ 
        flex: 1,
        backgroundColor: colors.primary

         }}>
    <View style ={{ height: safeAreaInsets.top ,backgroundColor: colors.primary  } }/ >  
     <SafeAreaView style={{
        flex: 1,
        backgroundColor:  'white'
    }}>
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
                        paddingStart: 30
                    }} />
                <Icon name='bars' size={30} color={'black'} />
            </View>
                    <View style={{
                height: 100,
            }}>
                <View style={{
                    height: 1, 
                    backgroundColor: colors.borderForm,                    
                }} />

                
                <FlatList 
            // Làm FlatList có 2 hàng trên 1 cột
            //    contentContainerStyle={{alignSelf: 'flex-start'}}
            //    numColumns={Math.ceil(filteredCategories().length / 2)}
            //    showsVerticalScrollIndicator={false}
            //    showsHorizontalScrollIndicator={false}

                     horizontal = {true}
                    data={filteredCategories()}
                    keyExtractor={item => item.name}
                    renderItem={({item}) => {
                        return <TouchableOpacity
                            onPress={()=>{
                                navigate('FoodList')
                            }}
                            style={{
                                width: 70,
                                height: 90,
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}>
                            <Image
                                style={{
                                    width: 40,
                                    height: 40,
                                    resizeMode: 'cover',
                                    borderRadius: 25,
                                    margin: 10,
                                     borderColor: colors.primary,
                                     borderWidth : 2

                                }}
                                source={
                                    item.url
                                } />
                            <Text style={{
                                flex: 1,
                                color: 'black',
                                fontSize: fontSizes.h6 * 0.8,
                                // backgroundColor: 'red'

                            }}
                            accessible={true}
                            >{item.name}</Text>
                        </TouchableOpacity>
                    }}
                    style={{flex: 1}}>
                    
                        

                </FlatList> 

                <View style={{height: 1, backgroundColor: colors.inactive}} />
            </View >
        <FlatList 
            style={{marginTop: 5 , backgroundColor: colors.primary}}        
            data={filteredProduct()}
            numColumns={2}
            keyExtractor={item => item.productName}
            renderItem={({item, index}) => <GridItem 
                item={item}
                index={index}
                onPress={() => {
                    let clonedProducts = products.map(eachProduct => {
                        if (item.productName == eachProduct.productName) {
                            return {
                                ...eachProduct,
                                isSaved: eachProduct.isSaved == false
                                    || eachProduct.isSaved == undefined
                                    ? true : false
                            }
                        }
                        return eachProduct
                    })
                    setProducts(clonedProducts)   
                    navigate('ProductDes', {product: item})
                }}
                />}
            />
    </SafeAreaView>
    </View>
}
export default Product