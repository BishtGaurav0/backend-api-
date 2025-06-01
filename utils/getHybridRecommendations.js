const getSimilarProducts = require("./getSimilarProducts");

module.exports = function getHybridRecommendations(allProducts, targetProduct) {
  // Get similar products (title/description-based)
  const similar = getSimilarProducts(allProducts, targetProduct, 10);

  // Get rule-based recommendations (same category/brand)
  const ruleBased = allProducts.filter(p =>
    (p.category === targetProduct.category || p.brand === targetProduct.brand) &&
    p._id.toString() !== targetProduct._id.toString()
  );

  // Merge results without duplicates
  const combined = [...new Map([...similar, ...ruleBased].map(p => [p._id.toString(), p])).values()];

  return combined.slice(0, 10); // Return top 10
};
