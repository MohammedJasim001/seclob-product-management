import { useState } from "react";
import Button from "./ui/Button";
import AddCategoryModal from "./modals/addCategoryModal";

const AddButtons = () => {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  return (
    <>
      <div className="flex gap-5">
        <Button onClick={() => setCategoryModalOpen(true)}>Add category</Button>

        <Button>Add sub category</Button>

        <Button>Add products</Button>
      </div>

      <AddCategoryModal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
      />
    </>
  );
};

export default AddButtons;
