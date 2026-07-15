import type { IProducts } from "../types/productTypes";
import type { User } from "../types/userTypes";
import ProductCard from "./card/ProductCard";

interface Props {
  products: IProducts[];
  user?: User | null;
}

const Products = ({ products, user }: Props) => {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Products;
