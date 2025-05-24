'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: 'cat' | 'dog';
  weight: string;
  stock: number;
  featured: boolean;
  
}

// Sample product data
const catFoodProducts: Product[] = [
  {
    id: 1,
    name: "Applaws Natural Wet Cat Food, Multipack Chicken and Fish Selection in Broth 70 g Tin (Pack of 12)",
    price: 15.99 ,
    images: [
      "/cat/applaws.png", 
      "/cat/applaws1.png", 
      "/cat/applaws2.png", 
      "/cat/applaws3.png", 
      "/cat/applaws4.png"
    ],
    description: "•	Chicken and fish recipes contain a natural source of Omega-6, taurine and Omega-3 helping support a cats eye, heart, brain and skin health	Complementary wet cat food adding flavour and hydration. Feed with any dry food for a complete and balanced diet /n	Pack contains 12 x 70g Tins chicken and fish mixed selection. Tuna Fillet, Chicken Breast, Chicken with Cheese, Ocean Fish	PACKAGING MAY VARY as we transition from old to new brand packagingSustainable, recyclable packaging, our metal tins and cardboard packaging can be fully recycled and fish, this premium food helps support healthy development and strong immune systems.",
    category: "cat",
    weight: "12 Pack",
    stock: 15,
    featured: true
  },
  {
    id: 2,
    name: "Go-Cat Adult Chicken & Duck Dry Cat Food 10kg (Packaging may vary)",
    price: 41.23,
    images: [
      "/cat/gocat.png", 
      "/cat/gocat1.png", 
      "/cat/gocat2.png", 
      "/cat/gocat3.png",
      "/cat/gocat4.png"
    ],
    description: "Premium adult cat food with real salmon. Rich in omega-3 fatty acids for a healthy coat and skin. Supports digestive health with prebiotics and probiotics.",
    category: "cat",
    weight: "10kg",
    stock: 12,
    featured: true
  },
  {
    id: 3,
    name: "FELIX Original Mixed Selection in Jelly Wet Cat Food 40x85g",
    price: 15,
    images: [
      "/cat/flex.png", 
      "/cat/flex1.png", 
      "/cat/flex2.png",
      "/cat/flex3.png",
      "/cat/flex4.png"
    ],
    description: "•	100% Natural, high protein Ingredients that your pet will love. Suitable for all adult and mature cat ",
    category: "cat",
    weight: "40 pack",
    stock: 18,
    featured: false
  },
  {
    id: 4,
    name: "GOURMET Perle Ocean Collection Wet Cat Food 40x85g",
    price: 23.99,
    images: [
      "/cat/perle0.png", 
      "/cat/perle1.png",
      "/cat/perle2.png",
      "/cat/perle3.png",
      "/cat/perle4.png",
    ],
    description: "•Gourmet Perle Ocean Collection multipack contains delicious recipes in Gravy with Tuna with Shrimp, Plaice with Shrimp, OceanFish and Tuna, Salmon and WhiteFish  •	Complete pet food for adult cats, 100% complete and balanced nutritional pet food for adult cats (aged 1 to 7)",
    category: "cat",
    weight: "3.4kg",
    stock: 19,
    featured: true
  },
  {
    id: 5,
    name: "Purina ONE Adult Dry Cat Food Rich in Chicken 6kg, Packaging may vary",
    price: 20.89,
    images: [
      "/cat/purina.png", 
      "/cat/purina1.png", 
      "/cat/purina2.png", 
      "/cat/purina3.png", 
      "/cat/purina4.png", 
    ],
    description: "•	You could see a visible difference in your cat’s health in just 3 weeks with the Purina ONE 3-week challenge; supporting a healthier digestion, higher energy and vitality levels, healthy skin, brighter eyes and a shinier coat",
    category: "cat",
    weight: "6kg",
    stock: 14,
    featured: false
  },
  {
    id: 6,
    name: "Sheba Select Slices Adult Cat Food Pouch Poultry Selection in Gravy Mega-Pack 40 x 85g",
    price: 27.99,
    images: [
      "/cat/sheba.png", 
      "/cat/sheba1.png", 
      "/cat/sheba2.png", 
      "/cat/sheba3.png",
      "/cat/sheb43.png",
    ],
    description: "•	SHEBA Select Slices create something special out of everyday meals with gourmet cat food - Wet food so exhilarating it makes every cat purr for more.",
    category: "cat",
    weight: "3.4kg",
    stock: 11,
    featured: false
  },
  {
    id: 7,
    name: "WHISKAS - 1+ Adult Wet Cat Food Pouches - 40 x 85 g - Poultry Selection - Bulk Cat Food Mega pack - 40 Jelly Pouches",
    price: 21.99,
    images: [
      "/cat/whiskas.png", 
      "/cat/whiskas1.png", 
      "/cat/whiskas2.png", 
      "/cat/whiskas3.png",
      
    ],
    description: "With Chicken Meat and Animal Derivatives (35%, including 4% Chicken in the Chunk*), Cereals, Minerals, Derivatives of Vegetable Origin , Various Sugars, *Chunk typically 40% of product With Duck Meat and Animal Derivatives (35%, including 4% Duck in the Chunk*), Cereals, Minerals, Derivatives of Vegetable Origin, Various Sugars, *Chunk typically 40% of product With Poultry Meat and Animal Derivatives (35%, including 4% Poultry in the Chunk*), Cereals, Minerals, Derivatives of Vegetable Origin, Various Sugars, *Chunk typically 40% of product With Turkey Meat and Animal Derivatives (35%, including 4% Turkey in the Chunk*), Cereals, Minerals, Derivatives of Vegetable Origin, Various Sugars, *Chunk typically 40% of product",
    category: "cat",
    weight: "4.5kg",
    stock: 16,
    featured: true
  },
];

const dogFoodProducts: Product[] = [
 
  {
    id: 8,
    name: "Burns Pet Nutrition Hypoallergenic Complete Dry Dog Food Adult and Senior Dog Original Chicken and Brown Rice 12 kg",
    price: 56.87,
    images: [
      "/dog/burns.png", 
      "/dog/burns1.png",
      "/dog/burns2.png",
      "/dog/burns3.png", 
      "/dog/burns4.png",
    ],
    description: "•	Developed by Veterinary Surgeon, John Burns •	Award-winning recipe •	Natural and complete diet •	Hypoallergenic •	Highly digestible •	Suitable for sensitive dogs",
    category: "dog",
    weight: "5kg",
    stock: 20,
    featured: true
  },
  {
    id: 9,
    name: "Harringtons Complete Wet Tray Grain Free Hypoallergenic Adult Dog Food Meaty Bumper Pack 16x400g - Chicken, Lamb, Beef & Turkey - Made with All Natural Ingredients",
    price: 32.35,
    images: [
      "/dog/har.png", 
      "/dog/har1.png", 
      "/dog/har2.png",
      "/dog/har3.png",
      "/dog/har4.png",
    ],
    description: "Formulated for large breed dogs. Helps support healthy joints and mobility. Balanced nutrition to maintain ideal body condition.",
    category: "dog",
    weight: "16x400gm",
    stock: 13,
    featured: false
  },
  {
    id: 10,
    name: "Pedigree Schmackos Mega Pack 110 Strips Snacks, Dog Treat Multipack with Beef, Lamb and Poultry Flavours, 790 g (Pack of 1)",
    price: 12.99,
    images: [
      "/dog/ped.png", 
      "/dog/ped1.png",
      "/dog/ped2.png",
      "/dog/ped3.png",
      "/dog/ped4.png",
    ],
    description: "•	Pedigree Schmackos are delicious tender strips that are full of meaty flavours, designed to be a healthy and nutritional treat, made for training and rewarding",
    category: "dog",
    weight: "790gm",
    stock: 23,
    featured: true
  },
  {
    id: 11,
    name: "PRO PLAN VETERINARY DIETS HA Hypoallergenic Dry Dog Food 11kg",
    price: 65.99,
    images: [
      "/dog/pro.png", 
      "/dog/pro1.png",  
      "/dog/pro2.png", 
      "/dog/pro3.png",
      "/dog/pro4.png",
    ],
    description: "•	Single hydrolysed protein with low molecular weight to help avoid allergic responses. •	Purified carbohydrates sources to help avoid allergic responses",
    category: "dog",
    weight: "11kg",
    stock: 15,
    featured: false
  },
  {
    id: 12,
    name: "Wagg Active Goodness Complete Dry Adult Dog Food Beef & Veg 12kg - For All Active Working Dog Breeds",
    price: 14.99,
    images: [
      "/dog/waggy.png", 
     "/dog/waggy1.png",  
      "/dog/waggy2.png",  
     "/dog/waggy3.png", 
     "/dog/waggy4.png", 
    ],
    description: "•	TASTY & COMPLETE - Contains everything your dog needs to keep them in tip top condition. •	MEAT INGREDIENTS - Tasty meat ingredients come first, for healthy and naturally digestible proteins",
    category: "dog",
    weight: "11.6kg",
    stock: 19,
    featured: false
  },
  {
    id: 13,
    name: "Wagg Meaty Goodness Complete Dry Adult Dog Food Beef Dinner 12kg - Meaty Ingredients Come 1st",
    price: 19.99,
    images: [
      "/dog/2waggy.png", 
     "/dog/2waggy1.png",  
      "/dog/2waggy2.png",  
     "/dog/2waggy3.png", 
     "/dog/2waggy4.png", 
    ],
    description: "•	TASTY & COMPLETE - Contains everything your dog needs to keep them in tip top condition. •	MEAT INGREDIENTS - Tasty meat ingredients come first, for healthy and naturally digestible proteins",
    category: "dog",
    weight: "12kg",
    stock: 19,
    featured: false
  },
  {
    id: 14,
    name: "Wagg Wheat Free Complete Dry Adult Dog Food Chicken & Rice 12kg - For Sensitive Stomachs",
    price: 27.16 ,
    images: [
      "/dog/3waggy.png", 
     "/dog/3waggy1.png",  
      "/dog/3waggy2.png",  
     "/dog/3waggy3.png", 
     "/dog/3waggy4.png", 
    ],
    description: "•	TASTY & COMPLETE - Contains everything your dog needs to keep them in tip top condition. •	MEAT INGREDIENTS - Tasty meat ingredients come first, for healthy and naturally digestible proteins",
    category: "dog",
    weight: "12kg",
    stock: 19,
    featured: false
  },
  {
    id: 15,
    name: "Winalot Dog Food Mixed in Gravy, 40 x 100g (Packaging may vary)",
    price: 15.99,
    images: [
      "/dog/win.png", 
     "/dog/win1.png",  
      "/dog/win2.png",  
     "/dog/win3.png", 
     "/dog/win4.png", 
    ],
    description: "•	WINALOT Adult Wet Dog Food Mixed in Gravy with Chicken, Lamb, Beef 40 x 100g Pouches •	Pack Includes: 10 x Chicken with Carrots; 20 x Beef with Potatoes; 10 x Lamb with Carrots •	Wet Dog Food Pouches that contain succulent (grain-free) chunks made with high quality natural ingredients",
    category: "dog",
    weight: "40 x 100g pouches",
    stock: 19,
    featured: false
  },

  
];

interface ProductContextType {
  products: Product[];
  featuredProducts: Product[];
  catFoodProducts: Product[];
  dogFoodProducts: Product[];
  getProductById: (id: number) => Product | undefined;
  searchProducts: (query: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const allProducts = [...catFoodProducts, ...dogFoodProducts];
  
  const getProductById = (id: number) => {
    return allProducts.find(product => product.id === id);
  };
  
  const featuredProducts = allProducts.filter(product => product.featured);
  
  const searchProducts = (query: string) => {
    const lowercasedQuery = query.toLowerCase().trim();
    if (!lowercasedQuery) return [];
    
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(lowercasedQuery) || 
      product.description.toLowerCase().includes(lowercasedQuery)
    );
  };

  return (
    <ProductContext.Provider value={{ 
      products: allProducts,
      featuredProducts,
      catFoodProducts,
      dogFoodProducts,
      getProductById,
      searchProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
