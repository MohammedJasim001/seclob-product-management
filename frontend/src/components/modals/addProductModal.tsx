import { ChevronLeft, ChevronRight, ImagePlus } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Select from "../ui/Select";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchAllCategoriesThunk } from "../../redux/categroy/categoryThunk";
import { addProductThunk } from "../../redux/products/productThunk";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  const { loading } = useAppSelector((state) => state.product);

  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [variants, setVariants] = useState([
    {
      ram: "",
      price: "",
      qty: 1,
    },
  ]);

  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = async () => {
    try {
      if (!product.title.trim()) {
        return toast.error("Product title is required");
      }

      if (!product.category) {
        return toast.error("Please select a category");
      }

      if (!product.description.trim()) {
        return toast.error("Description is required");
      }

      if (variants.some((v) => !v.ram || !v.price)) {
        return toast.error("Please fill all variant details");
      }

      if (images.length === 0) {
        return toast.error("Please upload at least one image");
      }

      const formData = new FormData();

      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("subCategory", product.category);

      formData.append("variants", JSON.stringify(variants));

      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await dispatch(addProductThunk(formData)).unwrap();

      toast.success(response.message);

      // Reset form
      setProduct({
        title: "",
        description: "",
        category: "",
      });

      setVariants([
        {
          ram: "",
          price: "",
          qty: 1,
        },
      ]);

      setImages([]);

      onClose();
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleProductChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVariantChange = (
    index: number,
    field: "ram" | "price",
    value: string,
  ) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages((prev) => [...prev, ...Array.from(e.target.files ?? [])]);
  };

  const increaseQty = (index: number) => {
    const updated = [...variants];
    updated[index].qty++;
    setVariants(updated);
  };
  const decreaseQty = (index: number) => {
    const updated = [...variants];
    if (updated[index].qty > 1) {
      updated[index].qty--;
    }
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        ram: "",
        price: "",
        qty: 1,
      },
    ]);
  };

  const removeVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    dispatch(fetchAllCategoriesThunk());
  }, []);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-5xl rounded-2xl bg-white py-5 p-10 shadow-xl max-h-screen overflow-y-auto">
        <h2 className="mb-10 text-center text-3xl font-semibold">
          Add Product
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-[170px_1fr] items-center gap-6">
            <label className="text-lg text-gray-500">Title :</label>

            <Input
              onChange={handleProductChange}
              value={product.title}
              name="title"
              placeholder="Product title"
              className="h-12"
            />
          </div>

          <div className="grid grid-cols-[170px_1fr] gap-6">
            <label className="pt-2 text-lg text-gray-500">Variants :</label>

            <div className="space-y-5">
              {variants.map((variant, index) => (
                <div key={index} className="grid gap-5 items-end">
                  <div className="flex gap-10">

                    <div className="flex items-center justify-center gap-2">
                      <label className="mb-1 block text-sm text-gray-500">
                        RAM:
                      </label>

                      <Input
                        name="variant.ram"
                        placeholder="4 GB"
                        value={variant.ram}
                        onChange={(e) =>
                          handleVariantChange(index, "ram", e.target.value)
                        }
                      />
                    </div>


                    <div className="flex items-center justify-center gap-2">
                      <label className="mb-1 block text-sm text-gray-500">
                        Price:
                      </label>

                      <Input
                        name="variant.price"
                        placeholder="599"
                        value={variant.price}
                        onChange={(e) =>
                          handleVariantChange(index, "price", e.target.value)
                        }
                      />
                    </div>

                    {/* Quantity */}

                    <div className="flex items-center justify-center gap-2 ">
                      <label className="mb-1 block text-sm text-gray-500">
                        QTY:
                      </label>

                      <div className="flex h-13 items-center justify-between rounded-lg border px-4 w-40">
                        <button
                          type="button"
                          onClick={() => decreaseQty(index)}
                        >
                          <ChevronLeft />
                        </button>

                        <span>{variant.qty}</span>

                        <button
                          type="button"
                          onClick={() => increaseQty(index)}
                        >
                          <ChevronRight />
                        </button>
                      </div>
                    </div>
                  </div>


                  <div className="flex gap-2 justify-end">
                    {index === variants.length - 1 && (
                      <Button type="button" onClick={addVariant}>
                        Add Variant
                      </Button>
                    )}

                    {variants.length > 1 && (
                      <Button
                        type="button"
                        variant="gray"
                        onClick={() => removeVariant(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[170px_1fr] items-center gap-6">
            <label className="text-lg text-gray-500">Sub category :</label>

            <div className="relative">
              <Select
                value={product.category}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                options={categories}
                placeholder="Select Category"
              />
            </div>
          </div>

          <div className="grid grid-cols-[170px_1fr] items-center gap-6">
            <label className="text-lg text-gray-500">Description :</label>

            <textarea
              name="description"
              value={product.description}
              onChange={handleProductChange}
              rows={2}
              placeholder="Product description..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative h-24 w-24 rounded-xl border">
                <img
                  src={URL.createObjectURL(image)}
                  className="h-full w-full rounded-xl object-cover"
                />

                <button
                  type="button"
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                  className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-red-500 text-white"
                >
                  ×
                </button>
              </div>
            ))}

            <label className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed">
              <ImagePlus />

              <input
                multiple
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          <div className=" flex justify-end gap-3">
            <Button
              className="px-8"
              onClick={handleSubmit}
              disabled={loading}
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
    </div>
  );
};

export default AddProductModal;
