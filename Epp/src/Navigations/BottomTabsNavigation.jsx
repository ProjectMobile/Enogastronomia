import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeNavigation, PartnersNavigation, EventsNavigation, ConfigurationNavigation } from "./StackNavigation";
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Octicons';
import { Text } from 'react-native'
import { colors } from '../Components/colors/'
import { useTranslation } from 'react-i18next'
import { loader } from "../data/events";
import { Evaluate } from "../Screens/evaluate";
const Tab = createBottomTabNavigator()
export function ShowBottomTabs() {
    const { t, i18n } = useTranslation();

    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>

            <Tab.Screen name="Eventos" component={EventsNavigation}
                options={{
                    unmountOnBlur: loader(),
                    tabBarIcon: ({ focused }) => (
                        <>
                            <Ionicons
                                name="wine-outline"
                                size={24}
                                color={focused ? `${colors.red}` : `${colors.black}`}
                            />
                            <Text
                                style={{
                                    color: focused ? `${colors.red}` : `${colors.black}`, fontSize: 9
                                }}
                            >
                                {t("event")}
                            </Text>
                        </>
                    )
                }} />




            <Tab.Screen name="Inicio" component={HomeNavigation} options={{
                unmountOnBlur: true,

                tabBarIcon: ({ focused }) => (
                    <>
                        <>
                            <Ionicons
                                name="earth"
                                size={24}
                                color={focused ? `${colors.red}` : `${colors.black}`}
                            />
                            <Text
                                style={{
                                    color: focused ? `${colors.red}` : `${colors.black}`, fontSize: 9
                                }}
                            >
                                {t("map")}
                            </Text>
                        </>
                    </>
                )
            }} />

<Tab.Screen name="Avaliar" component={Evaluate} options={{
                unmountOnBlur: true,

                tabBarIcon: ({ focused }) => (
                    <>
                        <>
                            <Icon
                                name="checklist"
                                size={24}
                                color={focused ? `${colors.red}` : `${colors.black}`}
                            />
                            <Text
                                style={{
                                    color: focused ? `${colors.red}` : `${colors.black}`, fontSize: 9
                                }}
                            >   
                                {t("evaluate")}
                            </Text>
                        </>
                    </>
                )
            }} />


            <Tab.Screen name="Parceiros" component={PartnersNavigation}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <Ionicons
                                name="ribbon-outline"
                                size={24}
                                color={focused ? `${colors.red}` : `${colors.black}`}
                            />
                            <Text
                                style={{
                                    color: focused ? `${colors.red}` : `${colors.black}`, fontSize: 9
                                }}
                            >
                                {t("partners")}
                            </Text>
                        </>
                    )
                }} />

            <Tab.Screen name="Configuracao" component={ConfigurationNavigation}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <Ionicons
                                name="settings-outline"
                                size={24}
                                color={focused ? `${colors.red}` : `${colors.black}`}
                            />
                            <Text
                                style={{
                                    color: focused ? `${colors.red}` : `${colors.black}`, fontSize: 9
                                }}
                            >
                                {t("settings")}
                            </Text>
                        </>
                    )
                }} />



        </Tab.Navigator>
    )
}