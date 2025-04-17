const Order = require('../models/Order');

// Get Most Purchased Products
const getMostPurchased = async () => {
  const result = await Order.aggregate([
    { $unwind: "$products" },
    {
      $group: {
        _id: "$products.productID",
        totalQuantity: { $sum: "$products.quantity" },
        title: { $first: "$products.title" },
        price: { $first: "$products.price" }
      }
    },
    { $sort: { totalQuantity: -1 } },
    { $limit: 10 }
  ]);
    return result.slice(0, 3);
};

// Get Recently Purchased Products
const getRecentlyPurchased = async () => {
  const recentOrders = await Order.find({})
    .sort({ orderedAt: -1 })
    .limit(10);

  const productMap = new Map();
  for (const order of recentOrders) {
    order.products.forEach((product) => {
      if (!productMap.has(product.productID)) {
        productMap.set(product.productID, product);
      }
    });
  }

  return Array.from(productMap.values()).slice(0, 3);
};

// Main recommendation controller
const getRecommendations = async (req, res) => {
  try {
    const mostPurchased = await getMostPurchased();
    const recentlyPurchased = await getRecentlyPurchased();

    res.json({
      mostPurchased,
      recentlyPurchased
    });
  } catch (err) {
    console.error('Recommendation Error:', err);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
};

module.exports = { getRecommendations };
