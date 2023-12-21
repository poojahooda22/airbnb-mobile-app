import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from 'expo-router';


enum Strategy {
  Google = 'oauth_google',
  Github = 'oauth_github',
  Linkedin = 'oauth_linkedin'
}

const Page = () => {
  useWarmUpBrowser();
  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({strategy: 'oauth_google'});
  const { startOAuthFlow: githubAuth } = useOAuth({strategy: 'oauth_github'});
  const { startOAuthFlow: linkedinAuth } = useOAuth({strategy: 'oauth_linkedin'});

  const onSelectAuth = async (strategy: Strategy) => {
      const selectedAuth = {
        [Strategy.Google]: googleAuth,
        [Strategy.Github]: githubAuth,
        [Strategy.Linkedin]: linkedinAuth 
      }[strategy];
      try {
        const { createdSessionId, setActive} = await selectedAuth();
        console.log("~ file: login.tsx:31 ~ onSelectedAuth ~ createdSessionId", createdSessionId);

        if(createdSessionId) {
          setActive!({ session: createdSessionId })
          router.back();
        } 
      } catch (err) {
        console.error('OAuth error: ', err);
      }
  };
  

return (
    <View style={styles.container}>
      <TextInput 
        autoCapitalize='none' 
        placeholder='Email' 
        style={[defaultStyles.inputField, { marginBottom: 28}]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: '#000',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.separator}>Or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: '#000',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{gap: 20}}>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name="call-outline" size={24} style={defaultStyles.btnIcon}/>
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons name="md-logo-google" size={24} style={defaultStyles.btnIcon}/>
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Github)}>
          <Ionicons name="md-logo-github" size={24} style={defaultStyles.btnIcon}/>
          <Text style={styles.btnOutlineText}>Continue with Github</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Linkedin)}>
          <Ionicons name="md-logo-linkedin" size={24} style={defaultStyles.btnIcon}/>
          <Text style={styles.btnOutlineText}>Continue with Linkedin</Text>
        </TouchableOpacity>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26
  },
  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  separator: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb'
  },
});

export default Page;