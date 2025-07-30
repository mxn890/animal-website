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
    id: generateId("Applaws Natural Wet Cat Food – Chicken & Fish 12-Pack"),
    name: "Applaws Natural Wet Cat Food – Chicken & Fish 12-Pack",
    price: 15.99,
    images: [
      "/cat/applaws.png", 
      "/cat/applaws1.png", 
      "/cat/applaws2.png", 
      "/cat/applaws3.png", 
      "/cat/applaws4.png"
    ],
    description: "Give your cat real meat with Applaws Natural Wet Cat Food. 12-pack of chicken & fish in broth. Grain-free, nutritious, and 100% natural. Treat your cats to the best with Applaws Natural Wet Cat Food Multipack—an all-natural option featuring real chicken and fish in a delicious broth. Each 70g tin contains only natural ingredients, ensuring your cat receives a healthy meal with complete confidence. This multipack gives you variety and nutrition for your cats. Applaws Natural Wet Cat Food is suitable for all breeds and ages—and helps maintain a healthy coat, lean muscle, and hydration. ",
    category: "cat",
    weight: "12 Pack",
    stock: 15,
    featured: true,
  },
  {
    id: generateId("Go-Cat Adult Dry Cat Food 10kg"),
    name: "Go-Cat Adult Dry Cat Food 10kg – Buy Online at ZeenMart",
    price: 41.23,
    images: [
      "/cat/gocat.png", 
      "/cat/gocat1.png", 
      "/cat/gocat2.png", 
      "/cat/gocat3.png",
      "/cat/gocat4.png"
    ],
    description: "Shop Go-Cat Adult Dry Cat Food 10kg – balanced, tasty, and rich in nutrients. Ideal for adult cats. Order now from ZeenMart with fast delivery Give your cat the best dry food for adult cats with this premium recipe made from real salmon. Rich in omega-3 for a healthy coat and skin, this dry cat food for adult cats also includes prebiotics and probiotics to support digestive health—a top choice for those seeking the best dry food for cats with complete nutrition.",
    category: "cat",
    weight: "10kg",
    stock: 12,
    featured: true
  },
  {
    id: generateId("felix-cat-food-mixed-jelly-40x85g"),
    name: ": Felix Cat Food Mixed Jelly 40x85g – Shop at ZeenMart",
    price: 15,
    images: [
      "/cat/flex.png", 
      "/cat/flex1.png", 
      "/cat/flex2.png",
      "/cat/flex3.png",
      "/cat/flex4.png"
    ],
    description: "Felix cat food offers a complete and balanced meal in every pouch. Each variety contains real meat and fish derivatives, with chunks in succulent jelly—providing essential omega‑6 fatty acids, vitamins A & E, and taurine for adult cat health. With moisture around 83%, Felix Wet Cat Food delivers hydration alongside nutrition, making Felix Wet Cat Food a trusted choice for daily feeding. Suitable for adult cats and mature cats who enjoy variety and taste with quality ingredients",
    category: "cat",
    weight: "40 pack",
    stock: 18,
    featured: false
  },
  {
    "id": "gourmet-ocean-cat-food-40x85g",
    "name": "Gourmet  Perle Wet Cat Food Ocean Collection (40 Pack, 85g Each)",
    "price": 23.99,
    "images": [
      "/cat/perle0.png",
      "/cat/perle1.png",
      "/cat/perle2.png",
      "/cat/perle3.png",
      "/cat/perle4.png"
    ],
    description: "GOURMET Perle Ocean Collection Wet Cat Food 40x85g - Quality Nutrition in Every Serve. Make sure your feline friend gets the tasty, nutritious meals they deserve with this 40 multipack featuring delicious recipes in gravy - Tuna with Shrimp, Plaice with Shrimp, Ocean Fish and Tuna, and Salmon with Whitefish. Formulated as complete and balanced wet cat food for adult cats 1-7 years, containing all essential nutrients for health and vitality. Recommended by pet care experts as a top choice in the wet food category.",
    category: "cat",
    weight: "3.4kg",
    stock: 19,
   featured: true,
  },
  {
    id: generateId("adult-dry-cat-food-purina-one-chicken-6kg"),
    name: "Adult Dry Cat Food | Purina ONE Chicken 6kg – ZeenMart",
    price: 20.89,
    images: [
      "/cat/purina.png", 
      "/cat/purina1.png", 
      "/cat/purina2.png", 
      "/cat/purina3.png", 
      "/cat/purina4.png", 
    ],
    description: "• You could see a visible difference in your cat's health in just 3 weeks with the Purina ONE 3-week challenge; supporting a healthier digestion, higher energy and vitality levels, healthy skin, brighter eyes and a shinier coat Purina ONE Adult Dry Cat Food 6kg with real chicken. Designed to support adult cats’ immune health, digestion, and muscle strength",
    category: "cat",
    weight: "6kg",
    stock: 14,
    featured: false
  },
  {
    id: generateId("sheba-adult-cat-food-poultry-gravy-40x85g"),
    name: "Sheba Adult Cat Food Poultry Gravy 40x85g | ZeenMart",
    price: 27.99,
    images: [
      "/cat/sheba.png", 
      "/cat/sheba1.png", 
      "/cat/sheba2.png", 
      "/cat/sheba3.png",
      
    ],
    description: "•Treat your cat to the tasty Sheba Select Slices Poultry Selection in Gravy. This Mega pack has 40 of the easy-to-serve 85g pouches that are filled with tender poultry meat in delicious, rich gravy. Using an easy-to-open pouch, which can be conveniently served for perfectly portioned freshness, the Sheba brand of premium wet cat foods provides all that adult cats require in order to lead a happy and healthy life. Sheba has been specially crafted with premium ingredients with additional care for your cat's health, so you can provide quality food that even your discerning cats will enjoy!",
    category: "cat",
    weight: "3.4kg",
    stock: 11,
    featured: false
  },
  {
    id: generateId("whiskas-adult-wet-cat-food-40x85g-poultry-jelly"),
    name: "WHISKAS Adult Wet Cat Food 40x85g | ZeenMart",
    price: 21.99,
    images: [
      "/cat/whiskas.png", 
      "/cat/whiskas1.png", 
      "/cat/whiskas2.png", 
    ],
    description: "This premium Adult Wet Cat Food offers the specific nutritional needs of adult cats. Each of the foods also has 35% meat and animal derivatives, including 4% animal chunks to add meat flavor and texture. The meat-in-jelly options include: Chicken: 35% meat and animal derivatives (including 4% chicken chunks), with cereals, minerals, vegetable derivatives, and sugars. Duck: 35% meat and animal derivatives (including 4% duck chunks), cereals, vital minerals, vegetable derivatives, and sugars. Poultry: 35% meat and animal derivatives (including 4% poultry chunks), cereals, minerals, vegetable derivatives, and sugars. Turkey: 35% meat and animal derivatives (including 4% turkey chunks), cereals, minerals, vegetable derivatives, and sugars.",
    category: "cat",
    weight: "4.5kg",
    stock: 16,
    featured: true
  },
  {
    id: generateId("fancy-feast-beef-carrot-gravy-wet-cat-food-12-pack"),
    name: "Fancy Feast Beef Gravy Wet Cat Food | ZeenMart",
    price: 13.44,
    images: [
      "/cat/fancy.png",
      "/cat/fancy1.png",
      "/cat/fancy2.png",
      "/cat/fancy3.png",
      "/cat/fancy4.png",
      "/cat/fancy5.png",
      "/cat/fancy6.png",
      "/cat/fancy7.png",
    ],
    description: "• Give your feline friend a delicious and nutritious mealtime experience with Fancy Feast Petites Tender Beef with Carrots in Gourmet Gravy - a gourmet wet cat food made to please even the pickiest eaters. With tender beef, tasty carrots, and a tasty, savory gravy, this wet cat food with gravy comes in perfectly portioned tubs to reduce waste and make feeding time a breeze. Wet cat food gravy is not only delicious and nutritious; it also gives pleasure and indulgence at mealtime for cats of all life stages. You may be feeding a kitten or feeding a senior cat; with every bite, your cat is receiving complete and balanced nutrition that a trusted and quality brand supports.",
    category: "cat",
    weight: "0.95kg", // approx 12 x 2.8oz
    stock: 12,
    featured: false
  },

  {
    id: generateId("rachael-ray-wet-cat-food-tuna-purrfection"),
    name: "Rachael Ray Cat Food Tuna Purrfection | ZeenMart",
    price: 14.16,
    images: [
      "/cat/n1.png",
      "/cat/n2.png",
      "/cat/n3.png",
      "/cat/n4.png"
    ],
    description: "•Treat your furry companion to the upscale dining experience they deserve with Rachael Ray cat food, where superior taste meets great nutrition all in one. Rachael Ray Nutrish wet cat food is made with real tuna and is grain-free to support the health and wellness of your adult cat. Each 2.8oz cup contains a rich & delicious recipe that is nutritious and tasty! This Rachael Ray Nutrish is for fussy pet owners who prioritize their cat's comfort and well-being. From high-quality ingredients to expert formulation, it really is a good choice for satisfying all your pet's mealtime needs.",
    category: "cat",
    weight: "0.95kg", // 12 × 2.8oz ≈ 33.6oz ≈ 0.95kg
    stock: 12,
    featured: false
  },

  {
    id: generateId("temptations-jumbo-stuff-cat-treats"),
    name: "Temptations Jumbo Stuff Cat Treats | ZeenMart",
    price: 8.48,
    images: [
      "/cat/t.png",
      "/cat/t1.png",
      "/cat/t2.png",
      "/cat/t3.png",
      "/cat/t4.png",
      "/cat/t5.png",
      "/cat/t6.png",
      "/cat/t7.png",
      "/cat/t8.png",
      "/cat/t9.png",
      "/cat/t10.png",
      "/cat/t11.png",
    ],
    description: "•Give your cat a palatable reason to purr with Temptations Jumbo Stuff cat treats. Crunchy on the outside and soft on the inside, these jumbo stuffed chicken-flavor cat treats are ideal for adult cats. Whether you are rewarding good behavior or just giving some love, Temptations Jumbo Stuff cat treats can make any moment.",
    category: "cat",
    weight: "397g", // 14oz ≈ 397g
    stock: 20,
    featured: false
  },
  
  
  
  {
    id: generateId("automatic-cat-feeder-water-dispenser"),
    name: "Automatic Cat Feeder and Water Dispenser | ZeenMart",
    price: 39.9,
    images: [
      "/acc/bowl.png",
      "/acc/bowl1.png",
      "/acc/bowl2.png",
      "/acc/bowl3.png",
      "/acc/bowl4.png",
    ],
    description: "• 2-in-1 Feeder/Waterer Set: Comes with one automatic feeder for cats and dogs and one automatic water dispenser, most suitable for small to medium-sized pets like kittens and puppies.Durable, BPA-Free Plastic: Made of durable, BPA-free plastic with non-rust stainless steel, a removable feeding bowl, and hygienic and easy to clean.  Large Capacity Food Storage: Container holds up to 6 lbs of dry food with a water bottle dispenser that holds approximately 1 gallon of water, lasts for 7-9 days for small to medium-sized pets or 3-5 days for larger pets. Gravity Water and Food Feed: This automatic gravity-fed food and water feed will keep your pets full when it is convenient for you or when you are not home! Smart Design: Allows for a leak-proof spring spiral valve. Also comes with a transparent food and water container for easy observation and easy replenishment. Care Instructions: Handwashing recommended, but if you choose to use the dishwasher, ensure that the heat-dry setting is turned off to protect the plastic parts.",
    category: "cat",
    weight: "1 Gallon x 2",
    stock: 15,
    featured: false
  },
  {
    id: generateId("automatic-cat-feeder-3l-timed-dispenser’"),
    name: "Automatic Cat Feeder | Timed Dispenser 3L – ZeenMart",
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
    id: generateId("blue-buffalo-dry-cat-food-digestive-care-11l"),
    name: "Blue Buffalo Dry Cat Food Digestive Care | ZeenMartg",
    price: 44.98,
    images: [
      "/cat/blue.png",
      "/cat/blue2.png",
      "/cat/blue3.png",
      "/cat/blue4.png",
      "/cat/blue5.png",
      "/cat/blue6.png",
      "/cat/blue7.png",
      "/cat/blue8.png",
    ],
    description: "• Take care of your cat's digestive health with Blue Buffalo True Solutions Digestive Care Dry Cat Food. This chicken-taste dry food is specifically designed for adult cats with sensitive stomachs, where they get the digestive support they need and still enjoy it. This pelleted kibble is made with the real deboned chicken, brown rice, pea protein, barley, oatmeal, and flaxseed, in addition to vitamins, minerals, and probiotics. This provides your cat with complete and balanced nutrition!  Whether your cat has poor digestion or if you just want the best for your cat, Blue Buffalo True Solutions Digestive Care Dry Cat Food provides the support and promotes general health and well-being, and a healthy gut for your cat.",
    category: "cat",
    weight: "11 lb bag",
    stock: 20,
    featured: false
  },
  {
    id: generateId("9lives-pate-wet-cat-food-12-pack"),
    name: "9Lives Pate Wet Cat Food Variety Pack | ZeenMart",
    price: 14.99,
    images: [
      "/cat/l1.png",
      "/cat/l2.png",
      "/cat/l3.png",
      "/cat/l4.png",
      "/cat/l5.png",
      "/cat/l6.png",
      "/cat/l7.png",
      "/cat/l8.png",
      "/cat/l9.png",
    ],
    description: "• Contains twelve (12) 5.5 oz cans: four Meaty Paté Super Supper, four Meaty Paté with Real Chicken & Tuna, and four Meaty Paté with Real Chicken. • 100% complete nutrition for kittens and adult maintenance. • Moist and tender paté texture that cats love. • Perfect for daily feeding or as a treat. • Flavor: Meaty Paté Favorites. • Form: wet food, providing balanced nutrition and hydration.",
    category: "cat",
    weight: "5.5 oz x 12 cans",
    stock: 25,
    featured: false
  },
  
  
  {
    id: generateId("potaroma-toys-cat-chew-ropes-catnip"),
    name: "Potaroma Toys Cat Chew Ropes | ZeenMart",
    price: 8.98,
    images: [
      "/acc/r1.png",
      "/acc/r2.png",
      "/acc/r3.png",
      "/acc/r4.png",
      "/acc/r5.png",
    ],
    description: "• Supports Dental Health: These cat chew ropes are suitable for kittens and adult cats, as they help reduce tartar buildup and also help to freshen breath and support healthy teething habits for young kittens. Refillable Catnip Pouch: In addition to the calming effect of catnip's natural aroma, each pouch is refillable to help keep your kitty calm and entertained.  Encourages Active Play: With a textured rope body and tassel ends, cats follow their instincts to play in a variety of ways, which supports exercise and reduces boredom.  Quiet & Gentle: The colorful rope (soft) material allows for a quiet form of indoor play that does not disrupt the house or disturb housemates, whether they are daytime friends or nighttime companions   Safe & Eco-Friendly: Made from organic cotton; no metal wire allows our toys to stand up to pet-safe, non-toxic, robust use, and each comes with a reusable catnip bag to further sustainable enrichment objectives.",
    category: "cat",
    weight: "19.5 Inches (set of 3)",
    stock: 30,
    featured: true
  },
  {
    id: generateId("cat-toys-variety-pack-20-pcs-fashions-talk"),
    name: "Cat Toys Variety Pack | 20 Pcs for Kitty | ZeenMart",
    price: 9.99,
    images: [
      "/acc/toy1.png",
      "/acc/toy2.png",
      "/acc/toy3.png",
      "/acc/toy4.png",
      "/acc/toy5.png",
    ],
    description: "Entertain your kitty for hours with the Fashion's Talk Cat Toys Variety Pack (20 Pieces)! This bundle is an assemblage of cat toys, including cat wands, feather toys, rattling balls, catnip mice, and more. There are plenty of stimulating and fun toys to play with and help promote play, exercise, and mental stimulation. Each set contains different styles of toys in updated styles and colors to keep playtime interesting and fresh. Great for when you're not home for a little alone playtime, this bulk pack helps let your kitty get energy out and stay active.  Notes: This toy set has small parts (balls and toys). Always supervise the cat while playing. The toys will be durable for active play, but if any toys are damaged, then they should be removed as a safe practice. ",
    category: "cat",
    weight: "20 pieces",
    stock: 40,
    featured: false
  },
  {
    id: generateId("andiker-spiral-spring-cat-toy-12pc"),
    name: "Spiral Spring Cat Toy | Fun 12 Pc Set for Cats – ZeenMart",
    price: 5.00,
    images: [
     "/acc/t1.png",
      "/acc/t2.png",
      "/acc/t3.png",
      "/acc/t4.png",
      
    ],
    description: "Keep your cat active with this 12 Pc Andiker Spiral Spring Cat Toy set. Durable, colorful, and perfect for swatting, hunting & interactive play. Shop at ZeenMart.    Keep your cat active with this 12 Pc Andiker Spiral Spring Cat Toy set. Durable, colorful, and perfect for swatting, hunting & interactive play. Shop at ZeenMart.   The springs are very light and flexible, so they can become your cat’s best friends in the game of chasing, jumping, and hunting. It doesn’t matter if your cat is playing alone or if you are throwing the springs around—you will get an interactive toy that keeps your cat’s activity up, mind engaged, and in good shape.",
    category: "cat",
    weight: "12 pieces",
    stock: 50,
    featured: true
  },
  {
    id: generateId("cat-toy-laser-pointer-rechargeable-interactive-wand"),
    name: "Cat Toy Laser Pointer | Fun Pet Play Wand – ZeenMart",
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
    description: "Keep your cat active with this rechargeable Cat Toy Laser Pointer. 7 adjustable modes for endless indoor fun. Shop now at ZeenMart!     Keep your furry friends fit and entertained using a Cat Toy Laser Pointer made of premium materials including an aluminum alloy that is double insulated with a sleek metal clip design. The interactive 7-in-1 wand is the perfect indoor play and agility training tool that flashes fun red light patterns such as dot, mouse, butterfly, smiley, and star.",
    category: "cat",
    weight: "1 piece",
    stock: 35,
    featured: true
  },
  
  {
  id: generateId("baborui-interactive-cat-toy-ball"),
  name: "Interactive Cat Toy Ball – Fun & Smart Play | ZeenMart",
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
  description: "• Transform your indoor cat's playtime into an unforgettable event with the BABORUI Interactive Cat Toy Ball—a tech-savvy, rechargeable toy that invigorates your feline friend’s natural skills and keeps them fit and focused. Interactive Entertainment: The fast-rolling movement and the sound of the chittering noise make your cat's hunting instincts go crazy—they are perfect for getting rid of boredom and protecting furniture from scratching.  Smart Modes: You can select between Normal Mode (green light, 5-min play) and Intelligent Mode (blue light, when touched, it restarts). Adjustable Speeds: It provides two speed options—fast or slow—most suitable even for cats who have short legs or are old. Triple Tail Design: It is equipped with 3 colorful tails with bells to raise the curiosity and the mental stimulation.",
  category: "cat",
  weight: "1 piece",
  stock: 25,
  featured: false
},
{
  id: generateId("potaroma-cat-toys-3-pack-catnip-kicker-indoor"),
  name: "Potaroma Cat Toys | Interactive 3-Pack | ZeenMart",
  price: 12.9,
  images: [
    "/acc/f1.png",
    "/acc/f2.png",
    "/acc/f3.png",
    "/acc/f4.png",
    "/acc/f5.png",
    "/acc/f6.png",
  ],
  description: "• p your cat active and happy with Potaroma Cat Toys – a 3-pack of soft, crinkle catnip kickers. Ideal for indoor play. Shop now at ZeenMart!",
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
    id: generateId("IAMS Proactive Health Minichunks Adult Dry Dog Food with Real Chicken and Whole Grains 7 lb Bag"),
    name: "IAMS Proactive Health Minichunks Adult Dry Dog Food with Real Chicken and Whole Grains, 7 lb. Bag",
    price: 15.00,
    images: [
      "/dog/i1.png",
      "/dog/i2.png",
      "/dog/i3.png",
      "/dog/i4.png",
      "/dog/i5.png",
      "/dog/i6.png",
      "/dog/i7.png",
      "/dog/i9.png",
      "/dog/i10.png",

    ],
    description: "• IAMS Proactive Health Minichunks crafted with real chicken and whole grains for adult dogs. Supports active energy, strong muscles, and complete balanced nutrition in a smaller kibble size.",
    category: "dog",
    weight: "3.18kg", // 7 lb ≈ 3.18 kg
    stock: 18,
    featured: false
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
    id: generateId("Pedigree Complete Nutrition Adult Dry Dog Food Grilled Steak and Vegetable Flavor 18 lb Bag"),
    name: "Pedigree Complete Nutrition Adult Dry Dog Food, Grilled Steak & Vegetable Flavor, 18 lb. Bag",
    price: 16.9,
    images: [
      "/dog/pedi.png",
      "/dog/pedi1.png",
      "/dog/pedi2.png",
      "/dog/pedi3.png",
      "/dog/pedi4.png",
      "/dog/pedi5.png",
      "/dog/pedi6.png",
      "/dog/pedi7.png",
      "/dog/pedi8.png",
      "/dog/pedi9.png",
      "/dog/pedi10.png",
    ],
    description: "• Pedigree Complete Nutrition adult dry dog food with grilled steak and vegetable flavor. Supports digestive health and provides balanced nutrition for adult dogs.",
    category: "dog",
    weight: "8.16kg", // 18 lb ≈ 8.16 kg
    stock: 15,
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
    id: generateId("Blue Buffalo Life Protection Formula Adult Dry Dog Food Chicken and Brown Rice Recipe 30 lb Bag"),
    name: "Blue Buffalo Life Protection Formula Adult Dry Dog Food, Chicken & Brown Rice Recipe, 30 lb. Bag",
    price: 61.73,
    images: [
      "/dog/blue.png",
      "/dog/blue1.png",
      "/dog/blue2.png",
      "/dog/blue3.png",
      "/dog/blue4.png",
      "/dog/blue5.png",
      "/dog/blue6.png",
      "/dog/blue7.png",
      "/dog/blue8.png",
      "/dog/blue9.png",
     
    ],
    description: "• Blue Buffalo Life Protection Formula made with deboned chicken and brown rice. Helps build and maintain strong muscles, supports coat health, and is crafted with natural ingredients for adult dogs.",
    category: "dog",
    weight: "13.6kg", // 30 lb ≈ 13.6 kg
    stock: 10,
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
    id: generateId("Nutrish Dry Dog Food Real Chicken and Veggies Recipe Whole Health Blend for Adult Dogs 40 lb Bag"),
    name: "Nutrish Dry Dog Food, Real Chicken & Veggies Recipe Whole Health Blend for Adult Dogs, 40 lb. Bag",
    price: 54.99,
    images: [
      "/dog/n.png",
      "/dog/n1.png",
      "/dog/n2.png",
      "/dog/n3.png",
      "/dog/n4.png",
      "/dog/n5.png",
      "/dog/n6.png",
    ],
    description: "• Nutrish Whole Health Blend with real chicken as the #1 ingredient. Formulated for adult dogs with omega‑3 for an active mind, antioxidants for immune support, and lean proteins with whole grains for balanced energy. No artificial preservatives or flavors.",
    category: "dog",
    weight: "18.14kg", // 40 lb ≈ 18.14 kg
    stock: 10,
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

  {
    id: generateId("Hills Science Diet Small and Mini Adult 1-6 Small and Mini Breeds Premium Nutrition Dry Dog Food Chicken and Brown Rice 15.5 lb Bag"),
    name: "Hill's Science Diet Small & Mini, Adult 1-6, Small & Mini Breeds Premium Nutrition, Dry Dog Food, Chicken & Brown Rice, 15.5 lb Bag",
    price: 57.99,
    images: [
      "/dog/h.png",
      "/dog/h1.png",
      "/dog/h2.png",
      "/dog/h3.png",
      "/dog/h4.png",
      "/dog/h5.png",
      "/dog/h6.png",
      "/dog/h7.png",
      "/dog/h8.png",
      "/dog/h9.png",
      "/dog/h10.png",
    ],
    description: "• Hill's Science Diet premium dry food crafted for small & mini breed adult dogs (ages 1–6). Made with real chicken and brown rice to support digestive health, strong muscles, and overall wellness with balanced nutrition.",
    category: "dog",
    weight: "7.03kg", // 15.5 lb ≈ 7.03 kg
    stock: 12,
    featured: false
  },
  
  {
    id: generateId("Cesar Small Breed Dry Dog Food Filet Mignon Flavor and Spring Vegetables Garnish 12 lb Bag"),
    name: "Cesar Small Breed Dry Dog Food Filet Mignon Flavor and Spring Vegetables Garnish, 12 lb. Bag",
    price: 18.98,
    images: [
      "/dog/ce.png",
      "/dog/ce1.png",
      "/dog/ce2.png",
      "/dog/ce3.png",
      "/dog/ce4.png",
      "/dog/ce5.png",
      "/dog/ce6.png",
      "/dog/ce7.png",
    ],
    description: "• Cesar Small Breed Dry Dog Food with Filet Mignon flavor and spring vegetables garnish. Specially crafted for adult small breed dogs to support digestive health and provide balanced nutrition.",
    category: "dog",
    weight: "5.44kg", // 12 lb ≈ 5.44 kg
    stock: 14,
    featured: false
  },
  
  {
    id: generateId("Purina ONE Chicken and Rice Formula Dry Dog Food 8 lb Bag"),
    name: "Purina ONE Chicken and Rice Formula Dry Dog Food, 8 lb. Bag",
    price: 16.28,
    images: [
      "/dog/red1.png",
      "/dog/red2.png",
      "/dog/red4.png",
      "/dog/red5.png",
      "/dog/red6.png",
      "/dog/red7.png",
      "/dog/red8.png",
      "/dog/red10.png",
    ],
    description: "• Purina ONE Chicken & Rice Formula crafted for adult dogs with high protein for strong muscles, vitamins and minerals for overall health, and support for dental, skin & coat, digestive, heart, and immune health.",
    category: "dog",
    weight: "3.63kg", // 8 lb ≈ 3.63 kg
    stock: 20,
    featured: false
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
