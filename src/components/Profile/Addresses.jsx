import { useState } from "react";
import Edit from "../Addresses/Edit";
import DeleteAddress from "../Addresses/Remove";

export default function Addresses() {
  const [edit, setEdit] = useState(false);
  const [deleteAddress, setDeleteAddress] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-md font-semibold">Saved Addresses</h2>
          <button className="text-sm border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800">
            + ADD NEW ADDRESS
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2">DEFAULT ADDRESS</h3>
          <div className="relative border border-gray-300 dark:border-gray-700 shadow-md px-4 py-2">
            <div className="flex">
              <div>
                <p className="font-semibold mb-2">Vignesh Reddy</p>
                <p className="text-xs">Srinagar colony 3line kurnool road ongole</p>
                <p className="text-xs">Ongole Bazar</p>
                <p className="text-xs">Ongole - 523001</p>
                <p className="text-xs">Andhra Pradesh</p>
                <p className="text-xs mt-1">Mobile: 9381964889</p>
              </div>
              <span className="absolute right-2 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md">
                HOME
              </span>
            </div>
            <div className="border-t border-gray-300 dark:border-gray-700 flex justify-between mt-3 pt-2">
              <button className="w-1/2 text-sm text-blue-600 font-semibold border-r" onClick={() => setEdit(true)}>
                EDIT
              </button>
              <button className="w-1/2 text-sm text-blue-600 font-semibold" onClick={() => setDeleteAddress(true)}>
                REMOVE
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2">OTHER ADDRESSES</h3>
          <div className="border border-gray-300 dark:border-gray-700 shadow-md px-4 py-2">
            <p className="font-semibold mb-2">Vignesh</p>
            <p className="text-xs">MH2 VITAP UNIVERSITY BESIDE AP..., Velagapudi, Mangalagiri - 522503</p>
          </div>
        </div>
      </div>

      <Edit isOpen={edit} onClose={() => setEdit(false)} />
        <DeleteAddress isOpen={deleteAddress} onClose={() => setDeleteAddress(false)} />
    </div>
  );
}
