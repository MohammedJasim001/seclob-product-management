import { Heart, Star } from "lucide-react";
import type { IProducts } from "../../types/productTypes";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/userTypes";
import { useAppDispatch } from "../../redux/hook";
import { wishlistThunk } from "../../redux/user/userThunk";

interface Props {
  product: IProducts;
  user?: User | null;
}

const ProductCard = ({ product, user }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isWishlisted =
    user?.wishlist?.some((pro) => pro._id === product._id) ?? false;

  const handleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(wishlistThunk(product._id as string));
  };

  return (
    <div
      className="group rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-lg"
      onClick={() => navigate(`${product._id}`)}
    >
      {/* Wishlist */}
      <div className="flex justify-end">
        <button
          onClick={handleWishlist}
          className="rounded-full border border-sky-200 p-2 transition hover:bg-sky-50"
        >
          <Heart
            size={16}
            className={`transition-all ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-sky-500 hover:text-red-500"
            }`}
          />
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
