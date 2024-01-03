import { View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import React,{ useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import {Link} from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


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
    try {
      if(!firstName || !lastName) return;

      await user?.update({
        firstName,
        lastName,
      });
    } catch(error) {
      console.error(error);
    } finally {
      setEdit(false);
    }
  }

  const onCaptureImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true
    })
  }

  return (
    <SafeAreaView 
      style={{ marginTop: 30}}
    >
      <View 
        style={styles.headerContainer}
      >
        <Text 
          style={styles.header}
        >
          Profile
        </Text>
        <Ionicons name="notifications-outline" size={24} />
      </View>

      {user && (
        <View 
          style={styles.card}
        > 
          <TouchableOpacity 
            onPress={onCaptureImage}
          >
            <Image 
              source={{ uri: user?.imageUrl }} 
              style={styles.avatar} 
            />
          </TouchableOpacity>
          <View 
            style={{ flexDirection: 'row', gap: 6 }}
          >
            {edit ? (
              <View 
              style={styles.editRow}>
                <TextInput 
                  placeholder="First name"
                  value={firstName || ''}
                  onChangeText={setFirstName}
                  style={[defaultStyles.inputField, { width: 100}]}
                />
                <TextInput 
                  placeholder="Last name"
                  value={lastName || ''}
                  onChangeText={setLastName}
                  style={[defaultStyles.inputField, { width: 100}]}
                />
                <TouchableOpacity onPress={onSaveUser}>
                  <Ionicons name="checkmark-outline" size={24} color={Colors.dark}  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.editRow}>
                <Text 
                style={{ fontFamily: 'mon-b', fontSize: 24 }}>{firstName} {lastName}</Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Ionicons name="create-outline" size={24} color={Colors.dark} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text>{email}</Text>
          <Text>Since {user?.createdAt?.toLocaleDateString()}</Text>
        </View>
      )}

        <View style={{flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          {isSignedIn && 
          <Text  onPress={() => signOut()} style={styles.button}>Log out</Text>
          }
        
          {!isSignedIn && (
            <Link href={'/(modals)/login'}>
              <Text 
              style={styles.button1}>Log In</Text>
            </Link>
          )}
        </View>

        <View 
          style={{marginLeft: 30, marginTop: 30}}
        >
          <Text 
            style={{fontFamily: 'mon-sb', fontSize: 18, marginBottom: 30}}
          >
            Settings
          </Text>
          <View 
            style={{flexDirection: 'row', justifyContent: 'space-between'}}
          >
            <Ionicons name="person-circle" size={24} style={defaultStyles.btnIcon}/>
            <Text>
              Personal information
            </Text>
            <Ionicons name="chevron-forward-outline" size={24} style={defaultStyles.btnIcon}/>
          </View>
        </View>
      
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 30,
    marginTop: 30,
    backgroundColor: Colors.dark,
    height: 50,
    width: 119,
    borderRadius: 8,
    alignItems: 'center',
    textAlign: 'center',
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  button1: {
    backgroundColor: Colors.primary,
    height: 50,
    width: 119,
    borderRadius: 8,
    alignItems: 'center',
    textAlign: 'center',
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
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
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  
});

export default Page;