import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import Colors from '@/constants/Colors';

const Page = () => {
  return (
    <View style={{ margin: 16}}>
      <Text style={styles.head1}>Whishlists</Text>
      <View>
        <Text style={styles.head2}>Create your first Wishlist</Text>
        <Text style={styles.head3}>Save your favorite listings and share with friends and family</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  head1: {
    fontSize: 24,
    fontFamily: 'mon-sb',
    paddingBottom: 30,
    marginTop: 30, 
  },
  head2: {
    fontSize: 18,
    fontFamily: 'mon-sb',
    paddingBottom: 8,
  },
  head3: {
    fontSize: 14,
    fontFamily: 'mon',
    color: '#333'
  }
});

export default Page;