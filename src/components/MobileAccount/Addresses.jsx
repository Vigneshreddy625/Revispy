import { useState } from "react";
import Edit from "../Addresses/Edit";
import DeleteAddress from "../Addresses/Remove";
import NewAddress from "../Addresses/NewAddress";
import { MapPin, Home, Briefcase, Plus, Edit2, Trash2, Phone, User, Navigation, ArrowLeft } from "lucide-react";

export default function Addresses() {
  const [edit, setEdit] = useState(false);
  const [newAddress, setNewAddress] = useState(false);
  const [deleteAddress, setDeleteAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleEdit = (addressId) => {
    setSelectedAddress(addressId);
    setEdit(true);
  };

  const handleDelete = (addressId) => {
    setSelectedAddress(addressId);
    setDeleteAddress(true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-8">
      <div className="flex justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <ArrowLeft size={20} className="text-gray-700 dark:text-gray-300" onClick={() => window.history.back()}/>
          <h2 className="text-lg font-semibold">Addresses</h2>
        </div>
        <button className="flex items-center gap-2 text-sm border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md text-blue-600 shadow-sm transform transition-transform active:scale-95" onClick={() => setNewAddress(true)}>
          <Plus size={16} />
          <span>Add New Address</span>
        </button>
      </div>

      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Home size={16} className="text-gray-600 dark:text-gray-400" />
          <h3 className="text-sm font-semibold uppercase tracking-wide">Default Address</h3>
        </div>
        <div className="relative border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row justify-between  p-4">
            <div className="space-y-3 pr-16 md:pr-0">
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-600 dark:text-gray-400" />
                <p className="font-semibold text-base">Vignesh Reddy</p>
              </div>
              <div className="flex items-start gap-2">
                <Navigation size={16} className="text-gray-600 dark:text-gray-400 mt-1" />
                <div>
                  <p className="text-sm">Srinagar colony 3line kurnool road ongole</p>
                  <p className="text-sm">Ongole Bazar</p>
                  <div className="flex flex-wrap gap-1">
                    <p className="text-sm">Ongole - 523001,</p>
                    <p className="text-sm">Andhra Pradesh</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone size={16} className="text-gray-600 dark:text-gray-400" />
                <p className="text-sm">9381964889</p>
              </div>
            </div>
            <span className="absolute top-4 right-4 text-xs px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 flex items-center gap-1">
              <Home size={12} className="text-gray-600 dark:text-gray-400" />
              HOME
            </span>
          </div>
          <div className="border-t border-gray-300 dark:border-gray-700 py-2">
            <div className="flex w-full">
              <button 
                className="w-1/2 py-2 text-sm text-blue-600 font-medium border-r border-gray-300 dark:border-gray-700 transition-transform active:scale-95 flex items-center justify-center gap-2" 
                onClick={() => handleEdit(1)}
              >
                <Edit2 size={16} />
                EDIT
              </button>
              <button 
                className="w-1/2 py-2 text-sm text-red-600 font-medium transition-transform active:scale-95 flex items-center justify-center gap-2" 
                onClick={() => handleDelete(1)}
              >
                <Trash2 size={16} />
                REMOVE
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase size={16} className="text-gray-600 dark:text-gray-400" />
          <h3 className="text-sm font-semibold uppercase tracking-wide">Other Addresses</h3>
        </div>
        <div className="space-y-6">
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
            <div className="flex justify-between items-start p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-600 dark:text-gray-400" />
                  <p className="font-semibold text-base">Vignesh</p>
                </div>
                <div className="flex items-start gap-2">
                  <Navigation size={16} className="text-gray-600 dark:text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm">MH2 VITAP UNIVERSITY BESIDE AP...</p>
                    <p className="text-sm">Velagapudi, Mangalagiri - 522503</p>
                  </div>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 flex items-center gap-1">
                <Briefcase size={12} className="text-gray-600 dark:text-gray-400" />
                WORK
              </span>
            </div>
            <div className="border-t border-gray-300 dark:border-gray-700 py-2">
              <div className="flex w-full">
                <button 
                  className="w-1/2 py-2 text-sm text-blue-600 font-medium border-r border-gray-300 dark:border-gray-700 transition-transform active:scale-95 flex items-center justify-center gap-2" 
                  onClick={() => handleEdit(2)}
                >
                  <Edit2 size={16} />
                  EDIT
                </button>
                <button 
                  className="w-1/2 py-2 text-sm text-red-600 font-medium transition-transform active:scale-95 flex items-center justify-center gap-2" 
                  onClick={() => handleDelete(2)}
                >
                  <Trash2 size={16} />
                  REMOVE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Edit isOpen={edit} addressId={selectedAddress} onClose={() => setEdit(false)} />
      <DeleteAddress isOpen={deleteAddress} addressId={selectedAddress} onClose={() => setDeleteAddress(false)} />
      <NewAddress isOpen={newAddress} onClose={() => setNewAddress(false)} />
    </div>
  );
}