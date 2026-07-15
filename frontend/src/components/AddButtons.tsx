import { useState } from "react";
import Button from "./ui/Button";
import AddCategoryModal from "./modals/addCategoryModal";
import AddSubCategoryModal from "./modals/addSubCategoryModal";
import AddProductModal from "./modals/addProductModal";
import type { User } from "../types/userTypes";
import { toast } from "sonner";

const AddButtons = ({ user }: { user?: User | null }) => {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [subCategoryModalOpen, setSubCategoryModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);

  const handleOpen = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (!user) {
      toast.error("Please login to continue");
      return;
    }

    setter(true);
  };

  return (
    <>
      <div className="flex gap-5">
        <Button onClick={() => handleOpen(setCategoryModalOpen)}>
          Add category
        </Button>

        <Button onClick={() => handleOpen(setSubCategoryModalOpen)}>
          Add sub category
        </Button>

        <Button onClick={() => handleOpen(setProductModalOpen)}>
          Add products
        </Button>
      </div>

      <AddCategoryModal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
      />

      <AddSubCategoryModal
        isOpen={subCategoryModalOpen}
        onClose={() => setSubCategoryModalOpen(false)}
      />

      <AddProductModal
        isOpen={productModalOpen}
        onClose={() => setProductModalOpen(false)}
      />
    </>
  );
};

export default AddButtons;
