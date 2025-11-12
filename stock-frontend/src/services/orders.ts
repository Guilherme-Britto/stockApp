import { api } from './api';

export interface CreateOrderRequest {
  productId: number;
  quantity: number;
}

export async function createOrder(data: CreateOrderRequest) {
  const res = await api.post('/orders', data);
  return res.data;
}
