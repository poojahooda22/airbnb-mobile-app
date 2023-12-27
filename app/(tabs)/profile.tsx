import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react';
import { useAuth } from "@clerk/clerk-react";
import {Link} from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';

const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  return (
    <View style={styles.topView}>
      <Text  onPress={() => signOut()} style={styles.button}>Logout</Text>
        {!isSignedIn && (
          <Link href={'/(modals)/login'} style={}>
            <Text>Log In</Text>
          </Link>
        )}
    </View>
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    height: 50,
    width: 119,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  }
});

export default Page;