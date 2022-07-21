import { View, Text, Dimensions, Linking } from "react-native";
import { Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next'



function Evaluate() {
    const { t, i18n } = useTranslation();

    return (
        <View style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
        }}>

        <View style={{
            justifyContent:'center',
                top:Dimensions.get('screen').height *0.43
            }}>
                <Text style={{textAlign:'center', fontWeight:'bold', fontSize:16}}>
                    {
                        t('evaluateEvent')
                    }
                </Text>
        </View>


            <View style={{
                top:Dimensions.get('screen').height *0.7
            }}>
                <Button icon="star" mode="contained" color={'white'} style={{ width: Dimensions.get('screen').width * 0.55, alignSelf: 'center', borderColor: 'green', borderWidth: 2, borderRadius: 20 }} onPress={() => {
                    Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLScekbGl74FNsiUWcwcVGYesgTSwZ-5iJrqR3LKRAhlENDKohg/viewform')
                }} > Avaliar</Button>
            </View>

        </View>
    )
}

export { Evaluate }