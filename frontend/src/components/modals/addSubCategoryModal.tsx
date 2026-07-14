import { useEffect, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { toast } from "sonner";
import { fetchAllCategoriesThunk } from "../../redux/categroy/categoryThunk";
import Select from "../ui/Select";
import { addSubCategoryThunk } from "../../redux/subCategory/subCategoryThunk";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddSubCategoryModal = ({ isOpen, onClose }: Props) => {
  const [subCategoryName, setSubCategoryName] = useState("");
  const dispatch = useAppDispatch();
  const { loading, categories } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchAllCategoriesThunk());
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await dispatch(
        addSubCategoryThunk({
          name: subCategoryName,
          categoryId: selectedCategory,
        }),
      ).unwrap();

      toast.success(response.message);

      setSubCategoryName("");
      onClose();
    } catch (error: unknown) {
      toast.error(error as string);
    }
  };
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center  justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="w-96 rounded-lg bg-white p-8 flex flex-col items-center space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className=" text-xl font-semibold">Add Category</h2>

        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          options={categories}
          placeholder="Select Category"
        />

        <Input
          name="newCategory"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          type="text"
          placeholder="Enter sub category name"
        />

        <div className=" flex justify-end gap-3">
          <Button
            className="px-8"
            onClick={handleSubmit}
            disabled={loading || subCategoryName.trim() == ""}
            loading={loading}
          >
            ADD
          </Button>

          <Button onClick={onClose} variant="gray">
            DISCARD
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategoryModal;
