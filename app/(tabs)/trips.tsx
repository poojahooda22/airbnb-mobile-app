import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles';

const Page = () => {
  return (
    <View style={{ margin: 16}}>
      <Text style={{ paddingBottom: 14, fontFamily: 'mon-sb', fontSize: 24, marginTop: 30}}>Trips</Text>
      <View
        style={{
          flex: 1,
          borderBottomColor: '#000',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View style={{ paddingBottom: 30}}>
        <Text style={styles.head2}>No trips booked... yet!</Text>
        <Text style={styles.head3}>Time to dust off your bags and start planning your next adventure</Text>
        <Text style={styles.btn}>Search</Text>
      </View>
      <View
        style={{
          flex: 1,
          borderBottomColor: '#000',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View>
        <Text style={styles.head4}>Can't find your reservation here? Visit the help Centre</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  head2: {
    fontSize: 18,
    fontFamily: 'mon-sb',
    paddingBottom: 8,
    paddingTop: 30,
  },
  head3: {
    fontSize: 14,
    fontFamily: 'mon',
    color: '#333'
  },
  head4: {
    fontSize: 12,
    fontFamily: 'mon',
    color: '#333',
    paddingTop: 12,
  },
  btn: {
    backgroundColor: '#fff',
    color: '#000',
    height: 50,
    width: 139,
    padding: 16,
    borderRadius: 8,
    fontFamily: 'mon-sb',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    borderWidth: 1,

  }
});

export default Page