import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { defaultStyles } from '@/constants/Styles';
import { ListRenderItem } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';


interface Props {
  listings: any[];
  category: string;
  refresh: number;
}

const Listings = ({ listings: items, category, refresh}: Props) => {

  const [ loading, setLoading ] = useState(false);
  const listRef = useRef<BottomSheetFlatListMethods>(null);

  useEffect(() => {
    if(refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true});
    }
  }, [refresh]);

  useEffect(() => {
    console.log('RELOAD LISTINGS', items.length);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<any> = ({item}) => (
    <Link 
      href ={`/listing/${item.id}`} asChild> 
      <TouchableOpacity>
        <Animated.View 
          style={styles.listing} 
          entering={FadeInRight} 
          exiting={FadeOutLeft}>
          <Image 
            source={{ uri: item.medium_url}} 
            style={styles.image} 
          />
          <TouchableOpacity 
            style={{ position: 'absolute', right: 30, top: 30}}
          >
            <Ionicons 
              name="heart-outline" 
              size={24} 
              color={'#000'} 
            />
          </TouchableOpacity>

          <View 
            style={{ flexDirection: 'row', justifyContent: 'space-between'}}
          >
            <Text 
              style={{ fontSize: 16, fontFamily: 'mon-sb' }}
            >
              {item.name}
            </Text>
            <View style={{ flexDirection: 'row', gap: 4}} >
              <Ionicons name="star" size={16} />
              <Text style={{ fontFamily: 'mon-sb'}}> {item.review_scores_rating /20}</Text>
            </View>
          </View>

          <Text style={{ fontFamily: 'mon'}}>{item.room_type}</Text>

          <View style={{ flexDirection: 'row', gap: 4}}>
            <Text style={{ fontFamily: 'mon-sb'}}>${item.price}</Text>
            <Text style={{ fontFamily: 'mon'}}>night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  )
  
  return (
    <View style={defaultStyles.container}>
      <BottomSheetFlatList
        ref={listRef}
        renderItem={renderRow}
        data={loading ? [] : items}
        ListHeaderComponent={<Text style={styles.info}>{items.length} homes</Text>}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 4,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  info: {
    textAlign: 'center',
    fontFamily: 'mon-sb',
    fontSize: 16,
    marginTop: 4,
  }
});

export default Listings;