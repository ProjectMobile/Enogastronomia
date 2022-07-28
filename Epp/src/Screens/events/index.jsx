import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Linking, Dimensions } from 'react-native';
import { getEvents27, getEvents28, getEvents29, getEvents30 } from '../../data/events'
import { useTranslation } from 'react-i18next'
import { List } from 'react-native-paper';
import { ModalPopUp } from '../../Components/modal/index'
import { colors } from '../../Components/colors/index'
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const returnIcon = (event) => {
    if (String(event).includes('sympla')) {
        return (
            <Icon name='crown' size={16} style={styles.eventTypeIcon} />
        )
    } else if (String(event).includes('docs')) {
        return (
            <Icon name='ticket-confirmation' size={16} style={styles.eventTypeIcon} />
        )
    } else {
        return (
            <Icon name='ticket-outline' size={16} style={styles.eventTypeIcon} />

        )
    }
}

const buttonICON = (event) => {
    if (String(event).includes('sympla')) {
        return 'crown'
    } else {
        return 'ticket-confirmation'
    }
}


function EventsScreen({ navigation }) {

    const [subtitle, setSubtitle] = useState(true)

    const MyComponent = (props) => {
        const today = new Date();

        const [expanded, setExpanded] = useState(() => {
            if (today.getMonth() + 1 >= 7 && today.getDate() > 27) {
                return false
            } else { return true }
        });
        const [expanded2, setExpanded2] = useState(() => {
            if (today.getMonth() + 1 >= 7 && today.getDate() > 28) {
                return false
            } else { return true }
        });
        const [expanded3, setExpanded3] = useState(() => {
            if (today.getMonth() + 1 >= 7 && today.getDate() > 29) {
                return false
            } else { return true }
        });

        const [expanded4, setExpanded4] = useState(() => {
            const today = new Date();
            if (today.getMonth() + 1 >= 7 && today.getDate() > 30) {
                return false
            } else { return true }
        });

        function verifyDate(date) {
            const today = new Date();
            const eventDate = new Date(date);

            if (eventDate > today) {
                return true;
            }

        }

        const handlePress = () => setExpanded(!expanded);
        const handlePress2 = () => setExpanded2(!expanded2);
        const handlePress3 = () => setExpanded3(!expanded3);
        const handlePress4 = () => setExpanded4(!expanded4);
        return (
            <View style={{ marginTop: 20 }}>
                <List.Section title="" titleStyle={{ alignSelf: 'center' }}>


                    <List.Accordion
                        title={t("events27")}
                        left={props => <List.Icon {...props} icon="calendar" />}
                        expanded={expanded}

                        onPress={handlePress}>
                        {
                            props.eventos27.map((event, index) => {
                                return (< List.Item title={event.name} key={event.id}

                                    left={props => {
                                        return (
                                            <View style={{ flexDirection: 'row' }}>

                                                <Text style={{ alignSelf: 'center', color: verifyDate(event.date) ? 'black' : 'red' }}>
                                                    {formattedDate(event.date)}
                                                </Text>
                                                {
                                                    returnIcon(event.simplaURL)
                                                }

                                            </View>
                                        )
                                    }
                                    }
                                    onPress={() => {
                                        setVisible(!visible)
                                        setEventoModal(event)
                                    }} />)
                            })
                        }
                    </List.Accordion>

                    <List.Accordion
                        title={t("events28")}
                        left={props => <List.Icon {...props} icon="calendar" />}
                        expanded={expanded2}
                        onPress={handlePress2}>
                        {
                            props.eventos28.map((event, index) => {
                                return (< List.Item title={event.name} key={event.id}

                                    onPress={() => {
                                        setVisible(!visible)
                                        setEventoModal(event)
                                    }}

                                    left={props => {
                                        return (
                                            <View style={{ flexDirection: 'row' }}>

                                                <Text style={{ alignSelf: 'center', color: verifyDate(event.date) ? 'black' : 'red' }}>
                                                    {formattedDate(event.date)}
                                                </Text>
                                                {
                                                    returnIcon(event.simplaURL)
                                                }

                                            </View>
                                        )
                                    }
                                    }


                                />)
                            })
                        }
                    </List.Accordion>
                    <List.Accordion
                        title={t("events29")}
                        left={props => <List.Icon {...props} icon="calendar" />}
                        expanded={expanded3}
                        onPress={handlePress3}>
                        {
                            props.eventos29.map((event, index) => {
                                return (< List.Item title={event.name} key={event.id}
                                    left={props => {
                                        return (
                                            <View style={{ flexDirection: 'row' }}>

                                                <Text style={{ alignSelf: 'center', color: verifyDate(event.date) ? 'black' : 'red' }}>
                                                    {formattedDate(event.date)}
                                                </Text>
                                                {
                                                    returnIcon(event.simplaURL)
                                                }

                                            </View>
                                        )
                                    }
                                    }
                                    onPress={() => {
                                        setVisible(!visible)
                                        setEventoModal(event)
                                    }} />)
                            })
                        }
                    </List.Accordion>
                    <List.Accordion
                        title={t("events30")}
                        left={props => <List.Icon {...props} icon="calendar" />}
                        expanded={expanded4}
                        onPress={handlePress4}>
                        {
                            props.eventos30.map((event, index) => {
                                return (< List.Item title={event.name} key={event.id}
                                    left={props => {
                                        return (
                                            <View style={{ flexDirection: 'row' }}>

                                                <Text style={{ alignSelf: 'center', color: verifyDate(event.date) ? 'black' : 'red' }}>
                                                    {formattedDate(event.date)}
                                                </Text>
                                                {
                                                    returnIcon(event.simplaURL)
                                                }

                                            </View>
                                        )
                                    }
                                    }
                                    onPress={() => {
                                        setVisible(!visible)
                                        setEventoModal(event)
                                    }} />)
                            })
                        }
                    </List.Accordion>
                </List.Section >
            </View>
        );
    };


    const { t, i18n } = useTranslation()
    const [eventos27, setEventos27] = useState([])
    const [eventos28, setEventos28] = useState([])
    const [eventos29, setEventos29] = useState([])
    const [eventos30, setEventos30] = useState([])

    const [visible, setVisible] = useState(false)
    const [eventoModal, setEventoModal] = useState({})

    useEffect(() => {
        async function fetchData() {

            const eventosdia27 = await getEvents27();
            const eventosdia28 = await getEvents28();
            const eventosdia29 = await getEvents29();
            const eventosdia30 = await getEvents30();
            const daysList = [JSON.parse(eventosdia27), JSON.parse(eventosdia28), JSON.parse(eventosdia29), JSON.parse(eventosdia30)]
            const lang = i18n.language;
            daysList.forEach((element) => {
                var eventLanguage = []
                element.forEach((event) => {
                    if (event.language === lang) {
                        eventLanguage.push(event)
                    }
                })
                const date = new Date(eventLanguage[0].date)

                if (date.getDate() === 27) {
                    setEventos27(eventLanguage.sort((a, b) => (a.date > b.date) ? 1 : -1))
                }
                else if (date.getDate() === 28) {
                    setEventos28(eventLanguage.sort((a, b) => (a.date > b.date) ? 1 : -1))
                }
                else if (date.getDate() === 29) {
                    setEventos29(eventLanguage.sort((a, b) => (a.date > b.date) ? 1 : -1))
                } else if (date.getDate() === 30) {
                    setEventos30(eventLanguage.sort((a, b) => (a.date > b.date) ? 1 : -1))
                }
            })
        }
        fetchData()
    }, []);

    function formattedDate(event) {
        const data = new Date(event)
        // return String(data.getUTCDate()).padStart(2, '0') + '/' + String(data.getUTCMonth()).padStart(2,'0') + '/' + data.getUTCFullYear() 
        return String(data.getUTCHours()).padStart(2, '0') + ':' + String(data.getUTCMinutes()).padStart(2, '0')
    }

    function verifyButtonCondition(evento) {
        if (String(evento).includes('sympla')) {
            return t("buyTickets")
        } else {
            return t("subscribeEvent")
        }
    }

    return (
        <ScrollView >

            <ModalPopUp visible={visible}>
                <View>
                    <View style={{ bottom: 5, flexDirection: 'row-reverse' }}>
                        <Icon name='close' size={32} color='black' onPress={() => { setVisible(!visible) }} style={{}} />
                    </View>
                    <Button icon="google-maps" mode="contained" color={'white'} style={{ width: Dimensions.get('screen').width * 0.65, alignSelf: 'center', borderColor: 'red', borderWidth: 2, borderRadius: 20 }} onPress={() => {
                        setVisible(!visible)
                        navigation.navigate('Inicio', { screen: 'Home', params: eventoModal })
                    }} > {t("seeOnMap")}</Button>
                    {eventoModal.simplaURL && (<Button icon={buttonICON(eventoModal.simplaURL)} mode="contained" color={'white'} style={{ width: Dimensions.get('screen').width * 0.65, marginTop: 10, alignSelf: 'center', borderColor: 'darkgreen', borderWidth: 2, borderRadius: 20 }} onPress={() => {

                        setVisible(!visible)
                        Linking.openURL(eventoModal.simplaURL)
                    }} > {
                            verifyButtonCondition(eventoModal.simplaURL)
                        } </Button>)}





                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', flexShrink: 1, fontSize: 20, color: `${colors.red}`, marginTop: 15, fontWeight: 'bold' }}>
                            {eventoModal.name}
                        </Text>
                        <ScrollView style={{ marginTop: 10, height: Dimensions.get('window').height * 0.7 }}>
                            <Text style={{ flexShrink: 1, fontSize: 16, textAlign: 'justify' }}>
                                {eventoModal.description}
                            </Text>
                        </ScrollView>
                        <Text style={{ flexShrink: 1, fontSize: 16 }}>
                            {eventoModal.url}
                        </Text>
                    </View>
                    {/* <View style={{ left: 0, right: 0, bottom: -50, position: 'relative', alignItems: 'center' }}>
                        <Button icon="google-maps" mode="contained" color={colors.black} style={{ width: '60%' }} onPress={() => {
                            navigation.navigate('Inicio', { screen: 'Home', params: eventoModal })
                        }} > {t("seeOnMap")}</Button>
                        {eventoModal.simplaURL && (<Button icon="google-maps" mode="contained" color={colors.black} style={{ width: '100%', marginTop: '' }} onPress={() => {
                            Linking.openURL(eventoModal.simplaURL)
                        }} > {t("buyTickets")} </Button>)}
                    </View> */}

                </View>
            </ModalPopUp >

            <MyComponent
                eventos27={eventos27}
                eventos28={eventos28}
                eventos29={eventos29}
                eventos30={eventos30}
            ></MyComponent>

            <View>

                <View style={{ flexDirection: 'row' }}>
                    <Icon name='crown' size={16} style={styles.eventTypeIcon} />
                    <Text>{t("subPaid")}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Icon name='ticket-confirmation-outline' size={16} style={styles.eventTypeIcon} />
                    <Text>{t("subSubscription")}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Icon name='ticket-outline' size={16} style={styles.eventTypeIcon} />
                    <Text>{t("subFree")}</Text>
                </View>



            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        height: '100%'
    }, listImcs: {
        marginTop: 20,
    },
    resultImcItem: {
        fontSize: 28,
        color: "red",
        height: 50,
        width: "100%",
        paddingRight: 20
    },
    textResultItemList: {
        color: "red",
        fontSize: 16,
    },
    viewFromFlat: {
        flexDirection: 'row',
        borderWidth: 1,
        alignSelf: 'center',
        minWidth: '100%',
        margin: 1,
        marginBottom: 10,
        borderRadius: 4,
        borderTopWidth: 0,
        borderRightWidth: 0,
        padding: 10

    },
    eventTypeIcon: {
        marginLeft: 10,
        alignSelf: 'center'
    },
    subtitleStyle: {
        flexDirection: 'row', marginLeft: 10
    }
});
export { EventsScreen }