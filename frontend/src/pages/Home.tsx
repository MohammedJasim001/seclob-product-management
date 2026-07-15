import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import Navbar from "../components/nav";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchAllProductsThunk } from "../redux/products/productThunk";
import SideBar from "../components/SideBar";
import { fetchAllCategoriesThunk } from "../redux/categroy/categoryThunk";
import Products from "../components/Products";

const Home = () => {
  const dispatch = useAppDispatch();
  const { allProducts } = useAppSelector((state) => state.product);
  const { categories } = useAppSelector((state) => state.category);
  const { user } = useAppSelector((state) => state.user);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    [],
  );

  const filteredProducts =
    selectedSubCategories.length === 0
      ? allProducts
      : allProducts.filter((product) =>
          selectedSubCategories.includes(product.subCategory),
        );

  useEffect(() => {
    dispatch(fetchAllProductsThunk());
    dispatch(fetchAllCategoriesThunk());
  }, []);

  return (
    <div>
      <Navbar />
      <BottomNav user={user} />
      <div className=" flex max-w-7xl gap-10 py-10">
        <SideBar
          categories={categories}
          selectedSubCategories={selectedSubCategories}
          onSelectionChange={setSelectedSubCategories}
        />

        <Products products={filteredProducts} user={user} />
      </div>
    </div>
  );
};

export default Home;
