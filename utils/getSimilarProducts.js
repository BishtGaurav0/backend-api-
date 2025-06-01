const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

/**
 * @param {Object[]} allProducts - All products in DB
 * @param {Object} targetProduct - Product user is viewing
 * @param {number} limit - How many similar products to return
 */
function getSimilarProducts(allProducts, targetProduct, limit = 5) {
  const productTexts = allProducts.map(p =>
    `${p.title} ${p.description}`.toLowerCase()
  );

  const targetText = `${targetProduct.title} ${targetProduct.description}`.toLowerCase();

  productTexts.forEach((text, i) => tfidf.addDocument(tokenizer.tokenize(text)));

  const targetTokens = tokenizer.tokenize(targetText);
  const similarities = [];

  for (let i = 0; i < productTexts.length; i++) {
    const score = tfidf.tfidf(targetTokens.join(" "), i);
    similarities.push({ product: allProducts[i], score });
  }

  similarities.sort((a, b) => b.score - a.score);

  return similarities
    .filter(p => p.product._id.toString() !== targetProduct._id.toString())
    .slice(0, limit)
    .map(p => p.product);
}

module.exports = getSimilarProducts;
