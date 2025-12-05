import React, { createContext, useEffect, useState, ReactNode } from "react";
import { getObject, setObject } from "../services/storage";

type CartItem = { id: string; qty: number; name?: string; price?: number; image?: string };

export const CartContext = createContext({
  items: [] as CartItem[],
  add: (p: CartItem) => {},
  remove: (id: string) => {},
  clear: () => {},
  total: 0
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    (async () => {
      const s = (await getObject("@cart")) as CartItem[] | null;
      if (s) setItems(s);
    })();
  }, []);

  useEffect(() => {
    setObject("@cart", items);
  }, [items]);

  const add = (p: CartItem) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === p.id);
      if (found) return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + p.qty } : i));
      return [...prev, p];
    });
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  const total = items.reduce((s, i) => s + (i.price || 0) * i.qty, 0);

  return <CartContext.Provider value={{ items, add, remove, clear, total }}>{children}</CartContext.Provider>;
};
