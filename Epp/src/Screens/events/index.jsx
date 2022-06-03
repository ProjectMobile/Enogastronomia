import { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View, Image, Button, Alert, TouchableOpacity } from 'react-native';
import { getEvents, setEvents } from '../../data/events'
import { useTranslation } from 'react-i18next'
import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';

// function ModalS(props, navigation) {
//     return (
//         <View style={{ width: '50%', height: '50%' }}>
//             <Modal
//                 transparent visible={props.visible}
//             >
//                 <Text>{props.name}</Text>
//                 <Button
//                     onPress={() => { navigation.navigate('Inicio', { screen: 'Home', params: props.item }) }}
//                 />
//             </Modal>
//         </View>
//     )
// }



function EventsScreen({ navigation }) {
    const { t, i18n } = useTranslation()
    const [eventos, setEventos] = useState([])

    useEffect(() => {

        // axios.get('http://192.168.3.182:3030/api/event').then(function (response) {
        //     setEvents(response.data)
        // }).catch(function (error) {
        //     console.log(error.message)
        // })

        async function fetchData() {

            const events = await getEvents();
            const lang = i18n.language;
            var eventLanguage = []
            const eventsLLL = JSON.parse(events)
            eventsLLL.forEach(evento => {
                if (evento.language === lang) {
                    eventLanguage.push(evento)
                }
            })


            setEventos(eventLanguage.sort((a, b) => (a.date > b.date) ? 1 : -1))


        }
        fetchData()
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    data={eventos}
                    contentContainerStyle={{ paddingBottom: 20, paddingTop: 20 }}
                    renderItem={({ item }) => {
                        const newDate = new Date(item.date)
                        const formattedDate = `${newDate.getDate()}/0${newDate.getMonth() + 1}/${newDate.getFullYear()}`
                        const formattedHour = `${newDate.getHours()}:${newDate.getMinutes()}`
                        return (<View style={styles.viewFromFlat}>
                            {/* onPress={() => { console.log(formattedDate, ' ', newDate.toUTCString()), navigation.navigate('Inicio', { screen: 'Home', params: item }) }} */}
                            <TouchableOpacity onPress={() => { console.log(formattedDate, ' ', newDate.toUTCString()), navigation.navigate('Inicio', { screen: 'Home', params: item }) }}>
                                <Text style={{ fontSize: 18, flexShrink: 1 }} > {item.name}</Text>
                            </TouchableOpacity>
                        </View>
                        )


                    }}
                    keyExtractor={eventos => eventos.id}
                    scrollEnabled={true}
                />

            </View>

        </View >
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
        maxWidth: '100%',
        alignSelf: 'center',
        minWidth: '100%', margin: 1,
        marginBottom: 10,
        borderRadius: 4,
        borderTopWidth: 0,
        borderRightWidth: 0,
        padding: 10

    }
});
export { EventsScreen }