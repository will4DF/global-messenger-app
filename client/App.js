import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { User, MessageSquare, CreditCard } from 'lucide-react-native';
import ProfileScreen from './screens/ProfileScreen';
import ChatScreen from './screens/ChatScreen';
import BillingScreen from './screens/BillingScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{ 
          tabBarActiveTintColor: '#007AFF',
          headerShown: false,
          tabBarStyle: { paddingBottom: 5, height: 60 }
        }}
      >
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
        <Tab.Screen 
          name="Chat" 
          component={ChatScreen} 
          options={{
            tabBarIcon: ({ color, size }) => <MessageSquare color={color} size={size} />,
          }}
        />
        <Tab.Screen 
          name="Payments" 
          component={BillingScreen} 
          options={{
            tabBarIcon: ({ color, size }) => <CreditCard color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
