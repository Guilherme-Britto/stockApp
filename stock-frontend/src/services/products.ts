import { api } from './api';

export interface Product {
  id: number;
  name: string;
  stock: number;
}

export interface ProductListResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getProducts(page = 1, limit = 10): Promise<ProductListResponse> {
  const res = await api.get(`/products?page=${page}&limit=${limit}`);
  return res.data;
}
