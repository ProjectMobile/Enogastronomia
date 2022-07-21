import { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from "expo-location";
import { mapStyle } from '../colors/'



function Maps(props) {
  const [initialPlace, setInitialPlace] = useState({
    latitude: -30.8962053,
    longitude: -55.5352968,
  })
  useEffect(() => {

    if (props.latiD != undefined) {
      setInitialPlace({
        latitude: props.latiD.lat,
        longitude: props.latiD.long,
      })
    }

    //pede a localização do usuário.
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

    })();
  }, []);



  return (
    <View style={styles.container}>
      <MapView

        showsUserLocation={true}
        loadingEnabled={true}
        provider={PROVIDER_GOOGLE}
        maxZoomLevel={20}
        minZoomLevel={15}
        userInterfaceStyle={"dark"}
        
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: initialPlace.latitude,
          longitude: initialPlace.longitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        }}
        style={[styles.maps]}
      >

        {!props.latiD && (<Marker
          coordinate={{
            latitude: -30.8962238,
            longitude: -55.5352991
          }}

          pinColor={'red'}
          title={'Festival Binacional de Gastronomia'}
          description={'A maioria dos eventos ocorrerão aqui!'}
        >


        </Marker>)}



        {props.latiD && (
          <Marker

            coordinate={{
              latitude: props.latiD.lat,
              longitude: props.latiD.long
            }}
            pinColor={'red'}
            title={`${props.latiD.name}`}
            description={`${props.latiD.description}`}

          >
            {/* <Image
            source={require('../../../assets/ur.png')}
            style={{ width: 500, height: 500,alignContent:'center' }}>

          </Image> */}
          </Marker>)}


      </MapView>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  }, maps: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    top: 15
  }
});

export { Maps }