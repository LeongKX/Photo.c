import axios from "axios";
import Cookies from "js-cookie";
//GET ALL PRODUCTS
export const getProducts = async () => {
  let res = await axios.get("http://localhost:8888/products");
  return res.data.products;
};

export const getProductsAdmin = async () => {
  let res = await axios.get("http://localhost:8888/products/admin", {
    headers: { Authorization: `Bearer ${Cookies.get("authToken")}` },
  });
  return res.data.products;
};

//GET PRODUCT BY ID
export const getProductById = async ({ queryKey }) => {
  const [_, id] = queryKey;
  // console.log("ID" , id)

  let res = await axios.get("http://localhost:8888/products/" + id);

  // console.log(res.data)
  return res.data;
};
//ADD PRODUCT
export const addProduct = async (product) => {
  console.log(product);
  const token = Cookies.get("authToken");
  const formData = new FormData();
  // console.log(product);
  formData.append("name", product.name);
  formData.append("price", product.price);
  formData.append("quantity", product.quantity);
  formData.append("description", product.description);
  if (product.image) {
    formData.append("image", product.image);
  }

  let res = await axios.post("http://localhost:8888/products/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.product;
};

//DELETE PRODUCT
export const deleteProduct = async (id) => {
  console.log(id);
  const token = Cookies.get("authToken");
  let res = await axios.delete(`http://localhost:8888/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.product;
};

export const approveProduct = async (id) => {
  console.log(id);
  const token = Cookies.get("authToken");
  let res = await axios.patch(`http://localhost:8888/products/${id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

//UPDATE PRODUCT
export const updateProduct = async (id, product) => {
  const token = Cookies.get("authToken");
  const formData = new FormData();
  console.log(product);
  formData.append("name", product.name);
  formData.append("price", product.price);
  formData.append("quantity", product.quantity);
  formData.append("description", product.description);
  if (product.image) {
    formData.append("image", product.image);
  }

  let res = await axios.put(`http://localhost:8888/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.product;
};
