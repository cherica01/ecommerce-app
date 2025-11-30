import React, { useContext } from "react";
import { View, FlatList, Text, SafeAreaView, StyleSheet } from "react-native";
import { FavoritesContext } from "../context/FavoritesContext";
import { PRODUCTS, Product } from "../data/product";
import ProductCard from "../components/ProductCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useThemeApp } from "../context/ThemeContext";

// Typage de navigation
type RootStackParamList = {
  Favorites: undefined;
  ProductDetail: { id: string };
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Favorites">;
};

export default function FavoritesScreen({ navigation }: Props) {
  const { favorites } = useContext(FavoritesContext);
  const { theme } = useThemeApp();
  const isDark = theme === "dark";

  const favProducts: Product[] = PRODUCTS.filter((p) =>
    favorites.includes(p.id)
  );

  if (favProducts.length === 0) {
    return (
      <SafeAreaView
        style={[
          styles.center,
          { backgroundColor: isDark ? "#000" : "#fff" }
        ]}
      >
        <Text style={{ color: isDark ? "#ccc" : "#444", fontSize: 16 }}>
          Aucun favori
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#000" : "#fff" }
      ]}
    >
      <FlatList
        data={favProducts}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetail", { id: item.id })
            }
          />
        )}
        contentContainerStyle={{ padding: 12 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
