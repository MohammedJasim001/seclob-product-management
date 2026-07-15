import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Category } from "../types/categoryTypes";

interface Props {
  categories: Category[];
  selectedSubCategories: string[];
  onSelectionChange: React.Dispatch<React.SetStateAction<string[]>>;
}

const SideBar = ({
  categories,
  onSelectionChange,
  selectedSubCategories,
}: Props) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setOpenCategory((prev) => (prev === id ? null : id));
  };

  const toggleSubCategory = (id: string) => {
    onSelectionChange((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <aside className="w-72 rounded-lg bg-white p-5">
      <h3 className="mb-4 text-lg font-semibold">Categories</h3>

      <button
        onClick={() => onSelectionChange([])}
        className="mb-4 text-sm font-medium hover:text-black"
      >
        All Categories
      </button>

      <div className="space-y-2">
        {categories?.map((category) => (
          <div key={category?._id}>
            <button
              onClick={() => toggleCategory(category?._id)}
              className="flex w-full items-center justify-between rounded-md py-2 text-left hover:bg-gray-100"
            >
              <span className="font-medium">{category?.name}</span>

              {category?.subCategories?.length > 0 &&
                (openCategory === category._id ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                ))}
            </button>

            {/* Subcategories */}
            {openCategory === category?._id &&
              category?.subCategories?.length > 0 && (
                <div className="ml-5 mt-2 space-y-2">
                  {category?.subCategories.map((sub) => (
                    <label
                      key={sub._id}
                      className="flex cursor-pointer items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSubCategories.includes(sub._id)}
                        onChange={() => toggleSubCategory(sub._id)}
                        className="h-4 w-4 rounded"
                      />

                      <span>{sub.name}</span>
                    </label>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
