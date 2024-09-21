/* eslint-disable no-use-before-define */

"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/components/modal";
import { formatRupiah } from "@/utils/format-rupiah";
import { createSupabaseClientWithTypes } from "@/utils/supabase/client";
import { Edit, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/get-error-msg";

const supabase = createSupabaseClientWithTypes();

type Product = {
  desc: string | null;
  id: string;
  img_url: string | null;
  name: string | null;
  price: number | null;
  quantity: number | null;
};

const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}> = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-96 p-6">
        <h2 className="mb-4 text-xl font-light text-[#3D405B]">Confirm Action</h2>
        <p className="mb-6 text-sm text-[#3D405B]">{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#C7694F]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-full bg-[#81B29A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5F8977]"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      toast.error(`Error fetching product: ${getErrorMessage(error)}}`);
    } else {
      setProducts(data || []);
    }
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const handleDelete = async () => {
    if (productToDelete) {
      const { error } = await supabase.from("products").delete().eq("id", productToDelete);

      if (error) {
        toast.error(`Error deleting product: ${getErrorMessage(error)}}`);
      } else {
        fetchProducts();
      }
    }
    setIsConfirmModalOpen(false);
    setProductToDelete(null);
  };

  const handleSave = async (product: Partial<Product>) => {
    if (currentProduct?.id) {
      const { error } = await supabase.from("products").update(product).eq("id", currentProduct.id);

      if (error) {
        toast.error(`Error updating product: ${getErrorMessage(error)}}`);
      }
    } else {
      const { error } = await supabase.from("products").insert(product);

      if (error) {
        toast.error(`Error inserting product: ${getErrorMessage(error)}}`);
      }
    }

    setIsModalOpen(false);
    fetchProducts();
  };

  return (
    <div className="min-h-screen px-4 py-8 font-sans text-[#3D405B]">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-light tracking-wide">Product Management</h1>
        <button
          className="mb-6 flex items-center rounded-full bg-highland-300 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-highland-400"
          onClick={() => {
            setCurrentProduct(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </button>
        <div className="overflow-x-scroll rounded-lg bg-white shadow-md">
          <table className="w-full table-auto">
            <thead className="bg-zinc-50 text-black">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id} className={index % 2 === 0 ? "bg-[#fff2dd]" : "bg-white"}>
                  <td className="px-4 py-3 text-sm">{product.name}</td>
                  <td className="px-4 py-3 text-sm">{product.desc}</td>
                  <td className="px-4 py-3 text-sm">{formatRupiah(product.price ?? 0)}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        className="rounded-full bg-[#81B29A] p-1 text-white transition-colors hover:bg-[#5F8977]"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="rounded-full bg-[#E07A5F] p-1 text-white transition-colors hover:bg-[#C7694F]"
                        onClick={() => handleDeleteClick(product.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProductForm
          product={currentProduct}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
};

interface ProductFormProps {
  product: Product | null;
  onSave: (product: Partial<Product>) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: product?.name || "",
    desc: product?.desc || "",
    price: product?.price || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === "price" ? parseFloat(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-[52rem] space-y-4">
      <h2 className="mb-6 text-2xl font-light tracking-wide text-[#3D405B]">
        {product ? "Edit Product" : "Add New Product"}
      </h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#3D405B]">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name ?? ""}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-[#81B29A] bg-[#F4F1DE] px-3 py-2 text-[#3D405B] shadow-sm focus:border-[#81B29A] focus:outline-none focus:ring-1 focus:ring-[#81B29A]"
          required
        />
      </div>
      <div>
        <label htmlFor="desc" className="block text-sm font-medium text-[#3D405B]">
          Description
        </label>
        <textarea
          id="desc"
          name="desc"
          value={formData.desc ?? ""}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-[#81B29A] bg-[#F4F1DE] px-3 py-2 text-[#3D405B] shadow-sm focus:border-[#81B29A] focus:outline-none focus:ring-1 focus:ring-[#81B29A]"
          rows={3}
          required
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-[#3D405B]">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price ?? ""}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-[#81B29A] bg-[#F4F1DE] px-3 py-2 text-[#3D405B] shadow-sm focus:border-[#81B29A] focus:outline-none focus:ring-1 focus:ring-[#81B29A]"
          step="0.01"
          min="0"
          required
        />
      </div>
      <div className="flex justify-start space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full bg-[#E07A5F] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#C7694F]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-full bg-[#81B29A] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5F8977]"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProductsPage;
