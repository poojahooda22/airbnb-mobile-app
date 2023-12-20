
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { TransitionPresets } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import login from './(modals)/login';
import { TouchableOpacity } from 'react-native';



export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)/login"
          options={{
            title: 'Log in or sign up',
            headerTitleStyle: {
              fontFamily: 'mon-sb',
            },
            presentation: 'modal',
            animation:"slide_from_bottom",
            // headerLeft: () => (
            //   <TouchableOpacity>
            //     <Ionicons name="close-outline" size={24} color="black" />
            //   </TouchableOpacity>
            // )
          }}
        />
        <Stack.Screen name="listing/[id]" options={{ headerTitle: ''}} />
        
      </Stack>
  );
}
