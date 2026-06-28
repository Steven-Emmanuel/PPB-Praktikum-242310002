import { Drawer } from "expo-router/drawer";
import "react-native-reanimated";
import "react-native-gesture-handler";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#49745e",
        drawerInactiveTintColor: "gray",
        drawerStyle: {
          backgroundColor: "#f8f6f1",
          width: 250,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
        },
        headerStyle: {
          backgroundColor: "#49745e",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Screen 1",
          title: "Screen 1",
        }}
      />
      <Drawer.Screen
        name="screen2"
        options={{
          drawerLabel: "Screen 2",
          title: "Screen 2",
        }}
      />
      <Drawer.Screen
        name="screen3"
        options={{
          drawerLabel: "Screen 3",
          title: "Screen 3",
        }}
      />
    </Drawer>
  );
}
