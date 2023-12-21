import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';

const categories = [
    {
        name: 'Tiny homes',
        icon: 'home',
    },
    {
        name: 'Cabins',
        icon: 'house-siding',
    },
    {
        name: 'Trending',
        icon: 'local-fire-department',
    },
    {
        name: 'Play',
        icon: 'videogame-asset',
    },
    {
        name: 'City',
        icon: 'apartment',
    },
    {
        name: 'Beachfront',
        icon: 'nature-people',
    },
    {
        name: 'Countryside',
        icon: 'nature-people',
    }
]


const ExploreHeader = () => { 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', marginTop: 32}}>
        <View style={styles.container}>
            <View style={styles.actionRow}>
                <Link href={'/(modals)/booking'} asChild>
                    <TouchableOpacity style={styles.searchBtn}>
                        <Ionicons name="search" size={24} />
                        <View>
                            <Text style={{ fontFamily: 'mon-sb'}}>Where to</Text>
                            <Text style={{ fontFamily: 'mon'}}>Anywhere . Any week . Any Guest</Text>
                        </View>
                    </TouchableOpacity>
                </Link>

                <TouchableOpacity style={styles.filterBtn}>
                    <Ionicons name="options-outline" size={24} />
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 95,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 24,
    },
    searchBtn: {
        flexDirection: 'row',
    }
});

export default ExploreHeader;