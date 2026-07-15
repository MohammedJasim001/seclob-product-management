import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Button from "../components/ui/Button";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchSingleProductsThunk } from "../redux/products/productThunk";
import type { IProducts, IVarients } from "../types/productTypes";
import BottomNav from "../components/BottomNav";
import AddProductModal from "../components/modals/addProductModal";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { singleProduct: product } = useAppSelector((state) => state.product);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<IVarients | null>(
    null,
  );
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);

  const [qty, setQty] = useState(1);

  const currentImage = selectedImage ?? product?.images[0];
  const currentVariant = selectedVariant ?? product?.variants[0];

  useEffect(() => {
    dispatch(fetchSingleProductsThunk(productId as string));
  }, []);

  return (
    <div>
      <BottomNav />
      <div className="max-w-7xl mx-auto py-10">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="border rounded-2xl h-[450px] flex items-center justify-center">
              <img
                src={currentImage}
                alt={product?.title}
                className="h-80 object-contain"
              />
            </div>

            <div className="flex gap-4 mt-5">
              {product?.images.map((image) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={`border rounded-xl w-32 h-24 flex items-center justify-center ${
                    selectedImage === image ? "border-yellow-500" : ""
                  }`}
                >
                  <img src={image} className="h-16 object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT */}

          <div>
            <h1 className="text-4xl font-semibold">{product?.title}</h1>

            <h2 className="mt-4 text-3xl font-bold">
              ${currentVariant?.price}
            </h2>

            <div className="mt-4 flex items-center gap-2">
              <span className="font-medium">Availability:</span>

              <span className="text-green-600">✓ In Stock</span>
            </div>

            <p className="mt-2 text-gray-500">
              Hurry up! only {currentVariant?.qty} product left in stock!
            </p>

            <hr className="my-8" />

            {/* RAM */}

            <div className="flex items-center gap-6">
              <h3 className="font-medium">RAM:</h3>

              <div className="flex gap-2">
                {product?.variants.map((variant) => (
                  <button
                    key={variant.ram}
                    onClick={() => setSelectedVariant(variant)}
                    className={`border px-4 py-2 rounded ${
                      selectedVariant?.ram === variant?.ram
                        ? "bg-yellow-500 text-white border-yellow-500"
                        : ""
                    }`}
                  >
                    {variant.ram}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}

            <div className="flex items-center gap-5 mt-8">
              <h3 className="font-medium">Quantity :</h3>

              <div className="flex border">
                <button
                  onClick={() => qty > 1 && setQty(qty - 1)}
                  className="px-4 py-2 border-r"
                >
                  -
                </button>

                <span className="px-6 py-2">{qty}</span>

                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-2 border-l"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}

            <div className="flex gap-5 mt-12">
              <Button
                className="px-12"
                onClick={() => setEditProductModalOpen(true)}
              >
                Edit Product
              </Button>

              <Button className="px-12">Buy it now</Button>

              <button className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center">
                <Heart />
              </button>
            </div>

            {/* Description */}

            <div className="mt-12">
              <h3 className="font-semibold text-lg">Description</h3>

              <p className="text-gray-600 mt-3 leading-7">
                {product?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      {editProductModalOpen && (
        <AddProductModal
          productData={product as IProducts}
          isOpen={editProductModalOpen}
          onClose={() => setEditProductModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductDetails;
