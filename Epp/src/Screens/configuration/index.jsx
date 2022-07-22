import { Dimensions,  StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { changeIsLoaded } from '../../data/events';
function ConfigScreen({ navigation }) {


    const [portugueseCheck, setPortugueseCheck] = useState(false)
    const [spanishCheck, setSpanishCheck] = useState(false);
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (i18n.language === 'pt') {
            setPortugueseCheck(true)
        } else { setSpanishCheck(true) }
    })


    return (
        <View style={styles.container}>
            <Text style={{ height: '80%', position: 'absolute' }}>{t("settings")}</Text>

            <View style={styles.viewHorizontal}>
            <TouchableOpacity
                    onPress={() => {
                        if (portugueseCheck) {

                        } else {
                            setPortugueseCheck(!portugueseCheck);
                            setSpanishCheck(!spanishCheck);
                            i18n.changeLanguage('pt')
                            changeIsLoaded()
                        }


                    }}
                >
                    <Image
                        source={require('../../../assets/br.png')}
                        style={{
                            width: 60,
                            height: 40,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.viewHorizontal}>
            <TouchableOpacity
                    onPress={() => {
                        if (spanishCheck) { } else {
                            setSpanishCheck(!spanishCheck);
                            setPortugueseCheck(!portugueseCheck);
                            i18n.changeLanguage('es')
                            changeIsLoaded()
                        }

                    }}
                >
                    <Image
                        source={require('../../../assets/ur.png')}
                        style={{
                            width: 60,
                            height: 40,
                        }}
                    />
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, viewHorizontal: {
        height: Dimensions.get('screen').height * 0.1,
        width: Dimensions.get('screen').width * 0.2,
        flexDirection: 'row'
    }
});
export { ConfigScreen }