import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { PRODUCTS } from "../data/product";
import { CartContext } from "../context/CartContext";
import { FavoritesContext } from "../context/FavoritesContext";
import { useThemeApp } from "../context/ThemeContext";

type Props = {
  route: { params: { id: string } };
};

export default function ProductDetailScreen({ route }: Props) {
  const { id } = route.params;
  const p = PRODUCTS.find((x) => x.id === id);

  const { add } = useContext(CartContext);
  const { favorites, toggleFav } = useContext(FavoritesContext);

  const { theme } = useThemeApp();
  const isDark = theme === "dark";

  if (!p)
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDark ? "#000" : "#fff",
        }}
      >
        <Text style={{ color: isDark ? "#fff" : "#000" }}>Produit introuvable</Text>
      </SafeAreaView>
    );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: isDark ? "#000" : "#fff" }}
      contentContainerStyle={{ padding: 12 }}
    >
      <Image
        source={{ uri: p.image }}
        style={{ width: "100%", height: 300, borderRadius: 8 }}
      />

      <View style={{ marginTop: 12 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: isDark ? "#fff" : "#000",
          }}
        >
          {p.name}
        </Text>

        <Text
          style={{
            fontSize: 18,
            color: isDark ? "#90ee90" : "green",
            marginTop: 8,
          }}
        >
          {p.price} Ar
        </Text>

        <Text
          style={{
            marginTop: 12,
            color: isDark ? "#ccc" : "#444",
            lineHeight: 20,
          }}
        >
          {p.description}
        </Text>

        {/* BUTTONS */}
        <View style={{ flexDirection: "row", gap: 12, marginTop: 16 }}>
          {/* Ajouter panier */}
          <TouchableOpacity
            onPress={() =>
              add({
                id: p.id,
                qty: 1,
                name: p.name,
                price: p.price,
                image: p.image,
              })
            }
            style={{
              padding: 12,
              borderRadius: 8,
              backgroundColor: "#1e88e5",
              flex: 1,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>
              Ajouter au panier
            </Text>
          </TouchableOpacity>

          {/* Favoris */}
          <TouchableOpacity
            onPress={() => toggleFav(p.id)}
            style={{
              padding: 12,
              borderRadius: 8,
              backgroundColor: favorites.includes(p.id)
                ? "#ff6b6b"
                : isDark
                ? "#222"
                : "#eee",
              flex: 1,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: isDark ? "#fff" : "#000",
              }}
            >
              {favorites.includes(p.id)
                ? "Retirer des favoris"
                : "Ajouter aux favoris"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
