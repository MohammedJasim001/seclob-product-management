import { Heart, Star } from "lucide-react";
import type { IProducts } from "../../types/productTypes";
import { useNavigate } from "react-router-dom";

interface Props {
  product: IProducts;
}

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className="group rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-lg"
      onClick={() => navigate(`${product._id}`)}
    >
      {/* Wishlist */}
      <div className="flex justify-end">
        <button className="rounded-full border border-sky-200 p-1 text-sky-500 hover:bg-sky-50">
          <Heart size={14} />
        </button>
      </div>

      {/* Image */}
      <div className="flex h-44 items-center justify-center">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-36 object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Title */}
      <h3 className="mt-3 line-clamp-2 text-sm font-medium text-gray-800">
        {product.title}
      </h3>

      {/* Price */}
      <p className="mt-2 text-lg font-semibold text-gray-900">
        ${product.variants[0].price}
      </p>

      {/* Rating */}
      <div className="mt-2 flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star key={index} size={14} className="fill-gray-300 text-gray-300" />
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
