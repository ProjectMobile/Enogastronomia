import { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View, Image, Button, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { getCircuito, getHotels, getPraca } from '../partners/data'
import { List } from 'react-native-paper'
import { ModalPopUp } from '../../Components/modal';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { colors } from '../../Components/colors';
import { mapStyle } from '../../Components/colors/'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next'

import { Ionicons } from '@expo/vector-icons';

function PartnerScreen({ navigation }) {
    const { t, i18n } = useTranslation()
    const [hotelPartners, setHotelPartners] = useState([])
    const [circuitoRestaurants, setCircuitoRestaurants] = useState([])
    const [pracaRestaurants, setPracaRestaurants] = useState([])
    const [expanded, setExpanded] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const [expanded3, setExpanded3] = useState(false);
    const [partner, setPartner] = useState({})
    const [modal, setModal] = useState(false)
    const [initialRegion, setInitialRegion] = useState({
        latitude: -30.8955704,
        longitude: -55.5370476,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
    })
    const handlePress = () => setExpanded(!expanded);
    const handlePress2 = () => setExpanded2(!expanded2);
    const handlePress3 = () => setExpanded3(!expanded3);

    useEffect(() => {
        setHotelPartners(getHotels())
        setCircuitoRestaurants(getCircuito())
        setPracaRestaurants(getPraca())

        console.log(circuitoRestaurants.slice(Math.ceil(circuitoRestaurants.length / 2), circuitoRestaurants.length))

    }, [])




    function verifyPhone(phone) {
        var phones = phone.split('/')
        var functions = []
        if (phones.length > 1) {
            phones.map((phoneNumber, index) => {
                functions.push(
                    <View style={{ flexDirection: 'row' }} key={index}>
                        <Ionicons name="call-outline"
                            size={20}
                            style={{ marginRight: 10 }}
                        />
                        <Text
                            style={{ color: colors.blue }}
                            onPress={() => {
                                Linking.openURL(`tel:${phoneNumber.replace('(whatsapp)', '')}`)
                            }}>{phoneNumber}</Text>
                    </View>
                )
            })
        } else {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons name="call-outline"
                        size={20}
                        style={{ marginRight: 10 }}
                    />
                    <Text
                        style={{ color: colors.blue }}
                        onPress={() => {
                            Linking.openURL(`tel:${phone}`)
                        }}>{phone}</Text>
                </View>
            )
        }
        return functions
    }

    function ModalMap() {
        return (
            <ModalPopUp visible={modal}>
                <View style={{ flexDirection: 'row-reverse' }}>
                    <Icon name='close' size={32} color='black' onPress={() => { setModal(!modal) }} />
                </View>

                <View style={{}}>
                    <Text style={{ alignSelf: 'center', fontSize: 24, marginBottom: 10 }}>{partner.name}</Text>
                    <Text>{partner.address}</Text>

                    {
                        partner.email && (
                            <View style={{ flexDirection: 'row' }}>


                                <Ionicons name="mail-unread-outline"
                                    size={20}
                                    style={{ marginRight: 10 }}
                                />

                                <Text
                                    style={{ color: colors.blue }}
                                    onPress={() => {
                                        Linking.openURL(`mailto:${partner.email}`)
                                    }}>{partner.email}</Text>
                            </View>
                        )
                    }
                    {
                        partner.phoneNumber && (
                            verifyPhone(partner.phoneNumber)
                        )
                    }
                </View>

                <View style={{ widht: Dimensions.get('screen').width * 1, height: Dimensions.get('screen').height * 0.86 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', right: 0, left: 0, bottom: 0 }}>
                        <MapView
                            initialRegion={initialRegion}
                            maxZoomLevel={20}
                            provider={PROVIDER_GOOGLE}
                            minZoomLevel={15}
                            customMapStyle={mapStyle}
                            userInterfaceStyle={"dark"}
                            style={{ width: '90%', height: '90%' }}
                        >
                            {
                                partner.lat !== null && partner.lat !== undefined && (<Marker coordinate={{ latitude: partner.lat, longitude: partner.long }} pinColor={colors.blue} title={partner.name}>

                                </Marker>)
                            }

                        </MapView>
                    </View>
                </View>
            </ModalPopUp>
        )
    }


    return (
        <ScrollView >

            <ModalMap />


            <List.Section title="Parceiros" titleStyle={{ alignSelf: 'center' }}>
                <List.Accordion
                    title={t("officialHotels")}
                    expanded={expanded}
                    onPress={handlePress}
                    left={props => <List.Icon {...props} icon="bed" />}

                >



                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'column', right: Dimensions.get('screen').width * 0.1 }}>
                            {
                                hotelPartners.slice(0, Math.ceil(hotelPartners.length / 2)).map(hotel => {
                                    return (
                                        <TouchableOpacity 
                                        key={hotel.id}
                                        onPress={() => {
                                            setPartner(hotel)
                                            if (hotel.lat !== null && hotel.long !== null) {
                                                setInitialRegion(
                                                    {
                                                        latitude: hotel.lat,
                                                        longitude: hotel.long,
                                                        latitudeDelta: 0.00922,
                                                        longitudeDelta: 0.00421,
                                                    }
                                                )
                                            }
                                            setModal(!modal)
                                        }}>
                                            <Image
                                                source={{ uri: hotel.img }}
                                                style={{
                                                    borderRadius: 26,
                                                    width: 160,
                                                    height: 160,
                                                    marginBottom: 5,
                                                    marginTop: 5
                                                }}

                                            /></TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <View style={{ flexDirection: 'column', right: Dimensions.get('screen').width * 0.05 }}>
                            {
                                hotelPartners.slice(Math.ceil(hotelPartners.length / 2), hotelPartners.length).map(hotel => {
                                    return (
                                        <TouchableOpacity 
                                        
                                        key={hotel.id}
                                        onPress={() => {
                                            setPartner(hotel)
                                            if (hotel.lat !== null && hotel.long !== null) {
                                                setInitialRegion(
                                                    {
                                                        latitude: hotel.lat,
                                                        longitude: hotel.long,
                                                        latitudeDelta: 0.00922,
                                                        longitudeDelta: 0.00421,
                                                    }
                                                )
                                            }
                                            setModal(!modal)
                                        }}>
                                            <Image
                                                source={{ uri: hotel.img }}
                                                style={{
                                                    borderRadius: 26,
                                                    width: 160,
                                                    height: 160,
                                                    marginBottom: 5,
                                                    marginTop: 5
                                                }}

                                            /></TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>





                </List.Accordion>

                <List.Accordion title='Circuito'
                    expanded={expanded2}
                    onPress={handlePress2}
                    left={props => <List.Icon {...props} icon="silverware" />}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'column', right: Dimensions.get('screen').width * 0.1 }}>
                            {
                                circuitoRestaurants.slice(0, Math.ceil(circuitoRestaurants.length / 2)).map(hotel => {
                                    return (
                                        <TouchableOpacity 
                                        
                                        key={hotel.id}
                                        onPress={() => {
                                            setPartner(hotel)
                                            if (hotel.lat !== null && hotel.long !== null) {
                                                setInitialRegion(
                                                    {
                                                        latitude: hotel.lat,
                                                        longitude: hotel.long,
                                                        latitudeDelta: 0.00922,
                                                        longitudeDelta: 0.00421,
                                                    }
                                                )
                                            }
                                            setModal(!modal)
                                        }}>
                                            <Image
                                                source={{ uri: hotel.img }}
                                                style={{
                                                    borderRadius: 26,
                                                    width: 160,
                                                    height: 160,
                                                    marginBottom: 5,
                                                    marginTop: 5
                                                }}

                                            /></TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <View style={{ flexDirection: 'column', right: Dimensions.get('screen').width * 0.05 }}>
                            {
                                circuitoRestaurants.slice(Math.ceil(circuitoRestaurants.length / 2), circuitoRestaurants.length).map(hotel => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            setPartner(hotel)
                                            if (hotel.lat !== null && hotel.long !== null) {
                                                setInitialRegion(
                                                    {
                                                        latitude: hotel.lat,
                                                        longitude: hotel.long,
                                                        latitudeDelta: 0.00922,
                                                        longitudeDelta: 0.00421,
                                                    }
                                                )
                                            }
                                            setModal(!modal)
                                        }}
                                        
                                        
                                        key={hotel.id}
                                        >
                                            <Image
                                                source={{ uri: hotel.img }}
                                                style={{
                                                    borderRadius: 26,
                                                    width: 160,
                                                    height: 160,
                                                    marginBottom: 5,
                                                    marginTop: 5
                                                }}

                                            /></TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>

                </List.Accordion>

                <List.Accordion title='Praça de alimentação'
                    expanded={expanded3}
                    onPress={handlePress3}
                    left={props => <List.Icon {...props} icon="clock" />}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'column', right: Dimensions.get('screen').width * 0.1 }}>
                            {
                                pracaRestaurants.slice(0, Math.ceil(pracaRestaurants.length / 2)).map(hotel => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            setPartner(hotel)
                                            if (hotel.lat !== null && hotel.long !== null) {
                                                setInitialRegion(
                                                    {
                                                        latitude: hotel.lat,
                                                        longitude: hotel.long,
                                                        latitudeDelta: 0.00922,
                                                        longitudeDelta: 0.00421,
                                                    }
                                                )
                                            }
                                            setModal(!modal)
                                        }}
                                        
                                        key={hotel.id}
                                        >
                                            <Image
                                                source={{ uri: hotel.img }}
                                                style={{
                                                    borderRadius: 26,
                                                    width: 160,
                                                    height: 160,
                                                    marginBottom: 5,
                                                    marginTop: 5
                                                }}

                                            /></TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <View style={{ flexDirection: 'column', right: Dimensions.get('screen').width * 0.05 }}>
                            {
                                pracaRestaurants.slice(Math.ceil(pracaRestaurants.length / 2), pracaRestaurants.length).map(hotel => {
                                    return (
                                        <TouchableOpacity 
                                        
                                        key={hotel.id}
                                        onPress={() => {
                                            setPartner(hotel)
                                            if (hotel.lat !== null && hotel.long !== null) {
                                                setInitialRegion(
                                                    {
                                                        latitude: hotel.lat,
                                                        longitude: hotel.long,
                                                        latitudeDelta: 0.00922,
                                                        longitudeDelta: 0.00421,
                                                    }
                                                )
                                            }
                                            setModal(!modal)
                                        }}>
                                            <Image
                                                source={{ uri: hotel.img }}
                                                style={{
                                                    borderRadius: 26,
                                                    width: 160,
                                                    height: 160,
                                                    marginBottom: 5,
                                                    marginTop: 5
                                                }}

                                            /></TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>

                </List.Accordion>

            </List.Section>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export { PartnerScreen }