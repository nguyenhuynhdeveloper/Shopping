import React, {useState, useEffect} from 'react';
import {
    Text, 
    View,
    Image,
    TouchableOpacity,
    TextInput,    
    FlatList,
    ScrollView, 
    Switch,
    SafeAreaView,
} from 'react-native'
import {images, colors, icons, fontSizes} from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { UIHeader } from '../components';
import {auth} from '../firebase/firebase'
import {StackActions} from '@react-navigation/native'
function Settings(props) {
    const [isEnabledLockApp, setEnabledLockApp] = useState(true)
    const [isUseFingerprint, setUseFingerprint] = useState(false)
    const [isEnabledChangePassword, setEnabledChangePassword] = useState(true)

    //navigation
    const {navigation, route} = props
    //functions of navigate to/back
    const {navigate, goBack} = navigation 

    return <View style={{
        flex: 1,
        backgroundColor: 'white'
    }}>
        <UIHeader title={"Settings"}/>
        <ScrollView
        style={{backgroundColor : 'white'}}>
            <View style={{
                height: 40,
                backgroundColor: 'rgba(0,0,0,0.2)',    
                justifyContent: 'center',            
            }}>
                <Text style={{
                    color:'black',
                    fontSize: fontSizes.h6,
                    color: 'red', 
                    paddingStart: 10,
                }}>Common</Text>                
            </View>
            <TouchableOpacity style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}
            onPress= { () => alert('Developing Feature')} >
                <Icon
                    name='globe'
                    style={{ marginStart: 10 }}
                    size={20} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: fontSizes.h6,
                    color: 'black', 
                    paddingStart: 10,
                }}>Language</Text>                
                <View style={{flex: 1}} />
                <Text style={{
                    color:'black',
                    fontSize: fontSizes.h6,
                    color: 'black', 
                    paddingEnd: 10,
                    opacity: 0.5,
                }}>English</Text> 
                <Icon
                    name='chevron-right'
                    style={{ 
                        paddingEnd: 10,
                        opacity: 0.5,
                    }}
                    size={20} color={'black'}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}
            onPress= { () => alert('Developing Feature')}>
                <Icon
                    name='cloud'
                    style={{ marginStart: 10 }}
                    size={16} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: fontSizes.h6,
                    color: 'black', 
                    paddingStart: 10,
                }}>Environment</Text>                
                <View style={{flex: 1}} />
                <Text style={{
                    color:'black',
                    fontSize: fontSizes.h6,
                    color: 'black', 
                    paddingEnd: 10,
                    opacity: 0.5,
                }}>Production</Text> 
                <Icon
                    name='chevron-right'
                    style={{ 
                        paddingEnd: 10,
                        opacity: 0.5,
                    }}
                    size={20} color={'black'}
                />
            </TouchableOpacity>
            <View style={{
                height: 40,
                backgroundColor: 'rgba(0,0,0,0.2)',    
                justifyContent: 'center',            
            }}>
                <Text style={{
                    color:'black',
                    fontSize: fontSizes.h6,
                    color: 'red', 
                    paddingStart: 10,
                }}>Account</Text>                
            </View>
            <TouchableOpacity style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}
            onPress= { () => alert('Developing Feature')}>
                <Icon
                    name='phone'
                    style={{ marginStart: 10 }}
                    size={16} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: fontSizes.h6,
                    color: 'black', 
                    paddingStart: 10,
                }}>Phone number</Text>                
                <View style={{flex: 1}} />                
                <Icon
                    name='chevron-right'
                    style={{ 
                        paddingEnd: 10,
                        opacity: 0.5,
                    }}
                    size={20} color={'black'}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}
            onPress= { () => alert('Developing Feature')}>
                <Icon
                    name='envelope'
                    style={{ marginStart: 10 }}
                    size={16} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: fontSizes.h6,
                    color: 'black', 
                    paddingStart: 10,
                }}>Email</Text>                
                <View style={{flex: 1}} />                
                <Icon
                    name='chevron-right'
                    style={{ 
                        paddingEnd: 10,
                        opacity: 0.5,
                    }}
                    size={20} color={'black'}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{       // Đây là nút đăng xuất ra 
                flexDirection: 'row',
                paddingVertical: 10,                
                alignItems: 'center',
            }} onPress={()=>{
                auth.signOut()     // Đây là để đăng xuất ra khỏi tài khoản trên firebase
                navigation.dispatch(StackActions.popToTop())    // Ấn nút đăng xuất cái là chạy ra ngay stack màn hình đầu tiên -- cũng có thể làm cách khác là bắt .then của hàm signOut()  để đảm bao đăng xuất ra rồi mới thoát màn hình 
            }}>
                <Icon
                    name='sign-out-alt'
                    style={{ marginStart: 10 }}
                    size={16} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: fontSizes.h6,
                    color: 'black', 
                    paddingStart: 10,
                }}>Sign out</Text>                
                <View style={{flex: 1}} />                
                <Icon
                    name='chevron-right'
                    style={{ 
                        paddingEnd: 10,
                        opacity: 0.5,
                    }}
                    size={20} color={'black'}
                />
            </TouchableOpacity>
            <View style={{
                height: 40,
                backgroundColor: 'rgba(0,0,0,0.2)',    
                justifyContent: 'center',            
            }}>
                <Text style={{
                    color:'black',
                    fontSize: fontSizes.h6,
                    color: 'red', 
                    paddingStart: 10,
                }}>Security</Text>                
            </View>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}>
                <Icon
                    name='door-closed'
                    style={{ marginStart: 10 }}
                    size={16} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: fontSizes.h6,
                    color: 'black', 
                    paddingStart: 10,
                }}>Lock app in background</Text>                
                <View style={{flex: 1}} /> 
                <Switch
                    trackColor={{ false: colors.inactive, true:  colors.primary}}
                    thumbColor={isEnabledLockApp ? colors.primary : colors.inactive}
                    //ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>{
                        setEnabledLockApp(!isEnabledLockApp)
                    }}
                    value={isEnabledLockApp}
                    style={{marginEnd: 10}}
                />                               
            </View>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}>
                <Icon
                    name='fingerprint'
                    style={{ marginStart: 10 }}
                    size={16} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: fontSizes.h6,
                    color: 'black', 
                    paddingStart: 10,
                }}>Use fingerprint</Text>                
                <View style={{flex: 1}} /> 
                <Switch
                    trackColor={{ false: colors.inactive, true:  colors.primary}}
                    thumbColor={isUseFingerprint ? colors.primary : colors.inactive}
                    onValueChange={()=>{
                        setUseFingerprint(!isUseFingerprint)
                    }}
                    value={isUseFingerprint}
                    style={{marginEnd: 10}}
                />                               
            </View>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}>
                <Icon
                    name='lock'
                    style={{ marginStart: 10 }}
                    size={16} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: fontSizes.h6,
                    color: 'black', 
                    paddingStart: 10,
                }}>Change password</Text>                
                <View style={{flex: 1}} /> 
                <Switch
                    trackColor={{ false: colors.inactive, true:  colors.primary}}
                    thumbColor={isEnabledChangePassword ? colors.primary : colors.inactive}
                    onValueChange={()=>{
                        setEnabledChangePassword(!isEnabledChangePassword)                        
                    }}
                    value={isEnabledChangePassword}
                    style={{marginEnd: 10}}
                />                               
            </View>
            <View style={{
                height: 40,
                backgroundColor: 'rgba(0,0,0,0.2)',    
                justifyContent: 'center',            
            }}>
                <Text style={{
                    color:'black',
                    fontSize: fontSizes.h6,
                    color: 'red', 
                    paddingStart: 10,
                }}>Misc</Text>                
            </View>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}>
                <Icon
                    name='file-alt'
                    style={{ marginStart: 10 }}
                    size={20} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: fontSizes.h6,
                    color: 'black', 
                    paddingStart: 10,
                }}>Term of Service</Text>                
                <View style={{flex: 1}} />                
                <Icon
                    name='chevron-right'
                    style={{ 
                        paddingEnd: 10,
                        opacity: 0.5,
                    }}
                    size={20} color={'black'}
                />
            </View>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}>
                <Icon
                    name='passport'
                    style={{ marginStart: 10 }}
                    size={20} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: fontSizes.h6,
                    color: 'black', 
                    paddingStart: 10,
                }}>Open source licenses</Text>                
                <View style={{flex: 1}} />                
                <Icon
                    name='chevron-right'
                    style={{ 
                        paddingEnd: 10,
                        opacity: 0.5,
                    }}
                    size={20} color={'black'}
                />
            </View>
        </ScrollView>
    </View>
}
export default Settings