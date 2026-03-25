import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

// Implement simulated delay for realism if desired
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const getCategories = () => api.get('/products/categories');
export const getProductsByCategory = (category) => api.get(`/products/category/${category}`);

export default api;
