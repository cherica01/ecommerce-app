import React, { createContext, useEffect, useState, ReactNode } from "react";
import { getObject, setObject } from "../services/storage";

export const FavoritesContext = createContext({
  favorites: [] as string[],
  toggleFav: (id: string) => {}
});

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const s = (await getObject("@favorites")) as string[] | null;
      if (s) setFavorites(s);
    })();
  }, []);

  useEffect(() => {
    setObject("@favorites", favorites);
  }, [favorites]);

  const toggleFav = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return <FavoritesContext.Provider value={{ favorites, toggleFav }}>{children}</FavoritesContext.Provider>;
};
