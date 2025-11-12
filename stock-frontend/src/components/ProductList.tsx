import { useState } from "react";
import { type Product } from "../services/products";
import { createOrder } from "../services/orders";

interface Props {
  products: Product[];
  onOrderSuccess: () => void;
}

export function ProductList({ products, onOrderSuccess }: Props) {
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  function changeQuantity(productId: number, value: number) {
    setQuantities(prev => ({
      ...prev,
      [productId]: value,
    }));
  }

  async function handleBuy(productId: number) {
    const quantity = quantities[productId] ?? 1;

    try {
      await createOrder({ productId, quantity });
      alert("Pedido realizado com sucesso!");
      onOrderSuccess();
    } catch (err: any) {

      if (err.response) {

        if (err.response.status === 409) {
          alert("Erro: Estoque insuficiente para realizar a compra.");
          onOrderSuccess();
          return;
        }

        alert(`Erro: ${err.response.data?.message || "Erro inesperado."}`);
        onOrderSuccess();
        return;
      }

      alert("Não foi possível conectar ao servidor.");
    }
  }

  return (
    <table border={1} cellPadding={5}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Produto</th>
          <th>Estoque</th>
          <th>Quantidade</th>
          <th>Comprar</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.name}</td>
            <td>{p.stock}</td>
            <td>
              <input
                type="number"
                min={1}
                value={quantities[p.id] ?? 1}
                onChange={e => changeQuantity(p.id, Number(e.target.value))}
              />
            </td>
            <td>
              <button onClick={() => handleBuy(p.id)}>Comprar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
