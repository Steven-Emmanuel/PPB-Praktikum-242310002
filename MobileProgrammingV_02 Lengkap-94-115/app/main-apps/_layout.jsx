import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function MainAppsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6200ee",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "white", height: 60, paddingBottom: 8 }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
