import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation";
import { ThemeProvider } from "./src/context/ThemeContext";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { CartProvider } from "./src/context/CartContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <FavoritesProvider>
          <CartProvider>
            <AppNavigator />
          </CartProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
