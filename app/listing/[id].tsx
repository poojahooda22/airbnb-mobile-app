import { View, Text, Image, StyleSheet, Dimensions} from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import listingsData from '@/assets/data/airbnb-listings.json';
import {Listing } from '@/interfaces/listing';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';


const IMG_HEIGHT = 300;

const {width} = Dimensions.get('window');

const Page = () => {
    const { id } = useLocalSearchParams<{id: string}>();
    const listing: Listing = (listingsData as any[]).find((item) => item.id === id);
  return (
    <View style={styles.container}>
      <Animated.ScrollView>
        <Animated.Image source={{ uri: listing.xl_picture_url}} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing.name}</Text>
          <Text style={styles.location}>{listing.room_type} in {listing.smart_location}</Text>
          <Text style={styles.rooms}>
            {listing.guests_included} guests | {listing.bedrooms} bedrooms | {listing.beds} beds | {listing.bathrooms} bathrooms
          </Text>
          <View style={{ flexDirection: 'row', gap:4 }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>
              {listing.review_scores_rating / 20} . {listing.number_of_reviews} reviews
            </Text>
          </View>
          <View style={styles.divider} />
        </View>
      </Animated.ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: {
    height: IMG_HEIGHT,
    width,
  }
});

export default Page;