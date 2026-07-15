import { X, Heart, Star } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { wishlistThunk } from "../redux/user/userThunk";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const WishlistSheet = ({ isOpen, onClose }: Props) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleWishlist = (
    e: React.MouseEvent<HTMLElement>,
    productId: string | undefined,
  ) => {
    e.stopPropagation();
    dispatch(wishlistThunk(productId as string));
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <div
        className={`fixed right-0 top-0 z-50 h-screen w-[360px] bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between bg-[#003F62] px-6 py-7 text-white">
          <div className="flex items-center gap-3">
            <Heart size={18} />
            <span className="font-medium">
              Items ({user?.wishlist.length ?? 0})
            </span>
          </div>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Wishlist */}
        <div className="h-[calc(100vh-72px)] overflow-y-auto">
          {user?.wishlist.length === 0 ? (
            <div className="flex h-full items-center justify-center text-gray-400">
              Wishlist is empty
            </div>
          ) : (
            user?.wishlist.map((product) => (
              <div
                key={product._id}
                className="flex items-center gap-4 border-b p-4"
                onClick={() => navigate(`${product._id}`)}
              >
                <img
                  src={product.images[0]}
                  className="h-24 w-24 rounded-lg border border-gray-400 object-contain"
                />

                <div className="flex-1">
                  <h3 className="line-clamp-2 text-sm font-semibold">
                    {product.title}
                  </h3>

                  <p className="mt-1 font-medium">
                    ${product.variants[0].price}
                  </p>

                  <div className="mt-2 flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={14}
                        className="fill-gray-300 text-gray-300"
                      />
                    ))}
                  </div>
                </div>

                <div
                  onClick={(e) => handleWishlist(e, product._id)}
                  className="h-6 w-6 rounded-full border border-[#003F62] flex items-center justify-center hover:border-red-500"
                >
                  <X size={18} className="text-[#003F62] hover:text-red-500" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistSheet;
