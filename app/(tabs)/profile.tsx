import { View, Text, Button } from 'react-native'
import React from 'react';
import { useAuth } from "@clerk/clerk-react";

const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  return (
    <View>
      <Button>
        {isSignedIn && 
        <}
      </Button>
    </View>
  )
}

export default Page;