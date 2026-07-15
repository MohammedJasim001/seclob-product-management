import type { IProducts } from "../types/productTypes";
import ProductCard from "./card/ProductCard";

interface Props {
  products: IProducts[];
}

const Products = ({ products }: Props) => {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
