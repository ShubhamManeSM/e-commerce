// Change this to your deployed backend URL
const BASE_URL = "https://ecommerce-backend-ruddy.vercel.app/api";

// ===================== PRODUCTS =====================

export const fetchAllProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
};


// ===================== CATEGORIES =====================

export const fetchAllCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

// ===================== CART =====================

export const fetchCart = async () => {
  const res = await fetch(`${BASE_URL}/cart`);
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
};

export const addToCartAPI = async (productId) => {
  const res = await fetch(`${BASE_URL}/cart/${productId}`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
};

export const updateCartAPI = async (productId, action) => {
  const res = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
  });
  if (!res.ok) throw new Error("Failed to update cart");
  return res.json();
};

export const removeFromCartAPI = async (productId) => {
  const res = await fetch(`${BASE_URL}/cart/${productId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to remove from cart");
  return res.json();
};

export const clearCartAPI = async () => {
  const res = await fetch(`${BASE_URL}/cart`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to clear cart");
  return res.json();
};

// ===================== WISHLIST =====================

export const fetchWishlist = async () => {
  const res = await fetch(`${BASE_URL}/wishlist`);
  if (!res.ok) throw new Error("Failed to fetch wishlist");
  return res.json();
};

export const addToWishlistAPI = async (productId) => {
  const res = await fetch(`${BASE_URL}/wishlist/${productId}`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to add to wishlist");
  return res.json();
};

export const removeFromWishlistAPI = async (productId) => {
  const res = await fetch(`${BASE_URL}/wishlist/${productId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to remove from wishlist");
  return res.json();
};

// ===================== ADDRESS =====================

export const fetchAddresses = async () => {
  const res = await fetch(`${BASE_URL}/address`);
  if (!res.ok) throw new Error("Failed to fetch addresses");
  return res.json();
};

export const createAddressAPI = async (data) => {
  const res = await fetch(`${BASE_URL}/address`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create address");
  return res.json();
};

export const updateAddressAPI = async (id, data) => {
  const res = await fetch(`${BASE_URL}/address/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update address");
  return res.json();
};

export const deleteAddressAPI = async (id) => {
  const res = await fetch(`${BASE_URL}/address/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete address");
  return res.json();
};

// ===================== ORDERS =====================

export const fetchOrders = async () => {
  const res = await fetch(`${BASE_URL}/orders`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
};

export const createOrderAPI = async (data) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
};
