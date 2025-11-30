import React, { useContext } from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen";
import FavoritesScreen from "../screens/FavoriteScreen";
import { ThemeContext } from "../context/ThemeContext";

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { id: string };
  Cart: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { theme } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={theme === "light" ? DefaultTheme : DarkTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Produits" }} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: "Détails" }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: "Panier" }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: "Favoris" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
