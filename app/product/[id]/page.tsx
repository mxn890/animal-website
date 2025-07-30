'use client';
import { useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle2 as CheckCircle,
  Truck,
  Star,
  Plus,
  Minus,
  Play,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';

interface FAQItem {
  question: string;
  answer: string;
}

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const id = params?.id as string;
  const product = getProductById(id);

  const relatedProducts = product
    ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Product not found</h1>
        <p className="mb-8 text-gray-600">
          The product you are looking for does not exist or has been removed.
        </p>
        <Button
          onClick={() => router.push('/')}
          className="bg-petgreen-600 hover:bg-petgreen-700 text-white"
        >
          Return to Home
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    });
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  // Product-specific data
  const getProductData = (productId: string) => {
    const productData: Record<string, {
      keyFeatures: string[];
      faqs: FAQItem[];
      reviews: Review[];
      video?: string;
    }> = {
      "applaws-natural-wet-cat-food-chicken-fish-12-pack": {
        keyFeatures: [
          "Provides essential amino acids and taurine",
          "Grain-free and complementary to balanced feeding",
          "Suitable for all breeds and all ages",
          "12 x 70g multipack for easy daily serving"
        ],
        faqs: [
          {
            question: "Is Applaws Wet Cat Food good for all cat breeds?",
            answer: "Yes, it's suitable for all breeds and life stages. The natural ingredients and grain-free formula are ideal even for cats with sensitivities."
          },
          {
            question: "Can I feed this wet food daily to my cat?",
            answer: "Applaws is a complementary food, perfect as a daily topper or mix-in with dry cat food for a balanced diet."
          },
          {
            question: "What makes Applaws different from other wet cat foods?",
            answer: "Applaws uses real meat and fish, not derivatives or fillers. It's 100% natural, rich in protein, and free from artificial preservatives."
          }
        ],
        reviews: [
          {
            name: "Sarah Ashley",
            rating: 5,
            comment: "My picky Persian cat loves this wet food! The chicken and fish chunks look fresh and natural. No more leftover food in the bowl.",
            date: "2024-05-15"
          },
          {
            name: "Chris R.",
            rating: 4,
            comment: "Applaws is the only brand I trust now. Grain-free and no weird smell. Highly recommended for cats with sensitive stomachs.",
            date: "2024-04-22"
          },
          {
            name: "Foranld M.",
            rating: 4,
            comment: "I've tried many wet foods, but this one is the most natural-looking. It smells like real chicken and tuna. My cat begs for it every morning.",
            date: "2024-06-10"
          }
        ],
        video: "https://www.youtube.com/embed/rQo2SfBBEeQ"
      },
      // Add similar data for all other products
      "go-cat-adult-dry-cat-food-10kg": {
        keyFeatures: [
          "Rich in essential nutrients for adult cats",
          "Supports healthy digestion with balanced fiber",
          "Promotes strong muscles with high-quality protein",
          "No artificial colors or preservatives"
        ],
        faqs: [
          {
            question: "What is the healthiest dry cat food?",
            answer: "Veterinary experts highlight brands like Hill's Science Diet, Royal Canin, and Purina Pro Plan as among the healthiest dry cat foods."
          },
          {
            question: "Is dry food good for adult cats?",
            answer: "Yes, this formula is balanced for both indoor and outdoor cats."
          },
          {
            question: "Does this food help with hairballs?",
            answer: "While not specifically formulated for hairballs, the balanced fiber content can help with digestion."
          }
        ],
        reviews: [
          {
            name: "Michael T.",
            rating: 4,
            comment: "My cats love this food and their coats look shinier after switching to this brand.",
            date: "2024-03-10"
          },
          
        ]
      },
      "felix-cat-food-mixed-jelly-40x85g": {
  "keyFeatures": [
    "Complete & balanced Felix cat food for adult cats",
    "Mixed selection with real meat & fish chunks in jelly",
    "Made with 100% natural, high-protein ingredients",
    "High moisture content supports hydration & urinary health",
    "Enriched with essential vitamins, minerals, and taurine",
    "Ideal daily diet for adult and mature cats",
    "Convenient 40x85g multipack for variety and portion control",
    "Trusted choice for picky eaters"
  ],
  "faqs": [
    {
      "question": "Is Felix wet food good for cats?",
      "answer": "Yes, Felix provides complete nutrition with high-quality protein and 83% moisture content for hydration."
    },
    {
      "question": "How many pouches should I feed my cat daily?",
      "answer": "Adult cats typically need 3-5 pouches per day, adjusted based on weight and activity level."
    },
    {
      "question": "Does this contain artificial additives?",
      "answer": "No, this formula uses 100% natural ingredients with no artificial colors or preservatives."
    }
  ],
  "reviews": [
    {
      "name": "Sarah K.",
      "rating": 5,
      "comment": "My fussy eater finally found a wet food he loves! The variety pack keeps him interested.",
      "date": "2025-05-15"
    },
    {
      "name": "David L.",
      "rating": 4,
      "comment": "Convenient portion sizes and my cats enjoy all the flavors. Good value multipack.",
      "date": "2025-04-22"
    }
  ],
  
},
"gourmet-ocean-cat-food-40x85g": {
    "keyFeatures": [
      "Quality ingredients for excellent nutrition and taste",
      "100% complete and balanced meals for adult cats",
      "4 delicious ocean fish recipes in gravy",
      "Formulated to support health and longevity",
      "Recommended by pet care experts",
      "Ideal for cats aged 1-7 years",
      "Convenient 40x85g multipack",
      "Perfect for fussy eaters"
    ],
    "faqs": [
      {
        "question": "Is Gourmet Perle good for senior cats?",
        "answer": "Yes, while formulated for adult cats 1-7 years, the high-quality protein and moisture content make it excellent for senior cats too."
      },
      {
        "question": "How many pouches should I feed daily?",
        "answer": "Most adult cats need 3-5 pouches daily, adjusted based on weight and activity level. Always ensure fresh water is available."
      },
      {
        "question": "Does this contain artificial additives?",
        "answer": "No, Gourmet Perle uses natural ingredients without artificial colors or preservatives."
      }
    ],
    "reviews": [
      {
        "name": "Emma R.",
        "rating": 5,
        "comment": "My cat goes crazy for the tuna-shrimp flavor! His coat looks healthier after 2 months on this food.",
        "date": "2024-06-10"
      },
      {
        "name": "Raj P.",
        "rating": 4,
        "comment": "Great variety pack - my cats never get bored. The portions are perfect for our two cats.",
        "date": "2024-05-28"
      }
    ]
    },
    "adult-dry-cat-food-purina-one-chicken-6kg": {
        keyFeatures: [
          "Supports Immune Health",
          "Digestive Wellness,",
          "Suitable for all breeds and all ages",
          "Strong Muscles"
        ],
        "faqs": [
          {
            "question": "Is Purina ONE good for indoor cats?",
            "answer": "Yes, this formula is ideal for indoor cats with its balanced fiber content and calorie-controlled nutrition."
          },
          {
            "question": "How much should I feed my cat daily?",
            "answer": "Feed approximately 50-70g per day for an average 4kg adult cat, adjusting based on activity level."
          },
          {
            "question": "Does this help with hairballs?",
            "answer": "Yes, the natural fiber blend helps reduce hairballs by supporting healthy digestion and coat condition."
          },
          {
            "question": "Why does the packaging vary?",
            "answer": "Purina occasionally updates packaging designs while maintaining the same trusted formula inside."
          }
        ],
        reviews: [
          {
            name: "Sarah Ashley",
            rating: 5,
            comment: "My picky Persian cat loves this wet food! The chicken and fish chunks look fresh and natural. No more leftover food in the bowl.",
            date: "2024-05-15"
          },
          {
            name: "Chris R.",
            rating: 4,
            comment: "Applaws is the only brand I trust now. Grain-free and no weird smell. Highly recommended for cats with sensitive stomachs.",
            date: "2024-04-22"
          },
          {
            name: "Foranld M.",
            rating: 4,
            comment: "I've tried many wet foods, but this one is the most natural-looking. It smells like real chicken and tuna. My cat begs for it every morning.",
            date: "2024-06-10"
          }
        ],
       
      },
      
      // Add similar data for all other products
     

      "sheba-adult-cat-food-poultry-gravy-40x85g": {
        keyFeatures: [
          "Complete & Balanced Nutrition: Formulated specifically for adult cats to promote overall health and peak vitality.",
          "Poultry Selection in Gravy: 8 different combinations of chicken, duck, and poultry flavours, all served in deliciously tempting gravy.",
          "High-Quality Protein: Designed to help maintain lean body mass and healthy energy levels",
          "Ready-To-Serve Pouches: The easy-to-open 85g ready-to-serve pouches make food prep easy and mess-free! ",
          " Mega Pack Value: Includes 40 single servings - ideal for multi-cat households or for long-term feeding. "
        ],
        "faqs": [
          {
            "question": "Is Sheba Poultry Gravy suitable for all cat breeds?",
            "answer": "Yes! Designed for adult cats of all breeds and sizes. The formula is allergen-free and gentle on sensitive stomachs."
          },
          {
            "question": "Can this be fed daily?",
            "answer": "Absolutely. It's a 100% complete meal. Feeding guidelines suggest 2.5-3 pouches daily for a 4kg cat, adjustable with dry food."
          },
          {
            "question": "What makes Sheba unique?",
            "answer": "Natural Ingredients (94% natural derivatives, no fillers), grain-free options available, and specially designed textures cats love."
          }
        ],
        "reviews": [
          {
            "name": "Mia Johnson",
            "rating": 5,
            "comment": "My two cats go crazy for the duck flavor! The gravy is perfect and their coats look shinier after 2 months of feeding Sheba.",
            "date": "2024-03-10"
          },
          {
            "name": "Raj P.",
            "rating": 4,
            "comment": "Great value pack. My Persian cat approves, though she prefers the chicken over duck varieties. No digestive issues at all.",
            "date": "2024-04-05"
          },
          {
            "name": "Sophie L.",
            "rating": 5,
            "comment": "The 40-pack lasts my 3 cats a month. Love that it's complete nutrition - I don't need to supplement with anything else.",
            "date": "2024-06-18"
          }
        ],
       
      },
  
      "whiskas-adult-wet-cat-food-40x85g-poultry-jelly": {
        keyFeatures: [
          "Premium-quality wet food for adult cats with carefully selected nutrient-rich ingredients..",
          "Designed to enhance comfort, enjoyment, and health for your cat.",
          "Recommended and tested by professionally trained animal nutritionists.",
          "Designed to be consistent, fresh, and dependable for the long term. ",
          
        ],
        "faqs": [
      {
        "question": "Is this food suitable for cats with sensitive stomachs?",
        "answer": "Yes, the grain-free formula and natural ingredients are gentle on digestion. However, transition gradually over 7 days if switching from another brand "
      },
      {
        "question": "Can I feed this as my cat's sole diet?",
        "answer": "Yes, it provides 100% complete nutrition. Feeding guidelines recommend 3–4.5 pouches daily for cats weighing 3–5 kg, adjusted for activity level "
      },
      {
        "question": "How does Whiskas ensure ingredient quality?",
        "answer": "Developed with veterinarians at WALTHAM Petcare Science Institute. Ingredients include high-quality protein (e.g., 4% real poultry chunks) and are sustainably sourced "
      }
    ],
        "reviews": [
      {
        "name": "Cheryl D.",
        "rating": 4,
        "comment": "My cats love the variety, but the price fluctuates. Bulk packs are cost-effective for multi-cat homes :cite[2]:cite[6].",
        "date": "2024-10-15"
      },
      {
        "name": "Mark H.",
        "rating": 5,
        "comment": "The jelly texture is a hit! My picky eater finishes every pouch. Mega pack lasts a month for two cats :cite[2]:cite[8].",
        "date": "2024-06-14"
      },
      {
        "name": "Ocado Customer",
        "rating": 4,
        "comment": "Convenient and fresh. My cat’s coat improved noticeably after 2 months. 4.3/5 average from 50+ reviews :cite[8].",
        "date": "2025-05-20"
      }
    ],
       
      },
  
    
      // Continue for all other products...


     "fancy-feast-beef-carrot-gravy-wet-cat-food-12-pack": {
  keyFeatures: [
    "Premium gravy wet cat food made with quality beef and carrots",
    "Loaded with flavor, with a wet cat food gravy soft texture that cats love",
    "Designed to support the cat's health, comfort, and satisfaction in mind",
    "Pet care specialists trust the quality and reliability of this product"
  ],
  faqs: [
    {
      question: "Is this cat food grain-free and suitable for sensitive cats?",
      answer: "Yes, this recipe is crafted without grains and includes easily digestible ingredients, making it suitable for cats with sensitive stomachs. Always transition gradually over 7 days when switching from another brand."
    },
    {
      question: "Can I feed this to kittens or senior cats?",
      answer: "This food is formulated for adult cats, but it may be suitable for kittens above 12 weeks and senior cats with normal appetite. Consult your vet for specific dietary needs."
    },
    {
      question: "How often should I feed my cat this wet food?",
      answer: "Feeding 3 to 4.5 pouches per day is recommended for adult cats weighing 3–5 kg. Adjust according to your cat’s age, activity level, and overall health."
    },
    {
      question: "Is the packaging recyclable?",
      answer: "Yes, the outer cardboard box is recyclable. Please check local recycling rules for the individual pouches."
    }
  ],
  reviews: [
    {
      name: "Emily R.",
      rating: 5,
      comment: "My cat absolutely adores this! The gravy keeps her hydrated and her energy levels are up since switching to this food.",
      date: "2025-07-02"
    },
    {
      name: "David K.",
      rating: 4,
      comment: "Great quality and my cat finishes every bit. Wish the pouches were slightly bigger for larger breeds.",
      date: "2025-06-18"
    },
    {
      name: "Sana T.",
      rating: 5,
      comment: "Noticeable difference in my cat's coat shine and digestion. She’s more playful and eats on time now!",
      date: "2025-05-30"
    }
  ]
},





   "rachael-ray-wet-cat-food-tuna-purrfection": {
  keyFeatures: [
    "Grain-free recipe using real tuna for incredible taste and nutrition",
    "Made with quality ingredients trusted by cat lovers and professionals",
    "Made for your cat's comfort, health, and long-term wellness",
    "Veterinarian tested and recommended for adult cats",
    "Convenient 2.8oz single-serve cups - easy for no-mess feeding and clean up"
  ],

  faqs: [
    {
      question: "Is Rachael Ray Tuna Purrfection suitable for cats with allergies?",
      answer: "Yes, the grain-free recipe and real tuna ingredients make it a gentle option for cats with food sensitivities. However, always consult your vet for specific allergies."
    },
    {
      question: "Can I feed this to kittens?",
      answer: "This formula is designed for adult cats. For kittens, it's best to use food specifically made for their growing nutritional needs unless recommended by your veterinarian."
    },
    {
      question: "How many cups should I feed daily?",
      answer: "For a cat weighing 4–5 kg, feed 2 to 3 cups daily, split across meals. Adjust based on your cat’s activity level and appetite."
    },
    {
      question: "Is the packaging recyclable?",
      answer: "Yes, the outer packaging is recyclable. Please check your local recycling guidelines for the single-serve cups."
    }
  ],

  reviews: [
    {
      name: "Ayesha K.",
      rating: 5,
      comment: "My picky cat actually licks the bowl clean! I love the portion control and the quality tuna smell is real, not artificial.",
      date: "2025-06-30"
    },
    {
      name: "Robert L.",
      rating: 4,
      comment: "Very convenient to serve. The texture and smell are pleasant. My only gripe is I wish they made a larger pack size.",
      date: "2025-05-10"
    },
    {
      name: "Fatima M.",
      rating: 5,
      comment: "No more upset tummy for my cat! Since switching to this, her digestion has improved and her coat looks shinier.",
      date: "2025-07-18"
    }
  ]
},


   "temptations-jumbo-stuff-cat-treats": {
  keyFeatures: [
    "Made with all high-quality ingredients, they are a flavor cats crave",
    "Two textures: crunchy shell and soft meaty center",
    "Great for treating, training, or some bonding time",
    "Recommended daily treatment by pet care experts",
    "Sealed tub to maintain and allow for long-lasting freshness and easy storage"
  ],

  faqs: [
    {
      question: "How many treats can I give my cat per day?",
      answer: "It’s recommended to give up to 10–12 treats per day for adult cats. Always ensure fresh water is available and reduce regular meal portions accordingly."
    },
    {
      question: "Are these treats suitable for kittens?",
      answer: "These treats are designed for adult cats. For kittens under 6 months, consult your veterinarian before feeding."
    },
    {
      question: "Do they help with dental health?",
      answer: "Yes, the crunchy texture can help reduce plaque buildup and support dental health with regular use."
    },
    {
      question: "Do the treats stay fresh after opening?",
      answer: "Yes, the resealable tub is designed to maintain freshness and flavor for weeks after opening, if properly closed and stored in a cool, dry place."
    }
  ],

  reviews: [
    {
      name: "Sadia R.",
      rating: 5,
      comment: "My cats literally run to the tub when they hear the lid open! These treats are their absolute favorite.",
      date: "2025-07-12"
    },
    {
      name: "Jared P.",
      rating: 4,
      comment: "Crunchy outside, soft inside — my cat is obsessed. Would love more flavor options though.",
      date: "2025-06-03"
    },
    {
      name: "Anna B.",
      rating: 5,
      comment: "Great for training! I use these to reward my cat during grooming time. The tub keeps them fresh for weeks.",
      date: "2025-05-22"
    }
  ]
},



"potaroma-toys-cat-chew-ropes-catnip": {
  keyFeatures: [
    "Made from premium pet-safe materials for longevity, comfort, and low maintenance",
    "Intentionally designed to support cats' physical & emotional well-being",
    "Trained and/or veterinary endorsed pet care educators/recommenders",
    "Built for long-term use; high-quality thread and components only"
  ],

  faqs: [
    {
      question: "Is this toy safe for aggressive chewers?",
      answer: "Yes, the chew ropes are made with durable, pet-safe materials designed to withstand repeated biting. Always supervise during play for safety."
    },
    {
      question: "Does the toy contain real catnip?",
      answer: "Yes, it contains 100% natural catnip, which helps attract your cat and promote playful behavior and relaxation."
    },
    {
      question: "Can this toy help with teething or anxiety?",
      answer: "Absolutely. The soft chewable material is great for teething relief, and the calming effects of catnip may help reduce stress or boredom."
    },
    {
      question: "How do I clean the toy?",
      answer: "Spot clean with a damp cloth and mild soap. Avoid soaking to maintain catnip potency and fabric integrity."
    }
  ],

  reviews: [
    {
      name: "Iqra M.",
      rating: 5,
      comment: "My kitten instantly fell in love with it! She chews and wrestles with it for hours. Great quality and smells fresh with catnip.",
      date: "2025-07-10"
    },
    {
      name: "Daniel F.",
      rating: 4,
      comment: "Durable and fun, though I wish it came in a pack of two. The catnip works like magic.",
      date: "2025-06-25"
    },
    {
      name: "Leena T.",
      rating: 5,
      comment: "My older cat rarely plays with toys but LOVES this rope. It's tough and keeps her active throughout the day!",
      date: "2025-05-19"
    }
  ],

},




    "automatic-cat-feeder-water-dispenser": {
  keyFeatures: [
    "Automatic cat feeders and water dispensers with a large food and water capacity",
    "Designed to be durable, hygienic, and easy to use for a long time",
    "Stainless steel feeding bowl to uphold cleanliness and is safe for your pet",
    "Trusted by pet care professionals and tested daily",
    "Easy and hassle-free feeding for cats, dogs, and small pets"
  ],
  faqs: [
    {
      question: "How much food and water does it hold?",
      answer: "It typically holds up to 3.5L of water and 4L of dry food — enough for several days depending on your pet's size and diet."
    },
    {
      question: "Is the bowl removable for cleaning?",
      answer: "Yes, the stainless steel bowl is fully removable and dishwasher-safe for easy hygiene maintenance."
    },
    {
      question: "Can it be used for dogs as well?",
      answer: "Yes, it’s suitable for cats, small to medium dogs, and other small pets."
    },
    {
      question: "Does it require electricity?",
      answer: "No, this model works without electricity for gravity-based feeding and hydration."
    }
  ],
  reviews: [
    {
      name: "Hamza A.",
      rating: 5,
      comment: "Lifesaver for busy days! My cat stays fed and hydrated even when I'm out for work. Super easy to clean too.",
      date: "2025-06-29"
    },
    {
      name: "Grace L.",
      rating: 4,
      comment: "Very sturdy and doesn’t spill. The stainless bowl adds a premium touch. I just wish it had a refill alert.",
      date: "2025-07-01"
    },
    {
      name: "Mariam K.",
      rating: 5,
      comment: "Great for my cat and small dog! Keeps both fed without me needing to refill constantly.",
      date: "2025-07-20"
    }
  ]
},





    "automatic-cat-feeder-3l-timed-dispenser": {
  keyFeatures: [
    "Expertly made, using high-grade construction and food-safe materials",
    "Designed with your pet's comfort and well-being in mind",
    "Recommended by pet care experts and veterinarians",
    "Designed for durability, ease of use, and everyday use"
  ],
  faqs: [
    {
      question: "Can I schedule multiple meals per day?",
      answer: "Yes, this timed dispenser allows you to schedule up to 4 meals per day with customized portion sizes."
    },
    {
      question: "What kind of food does it support?",
      answer: "It works best with dry kibble and semi-moist food. Avoid wet food to prevent clogging."
    },
    {
      question: "Is it battery operated or electric?",
      answer: "It supports both USB power and backup batteries, so your cat is fed even during power outages."
    },
    {
      question: "Does it have a voice recording feature?",
      answer: "Yes! You can record a 10-second message to call your pet at feeding times."
    }
  ],
  reviews: [
    {
      name: "Zohaib M.",
      rating: 5,
      comment: "I love the timer feature and the voice call function. My cat comes running every time it plays my voice!",
      date: "2025-07-15"
    },
    {
      name: "Emma R.",
      rating: 4,
      comment: "Setup was simple and my cat adjusted quickly. Great product, though a mobile app would be a nice upgrade.",
      date: "2025-06-28"
    },
    {
      name: "Nida S.",
      rating: 5,
      comment: "Perfect for my cat’s diet schedule! The portion control helps with weight management too.",
      date: "2025-07-22"
    }
  ]
}
,





"blue-buffalo-dry-cat-food-digestive-care-11lb": {
  "keyFeatures": [
    "Formulated for Digestive Health – provides sensitive stomach support with natural digestibility and prebiotics.",
    "High-Quality Ingredients – real chicken and wholesome grains deliver optimal feline nutrition.",
    "Recommended by Vets – endorsed by veterinary care professionals for effectiveness and quality.",
    "Durable & Dependable – supports ongoing digestive health and daily wellness."
  ],
  "faqs": [
    {
      "question": "Is this food suitable for cats with digestive sensitivities?",
      "answer": "Yes, it's formulated with prebiotics and easily digestible ingredients for cats with sensitive stomachs."
    },
    {
      "question": "Is it appropriate for kittens?",
      "answer": "This formula is designed for adult cats; consult your veterinarian before feeding to kittens."
    }
  ],
  "reviews": [
    {
      "name": "Samina A.",
      "rating": 5,
      "comment": "Superb food for my cat’s digestion—no more stomach upset and her energy has really improved.",
      "date": "2025-07-01"
    },
    {
      "name": "James T.",
      "rating": 4,
      "comment": "Excellent quality but a bit more expensive. Worth it for digestive support.",
      "date": "2025-06-18"
    }
  ]
},

"9lives-pate-wet-cat-food-12-pack": {
  "keyFeatures": [
    "Includes 4 cans each of Meaty Paté Super Supper, Chicken & Tuna, and Real Chicken.",
    "Balanced wet food for nutrition and hydration.",
    "High-Quality ingredients promote energy, immune health, and wellbeing.",
    "Trusted globally by pet experts and cat owners.",
    "Dependable option for daily feeding routines."
  ],
  "faqs": [
    {
      "question": "Can I feed this every day?",
      "answer": "Yes, it's formulated as a complete daily wet food for healthy adult cats."
    },
    {
      "question": "Should leftovers be refrigerated?",
      "answer": "Yes, store unopened cans in a cool, dry place; refrigerate any unused portion."
    }
  ],
  "reviews": [
    {
      "name": "Adeel M.",
      "rating": 5,
      "comment": "Cats absolutely love the flavors. Great variety and excellent value.",
      "date": "2025-07-14"
    },
    {
      "name": "Elisa N.",
      "rating": 4,
      "comment": "Wide flavor selection—my cat prefers the chicken & tuna mix.",
      "date": "2025-06-22"
    }
  ]
},
"cat-toys-variety-pack-20-pcs-fashions-talk": {
  "keyFeatures": [
    "Premier quality materials and safe construction.",
    "Designed for maximum comfort and enjoyment.",
    "Tested and approved by professional pet owners.",
    "Durable enough for repeated, long-term play."
  ],
  "faqs": [
    {
      "question": "What toys are included in the 20-piece set?",
      "answer": "Includes mice, balls, springs, wand toys, and feather teasers to engage every play style."
    },
    {
      "question": "Are these toys safe for kittens?",
      "answer": "Yes, all toys are made from non-toxic materials and are suitable for young cats."
    }
  ],
  "reviews": [
    {
      "name": "Fahad S.",
      "rating": 5,
      "comment": "Fantastic value—20 toys and my cats are never bored.",
      "date": "2025-07-10"
    },
    {
      "name": "Rebecca L.",
      "rating": 4,
      "comment": "A few toys were smaller than expected, but overall great variety and fun.",
      "date": "2025-06-20"
    }
  ]
},

"andiker-spiral-spring-cat-toy-12pc": {
  "keyFeatures": [
    "Bright and colorful in four vivid hues.",
    "Made from durable, safe thick plastic.",
    "Ideal for tossing, batting, and solo play.",
    "Recommended for daily enrichment by pet professionals.",
    "Lightweight and gentle on paws and teeth."
  ],
  "faqs": [
    {
      "question": "Are these toys chew-safe?",
      "answer": "Yes, they use pet-safe plastic designed to resist chewing without sharp edges."
    },
    {
      "question": "Do they roll/bounce well on smooth floors?",
      "answer": "Yes, they perform best on smooth surfaces like hardwood or tile."
    }
  ],
  "reviews": [
    {
      "name": "Zoya H.",
      "rating": 5,
      "comment": "My cats chase and pounce on these springs nonstop—so fun!",
      "date": "2025-07-07"
    },
    {
      "name": "Michael C.",
      "rating": 4,
      "comment": "Lightweight, interactive, and perfect for solo playtime.",
      "date": "2025-06-29"
    }
  ]
},

"cat-toy-laser-pointer-rechargeable-interactive-wand": {
  "keyFeatures": [
    "Premium aluminum build with durable metal clip.",
    "Seven light modes for indoor entertainment.",
    "USB rechargeable—no batteries needed.",
    "Light colors include red, purple, and white.",
    "Vet-tested and approved for safety and fun.",
    "Enhances bonding during active playtime."
  ],
  "faqs": [
    {
      "question": "How long does the battery last per charge?",
      "answer": "A full USB charge provides 8–10 hours of use, depending on light mode."
    },
    {
      "question": "Is it safe around cats’ eyes?",
      "answer": "Yes, when used responsibly—never shine directly into their eyes."
    }
  ],
  "reviews": [
    {
      "name": "Ali M.",
      "rating": 5,
      "comment": "My cat waits excitedly every evening for laser play—we love it!",
      "date": "2025-07-13"
    },
    {
      "name": "Sara W.",
      "rating": 4,
      "comment": "Rechargeable feature is great. Light modes are entertaining and engaging!",
      "date": "2025-06-21"
    }
  ]
},
"baborui-interactive-cat-toy-ball": {
  "keyFeatures": [
    "Built with premium, pet-safe materials.",
    "Ergonomic design for feline comfort and engagement.",
    "Endorsed by pet care professionals.",
    "Long-lasting and reliable for independent play."
  ],
  "faqs": [
    {
      "question": "Does the ball move on its own?",
      "answer": "Yes, it rolls and bounces in random directions to keep your cat entertained."
    },
    {
      "question": "Is this ball effective on carpet?",
      "answer": "It works best on smooth floors like wood or tile but can function moderately well on low-pile carpet."
    }
  ],
  "reviews": [
    {
      "name": "Tina F.",
      "rating": 5,
      "comment": "My kitten plays with this ball for hours—so engaging!",
      "date": "2025-07-03"
    },
    {
      "name": "Haroon J.",
      "rating": 4,
      "comment": "Fun movement but sometimes gets stuck under my furniture.",
      "date": "2025-06-27"
    }
  ]
},


"potaroma-cat-toys-3-pack-catnip-kicker-indoor": {
  "keyFeatures": [
    "Ultra-soft plush and baby-safe cotton—great for cuddling and kicking.",
    "Packed with 100% organic catnip for long-lasting play.",
    "Encourages natural hunting instincts through chasing, biting, and kicking.",
    "Bright, gift-ready set in green, yellow, and orange.",
    "Durable and pet-safe materials for extended use.",
    "Backed by responsive customer care for worry-free purchase."
  ],
  "faqs": [
    {
      "question": "Can these toys be refilled with catnip?",
      "answer": "No, they are sealed and pre-filled with organic catnip for long-term use."
    },
    {
      "question": "Can I wash them in a machine?",
      "answer": "Spot cleaning is recommended to maintain plush quality and catnip scent."
    }
  ],
  "reviews": [
    {
      "name": "Nashit K.",
      "rating": 5,
      "comment": "Bright and playful—my cat kicks and hugs them nonstop!",
      "date": "2025-07-16"
    },
    {
      "name": "Emily V.",
      "rating": 4,
      "comment": "Soft and engaging—perfect for indoor solo play.",
      "date": "2025-06-24"
    }
  ]
},




      "": {
        keyFeatures: [
          "Premium-quality wet food for adult cats with carefully selected nutrient-rich ingredients..",
          "Designed to enhance comfort, enjoyment, and health for your cat.",
          "Recommended and tested by professionally trained animal nutritionists.",
          "Designed to be consistent, fresh, and dependable for the long term. ",
          
        ],
        "faqs": [
      {
        "question": "Is this food suitable for cats with sensitive stomachs?",
        "answer": "Yes, the grain-free formula and natural ingredients are gentle on digestion. However, transition gradually over 7 days if switching from another brand "
      },
      {
        "question": "Can I feed this as my cat's sole diet?",
        "answer": "Yes, it provides 100% complete nutrition. Feeding guidelines recommend 3–4.5 pouches daily for cats weighing 3–5 kg, adjusted for activity level "
      },
      {
        "question": "How does Whiskas ensure ingredient quality?",
        "answer": "Developed with veterinarians at WALTHAM Petcare Science Institute. Ingredients include high-quality protein (e.g., 4% real poultry chunks) and are sustainably sourced "
      }
    ],
        "reviews": [
      {
        "name": "Cheryl D.",
        "rating": 4,
        "comment": "My cats love the variety, but the price fluctuates. Bulk packs are cost-effective for multi-cat homes :cite[2]:cite[6].",
        "date": "2024-10-15"
      },
      {
        "name": "Mark H.",
        "rating": 5,
        "comment": "The jelly texture is a hit! My picky eater finishes every pouch. Mega pack lasts a month for two cats :cite[2]:cite[8].",
        "date": "2024-06-14"
      },
      {
        "name": "Ocado Customer",
        "rating": 4,
        "comment": "Convenient and fresh. My cat’s coat improved noticeably after 2 months. 4.3/5 average from 50+ reviews :cite[8].",
        "date": "2025-05-20"
      }
    ],
       
      },





      "": {
        keyFeatures: [
          "Premium-quality wet food for adult cats with carefully selected nutrient-rich ingredients..",
          "Designed to enhance comfort, enjoyment, and health for your cat.",
          "Recommended and tested by professionally trained animal nutritionists.",
          "Designed to be consistent, fresh, and dependable for the long term. ",
          
        ],
        "faqs": [
      {
        "question": "Is this food suitable for cats with sensitive stomachs?",
        "answer": "Yes, the grain-free formula and natural ingredients are gentle on digestion. However, transition gradually over 7 days if switching from another brand "
      },
      {
        "question": "Can I feed this as my cat's sole diet?",
        "answer": "Yes, it provides 100% complete nutrition. Feeding guidelines recommend 3–4.5 pouches daily for cats weighing 3–5 kg, adjusted for activity level "
      },
      {
        "question": "How does Whiskas ensure ingredient quality?",
        "answer": "Developed with veterinarians at WALTHAM Petcare Science Institute. Ingredients include high-quality protein (e.g., 4% real poultry chunks) and are sustainably sourced "
      }
    ],
        "reviews": [
      {
        "name": "Cheryl D.",
        "rating": 4,
        "comment": "My cats love the variety, but the price fluctuates. Bulk packs are cost-effective for multi-cat homes :cite[2]:cite[6].",
        "date": "2024-10-15"
      },
      {
        "name": "Mark H.",
        "rating": 5,
        "comment": "The jelly texture is a hit! My picky eater finishes every pouch. Mega pack lasts a month for two cats :cite[2]:cite[8].",
        "date": "2024-06-14"
      },
      {
        "name": "Ocado Customer",
        "rating": 4,
        "comment": "Convenient and fresh. My cat’s coat improved noticeably after 2 months. 4.3/5 average from 50+ reviews :cite[8].",
        "date": "2025-05-20"
      }
    ],
       
      },
    };

    return productData[productId] || {
      keyFeatures: [
        "High-quality ingredients",
        "Nutritionally balanced",
        "Veterinary recommended",
        "Suitable for pets of all ages"
      ],
      faqs: [
        {
          question: "Is this food suitable for my pet?",
          answer: "This food is formulated for adult pets. Please consult with your veterinarian for specific dietary recommendations."
        },
        {
          question: "How should I transition my pet to this food?",
          answer: "We recommend mixing increasing amounts of the new food with decreasing amounts of the old food over 7-10 days."
        }
      ],
      reviews: [
        {
          name: "Happy Customer",
          rating: 4,
          comment: "My pet loves this food and it seems to be very high quality.",
          date: "2024-01-01"
        }
      ]
    };
  };

  const { keyFeatures, faqs, reviews, video } = getProductData(product.id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl bg-white">
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": product.name,
          "image": product.images[0],
          "description": product.description,
          "brand": {
            "@type": "Brand",
            "name": product.name.split(' ')[0] // Use first word as brand
          },
          "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "USD",
            "price": product.price,
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.5",
            "reviewCount": reviews.length.toString()
          },
          "review": reviews.map(review => ({
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": review.rating.toString(),
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": review.name
            },
            "datePublished": review.date,
            "reviewBody": review.comment
          }))
        })
      }} />

      <div className="mb-8">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-1 text-gray-700 bg-white hover:text-gray-900 hover:bg-gray-100"
        >
          <ChevronLeft size={18} /> Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images and Video Section */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Thumbnails */}
            <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveImageIndex(index);
                    setShowVideo(false);
                  }}
                  className={`w-16 h-16 min-w-[64px] border rounded-md overflow-hidden transition-all flex-shrink-0 cursor-pointer ${
                    activeImageIndex === index && !showVideo
                      ? 'ring-2 ring-petgreen-500 border-petgreen-500'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    sizes="64px"
                    loading="lazy"
                  />
                </button>
              ))}
              {/* Video Thumbnail */}
              {video && (
                <button
                  onClick={() => setShowVideo(true)}
                  className={`w-16 h-16 min-w-[64px] border rounded-md overflow-hidden transition-all flex-shrink-0 cursor-pointer flex items-center justify-center ${
                    showVideo
                      ? 'ring-2 ring-petgreen-500 border-petgreen-500'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
                    <Play className="text-petgreen-600" size={24} />
                  </div>
                </button>
              )}
            </div>

            {/* Main Image or Video */}
            <div className="flex-1 order-1 md:order-2 relative">
              {showVideo && video ? (
                <div className="border rounded-lg overflow-hidden bg-white p-4 flex items-center justify-center h-[400px] md:h-[500px] relative">
                  <iframe
                    src={video}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${product.name} Video`}
                  ></iframe>
                </div>
              ) : (
                <>
                  <div
                    ref={imageRef}
                    className="border rounded-lg overflow-hidden bg-white p-4 flex items-center justify-center h-[400px] md:h-[500px] relative cursor-zoom-in"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onMouseMove={handleMouseMove}
                  >
                    <Image
                      src={product.images[activeImageIndex]}
                      alt={product.name}
                      width={600}
                      height={600}
                      className="w-full h-full object-contain"
                      sizes="(max-width: 768px) 100vw, 600px"
                      priority={activeImageIndex === 0}
                    />
                    {isHovering && (
                      <div
                        className="absolute inset-0 bg-no-repeat bg-[length:200%] pointer-events-none hidden md:block"
                        style={{
                          backgroundImage: `url(${product.images[activeImageIndex]})`,
                          backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          opacity: 20,
                        }}
                      />
                    )}
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all z-10"
                        >
                          <ChevronLeft size={24} className="text-gray-700" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all z-10"
                        >
                          <ChevronRight size={24} className="text-gray-700" />
                        </button>
                      </>
                    )}
                  </div>

                  {product.images.length > 1 && !showVideo && (
                    <div className="flex justify-center mt-4 gap-2">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                            activeImageIndex === index
                              ? 'bg-petgreen-600 w-4'
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900">{product.name}</h1>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className={`${
                        star <= 4
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({reviews.length} reviews)</span>
              </div>
              <p className="text-2xl font-bold text-petgreen-700 mb-4 text-black">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="bg-petgreen-100 text-petgreen-800 px-2 py-1 rounded text-sm">
                  {product.category === 'dog' ? 'Dog Food' : 'Cat Food'}
                </div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {product.weight}
                </div>
                {product.featured && (
                  <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                    Featured Product
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={20} />
                    <div>
                      <p className="text-green-600 font-medium">
                        In Stock ({product.stock} available)
                      </p>
                      <p className="text-sm text-gray-600">Ships within 1-2 business days</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-600 font-medium">Out of Stock</p>
                )}
              </div>

              <Button
                onClick={handleAddToCart}
                className={`w-full h-12 text-white ${
                  isAddedToCart
                    ? 'bg-teal-600 hover:bg-teal-700'
                    : 'bg-teal-900 hover:bg-teal-900'
                } transition-colors`}
                disabled={isAddedToCart || product.stock === 0}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="mr-2" size={18} /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2" size={18} /> Add to Cart
                  </>
                )}
              </Button>

              <div className="border rounded-lg p-4 hover:border-gray-400 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Truck size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Free Delivery</p>
                    <p className="text-sm text-gray-600">For all orders over $50</p>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                <TabsTrigger
                  value="description"
                  className="py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm text-gray-700 hover:text-gray-900"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="features"
                  className="py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm text-gray-700 hover:text-gray-900"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger
                  value="faqs"
                  className="py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm text-gray-700 hover:text-gray-900"
                >
                  FAQs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4">
                <Card className="p-6 border-gray-200 text-black">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">
                    Product Details
                  </h3>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  
                  {/* Customer Reviews */}
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3 text-gray-900">Customer Reviews</h4>
                    <div className="space-y-4">
                      {reviews.map((review, index) => (
                        <div key={index} className="border-b border-gray-100 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={16}
                                  className={`${
                                    star <= review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium">{review.name}</span>
                          </div>
                          <p className="text-gray-600 text-sm">{review.comment}</p>
                          <p className="text-gray-400 text-xs mt-1">{review.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="mt-4">
                <Card className="p-6 border-gray-200 text-black">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">
                    Key Features
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    {keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check size={16} className="text-petgreen-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>

              <TabsContent value="faqs" className="mt-4">
                <Card className="p-6 border-gray-200 text-black">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-3">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-gray-100 pb-3">
                        <button
                          onClick={() => toggleFaq(index)}
                          className="flex justify-between items-center w-full text-left py-2 font-medium text-gray-800 hover:text-petgreen-700"
                        >
                          <span>{faq.question}</span>
                          {expandedFaqIndex === index ? (
                            <Minus size={18} className="text-petgreen-600" />
                          ) : (
                            <Plus size={18} className="text-petgreen-600" />
                          )}
                        </button>
                        {expandedFaqIndex === index && (
                          <div className="text-gray-600 pb-2 pl-4">{faq.answer}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Customers also bought</h2>
            <Button
              variant="ghost"
              className="text-petgreen-600 hover:text-petgreen-700 hover:bg-petgreen-50"
              onClick={() => router.push(`/products?category=${product.category}`)}
            >
              View all
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-black">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;

