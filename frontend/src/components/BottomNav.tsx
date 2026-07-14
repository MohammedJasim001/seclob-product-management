import { useLocation } from "react-router-dom";
import AddButtons from "./AddButtons";

const BottomNav = () => {
  const location = useLocation();
  console.log(location, "location");
  return (
    <div className="flex items-center justify-between px-20 mt-5">
      <div>
        <p>{location.pathname}</p>
      </div>
      <div>
        <AddButtons />
      </div>
    </div>
  );
};

export default BottomNav;
