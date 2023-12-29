import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { defaultStyles } from '@/constants/Styles';
import { ListingGeo } from '@/interfaces/listingGeo';
import { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';



interface Props {
    listings: any;
}

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 9,
  longitudeDelta: 9,
}

const ListingsMap = ({listings}: Props) => {
  const router = useRouter();
  const onMarkerSelected = (event: ListingGeo) => {
    
  };

  return (
    <View style={styles.container}>
        <MapView 
          style={styles.map } 
          provider={PROVIDER_GOOGLE} 
          showsUserLocation 
          showsMyLocationButton
          initialRegion={INITIAL_REGION} 
        >
          {listings.features.map((item: ListingGeo) => (
            <Marker 
              key={item.properties.id}
              onPress={() => onMarkerSelected(item)}
              coordinate={{
                latitude: +item.properties.latitude,
                longitude: +item.properties.longitude,
              }}
            />
          ))}
        </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default ListingsMap