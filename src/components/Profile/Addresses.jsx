import { useState } from "react";

export default function Addresses() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-md font-semibold">Saved Addresses</h2>
          <button className="text-sm border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800">
            + ADD NEW ADDRESS
          </button>
        </div>

        <AddressCard
          title="DEFAULT ADDRESS"
          name="Vignesh Reddy"
          street="Srinagar colony 3line kurnool road ongole"
          landmark="Ongole Bazar"
          city="Ongole - 523001"
          state="Andhra Pradesh"
          mobile="9381964889"
          isDefault
        />

        <AddressCard
          title="OTHER ADDRESSES"
          name="Vignesh"
          address="MH2 VITAP UNIVERSITY BESIDE AP..., Velagapudi, Mangalagiri - 522503"
        />
      </div>
    </div>
  );
}

function AddressCard({ title, name, street, landmark, city, state, mobile, isDefault }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      <div className="relative border border-gray-300 dark:border-gray-700 shadow-md px-4 py-2">
        <div className="flex ">
          <div>
            <p className="font-semibold mb-2">{name}</p>
            <p className="text-xs">{street}</p>
            <p className="text-xs">{landmark}</p>
            <p className="text-xs">{city}</p>
            <p className="text-xs">{state}</p>
            {mobile && <p className="text-xs mt-1">Mobile: {mobile}</p>}
          </div>
          {isDefault && (
            <span className="absolute right-2 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md">
              HOME
            </span>
          )}
        </div>
        {isDefault && (
          <div className="border-t border-gray-300 dark:border-gray-700 flex justify-between mt-3 pt-2">
            <button className="w-1/2 text-sm text-blue-600 font-semibold border-r">EDIT</button>
            <button className="w-1/2 text-sm text-blue-600 font-semibold">REMOVE</button>
          </div>
        )}
      </div>
    </div>
  );
}
