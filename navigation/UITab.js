import * as React from 'react'
import {
    Settings, Product,
    FoodList, Profile,
    Chat, Cart
} from '../screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {fontSizes, colors} from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import 'react-native-gesture-handler'
import { View } from 'react-native'
const Tab = createBottomTabNavigator()

const screenOptions = ({route})=> ({
    headerShown: false,
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: colors.inactive,    
    tabBarActiveBackgroundColor: colors.primary,
    tabBarInactiveBackgroundColor: colors.primary,
    tabBarBackground: () => (
        <View style={{backgroundColor: colors.primary, flex: 1}}></View>
      ),
    tabBarIcon: ({focused, color, size}) => {
        return <Icon 
            style={{
                paddingTop: 5
            }}
            name= {route.name == "Product" ? "bars":
                (route.name == "Cart" ? "opencart" : (
                    route.name == "Settings" ? "cogs" : 
                    (route.name == "Profile" ? "user" : 
                    (route.name == "Chat" ? "comments" : ""))
                ))}
            size={23} 
            color={focused ? 'white' : colors.inactive} 
        />
    },    
})
function UITab(props) {
    return <Tab.Navigator screenOptions={screenOptions}>        
        <Tab.Screen 
            name={"Product"} 
            component={Product}
            options={{
                tabBarLabel: 'Products',
                tabBarLabelStyle: {
                    fontSize: fontSizes.h6
                }
            }}
        />
    
        <Tab.Screen 
            name={"Cart"} 
            component={Cart}
            options={{
                tabBarLabel: 'Cart',
                tabBarLabelStyle: {
                    fontSize: fontSizes.h6
                }
            }}
        />
              <Tab.Screen 
            name={"Chat"} 
            component={Chat}
            options={{
                tabBarLabel: 'Chat',
                tabBarLabelStyle: {
                    fontSize: fontSizes.h6
                }
            }}
        />
        <Tab.Screen 
            name={"Settings"} 
            component={Settings}
            options={{
                tabBarLabel: 'Settings',
                tabBarLabelStyle: {
                    fontSize: fontSizes.h6
                }
            }}
        />
      
        <Tab.Screen 
            name={"Profile"} 
            component={Profile}
            options={{
                tabBarLabel: 'Profile',
                tabBarLabelStyle: {
                    fontSize: fontSizes.h6
                }
            }}
        />
    </Tab.Navigator>
}
export default UITab
