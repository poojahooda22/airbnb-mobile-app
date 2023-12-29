import { View, Text } from 'react-native'
import React, {useState, useMemo} from 'react'
import { Link, Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import listingsData from '@/assets/data/airbnb-listings.json';
import ListingsMap from '@/components/ListingsMap';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';

const Page = () => {
  const [category, setCategory] = useState('Tiny homes');

  const items = useMemo(() => listingsData as any, []);

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 130 }}>
      <Stack.Screen 
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged}/>
        }}
      />
      {/* <Listings listings={items} category={category}/> */}

      <ListingsMap listings={listingsDataGeo} />
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  )
}

export default Page;