import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { defaultStyles } from '@/constants/Styles';


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
  return (
    <View style={styles.container}>
        <MapView 
          style={styles.map } 
          provider={PROVIDER_GOOGLE} 
          showsUserLocation 
          showsMyLocationButton 
        />
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