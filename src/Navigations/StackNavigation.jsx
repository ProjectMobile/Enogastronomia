import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, HomeScreen, PartnerScreen } from '../Screens/'

import { ShowBottomTabs } from "./BottomTabsNavigation";

const Stack = createStackNavigator()

export default props => {

    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name ="Home" component={ShowBottomTabs} />

        </Stack.Navigator>
    )
}

export function HomeNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}

export function PartnersNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Partners" component={PartnerScreen} />
        </Stack.Navigator>
    )
}


