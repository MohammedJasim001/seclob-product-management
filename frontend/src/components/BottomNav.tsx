import { Link, useLocation } from "react-router-dom";
import AddButtons from "./AddButtons";
import type { User } from "../types/userTypes";

const BottomNav = ({ user }: { user?: User | null }) => {
  const location = useLocation();

  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <div className="flex items-center justify-between px-20 mt-5">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-black">
          Home
          <span className="text-gray-400 ml-2">&gt;</span>
        </Link>

        {paths.length > 0 &&
          paths.map((path, index) => {
            const isLast = index === paths.length - 1;

            const label =
              isLast && /^[a-f\d]{24}$/i.test(path)
                ? "Product Details"
                : path.charAt(0).toUpperCase() + path.slice(1);

            return (
              <div key={index} className="flex items-center gap-2">
                {isLast ? (
                  <span className="font-medium text-black">{label}</span>
                ) : (
                  <Link
                    to={`/${paths.slice(0, index + 1).join("/")}`}
                    className="hover:text-black"
                  >
                    {label}
                  </Link>
                )}
                <span className="text-gray-400">&gt;</span>
              </div>
            );
          })}
      </div>
      {paths.length <= 0 && (
        <div>
          <AddButtons user={user} />
        </div>
      )}
    </div>
  );
};

export default BottomNav;
