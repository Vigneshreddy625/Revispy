import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, MapPin, User, Phone, Home, Building, Map } from "lucide-react";

const Edit = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "Vignesh Reddy",
    mobileNumber: "9381964889",
    houseNumber: "33-055-800",
    pincode: "",
    state: "",
    streetAddress: "Srinagar colony 3line kurnool road ongole",
    city: "",
    district: "",
    country: ""
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
          state: postOffice.State,
          country: postOffice.Country
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
          state: "",
          country:""
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

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 backdrop-blur-md bg-black/40 overflow-y-auto"
    >
      <motion.div
        ref={popupRef}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="w-full md:max-w-xl h-full md:h-auto max-h-full md:max-h-[90vh] bg-white dark:bg-black md:rounded-2xl shadow-lg overflow-hidden border dark:border-gray-600 flex flex-col"
      >
        <div className="relative h-14 bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-600 dark:to-purple-700 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="absolute -bottom-6 left-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
              <MapPin className="w-6 h-6 text-pink-500 dark:text-pink-400" />
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 pt-10 sm:pt-12 overflow-y-auto flex-grow">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Edit Delivery Address
          </h2>

          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="mt-1 flex-shrink-0">
                  <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600 focus:border-transparent transition-all text-sm"
                    placeholder="Enter Full Name"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="mt-1 flex-shrink-0">
                  <Phone className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600 focus:border-transparent transition-all text-sm"
                    placeholder="Enter Mobile Number"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="mt-1 flex-shrink-0">
                  <Home className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">House/Flat No.</label>
                  <input
                    type="text"
                    name="houseNumber"
                    value={formData.houseNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600 focus:border-transparent transition-all text-sm"
                    placeholder="Enter House/Flat No."
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="mt-1 flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600 focus:border-transparent transition-all text-sm"
                    placeholder="Enter Pincode"
                    maxLength={6}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-2 sm:space-x-3">
              <div className="mt-1 flex-shrink-0">
                <Home className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Street Address</label>
                <textarea
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600 focus:border-transparent transition-all text-sm"
                  placeholder="Enter Street Address"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="mt-1 flex-shrink-0">
                  <Building className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Locality/Town</label>
                  {loading ? (
                    <div className="w-full h-6 mt-1 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                  ) : (
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600 focus:border-transparent transition-all text-sm"
                      placeholder="Enter Locality/Town"
                    />
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="mt-1 flex-shrink-0">
                  <Building className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">City/District</label>
                  {loading ? (
                    <div className="w-full h-6 mt-1 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                  ) : (
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600 focus:border-transparent transition-all text-sm"
                      placeholder="Enter City/District"
                    />
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="mt-1 flex-shrink-0">
                  <Map className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">State</label>
                  {loading ? (
                    <div className="w-full h-6 mt-1 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                  ) : (
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600 focus:border-transparent transition-all text-sm"
                      placeholder="Enter State"
                    />
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="mt-1 flex-shrink-0">
                  <Map className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Country</label>
                  {loading ? (
                    <div className="w-full h-6 mt-1 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                  ) : (
                    <input
                      type="text"
                      name="state"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600 focus:border-transparent transition-all text-sm"
                      placeholder="Enter Country"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50">
          <button
            className="w-full xs:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transform transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 order-1 xs:order-2"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Edit;