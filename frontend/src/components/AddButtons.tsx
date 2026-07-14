import { useState } from "react";
import Button from "./ui/Button";
import AddCategoryModal from "./modals/addCategoryModal";
import AddSubCategoryModal from "./modals/addSubCategoryModal";

const AddButtons = () => {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [subCategoryModalOpen, setSubCategoryModalOpen] = useState(false);

  return (
    <>
      <div className="flex gap-5">
        <Button onClick={() => setCategoryModalOpen(true)}>Add category</Button>

        <Button onClick={() => setSubCategoryModalOpen(true)}>
          Add sub category
        </Button>

        <Button>Add products</Button>
      </div>

      <AddCategoryModal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
      />

      <AddSubCategoryModal
        isOpen={subCategoryModalOpen}
        onClose={() => setSubCategoryModalOpen(false)}
      />
    </>
  );
};

export default AddButtons;
