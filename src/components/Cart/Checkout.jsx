import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  CreditCard,
  Wallet,
  Truck,
  Briefcase,
  Home,
  User,
  Navigation,
  Phone,
  ArrowLeft,
} from "lucide-react";
import { useSelector } from "react-redux";
import LoadingScreen from "../Items/LoadingScreen";
import { useDispatch } from "react-redux";
import { fetchAddresses } from "../../redux/Address/addressSlice";
import AddressList from "./AddressList";
import AddressForm from "./AddressForm";

const Checkout = ({
  cartItems,
  calculateSubtotal,
  calculateTotal,
  calculateTax,
  discount,
  shippingMethod,
  shippingCosts,
  setIsCheckingOut,
}) => {
  const subtotal = calculateSubtotal?.() ?? 0;
  const tax = calculateTax?.(subtotal - (discount ?? 0)) ?? 0;
  const shipping = shippingCosts?.[shippingMethod?.toLowerCase?.()] ?? 0;
  const total = calculateTotal?.() ?? 0;

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const addresses = useSelector((state) => state.addresses.addresses);
  const loading = useSelector((state) => state.addresses.loading);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  if (loading) {
    return <LoadingScreen />;
  }

  const filteredAddresses = addresses.filter(
    (address) => address.type === "home"
  );
  console.log(filteredAddresses);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full min-h-screen flex flex-col p-4 bg-white dark:bg-black">
      <div className="flex items-center gap-2 mb-4 lg:my-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
        <ArrowLeft
          size={24}
          className="mt-1 cursor-pointer"
          onClick={() => setIsCheckingOut(false)}
        />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Checkout
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {filteredAddresses ? (
            <>
              <AddressList addresses={addresses} />
            </>
          ) : (
            <>
              <AddressForm
                formData={formData}
                handleInputChange={handleInputChange}
              />
            </>
          )}

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Payment Method
            </h2>
            <div className="space-y-3">
              <div
                className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer ${
                  paymentMethod === "credit-card"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-300 dark:border-gray-700"
                }`}
                onClick={() => setPaymentMethod("credit-card")}
              >
                <CreditCard className="text-gray-600 dark:text-gray-400" />
                <span className="text-gray-800 dark:text-gray-200">
                  Credit/Debit Card
                </span>
              </div>

              <div
                className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer ${
                  paymentMethod === "upi"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-300 dark:border-gray-700"
                }`}
                onClick={() => setPaymentMethod("upi")}
              >
                <Wallet className="text-gray-600 dark:text-gray-400" />
                <span className="text-gray-800 dark:text-gray-200">UPI</span>
              </div>

              <div
                className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer ${
                  paymentMethod === "cod"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-300 dark:border-gray-700"
                }`}
                onClick={() => setPaymentMethod("cod")}
              >
                <Truck className="text-gray-600 dark:text-gray-400" />
                <span className="text-gray-800 dark:text-gray-200">
                  Cash on Delivery
                </span>
              </div>
            </div>
          </div>

          {paymentMethod === "credit-card" && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Card Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cardCvv"
                      value={formData.cardCvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "upi" && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                UPI Details
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  UPI ID
                </label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          )}

          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Order Summary
          </h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Qty: {item.qty}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Rs.{(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-96 lg:sticky lg:top-4 lg:self-start  lg:mt-0">
          <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Order Total
            </h2>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Subtotal
                </span>
                <span className="text-sm text-gray-900 dark:text-white">
                  Rs.{subtotal.toFixed(2)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Discount
                  </span>
                  <span className="text-sm text-green-600 dark:text-green-400">
                    -Rs.{discount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Tax
                </span>
                <span className="text-sm text-gray-900 dark:text-white">
                  Rs.{tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Shipping
                </span>
                <span className="text-sm text-gray-900 dark:text-white">
                  Rs.{shipping.toFixed(2)}
                </span>
              </div>
              <hr className="mb-4 border-gray-200 dark:border-gray-700" />
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Total
                </span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Rs.{total.toFixed(2)}
                </span>
              </div>
            </div>

            <button className="w-full bg-black dark:bg-white dark:text-black text-white py-3 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
