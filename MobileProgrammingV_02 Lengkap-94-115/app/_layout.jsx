import { Drawer } from "expo-router/drawer";
import "react-native-reanimated";
import "react-native-gesture-handler";

export default function RootDrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#FF5757",
        drawerInactiveTintColor: "gray",
        drawerStyle: { backgroundColor: "#FFF5F5", width: 260 },
        drawerLabelStyle: { fontSize: 16, fontWeight: "600" },
        headerStyle: { backgroundColor: "#FF5757" },
        headerTintColor: "white",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {}
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          title: "Discover Books",
        }}
      />
      <Drawer.Screen
        name="catalog"
        options={{
          drawerLabel: "Catalog",
          title: "Book Collection",
        }}
      />
      <Drawer.Screen
        name="premium"
        options={{
          drawerLabel: "Premium",
          title: "Premium Books",
        }}
      />
      {}
      <Drawer.Screen
        name="book-detail/[id]"
        options={{
          drawerLabel: () => null,
          title: "Book Detail",
        }}
      />
    </Drawer>
  );
}
