const AboutSection = () => {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="/placeholder.svg" 
                alt="About PetFoodHub" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">About PetFoodHub</h2>
              <p className="text-gray-600 mb-4 text-lg">
                At PetFoodHub, we're passionate about providing the highest quality nutrition for your beloved pets. 
                We understand that pets are family members, and they deserve the best.
              </p>
              <p className="text-gray-600 mb-4 text-lg">
                Our carefully selected range of premium pet foods is sourced from trusted manufacturers who share our 
                commitment to quality and nutritional excellence. Whether you have a playful kitten, an energetic puppy, 
                or a senior pet with special dietary needs, we have the perfect food to keep them healthy and happy.
              </p>
              <p className="text-gray-600 mb-4 text-lg">
                We work with veterinary nutritionists to ensure all our products meet the highest standards of pet nutrition, 
                supporting your pet's health from the inside out.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center p-4 bg-petgreen-50 rounded-lg">
                  <h3 className="font-bold text-xl text-petgreen-700">10+</h3>
                  <p className="text-gray-600">Years Experience</p>
                </div>
                <div className="text-center p-4 bg-petgreen-50 rounded-lg">
                  <h3 className="font-bold text-xl text-petgreen-700">1000+</h3>
                  <p className="text-gray-600">Happy Customers</p>
                </div>
                <div className="text-center p-4 bg-petgreen-50 rounded-lg">
                  <h3 className="font-bold text-xl text-petgreen-700">50+</h3>
                  <p className="text-gray-600">Premium Brands</p>
                </div>
                <div className="text-center p-4 bg-petgreen-50 rounded-lg">
                  <h3 className="font-bold text-xl text-petgreen-700">24/7</h3>
                  <p className="text-gray-600">Customer Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutSection;
  