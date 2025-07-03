const { catFoodProducts, dogFoodProducts } = require('./data/productdata');

const allProducts = [...catFoodProducts, ...dogFoodProducts];

module.exports = {
  siteUrl: "https://www.zeenmart.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,

  async additionalPaths() {
    const productPaths = allProducts.map((product) => ({
      loc: `/product/${product.id}`,
      lastmod: new Date().toISOString(),
    }));

    const staticPaths = [
      { loc: "/", lastmod: new Date().toISOString() },
      { loc: "/about", lastmod: new Date().toISOString() },
      { loc: "/cat-food", lastmod: new Date().toISOString() },
      { loc: "/dog-food", lastmod: new Date().toISOString() },
    ];

    return [...staticPaths, ...productPaths];
  },
};
