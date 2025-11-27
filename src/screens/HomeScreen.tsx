import React, { useContext, useLayoutEffect, useState } from "react";
import { View, TextInput, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/product";
import { useNavigation } from "@react-navigation/native";
import HeaderRight from "../components/HeaderRight";
import { FavoritesContext } from "../context/FavoritesContext";
import { CartContext } from "../context/CartContext";
import { useThemeApp } from "../context/ThemeContext";   // <-- import thème

export default function HomeScreen() {
  const nav = useNavigation<any>();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const { theme, toggleTheme } = useThemeApp();            // <-- hook thème

  const isDark = theme === "dark";

  useLayoutEffect(() => {
    nav.setOptions({
      headerRight: () => <HeaderRight />,
      headerStyle: { backgroundColor: isDark ? "#000" : "#fff" },
      headerTitleStyle: { color: isDark ? "#fff" : "#000" }
    });
  }, [nav, isDark]);

  const filtered = PRODUCTS
    .filter(p => (filter ? p.category === filter : true))
    .filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#000" : "#fff" }]}>
      
      {/* Bouton mode sombre */}
      <TouchableOpacity onPress={toggleTheme} style={{ padding: 12 }}>
        <Text style={{ color: isDark ? "#fff" : "#000", fontSize: 16 }}>
          {isDark ? "☀️ Mode clair" : "🌙 Mode sombre"}
        </Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Rechercher..."
        placeholderTextColor={isDark ? "#aaa" : "#555"}
        value={q}
        onChangeText={setQ}
        style={[
          styles.search,
          { backgroundColor: isDark ? "#222" : "#fff", color: isDark ? "#fff" : "#000" }
        ]}
      />

      <View style={styles.filters}>
        <TouchableOpacity
          onPress={() => setFilter(null)}
          style={[styles.fbtn, !filter && (isDark ? styles.fbtnDarkActive : styles.fbtnActive)]}
        >
          <Text style={{ color: isDark ? "#fff" : "#000" }}>Tous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilter("Électronique")}
          style={[styles.fbtn, filter === "Électronique" && (isDark ? styles.fbtnDarkActive : styles.fbtnActive)]}
        >
          <Text style={{ color: isDark ? "#fff" : "#000" }}>Électronique</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilter("Vêtements")}
          style={[styles.fbtn, filter === "Vêtements" && (isDark ? styles.fbtnDarkActive : styles.fbtnActive)]}
        >
          <Text style={{ color: isDark ? "#fff" : "#000" }}>Vêtements</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => nav.navigate("ProductDetail" as any, { id: item.id })}
          />
        )}
        contentContainerStyle={{ padding: 12 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  search: { margin: 12, padding: 10, borderRadius: 8 },
  filters: { flexDirection: "row", paddingHorizontal: 12, gap: 8 },
  fbtn: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#eee",
    marginRight: 8
  },
  fbtnActive: { backgroundColor: "#cfe9ff" },
  fbtnDarkActive: { backgroundColor: "#333" }
});
