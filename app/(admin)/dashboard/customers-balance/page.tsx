"use client";

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { createSupabaseClientWithTypes } from "@/utils/supabase/client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

const supabase = createSupabaseClientWithTypes();

type Customer = {
  account_number: number | null;
  alamat: string | null;
  bank: string | null;
  email: string | null;
  fk_id_role: string | null;
  fk_user_id: string | null;
  fullname: string | null;
  id: string;
  phone: string | null;
  tabungan: number | null;
  usia: number | null;
};

const CustomerBalancePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [editForm, setEditForm] = useState({
    account_number: "",
    tabungan: 0,
    fullname: "",
    email: "",
    phone: "",
    alamat: "",
    bank: "",
    usia: 0,
  });

  async function getCustomerBalance() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("users").select("*");

      if (error) {
        throw error;
      }

      setCustomers(data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCustomerBalance();
  }, []);

  async function updateCustomerBalance(id: string) {
    try {
      const { error } = await supabase
        .from("users")
        .update({
          account_number: Number(editForm.account_number),
          tabungan: editForm.tabungan,
          fullname: editForm.fullname,
          email: editForm.email,
          phone: editForm.phone,
          alamat: editForm.alamat,
          bank: editForm.bank,
          usia: editForm.usia,
        })
        .eq("id", id);

      if (error) {
        throw error;
      }

      setEditingCustomer(null);
      onClose();
      getCustomerBalance();
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  }

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setEditForm({
      account_number: customer.account_number?.toString() || "",
      tabungan: customer.tabungan || 0,
      fullname: customer.fullname || "",
      email: customer.email || "",
      phone: customer.phone || "",
      alamat: customer.alamat || "",
      bank: customer.bank || "",
      usia: customer.usia || 0,
    });
    onOpen();
  };

  const filteredCustomers = customers.filter(
    customer =>
      customer.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.account_number?.toString().includes(searchTerm)
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="mb-6">
        <CardHeader className="flex items-center justify-between">
          <h4 className="text-xl font-semibold">Customer Balances</h4>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <Input
              placeholder="Search by name, email, or account number..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <Table aria-label="Customer balances table">
            <TableHeader>
              <TableColumn>Account Number</TableColumn>
              <TableColumn>Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Phone</TableColumn>
              <TableColumn>Balance</TableColumn>
              <TableColumn>Bank</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={loading ? "Loading..." : "No customers found"}
              items={filteredCustomers}
            >
              {item => (
                <TableRow key={item.id}>
                  <TableCell>{item.account_number}</TableCell>
                  <TableCell>{item.fullname}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.tabungan?.toLocaleString()}</TableCell>
                  <TableCell>{item.bank}</TableCell>
                  <TableCell>
                    <Button color="primary" variant="light" onPress={() => handleEdit(item)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                <h3 className="text-lg font-semibold">Edit Customer Details</h3>
              </ModalHeader>
              <ModalBody>
                <div className="grid gap-4">
                  <div>
                    <label className="mb-1 block text-sm">Account Number</label>
                    <Input
                      value={editForm.account_number}
                      onChange={e =>
                        setEditForm({
                          ...editForm,
                          account_number: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm">Balance</label>
                    <Input
                      type="number"
                      value={editForm.tabungan.toString()}
                      onChange={e =>
                        setEditForm({
                          ...editForm,
                          tabungan: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm">Full Name</label>
                    <Input
                      value={editForm.fullname}
                      onChange={e =>
                        setEditForm({
                          ...editForm,
                          fullname: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm">Email</label>
                    <Input
                      type="email"
                      value={editForm.email}
                      onChange={e =>
                        setEditForm({
                          ...editForm,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm">Phone</label>
                    <Input
                      value={editForm.phone}
                      onChange={e =>
                        setEditForm({
                          ...editForm,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm">Address</label>
                    <Input
                      value={editForm.alamat}
                      onChange={e =>
                        setEditForm({
                          ...editForm,
                          alamat: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm">Bank</label>
                    <Input
                      value={editForm.bank}
                      onChange={e =>
                        setEditForm({
                          ...editForm,
                          bank: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm">Age</label>
                    <Input
                      type="number"
                      value={editForm.usia.toString()}
                      onChange={e =>
                        setEditForm({
                          ...editForm,
                          usia: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => updateCustomerBalance(editingCustomer?.id ?? "")}
                >
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CustomerBalancePage;
