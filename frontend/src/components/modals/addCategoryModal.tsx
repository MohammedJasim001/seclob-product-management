import { useState } from "react";
import Button from "../ui/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { addCategoryThunk } from "../../redux/categroy/categoryThunk";
import { toast } from "sonner";
import Input from "../ui/Input";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddCategoryModal = ({ isOpen, onClose }: Props) => {
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.category);

  const handleSubmit = async () => {
    try {
      const response = await dispatch(addCategoryThunk(categoryName)).unwrap();

      toast.success(response.message);

      setCategoryName("");
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

        <Input
          name="newCategory"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          type="text"
          placeholder="Enter category name"
        />

        <div className=" flex justify-end gap-3">
          <Button
            className="px-8"
            onClick={handleSubmit}
            disabled={loading || categoryName.trim() == ""}
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

export default AddCategoryModal;
