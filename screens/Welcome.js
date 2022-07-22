import React, {useState, useEffect} from 'react';
import {
    Text, 
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    Platform
} from 'react-native'
import {sum2Number, substract2Number, PI} from '../utilies/Calculation'
import {images, icons, colors, fontSizes} from '../constants'
import {UIButton} from '../components'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
    auth,
    onAuthStateChanged,  
    ref,
    set,
    db
} from '../firebase/firebase'
function Welcome(props) {
    const [accountTypes, setAccountTypes] = useState([
        {
            name: 'Visitors',
            isSelected: true,
        }, 
        {
            name: 'Shopper',
            isSelected: false,
        }, 
        {
            name: 'VIP',
            isSelected: false,
        },         
    ]) 

    const {navigation, route} = props
    const {navigate, goBack} = navigation
    useEffect(() => {      
        onAuthStateChanged(auth, (responseUser) => {     
     
            if(responseUser) {                                             
                let user = {
                    userId: responseUser.uid,              
                    email: responseUser.email,
                    emailVerified: responseUser.emailVerified,
                    accessToken: responseUser.accessToken
                }
                set(ref(db, `users/${responseUser.uid}`), user)   
                AsyncStorage.setItem("user", JSON.stringify(user))     
                navigate('UITab')                 
            } 
        })
    })
    return <View style={{
        backgroundColor: 'white',
        flex: 100,
    }}>
        <ImageBackground 
            source={
                images.background
            }
            resizeMode='cover'
            style={{
                flex: 100,                  
            }}
        >
            <View style={{                
                flex: 20,                                
            }}>
                <View style={{
                    flexDirection: 'row',
                    height: 50,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: Platform.OS === 'ios' ? 40 : 0
                }}>
                    <ImageBackground
                        source={icons.shopping}
                        style={{
                            marginStart: 70,
                            marginEnd: 5,
                            width: 30,
                            height: 30,
                        }}
                    />
                    <Text style={{
                        color: 'white' ,
                        fontSize: 18
                    }}>We Love Online Shopping</Text>
                    <View style={{ flex: 1 }} />


                </View>
            </View>
            <View style={{
                flex: 20,
                width: '100%',                                
                justifyContent: 'center',
                alignItems: 'center',
            }} >
                <Text style={{
                        marginBottom: 7, 
                        color: 'white',
                        fontSize: fontSizes.h6
                    }}>Welcome to</Text>
                <Text style={{ 
                    marginBottom: 7, 
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: fontSizes.h5*2,
                }}>Shopping</Text>
                <Text style={{ 
                    marginBottom: 7, 
                    color: 'white',
                    fontSize: fontSizes.h6, 
                }}>Please select your account type</Text>
            </View>
            <View style={{
                flex: 40,                
            }}>
                {accountTypes.map(accountType => 
                    <UIButton 
                        key={accountType.name}
                        onPress={() => {                                         
                        setAccountTypes(accountTypes.map(eachAccountType => {
                            return {
                                ...eachAccountType, 
                                isSelected: eachAccountType.name == accountType.name
                            }                            
                        }));
                        alert('Developing Feature')
                    }}
                        title={accountType.name}
                        isSelected={accountType.isSelected}
                        colors={'#191970'}
                    />)
                }                              
            </View>

            <View style={{
                flex: 20,                    
            }}>
                <UIButton 
                    onPress={() => {
                        navigate('Login')
                    }}
                    title={'Login'.toUpperCase()}
                    colors={'#0000cc'}
                    fontSize ={20}
                    />
                <Text style={{                     
                    color: 'white',
                    fontSize: fontSizes.h6, 
                    alignSelf: 'center'
                }}>Want to register new Account ?</Text>
                <TouchableOpacity 
                    onPress={()=>{
                        navigate('Register')
                    }}
                    style={{
                    padding: 5
                    }
                }>
                    <Text style={{
                        color: colors.primary,
                        fontSize: fontSizes.h6,
                        alignSelf: 'center',
                        textDecorationLine: 'underline',
                    }}>Register</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    </View>
}
export default Welcome 

