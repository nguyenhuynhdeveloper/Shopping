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
import {    
    auth,
    signInWithEmailAndPassword,
} from '../firebase/firebase'
import {UIHeader, UIButton} from '../components'
import {images, colors, icons, fontSizes} from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {isValidEmail, isValidPassword} from '../utilies/Validations'
function Login(props) {
    const [keyboardIsShown, setKeyboardIsShown] = useState(false)
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [email, setEmail] = useState('hongnhung@gmail.com')
    const [password, setPassword] = useState('999999')
    const isValidationOK = () => email.length > 0 && password.length > 0
                            && isValidEmail(email) == true
                            && isValidPassword(password) == true

    useEffect(()=>{
        Keyboard.addListener('keyboardDidShow', () => {            
            setKeyboardIsShown(true)
        })
        Keyboard.addListener('keyboardDidHide', () => {            
            setKeyboardIsShown(false)
        })
    })
    const {navigation, route} = props
    const {navigate, goBack} = navigation

    return <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{
        flex: 100,
        backgroundColor: colors.primary
    }}>
        <UIHeader 
            title={"Log in"} 
            leftIconName={"angle-left"}
            onPressLeftIcon={()=>{
               goBack()
            }}
        />
        <View style={{
            flex: 20,
            flexDirection: 'row',            
            justifyContent: 'space-around',
            alignItems: 'center'
        }}>
            <Text style={{
                color: 'black',
                fontSize: fontSizes.h2,
                fontWeight: 'bold',
                width: '50%'
            }}>Already have an Account?</Text>
            <Image
                tintColor = {colors.primary}
                source={
                    images.shoppingBanner1
                } style={{
                    flex: 1,
                    alignSelf: 'center',
                    resizeMode: 'contain'
                }} 
               
                />
        </View>

        <View style ={{ flex: 40 ,
        backgroundColor: 'white',
        borderWidth : 1,
        borderRadius : 20,
        borderColor: colors.primary
        }}>

        
        <View style={{
           justifyContent: 'center',
        }}>
            <View style ={{height: 50}}></View>
            <View style={{
                marginHorizontal: 15
            }}>
                <Text style={{
                    fontSize: fontSizes.h6,
                    color: colors.primary
                }}>Email:</Text>
                <TextInput
                    onChangeText={(text)=>{
                       setErrorEmail(isValidEmail(text) == true ? 
                                    '' : 'Email not in correct format')
                       setEmail(text)    
                    }}
                    style={{
                        color: 'black'
                    }}
                    keyboardType='email-address'
                    placeholder='example@gmail.com'
                    value={email}
                    placeholderTextColor={colors.placeholder}
                />
                <View style={{height: 1, 
                    backgroundColor: colors.primary, 
                    width: '100%',                    
                    marginHorizontal: 15,
                    marginBottom: 5,
                    alignSelf: 'center'
                }} />
                <Text style={{
                    color: 'red', 
                    fontSize: fontSizes.h6,
                    marginBottom: 15,
                    }}>{errorEmail}</Text>
            </View>
            <View style={{
                marginHorizontal: 15
            }}>
                <Text style={{
                    fontSize: fontSizes.h6,
                    color: colors.primary
                }}>Password:</Text>
                <TextInput
                    onChangeText={(text)=>{
                        setErrorPassword(isValidPassword(text) == true ? 
                                    '' : 'Password must be at least 3 characters')
                        setPassword(text)    
                    }}                    
                    style={{
                        color: 'black'
                    }}
                    secureTextEntry={true}
                    placeholder='Enter your password'
                    value={password}
                    placeholderTextColor={colors.placeholder}
                />
                <View style={{height: 1, 
                    backgroundColor: colors.primary, 
                    width: '100%',
                    marginBottom: 15,
                    marginHorizontal: 15,
                    alignSelf: 'center'
                }} />
                <Text style={{
                    color: 'red', 
                    fontSize: fontSizes.h6,
                    marginBottom: 15,                    
                    }}>{errorPassword}</Text>
            </View>
        </View>

        {keyboardIsShown == false ? <View style={{
            flex: 15
        }}>
            <TouchableOpacity
                disabled = {isValidationOK() == false}
                onPress={() => {
                    signInWithEmailAndPassword(auth, email, password)   
                    .then((userCredential) => {                        
                        const user = userCredential.user  
                                              
                        navigate('UITab')   
                    }).catch((error) => {
                        
                        alert(`Cannot signin, error: ${error.message}`)
                    })                    
                }}
                style={{
                    backgroundColor: isValidationOK() == true 
                                        ? colors.primary: colors.inactive,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50%',
                    alignSelf: 'center',
                    borderRadius: 18,
                    marginTop: 60
                }}>
                <Text style={{
                    padding: 8,
                    fontSize: fontSizes.h5,
                    color: 'white'
                }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigate('Register')
                }}
                style={{ padding: 5 }}>
                <Text style={{
                    padding: 8,
                    fontSize: fontSizes.h6,
                    color: colors.primary,
                    alignSelf: 'center',
                }}>New user? Register now</Text>
            </TouchableOpacity>
        </View> : <View style={{
            flex: 15
        }}></View>}
    </View>

        {keyboardIsShown == false ? <View style={{
            flex: 25,            
        }}>
            <View style={{
                height: 40,
                flexDirection: 'row',   
                alignItems: 'center',
                marginHorizontal: 20
            }}>
                <View style={{height: 1, backgroundColor: 'black', flex: 1}} />
                <Text style={{
                    padding: 8,
                    fontSize: fontSizes.h6,
                    color: 'black',
                    alignSelf: 'center',
                    marginHorizontal: 5,
                }}>Use other methods ?</Text>
                <View style={{height: 1, backgroundColor: 'black', flex: 1}} />
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <Icon name='facebook' size={35} color={colors.facebook} onPress= { () => alert('Developing Feature')} />
                <View style={{width: 15}}/>
                <Icon name='google' size={35} color={colors.google} onPress= { () => alert('Developing Feature')} />
            </View>

        </View> : <View style={{
            flex: 25,            
        }}></View>}
    </KeyboardAvoidingView>
}
export default Login