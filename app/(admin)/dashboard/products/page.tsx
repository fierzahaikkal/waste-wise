/* eslint-disable no-use-before-define */

"use client";

import Modal from "@/components/modal";
import { formatRupiah } from "@/utils/format-rupiah";
import { getErrorMessage } from "@/utils/get-error-msg";
import { createSupabaseClientWithTypes } from "@/utils/supabase/client";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteIcon from "./_components/delete-icon";
import EditIcon from "./_components/edit-icons";
import { Tooltip } from "@nextui-org/react";

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
    <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Product Management</h1>
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
          <Table className="w-full table-auto" isStriped>
            <TableHeader className="bg-zinc-50 text-black">
              <TableColumn className="px-4 py-3 text-left text-sm font-medium">Name</TableColumn>
              <TableColumn className="px-4 py-3 text-left text-sm font-medium">
                Description
              </TableColumn>
              <TableColumn className="px-4 py-3 text-left text-sm font-medium">Price</TableColumn>
              <TableColumn className="px-4 py-3 text-left text-sm font-medium">Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell className="px-4 py-3 text-sm">{product.name}</TableCell>
                  <TableCell className="px-4 py-3 text-sm">{product.desc}</TableCell>
                  <TableCell className="px-4 py-3 text-sm">
                    {formatRupiah(product.price ?? 0)}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        className="rounded-full p-1 transition-colors"
                        onClick={() => handleEdit(product)}
                      >
                        <Tooltip content="Edit Product">
                          <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                            <EditIcon />
                          </span>
                        </Tooltip>
                      </button>
                      <button
                        className="rounded-full p-1 transition-colors"
                        onClick={() => handleDeleteClick(product.id)}
                      >
                        <Tooltip color="danger" content="Delete Product">
                          <span className="cursor-pointer text-lg text-danger active:opacity-50">
                            <DeleteIcon />
                          </span>
                        </Tooltip>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
