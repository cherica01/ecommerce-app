import React, { useContext } from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { useThemeApp } from "../context/ThemeContext";

export default function CartScreen() {
  const { items, remove, clear, total } = useContext(CartContext);
  const { theme } = useThemeApp();
  const isDark = theme === "dark";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 12,
        backgroundColor: isDark ? "#000" : "#fff",
      }}
    >
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <CartItem item={item} onRemove={() => remove(item.id)} />
        )}
      />

      <View style={{ marginTop: 12 }}>
        <Text
          style={{
            fontSize: 18,
            color: isDark ? "#fff" : "#000",
            marginBottom: 8,
          }}
        >
          Total: {total} Ar
        </Text>

        <TouchableOpacity
          onPress={() => clear()}
          style={{
            marginTop: 10,
            padding: 12,
            backgroundColor: "#1e88e5",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>
            Vider le panier
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
