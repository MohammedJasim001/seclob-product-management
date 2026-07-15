import { Heart, ShoppingCart } from "lucide-react";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useEffect, useState } from "react";
import { fetchCurrentUserThunk } from "../redux/user/userThunk";
import { logoutThunk } from "../redux/auth/authThunk";
import WishlistSheet from "./whishlistSheet";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCurrentUserThunk());
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutThunk()).unwrap();
    navigate("/login");
  };

  return (
    <header className="bg-[#003F62] px-8 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Search */}
        <div className="mx-auto flex w-full max-w-md overflow-hidden  rounded-2xl bg-white shadow">
          <input
            type="text"
            placeholder="Search any things"
            className="flex-1 px-5 py-3 text-sm outline-none"
          />

          <Button className="px-10">Search</Button>
        </div>

        <div className="ml-10 flex items-center gap-8 text-white">
          <button className="flex items-center gap-2">
            <div className="relative">
              <Heart
                size={22}
                strokeWidth={2}
                onClick={() => setWishlistOpen(true)}
              />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-semibold text-white">
                {user?.wishlist.length}
              </span>
            </div>
          </button>

          {user ? (
            <button
              className="text-sm font-medium hover:text-[#EDA415]"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="text-sm font-medium hover:text-[#EDA415]"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          )}

          <button className="flex items-center gap-2">
            <div className="relative">
              <ShoppingCart size={22} strokeWidth={2} />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-semibold text-white">
                0
              </span>
            </div>

            <span className="text-sm font-medium">Cart</span>
          </button>
        </div>
      </div>

      <WishlistSheet
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />
    </header>
  );
};

export default Navbar;
