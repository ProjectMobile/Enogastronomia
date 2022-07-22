import { View, Text, Dimensions, Linking, Image, Touchable, TouchableOpacity } from "react-native";
import { Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next'



function Evaluate() {
    const { t, i18n } = useTranslation();

    return (
        <View style={{
            width: Dimensions.get('screen').width * 1,
            height: Dimensions.get('screen').height * 1,
        }}>

            <View style={{
                justifyContent: 'center',
                top: Dimensions.get('screen').height * 0.1,
                width: Dimensions.get('screen').width * 0.8,
                alignSelf: 'center'
            }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
                    {
                        t('evaluateEvent')
                    }
                </Text>

                <Button icon="star" mode="contained" color={'white'} style={{ width: Dimensions.get('screen').width * 0.55, alignSelf: 'center', borderColor: 'green', borderWidth: 2, borderRadius: 20, marginTop: 30 }} onPress={() => {
                    Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLScekbGl74FNsiUWcwcVGYesgTSwZ-5iJrqR3LKRAhlENDKohg/viewform')
                }} > Avaliar</Button>

                <View style={{
                    top: Dimensions.get('screen').height * 0.07,
                    right: Dimensions.get('screen').width * 0.08,

                }}>
                    <TouchableOpacity
                    onPress={()=>{
                        Linking.openURL('tel:+59898571368')
                    }}
                    >
                        <Image
                            source={require('../../../assets/passeios.jpeg')}
                            style={{
                                alignContent: 'center',
                                borderRadius: 26,
                                width: 350,
                                height: 350,
                                resizeMode: 'contain'
                            }}
                        />
                    </TouchableOpacity>

                </View>


            </View>



        </View>
    )
}

export { Evaluate }