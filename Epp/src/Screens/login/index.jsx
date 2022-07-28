import { Dimensions, StyleSheet, View, Image, Button, Alert, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { setEvents27, setEvents28, setEvents29, asyncClear, setEvents30 } from '../../data/events'
// import { setPartners } from '../../data/partners'
import { setPartners } from '../partners/data/'
import { api, eventsRoute, partnersRoute } from '../../api';
import { colors } from '../../Components/colors';
import { useTranslation } from 'react-i18next';
function LoginScreen({ navigation }) {
    const [portugueseCheck, setPortugueseCheck] = useState(false)
    const [spanishCheck, setSpanishCheck] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (i18n.language === 'pt') {
            setPortugueseCheck(true)
        } else { setSpanishCheck(true) }
    })

    useEffect(() => {

        //ip casa 192.168.3.182
        //ip uni 10.2.170.39
        api.get(eventsRoute).then(function (response) {
            asyncClear();
            const events = response.data;
            var events27 = []
            var events28 = []
            var events29 = []
            var events30 = []
            events.forEach(element => {
                const data = new Date(element.date)
                if (data.getDate() === 27) {
                    events27.push(element)
                }
                else if (data.getDate() === 28) {
                    events28.push(element)
                }

                else if (data.getDate() === 29) {
                    events29.push(element)
                }
                else if (data.getDate() === 30) {
                    events30.push(element)
                }
            }
            );

            setEvents27(events27)
            setEvents28(events28)
            setEvents29(events29)
            setEvents30(events30)


        }).catch(function (error) {
            console.log(error.message)
        })

        api.get(partnersRoute).then(function (res) {
            const parceiros = res.data;
            setPartners(parceiros)
        }).catch(function (error) {
            console.log(error.message)
        })
    }, [])

    return (
        <View style={styles.container}>

            <View style={{alignSelf:'center'}}>
                <TouchableOpacity
                    onPress={() => {
                        if (portugueseCheck) {

                        } else {
                            setPortugueseCheck(!portugueseCheck);
                            setSpanishCheck(!spanishCheck);
                            i18n.changeLanguage('pt')
                        }


                    }}
                >
                    <Image
                        source={require('../../../assets/br.png')}
                        style={{
                            width: 60,
                            height: 40,
                            marginBottom:20
                        }}
                    />
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => {
                        if (spanishCheck) { } else {
                            setSpanishCheck(!spanishCheck);
                            setPortugueseCheck(!portugueseCheck);
                            i18n.changeLanguage('es')
                        }

                    }}
                >
                    <Image
                        source={require('../../../assets/ur.png')}
                        style={{
                            width: 60,
                            height: 40,
                            marginBottom:15
                        }}
                    />
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 25 }}>
                <Button title={`${t('button')}`}

                    color={colors.red}
                    onPress={() => {
                        if (!portugueseCheck && !spanishCheck) {
                            Alert.alert('None selected')
                        }
                        else {
                            navigation.replace('Home')
                        }
                    }



                    } />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewHorizontal: {
        height: Dimensions.get('screen').height * 0.1,
        width: Dimensions.get('screen').width * 0.2,
        flexDirection: 'row'
    },
    text: { color: `${colors.green}`, fontSize: 25 }
});
export { LoginScreen }