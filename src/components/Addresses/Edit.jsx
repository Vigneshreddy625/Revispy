import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, MapPin, User, Phone, Home, Building, Map } from "lucide-react";

const Edit = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "Vignesh Reddy",
    mobileNumber: "9381964889",
    pincode: "",
    state: "",
    streetAddress: "Srinagar colony 3line kurnool road ongole",
    city: "",
    district: ""
  });
  const [loading, setLoading] = useState(false);

  const fetchLocationDetails = async (pin) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await response.json();
      if (data[0]?.Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        setFormData(prev => ({
          ...prev,
          city: postOffice.Name,
          district: postOffice.District,
          state: postOffice.State
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          city: "",
          district: "",
          state: ""
        }));
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
      setFormData(prev => ({
        ...prev,
        city: "",
        district: "",
        state: ""
      }));
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "pincode") {
      const numericValue = value.replace(/\D/g, "");
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      if (numericValue.length === 6) {
        fetchLocationDetails(numericValue);
      } else if (numericValue.length < 6) {
        setFormData(prev => ({
          ...prev,
          city: "",
          district: "",
          state: ""
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const EditableField = ({ icon: Icon, label, name, value, isLoading, type = "text" }) => (
    <div className="flex items-start space-x-3">
      <div className="mt-1">
        <Icon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
      </div>
      <div className="flex-1">
        <label className="text-sm text-gray-500 dark:text-gray-400">{label}</label>
        <div className="mt-1">
          {isLoading ? (
            <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
          ) : (
            <input
              type={type}
              name={name}
              value={value}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 
                       dark:border-gray-700 rounded-lg text-gray-900 dark:text-white 
                       focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600 
                       focus:border-transparent transition-all"
              placeholder={`Enter ${label}`}
            />
          )}
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/40"
    >
      <motion.div
        ref={popupRef}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="w-full max-w-[300px] sm:max-w-md md:max-w-xl h-[90vh] md:h-auto bg-white dark:bg-black rounded-2xl shadow-lg overflow-hidden border dark:border-gray-600"
      >
        <div className="relative h-14 bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-600 dark:to-purple-700">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="absolute -bottom-6 left-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
              <MapPin className="w-6 h-6 text-pink-500 dark:text-pink-400" />
            </div>
          </div>
        </div>

        <div className="p-6 pt-12 overflow-auto max-h-[calc(90vh-8rem)] md:max-h-none">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Edit Delivery Address
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <EditableField 
                icon={User} 
                label="Full Name" 
                name="fullName" 
                value={formData.fullName} 
              />
              <EditableField 
                icon={Phone} 
                label="Mobile Number" 
                name="mobileNumber" 
                value={formData.mobileNumber} 
                type="tel"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <EditableField 
                icon={MapPin} 
                label="Pincode" 
                name="pincode" 
                value={formData.pincode} 
                type="text"
              />
              <EditableField 
                icon={Map} 
                label="State" 
                name="state" 
                value={formData.state} 
                isLoading={loading} 
              />
            </div>

            <EditableField 
              icon={Home} 
              label="Street Address" 
              name="streetAddress" 
              value={formData.streetAddress} 
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <EditableField 
                icon={Building} 
                label="Locality/Town" 
                name="city" 
                value={formData.city} 
                isLoading={loading} 
              />
              <EditableField 
                icon={Building} 
                label="City/District" 
                name="district" 
                value={formData.district} 
                isLoading={loading} 
              />
            </div>
          </div>
        </div>

        <div className="p-4  bg-gray-50 dark:bg-gray-800/50 flex flex-row gap-3 justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 
                     hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-600 
                     hover:from-pink-600 hover:to-purple-700 text-white rounded-lg
                     transform transition-all active:scale-95 focus:outline-none
                     focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Edit;