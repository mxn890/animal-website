'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: 'cat' | 'dog';
  weight: string;
  stock: number;
  featured: boolean;
}

// Helper function to convert product name to URL-friendly ID
const generateId = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Sample product data
const catFoodProducts: Product[] = [
  {
    id: generateId("Applaws Natural Wet Cat Food, Multipack Chicken and Fish Selection in Broth 70 g Tin (Pack of 12)"),
    name: "Applaws Natural Wet Cat Food, Multipack Chicken and Fish Selection in Broth 70 g Tin (Pack of 12)",
    price: 15.99,
    images: [
      "/cat/applaws.png", 
      "/cat/applaws1.png", 
      "/cat/applaws2.png", 
      "/cat/applaws3.png", 
      "/cat/applaws4.png"
    ],
    description: "• Chicken and fish recipes contain a natural source of Omega-6, taurine and Omega-3 helping support a cats eye, heart, brain and skin health. Complementary wet cat food adding flavour and hydration. Feed with any dry food for a complete and balanced diet. Pack contains 12 x 70g Tins chicken and fish mixed selection. Tuna Fillet, Chicken Breast, Chicken with Cheese, Ocean Fish. PACKAGING MAY VARY as we transition from old to new brand packaging. Sustainable, recyclable packaging, our metal tins and cardboard packaging can be fully recycled and fish, this premium food helps support healthy development and strong immune systems.",
    category: "cat",
    weight: "12 Pack",
    stock: 15,
    featured: true
  },
  {
    id: generateId("Go-Cat Adult Chicken & Duck Dry Cat Food 10kg (Packaging may vary)"),
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
    id: generateId("FELIX Original Mixed Selection in Jelly Wet Cat Food 40x85g"),
    name: "FELIX Original Mixed Selection in Jelly Wet Cat Food 40x85g",
    price: 15,
    images: [
      "/cat/flex.png", 
      "/cat/flex1.png", 
      "/cat/flex2.png",
      "/cat/flex3.png",
      "/cat/flex4.png"
    ],
    description: "• 100% Natural, high protein Ingredients that your pet will love. Suitable for all adult and mature cat",
    category: "cat",
    weight: "40 pack",
    stock: 18,
    featured: false
  },
  {
    id: generateId("GOURMET Perle Ocean Collection Wet Cat Food 40x85g"),
    name: "GOURMET Perle Ocean Collection Wet Cat Food 40x85g",
    price: 23.99,
    images: [
      "/cat/perle0.png", 
      "/cat/perle1.png",
      "/cat/perle2.png",
      "/cat/perle3.png",
      "/cat/perle4.png",
    ],
    description: "• Gourmet Perle Ocean Collection multipack contains delicious recipes in Gravy with Tuna with Shrimp, Plaice with Shrimp, OceanFish and Tuna, Salmon and WhiteFish • Complete pet food for adult cats, 100% complete and balanced nutritional pet food for adult cats (aged 1 to 7)",
    category: "cat",
    weight: "3.4kg",
    stock: 19,
    featured: true
  },
  {
    id: generateId("Purina ONE Adult Dry Cat Food Rich in Chicken 6kg, Packaging may vary"),
    name: "Purina ONE Adult Dry Cat Food Rich in Chicken 6kg, Packaging may vary",
    price: 20.89,
    images: [
      "/cat/purina.png", 
      "/cat/purina1.png", 
      "/cat/purina2.png", 
      "/cat/purina3.png", 
      "/cat/purina4.png", 
    ],
    description: "• You could see a visible difference in your cat's health in just 3 weeks with the Purina ONE 3-week challenge; supporting a healthier digestion, higher energy and vitality levels, healthy skin, brighter eyes and a shinier coat",
    category: "cat",
    weight: "6kg",
    stock: 14,
    featured: false
  },
  {
    id: generateId("Sheba Select Slices Adult Cat Food Pouch Poultry Selection in Gravy Mega-Pack 40 x 85g"),
    name: "Sheba Select Slices Adult Cat Food Pouch Poultry Selection in Gravy Mega-Pack 40 x 85g",
    price: 27.99,
    images: [
      "/cat/sheba.png", 
      "/cat/sheba1.png", 
      "/cat/sheba2.png", 
      "/cat/sheba3.png",
      "/cat/sheb43.png",
    ],
    description: "• SHEBA Select Slices create something special out of everyday meals with gourmet cat food - Wet food so exhilarating it makes every cat purr for more.",
    category: "cat",
    weight: "3.4kg",
    stock: 11,
    featured: false
  },
  {
    id: generateId("WHISKAS - 1+ Adult Wet Cat Food Pouches - 40 x 85 g - Poultry Selection - Bulk Cat Food Mega pack - 40 Jelly Pouches"),
    name: "WHISKAS - 1+ Adult Wet Cat Food Pouches - 40 x 85 g - Poultry Selection - Bulk Cat Food Mega pack - 40 Jelly Pouches",
    price: 21.99,
    images: [
      "/cat/whiskas.png", 
      "/cat/whiskas1.png", 
      "/cat/whiskas2.png", 
    ],
    description: "With Chicken Meat and Animal Derivatives (35%, including 4% Chicken in the Chunk*), Cereals, Minerals, Derivatives of Vegetable Origin , Various Sugars, *Chunk typically 40% of product With Duck Meat and Animal Derivatives (35%, including 4% Duck in the Chunk*), Cereals, Minerals, Derivatives of Vegetable Origin, Various Sugars, *Chunk typically 40% of product With Poultry Meat and Animal Derivatives (35%, including 4% Poultry in the Chunk*), Cereals, Minerals, Derivatives of Vegetable Origin, Various Sugars, *Chunk typically 40% of product With Turkey Meat and Animal Derivatives (35%, including 4% Turkey in the Chunk*), Cereals, Minerals, Derivatives of Vegetable Origin, Various Sugars, *Chunk typically 40% of product",
    category: "cat",
    weight: "4.5kg",
    stock: 16,
    featured: true
  },
  {
    id: generateId("Automatic Cat Feeder and Water Dispenser with Stainless Steel Bowl Dog Gravity Food Feeder and Waterer for Small Medium Pets Puppy Kitten 1 Gallon x 2"),
    name: "Automatic Cat Feeder and Water Dispenser with Stainless Steel Bowl Dog Gravity Food Feeder and Waterer for Small Medium Pets Puppy Kitten 1 Gallon x 2",
    price: 39.9,
    images: [
      "/acc/bowl.png",
      "/acc/bowl1.png",
      "/acc/bowl2.png",
      "/acc/bowl3.png",
      "/acc/bowl4.png",
    ],
    description: "• Cat Dog Automatic Feeder and Water Dispenser: includes 1 automatic food feeder and 1 water dispenser, suitable for small and medium dogs or cats. • Upgraded Materials: water dispenser made of safe, natural material with a movable stainless steel bowl—sturdy, rust‑resistant, and easy to clean. • Large Capacity: holds about 6 lbs of food and about 1 gallon of water, lasting 7–9 days for small/medium pets, 3–5 days for large pets. • Gravity Feeder: automatically refills food and water by gravity, perfect for when you’re away. • Novel Design: leak‑proof spiral and spring valve with a transparent storage bottle for easy refilling. • Tips: hand wash recommended; if using dishwasher, turn off heating to avoid high-temperature cleaning.",
    category: "cat",
    weight: "1 Gallon x 2",
    stock: 15,
    featured: false
  },
  {
    id: generateId("Automatic Cat Feeders, 3L Timed Cat Dry Food Dispenser, Dual Power Supply, Programmable Portion Size, Auto Pet Feeder for Cats and Small Dogs"),
    name: "Automatic Cat Feeders, 3L Timed Cat Dry Food Dispenser, Dual Power Supply, Programmable Portion Size, Auto Pet Feeder for Cats and Small Dogs",
    price: 39.99,
    images: [
      "/acc/c.png",
      "/acc/c1.png",
      "/acc/c2.png",
      "/acc/c3.png",
      "/acc/c4.png",
      "/acc/c5.png",
      "/acc/c6.png",
      "/acc/c7.png",

    ],
    description: "• Programmable Timed Feeding: Create a personalized feeding schedule with multiple meals per day; each portion is about 7–9g. • Easy to Use & Maintain: LCD screen for quick setup, manual dispense option, proper angle to avoid food accumulation, removable tray for cleaning, and secure lid lock. • Appropriate Capacity: 3L/12 cup food storage keeps pets fed for several days, perfect for weekends and trips. • Dual Power Supply & Anti-Clogging: Works with 5V DC adapter or 3 D-cell batteries (not included), ensuring continuous operation. • Satisfaction Guaranteed: Built with user comfort and pet safety in mind; contact support if any issues arise.",
    category: "cat",
    weight: "3L capacity",
    stock: 20,
    featured: false
  },
  {
    id: generateId("Potaroma Cat Toys Chew Ropes 3Pcs with Refillable Natural Catnip, Safe Teeth Cleaning Toy for Indoor Kittens, Interactive Cat Nip Kitty Toys for All Breeds 19.5 Inches"),
    name: "Potaroma Cat Toys Chew Ropes 3Pcs with Refillable Natural Catnip, Safe Teeth Cleaning Toy for Indoor Kittens, Interactive Cat Nip Kitty Toys for All Breeds 19.5 Inches",
    price: 8.98,
    images: [
      "/acc/r1.png",
      "/acc/r2.png",
      "/acc/r3.png",
      "/acc/r4.png",
      "/acc/r5.png",
    ],
    description: "• Teething Fun: Perfect for kittens and adult cats, these chew toys help with dental care, combat tartar, and freshen breath. • Infused with Catnip Aroma: Refillable catnip bag emits a calming scent that keeps cats engaged and relaxed. • Energetic Exercise: Appealing textures and tassels encourage healthy play and self‑amusement, keeping your cat active. • Quiet Play: Soft colorful ropes allow quiet playtime without disturbing owners, with fun snake‑like shapes. • Safe and Organic: Made with organic cotton rope, no metal wires, and includes a reusable catnip bag for eco‑friendly enrichment.",
    category: "cat",
    weight: "19.5 Inches (set of 3)",
    stock: 30,
    featured: true
  },
  {
    id: generateId("Fashion's Talk Cat Toys Variety Pack for Kitty 20 Pieces"),
    name: "Fashion's Talk Cat Toys Variety Pack for Kitty 20 Pieces",
    price: 9.99,
    images: [
      "/acc/toy1.png",
      "/acc/toy2.png",
      "/acc/toy3.png",
      "/acc/toy4.png",
      "/acc/toy5.png",
    ],
    description: "Warm Reminder: Randomly assembled product bundle with periodically updated styles and colors. Includes 20 different toys: cat wand toy, cat ball toys, catnip mice, rattle toys, feather toys, and more. Keeps your cat busy when you're away, helping release energy with feathers, balls, catnip, and mice. Contains small balls; always supervise your pet during play. Strong but not indestructible—remove and replace if damaged. Great as a holiday, birthday, or everyday gift set for your cat.",
    category: "cat",
    weight: "20 pieces",
    stock: 40,
    featured: false
  },
  {
    id: generateId("Andiker Cat Spiral Spring, 12 Pc Cat Creative Toy to Kill Time and Keep Fit Interactive Cat Toy Sturdy Heavy Plastic Spring Colorful Springs Cat Toy for Swatting, Biting, Hunting Kitten Toys"),
    name: "Andiker Cat Spiral Spring, 12 Pc Cat Creative Toy to Kill Time and Keep Fit Interactive Cat Toy Sturdy Heavy Plastic Spring Colorful Springs Cat Toy for Swatting, Biting, Hunting Kitten Toys",
    price: 5.00,
    images: [
     "/acc/t1.png",
      "/acc/t2.png",
      "/acc/t3.png",
      "/acc/t4.png",
      
    ],
    description: "4 Bright Colors: Yellow, green, pink/red, and blue attract cats' attention. Sturdy and long-lasting, made of thick 1.8mm quality plastic for safe biting. Helps release a cat's natural instincts to chase, bounce, and hunt. The owner can throw these springs to make them bounce, drawing attention and keeping pets active. Soft, elastic, lightweight, and fun for endless interactive play.",
    category: "cat",
    weight: "12 pieces",
    stock: 50,
    featured: true
  },
  {
    id: generateId("Cat Toys Laser Pointer for Indoor, Rechargeable, 7 Adjustable Wand Red Light Pet Interactive Cat Mouse Toys to Keep Busy for Kitten Dog Chase Play"),
    name: "Cat Toys Laser Pointer for Indoor, Rechargeable, 7 Adjustable Wand Red Light Pet Interactive Cat Mouse Toys to Keep Busy for Kitten Dog Chase Play",
    price: 7.00,
    images: [
      "/acc/l1.png",
      "/acc/l2.png",
      "/acc/l3.png",
      "/acc/l4.png",
      "/acc/l5.png",
      "/acc/l6.png",
      "/acc/l7.png",
    ],
    description: "Interactive Cat Toys with high-quality aluminum alloy shell and metal clip design. 7-in-1 modes: red dot, mice, butterfly, smile face, star; switch between red, purple, and white light. Purple light checks currency or pets, white light for emergency, red for interactive play. Perfect for indoor exercise, providing fun and agility training. USB direct charging—no batteries needed. A thoughtful gift that strengthens the bond between you and your pet.",
    category: "cat",
    weight: "1 piece",
    stock: 35,
    featured: true
  },
  
  {
  id: generateId("BABORUI Interactive Cat Toy Ball - Automatic Interactive Cat Toys for Indoor Cats with 3 Tails, 2 Speeds Rechargeable Cat Enrichment Toys for Small/Medium/Large Cats to Keep Them Busy(Blue)"),
  name: "BABORUI Interactive Cat Toy Ball - Automatic Interactive Cat Toys for Indoor Cats with 3 Tails, 2 Speeds Rechargeable Cat Enrichment Toys for Small/Medium/Large Cats to Keep Them Busy (Blue)",
  price: 9.00,
  images: [
    "/acc/a1.png",
    "/acc/a2.png",
    "/acc/a3.png",
    "/acc/a4.png",
    "/acc/a5.png",
    "/acc/a6.png",
    "/acc/a7.png",
    "/acc/a8.png",
  ],
  description: "• A new choice for indoor entertainment: rolls quickly, emits cat‑attracting chittering sound, stimulates hunting instincts while reducing furniture scratching. • Intelligent interaction: Normal mode (green light) runs 5 minutes then stops; Intelligent mode (blue light) sleeps after 5 minutes and reactivates on touch. • Two speeds: fast or slow, suitable even for short‑legged cats. • Triple fun: three tails with bells add extra stimulation and curiosity. • Safe silicone shell, durable and chew‑resistant for long‑lasting use. • Convenient rechargeable design with easy‑to‑clean removable C‑buckle.",
  category: "cat",
  weight: "1 piece",
  stock: 25,
  featured: false
},
{
  id: generateId("Potaroma Cat Toys Saury Fish, 3 Pack, Catnip Crinkle Sound, Soft and Durable, Interactive Kitten Kicker for Indoor Kitty Exercise 9.4 Inches for All Breeds"),
  name: "Potaroma Cat Toys Saury Fish, 3 Pack, Catnip Crinkle Sound, Soft and Durable, Interactive Kitten Kicker for Indoor Kitty Exercise 9.4 Inches for All Breeds",
  price: 12.9,
  images: [
    "/acc/f1.png",
    "/acc/f2.png",
    "/acc/f3.png",
    "/acc/f4.png",
    "/acc/f5.png",
    "/acc/f6.png",
  ],
  description: "• Cozy Companion: Soft plush material and baby‑level cotton make these fish toys perfect for snuggling and chewing. • Organic Catnip Filled: Stuffed with 100% pure organic catnip to excite cats and encourage interactive playtime. • Boredom Relief: Encourages chasing and chewing, stimulates hunting instincts, helps cats grow and stay healthy. • Perfect Gift: Set of 3 in bright green, yellow, and orange colors to attract attention. • Durable design backed by responsive customer service for any issues.",
  category: "cat",
  weight: "9.4 Inches (3 pack)",
  stock: 30,
  featured: false
},

  
  
  
];

const dogFoodProducts: Product[] = [
  {
    id: generateId("Burns Pet Nutrition Hypoallergenic Complete Dry Dog Food Adult and Senior Dog Original Chicken and Brown Rice 12 kg"),
    name: "Burns Pet Nutrition Hypoallergenic Complete Dry Dog Food Adult and Senior Dog Original Chicken and Brown Rice 12 kg",
    price: 56.87,
    images: [
      "/dog/burns.png", 
      "/dog/burns1.png",
      "/dog/burns2.png",
      "/dog/burns3.png", 
      "/dog/burns4.png",
    ],
    description: "• Developed by Veterinary Surgeon, John Burns • Award-winning recipe • Natural and complete diet • Hypoallergenic • Highly digestible • Suitable for sensitive dogs",
    category: "dog",
    weight: "5kg",
    stock: 20,
    featured: true
  },
  {
    id: generateId("Harringtons Complete Wet Tray Grain Free Hypoallergenic Adult Dog Food Meaty Bumper Pack 16x400g - Chicken, Lamb, Beef & Turkey - Made with All Natural Ingredients"),
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
    id: generateId("Pedigree Schmackos Mega Pack 110 Strips Snacks, Dog Treat Multipack with Beef, Lamb and Poultry Flavours, 790 g (Pack of 1)"),
    name: "Pedigree Schmackos Mega Pack 110 Strips Snacks, Dog Treat Multipack with Beef, Lamb and Poultry Flavours, 790 g (Pack of 1)",
    price: 12.99,
    images: [
      "/dog/ped.png", 
      "/dog/ped1.png",
      "/dog/ped2.png",
      "/dog/ped3.png",
      "/dog/ped4.png",
    ],
    description: "• Pedigree Schmackos are delicious tender strips that are full of meaty flavours, designed to be a healthy and nutritional treat, made for training and rewarding",
    category: "dog",
    weight: "790gm",
    stock: 23,
    featured: true
  },
  {
    id: generateId("PRO PLAN VETERINARY DIETS HA Hypoallergenic Dry Dog Food 11kg"),
    name: "PRO PLAN VETERINARY DIETS HA Hypoallergenic Dry Dog Food 11kg",
    price: 65.99,
    images: [
      "/dog/pro.png", 
      "/dog/pro1.png",  
      "/dog/pro2.png", 
      "/dog/pro3.png",
      "/dog/pro4.png",
    ],
    description: "• Single hydrolysed protein with low molecular weight to help avoid allergic responses. • Purified carbohydrates sources to help avoid allergic responses",
    category: "dog",
    weight: "11kg",
    stock: 15,
    featured: false
  },
  {
    id: generateId("Wagg Active Goodness Complete Dry Adult Dog Food Beef & Veg 12kg - For All Active Working Dog Breeds"),
    name: "Wagg Active Goodness Complete Dry Adult Dog Food Beef & Veg 12kg - For All Active Working Dog Breeds",
    price: 14.99,
    images: [
      "/dog/waggy.png", 
     "/dog/waggy1.png",  
      "/dog/waggy2.png",  
     "/dog/waggy3.png", 
     "/dog/waggy4.png", 
    ],
    description: "• TASTY & COMPLETE - Contains everything your dog needs to keep them in tip top condition. • MEAT INGREDIENTS - Tasty meat ingredients come first, for healthy and naturally digestible proteins",
    category: "dog",
    weight: "11.6kg",
    stock: 19,
    featured: false
  },
  {
    id: generateId("Wagg Meaty Goodness Complete Dry Adult Dog Food Beef Dinner 12kg - Meaty Ingredients Come 1st"),
    name: "Wagg Meaty Goodness Complete Dry Adult Dog Food Beef Dinner 12kg - Meaty Ingredients Come 1st",
    price: 19.99,
    images: [
      "/dog/2waggy.png", 
     "/dog/2waggy1.png",  
      "/dog/2waggy2.png",  
     "/dog/2waggy3.png", 
     "/dog/2waggy4.png", 
    ],
    description: "• TASTY & COMPLETE - Contains everything your dog needs to keep them in tip top condition. • MEAT INGREDIENTS - Tasty meat ingredients come first, for healthy and naturally digestible proteins",
    category: "dog",
    weight: "12kg",
    stock: 19,
    featured: false
  },
  {
    id: generateId("Wagg Wheat Free Complete Dry Adult Dog Food Chicken & Rice 12kg - For Sensitive Stomachs"),
    name: "Wagg Wheat Free Complete Dry Adult Dog Food Chicken & Rice 12kg - For Sensitive Stomachs",
    price: 27.16,
    images: [
      "/dog/3waggy.png", 
     "/dog/3waggy1.png",  
      "/dog/3waggy2.png",  
     "/dog/3waggy3.png", 
     "/dog/3waggy4.png", 
    ],
    description: "• TASTY & COMPLETE - Contains everything your dog needs to keep them in tip top condition. • MEAT INGREDIENTS - Tasty meat ingredients come first, for healthy and naturally digestible proteins",
    category: "dog",
    weight: "12kg",
    stock: 19,
    featured: false
  },
  {
    id: generateId("Pet Feeding Mat-Absorbent Pet Placemat for Food and Water Bowl, with Waterproof Rubber Backing, Quick Dry Water Dispenser Mat for Dog and Cat (12\"x20\", Striped Dark Gray)"),
    name: "Pet Feeding Mat-Absorbent Pet Placemat for Food and Water Bowl, with Waterproof Rubber Backing, Quick Dry Water Dispenser Mat for Dog and Cat (12\"x20\", Striped Dark Gray)",
    price: 6.98,
    images: [
      "/acc/mat.png",
      "/acc/mat1.png",
      "/acc/mat2.png",
      "/acc/mat3.png",
    ],
    description: "• 【Strong Absorbent & Stain-Resistant】Quickly soaks up spilled water or milk, leaving no traces and keeping the feeding area clean. • 【Anti-Slip & Leak-Proof】Non‑slip rubber backing stays in place and protects floors from leaks. • 【Easy to Clean】Resists pet hair and dust; wipe with a damp cloth or rinse with water. • 【Pet‑Friendly & Durable】Soft, comfortable, tear‑resistant material safe for pets. • 【Versatile Pet Supplies】Generous size suitable for cats, dogs, and other pets, protecting floors during feeding.",
    category: "dog",
    weight: "12\"x20\" mat",
    stock: 25,
    featured: true
  },
 
  
];

interface ProductContextType {
  products: Product[];
  featuredProducts: Product[];
  catFoodProducts: Product[];
  dogFoodProducts: Product[];
  getProductById: (id: string) => Product | undefined;
  searchProducts: (query: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const allProducts = [...catFoodProducts, ...dogFoodProducts];
  
  const getProductById = (id: string) => {
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
