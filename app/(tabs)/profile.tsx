import { View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React,{ useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import {Link} from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';


const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);

  const[edit, setEdit] = useState(false);

  useEffect(() => {
    if(!user) return;

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);
  }, [user]);

  const onSaveUser = async () => {

  }

  const onCaptureImage = async () => {

  }

  return (
    <SafeAreaView style={{ marginTop: 30}}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <Ionicons name="notifications-outline" size={24} />
      </View>

      {user && (
        <View style={styles.card}> 
          <TouchableOpacity onPress={onCaptureImage}>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {edit ? (
              <TouchableOpacity onPress={onSaveUser}>
                <Ionicons name="checkmark-outline" size={24} color={Colors.dark}  />
              </TouchableOpacity>
            ) : (
              <View style={styles.editRow}>
                <Text style={{ fontFamily: 'mon-b', fontSize: 24 }}>{firstName} {lastName}</Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Ionicons name="create-outline" size={24} color={Colors.dark} />
                </TouchableOpacity>
              </View>
            )}
            <Text>{email}</Text>
            <Text></Text>

          </View>
        </View>
      )}

      {isSignedIn && 
        <Button title="Log out"  onPress={() => signOut()} color={Colors.dark} />
      }
      
        {!isSignedIn && (
          <Link href={'/(modals)/login'}>
            <Text>Log In</Text>
          </Link>
        )}
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  // button: {
  //   backgroundColor: Colors.primary,
  //   height: 50,
  //   width: 119,
  //   borderRadius: 8,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   textAlign: 'center',
  //   padding: 12,
  //   color: '#fff',
  //   fontSize: 16,
  // },
  // topView: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   padding: 16,
  // },
  headerContainer: {
    flexDirection: 'row',
    padding: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'mon-sb',
    fontSize: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  editRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});

export default Page;