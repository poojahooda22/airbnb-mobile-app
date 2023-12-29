import { View, Text } from 'react-native'
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center', gap: 4, margin: 16, paddingVertical: 200}}>
      <Ionicons name="chatbox-outline" size={24} color="black" />
      <Text style={{ textAlign: 'center', fontFamily: 'mon-sb', fontSize: 16, paddingBottom: 4}}>No new messages</Text>
      <Text style={{ textAlign: 'center', fontFamily: 'mon', fontSize: 14}}>
        When you contact a Host or send a reservation request, you'll see your messages here.
      </Text>
    </View>
  )
}

export default Page;