import { View, Text } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';

const Page = () => {
  return (
    <View>
      <Stack.Screen 
        options={{
          header: () => <ExploreHeader/>
        }}
      />
    </View>
  )
}

export default Page;