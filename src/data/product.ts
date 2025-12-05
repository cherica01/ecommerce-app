export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
};

export const PRODUCTS: Product[] = [
  { id: "1", name: "T-shirt Blanc", price: 25000, image: "https://picsum.photos/300?1", category: "Vêtements", description: "T-shirt coton, coupe regular." },
  { id: "2", name: "Casque Bluetooth", price: 75000, image: "https://picsum.photos/300?2", category: "Électronique", description: "Casque sans fil, autonomie 20h." },
  { id: "3", name: "Basket Noir", price: 90000, image: "https://picsum.photos/300?3", category: "Chaussures", description: "Confort et style urbain." },
  { id: "4", name: "Montre Connectée", price: 120000, image: "https://picsum.photos/300?4", category: "Électronique", description: "Suivi sportif et notifications." },
  { id: "5", name: "Jeans Bleu", price: 45000, image: "https://picsum.photos/300?5", category: "Vêtements", description: "Denim stretch." }
];
