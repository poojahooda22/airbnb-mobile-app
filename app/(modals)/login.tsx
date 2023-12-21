import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { defaultStyles } from '@/constants/Styles';

const Page = () => {
  useWarmUpBrowser();

return (
    <View style={styles.container}>
      <TextInput 
        autoCapitalize='none' placeholder='Email' style={[defaultStyles.inputField, { marginBottom: 18}]}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26
  },
});

export default Page;