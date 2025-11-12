import { useEffect, useState } from "react";
import { getProducts, type Product } from "../services/products";
import { ProductList } from "../components/ProductList";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function load(currentPage = page) {
    const data = await getProducts(currentPage, 10);
    setProducts(data.data);
    setPage(data.page);
    setTotalPages(data.totalPages);
  }

  useEffect(() => {
    load();
  }, []);

  function nextPage() {
    if (page < totalPages) load(page + 1);
  }

  function prevPage() {
    if (page > 1) load(page - 1);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Lista de Produtos</h1>

      <ProductList products={products} onOrderSuccess={() => load(page)} />

      <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignContent: "center", gap: 10 }}>
        <button onClick={prevPage} disabled={page === 1}>Anterior</button>
        <span>Página {page} de {totalPages}</span>
        <button onClick={nextPage} disabled={page === totalPages}>Próxima</button>
      </div>
    </div>
  );
}