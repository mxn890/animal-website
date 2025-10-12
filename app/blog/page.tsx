'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  Clock,
  User,
  Share2,
  Bookmark,
  CheckCircle,
  AlertTriangle,
  Heart,
  Star,
  PawPrint,
  Calendar,
  Tag,
  ArrowRight,
  Eye,
  ThumbsUp,
  Dog,
  Cat,
  Scale,
  Nut,
  Beef,
  Carrot,
  Shield,
  Zap,
  Smile,
  Activity
} from 'lucide-react';

const PetFoodComparisonBlog = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const blogData = {
    title: "Dog Food vs. Cat Food: Key Nutritional Differences Every Pet Owner Must Know",
    metaDescription: "Discover the key differences between dog food and cat food. Learn why feeding the right food matters for your pet's health. Find vet-approved pet food options at ZeenMart.",
    publishDate: "December 1, 2024",
    readTime: "5 min read",
    author: "Dr. Sarah Johnson",
    authorRole: "Veterinary Nutritionist",
    tags: ["Pet Nutrition", "Cat Food", "Dog Food", "Pet Health", "Animal Diet"],
    stats: {
      views: "2.4K",
      likes: "156",
      comments: "23"
    }
  };

  const keyDifferences = [
    {
      title: "Protein Content",
      cat: "Always higher in protein. Cats need protein for energy, strong muscles, and healthy skin.",
      dog: "Contains protein but also includes more carbohydrates for energy.",
      icon: Beef,
      color: "from-red-500 to-orange-500"
    },
    {
      title: "Taurine",
      cat: "Enriched with taurine, an amino acid vital for cats. Without it, they may suffer from vision loss or heart disease.",
      dog: "Doesn't always have taurine. Dogs can produce taurine naturally, so it isn't essential in their diet.",
      icon: Shield,
      color: "from-amber-500 to-yellow-500"
    },
    {
      title: "Taste and Texture",
      cat: "Richer in flavor and aroma to appeal to picky eaters.",
      dog: "Less intense in flavor. Dogs are less selective compared to cats.",
      icon: Smile,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Calories and Fat",
      cat: "Higher calorie and fat content to fuel their active metabolism.",
      dog: "More moderate levels of fat to prevent weight gain.",
      icon: Zap,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Added Nutrients",
      cat: "Rarely has much fiber since cats don't need it in large amounts.",
      dog: "Often includes fiber and grains to support digestion.",
      icon: Carrot,
      color: "from-blue-500 to-cyan-500"
    }
  ];

  const faqItems = [
    {
      question: "Can dogs eat cat food in an emergency?",
      answer: "Yes, but only in small amounts and for a short time. Cat food isn't balanced for dogs, so avoid it as a regular meal.",
      icon: AlertTriangle
    },
    {
      question: "Can cats survive on dog food?",
      answer: "No. Cats need taurine, protein, and certain vitamins not found in dog food. Long-term feeding may cause serious health problems.",
      icon: Shield
    },
    {
      question: "Why is cat food more expensive than dog food?",
      answer: "Cat food usually has higher amounts of protein and meat ingredients, which cost more.",
      icon: Scale
    },
    {
      question: "Can dogs and cats share treats?",
      answer: "It's best not to. Always give species-specific treats to avoid stomach upset or nutrient imbalance.",
      icon: PawPrint
    },
    {
      question: "How do I know if my pet's food is high quality?",
      answer: "Check labels for real meat, balanced nutrients, and vet approval. Avoid foods with fillers or artificial ingredients.",
      icon: Star
    },
    {
      question: "Where can I buy premium pet food online?",
      answer: "You can shop safe, healthy, and affordable options at ZeenMart.",
      icon: Heart
    }
  ];

  const shareBlog = () => {
    if (navigator.share) {
      navigator.share({
        title: blogData.title,
        text: blogData.metaDescription,
        url: window.location.href,
      });
    } else {
      setShowShareOptions(!showShareOptions);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareOptions(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-teal-50/10">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": blogData.title,
            "description": blogData.metaDescription,
            "datePublished": "2024-12-01T08:00:00+00:00",
            "dateModified": "2024-12-01T08:00:00+00:00",
            "author": {
              "@type": "Person",
              "name": blogData.author,
              "jobTitle": blogData.authorRole
            },
            "publisher": {
              "@type": "Organization",
              "name": "ZeenMart",
              "logo": {
                "@type": "ImageObject",
                "url": "https://zeenmart.com/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://zeenmart.com/blog/dog-food-vs-cat-food"
            }
          })
        }}
      />

      {/* Enhanced Navigation */}
      <motion.nav 
        className="bg-white/90 backdrop-blur-lg border-b border-slate-200/80 sticky top-0 z-50 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-teal-100 rounded-lg group-hover:bg-teal-200 transition-colors">
                <ArrowLeft className="h-5 w-5 text-teal-700" />
              </div>
              <span className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                Back to Home
              </span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-4 text-slate-600">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium">{blogData.stats.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-sm font-medium">{blogData.stats.likes}</span>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSaved(!isSaved)}
                className="flex items-center space-x-2 border-slate-300 hover:border-teal-300 hover:bg-teal-50 transition-all"
              >
                <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-teal-600 text-teal-600' : ''}`} />
                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
              </Button>
              
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={shareBlog}
                  className="flex items-center space-x-2 border-slate-300 hover:border-teal-300 hover:bg-teal-50 transition-all"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
                
                <AnimatePresence>
                  {showShareOptions && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 p-2 z-50"
                    >
                      <button
                        onClick={copyLink}
                        className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <span>📋</span>
                        <span>Copy Link</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Blog Header */}
      <motion.article 
        className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Breadcrumb */}
        <motion.nav 
          className="flex items-center space-x-2 text-sm text-slate-600 mb-8"
          variants={itemVariants}
        >
          <Link href="/" className="hover:text-teal-600 transition-colors font-medium">Home</Link>
          <span className="text-slate-400">/</span>
          <Link href="/blog" className="hover:text-teal-600 transition-colors font-medium">Blog</Link>
          <span className="text-slate-400">/</span>
          <span className="text-teal-700 font-semibold">Pet Nutrition</span>
        </motion.nav>

        {/* Blog Meta */}
        <motion.div 
          className="flex flex-wrap items-center gap-3 mb-6"
          variants={itemVariants}
        >
          {blogData.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-teal-100 to-blue-100 text-teal-800 border border-teal-200/50 shadow-sm"
            >
              <Tag className="h-3 w-3 mr-2" />
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight bg-gradient-to-br from-slate-900 to-teal-700 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          {blogData.title}
        </motion.h1>

        {/* Enhanced Meta Information */}
        <motion.div 
          className="flex flex-wrap items-center gap-6 text-slate-600 mb-12 pb-8 border-b border-slate-200/60"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center shadow-sm">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-semibold text-slate-900 block text-lg">{blogData.author}</span>
              <span className="text-sm text-slate-500">{blogData.authorRole}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
              <Calendar className="h-4 w-4 text-teal-600" />
              <span className="font-medium">{blogData.publishDate}</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
              <Clock className="h-4 w-4 text-teal-600" />
              <span className="font-medium">{blogData.readTime}</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Visual Section */}
        <motion.div 
          className="relative mb-16"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-br from-teal-500 via-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">🐕 vs 🐈</h2>
                <p className="text-xl opacity-90 leading-relaxed">
                  Understanding the fundamental nutritional differences between canine and feline diets is crucial for your pet's long-term health and happiness.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                  <Dog className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-sm opacity-90">Omnivore</div>
                  <div className="font-bold text-lg">Dog</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                  <Cat className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-sm opacity-90">Carnivore</div>
                  <div className="font-bold text-lg">Cat</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Blog Content */}
        <motion.div 
          className="space-y-16"
          variants={containerVariants}
        >
          {/* Introduction Section */}
          <motion.section variants={itemVariants}>
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 border border-blue-200/50 shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Introduction</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                When it comes to pet nutrition, one common question is: Can dogs eat cat food, or can cats eat dog food? 
                At first glance, both may look similar. However, the truth is that dog food and cat food are not the same. 
                Each is made to meet the unique needs of different animals. Feeding the wrong food can affect your pet's health over time.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                In this article, we'll explore the main differences between dog food and cat food. You'll also learn why 
                it's important to choose the right diet for your furry friend.
              </p>
            </div>
          </motion.section>

          {/* Diet Needs Section */}
          <motion.section variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 flex items-center">
              <Scale className="h-8 w-8 mr-4 text-teal-600" />
              Why Cats and Dogs Have Different Diet Needs
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <motion.div 
                className="group"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-sm">
                        <Dog className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-blue-900">Dogs: Omnivores</h3>
                    </div>
                    <p className="text-blue-800 leading-relaxed text-lg">
                      Dogs are omnivores. This means they can eat both plants and meat. Their bodies can break down a variety of foods.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                className="group"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-8 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mr-4 shadow-sm">
                        <Cat className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-orange-900">Cats: Obligate Carnivores</h3>
                    </div>
                    <p className="text-orange-800 leading-relaxed text-lg">
                      Cats, on the other hand, are obligate carnivores. They must eat meat to survive. Their bodies don't get enough nutrition from grains, vegetables, or fruits.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <Card className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-8 shadow-xl border-0">
              <CardContent className="p-0 text-center">
                <Nut className="h-12 w-12 mx-auto mb-4" />
                <p className="text-xl leading-relaxed font-medium">
                  <strong>Key Insight:</strong> Because of this, cat food is usually higher in protein, fat, and certain amino acids like taurine. 
                  Dog food, in contrast, is balanced with a mix of protein, carbs, and fiber.
                </p>
              </CardContent>
            </Card>
          </motion.section>

          {/* Key Differences Section */}
          <motion.section variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">
              Key Differences Between Dog Food and Cat Food
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {keyDifferences.map((diff, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="p-6 bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-0">
                      <div className="flex items-center mb-4">
                        <div className={`w-10 h-10 bg-gradient-to-r ${diff.color} rounded-lg flex items-center justify-center mr-3 shadow-sm`}>
                          <diff.icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{index + 1}. {diff.title}</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <Cat className="h-4 w-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-slate-700 text-sm"><strong>Cat food:</strong> {diff.cat}</span>
                        </div>
                        <div className="flex items-start">
                          <Dog className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-slate-700 text-sm"><strong>Dog food:</strong> {diff.dog}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Why You Shouldn't Swap Section */}
          <motion.section variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">
              Why You Shouldn't Swap Their Food
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="p-6 border-2 border-red-200 bg-red-50 shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    🚫 Dog Eating Cat Food
                  </h3>
                  <p className="text-red-800 leading-relaxed">
                    If a dog eats cat food regularly, the high protein and fat may cause obesity or stomach issues.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-2 border-purple-200 bg-purple-50 shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    🚫 Cat Eating Dog Food
                  </h3>
                  <p className="text-purple-800 leading-relaxed">
                    If a cat eats dog food, it could lead to nutrient deficiencies, especially a lack of taurine and protein.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 shadow-xl border-0">
              <CardContent className="p-0 text-center">
                <p className="text-lg font-semibold">
                  ⚡ In short, while a bite or two won't hurt, long-term feeding of the wrong food can harm your pet's health.
                </p>
              </CardContent>
            </Card>
          </motion.section>

          {/* Choosing Right Food Section */}
          <motion.section variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Choosing the Right Food for Your Pet
            </h2>
            
            <Card className="bg-white border-2 border-teal-200 p-8 mb-8 shadow-lg">
              <CardContent className="p-0">
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Always choose pet food designed for your animal's species, age, and health condition. High-quality brands make a big difference in long-term wellness.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  At <strong className="text-teal-600">ZeenMart</strong>, you'll find vet-approved dog food and cat food tailored to your pet's needs. 
                  From protein-rich cat meals to balanced dog diets, our products are crafted to keep your pets happy and healthy.
                </p>
              </CardContent>
            </Card>
          </motion.section>

          {/* FAQ Section */}
          <motion.section variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {faqItems.map((faq, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 border border-slate-200 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <faq.icon className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 mb-2">
                            {index + 1}. {faq.question}
                          </h3>
                          <p className="text-slate-700">{faq.answer}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Conclusion Section */}
          <motion.section variants={itemVariants}>
            <Card className="bg-gradient-to-br from-slate-900 to-teal-900 text-white p-8 shadow-2xl border-0">
              <CardContent className="p-0 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">Conclusion</h2>
                <p className="text-lg leading-relaxed mb-4">
                  Dog food and cat food may seem similar, but they're designed with very different needs in mind. 
                  Cats require high protein and taurine, while dogs need a balanced diet with more fiber and carbohydrates. 
                  Feeding the right food helps keep your pets healthy, active, and happy.
                </p>
                <p className="text-xl font-semibold text-teal-200">
                  For the best quality choices, explore ZeenMart for vet-approved nutrition your furry companions will love.
                </p>
              </CardContent>
            </Card>
          </motion.section>

          {/* Enhanced CTA Section */}
          <motion.section variants={itemVariants}>
            <div className="text-center py-16 bg-gradient-to-br from-slate-900 via-teal-900 to-blue-900 rounded-3xl shadow-2xl border-0">
              <div className="max-w-2xl mx-auto px-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Ready to Choose the Right Food?
                </h2>
                <p className="text-xl text-teal-100 mb-8 leading-relaxed">
                  Browse our selection of vet-approved, premium pet food tailored to your cat's or dog's specific nutritional needs with free nationwide shipping.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="lg"
                      className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg font-semibold shadow-lg border-0"
                      asChild
                    >
                      <Link href="/cat-food">
                        🐱 Shop Cat Food <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="lg"
                      className="bg-teal-500 text-white hover:bg-teal-600 px-8 py-6 text-lg font-semibold shadow-lg border-0"
                      asChild
                    >
                      <Link href="/dog-food">
                        🐶 Shop Dog Food <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </motion.article>

      {/* Enhanced Related Articles */}
      <motion.section 
        className="bg-slate-50 py-16 border-t border-slate-200"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center">
            Continue Your Pet Nutrition Journey
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Understanding Pet Food Labels: A Complete Guide",
                description: "Learn how to read and understand pet food ingredient labels to make informed choices for your furry friends.",
                readTime: "4 min read",
                icon: "📊"
              },
              {
                title: "Top 5 Nutritional Supplements for Senior Pets",
                description: "Discover essential supplements that can help your aging pet maintain optimal health and vitality.",
                readTime: "6 min read",
                icon: "💊"
              }
            ].map((article, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-slate-200 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{article.icon}</div>
                    <h3 className="font-bold text-xl text-slate-900 mb-3 group-hover:text-teal-700 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-2">{article.description}</p>
                    <div className="flex items-center text-sm text-slate-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default PetFoodComparisonBlog;
