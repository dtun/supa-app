import { supbase } from '@/utils/supabase';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#151515',
        },
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#151515',
        },
        headerRight: () => (
          <TouchableOpacity onPress={() => supbase.auth.signOut()}>
            <Ionicons
              name="log-out-outline"
              size={24}
              color="#fff"
              style={{ marginRight: 16 }}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
