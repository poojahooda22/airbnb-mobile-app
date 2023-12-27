import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import listingsData from '@/assets/data/airbnb-listings.json';
import {Listing } from '@/interfaces/listing';
import Animated, { SlideInDown, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Share } from 'react-native';


const IMG_HEIGHT = 300;

const {width} = Dimensions.get('window');

const Page = () => {
    const { id } = useLocalSearchParams<{id: string}>();
    const listing: Listing = (listingsData as any[]).find((item) => item.id === id);
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const navigation = useNavigation();

    const scrollOffset = useScrollViewOffset(scrollRef);

    const shareListing = async () => {
      try {
        await Share.share ({
          title: listing.name,
          url: listing.listing_url,
        });
      } catch (err) {
        console.log(err);
      }
    };

    useLayoutEffect(() => {
      navigation.setOptions({
        headerBackground: () => (
          <Animated.View style={[styles.header]} />
        ),
        headerRight: () => (
          <View style={styles.bar}>
            <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
              <Ionicons name="share-outline" size={22} color={'#000'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundButton} >
              <Ionicons name="heart-outline" size={22} color={'#000'} />
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={24} color={'#000'} />
          </TouchableOpacity>
        )
      });
    }, []);

    const imageAnimatedStyle= useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: interpolate(
              scrollOffset.value,
              [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
              [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
            ),
          },
          {
            scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
          },
        ],
      };
    });

    const headerAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0,1])
      };
    });

  return (
    <View style={styles.container}>
      <Animated.ScrollView 
        ref={scrollRef} contentContainerStyle={{paddingBottom: 100}} scrollEventThrottle={16}>
        <Animated.Image source={{ uri: listing.xl_picture_url}} style={[styles.image, imageAnimatedStyle]} resizeMode="cover" />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing.name}</Text>
          <Text style={styles.location}>{listing.room_type} in {listing.smart_location}</Text>
          <Text style={styles.rooms}>
            {listing.guests_included} guests . {listing.bedrooms} bedrooms . {listing.beds} beds . {listing.bathrooms} bathrooms
          </Text>
          <View style={{ flexDirection: 'row', gap:4, alignItems: 'center' }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>
              {listing.review_scores_rating / 20} | {listing.number_of_reviews} reviews
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.hostView}>
            <Image source={{ uri: listing.host_picture_url }} style={styles.host} />

            <View>
              <Text style={{ fontWeight: '500', fontSize: 16}}>Hosted by {listing.host_name}</Text>
              <Text>Host since {listing.host_since}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>{listing.description}</Text>
        </View>
      </Animated.ScrollView>

      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View 
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
        >
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>$ {listing.price}</Text>
            <Text>night</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[defaultStyles.btn, { paddingHorizontal: 20}]}>
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>

        </View>
      </Animated.View>
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
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
  },
  location: {
    fontSize: 18,
    fontFamily: 'mon-sb',
    marginTop: 10,
  },
  rooms: {
    fontSize: 16,
    fontFamily: 'mon',
    marginVertical: 4,
    color: Colors.grey,
  },
  ratings:{
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: 'mon',
    marginTop: 10,
  },
  footerText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: 6,
  },
  footerPrice: {
    fontSize: 20,
    fontFamily: 'mon-sb',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderBottomColor: Colors.grey,
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default Page;