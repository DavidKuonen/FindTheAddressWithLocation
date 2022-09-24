import {StatusBar} from 'expo-status-bar';
import {Alert, Button, StyleSheet, TextInput, View} from 'react-native';
import {useState, useEffect} from "react";
import MapView, {Marker} from "react-native-maps";
import * as Location from 'expo-location';

export default function App() {

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 60.200692,
    longitude: 24.934302
}); // State where location is saved, some start variables
  

  const [input, setInput] = useState('Home');

    useEffect(() => {
      (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
      Alert.alert('No permission to get location')
      return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location)

      })();
      }, []);

      const [region, setRegion] = useState({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221,
  });
    const [marker, setMarker] = useState({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude
  });
      
    const key = "C0r8kKdwsm6ea23nPoIQ4FIeVqvWSlZX";

    const fetchLocation = () => {
        fetch('https://www.mapquestapi.com/geocoding/v1/address?key='+key+'&location='+input)
            .then(response => response.json())
            .then(data => {
                location = data.results[0].locations[0]

                setRegion({
                    latitude: location.latLng.lat,
                    longitude: location.latLng.lng,
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0221
                });

                setMarker({
                    latitude: location.latLng.lat,
                    longitude: location.latLng.lng,
                })
            })
            .catch(error => {
                Alert.alert('Error', error);
            });
    }

    return (
        <View style={styles.container}>
            <MapView
                style={{flex: 1, height: '100%', width: '100%'}}
                region={region}>
                <Marker
                    coordinate={marker}
                    title={input}/>
            </MapView>
            <TextInput style={styles.text}
                       placeholderTextColor='grey'
                       placeholder='Location'
                       onChangeText={text => setInput(text)}
            />
            <View style={{alignSelf: 'stretch'}}>
            <Button onPress={fetchLocation} title='Search'/>
            </View>
             
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: '1%',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});