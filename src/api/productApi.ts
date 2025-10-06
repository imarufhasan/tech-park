export const fetchProducts = async () => {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  return data.products;
};

export const fetchProductDetails = async (id: number) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();
  return data;
};
