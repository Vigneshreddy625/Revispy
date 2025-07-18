import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Check, AlertCircle, Loader2, Tag } from "lucide-react";
import {
  applyCoupon,
  removeCoupon,
  clearError,
  selectAppliedCoupon,
  selectCouponError,
  selectIsApplyingCoupon,
  selectIsRemovingCoupon,
  selectCouponOperationInProgress,
} from "../../redux/Coupon/couponSlice";
import { applyCouponLocally } from "../../redux/Cart/cartSlice";

const CouponInput = ({ onCouponApplied }) => {
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const promoCode = useSelector((state) => state.cart.cart?.promoCode);

  const appliedCoupon = promoCode.code;
  const error = useSelector(selectCouponError);
  const isApplyingCoupon = useSelector(selectIsApplyingCoupon);
  const isRemovingCoupon = useSelector(selectIsRemovingCoupon);
  const operationInProgress = useSelector(selectCouponOperationInProgress);

  useEffect(() => {
    dispatch(applyCouponLocally(promoCode));
  }, [promoCode?.code, dispatch]);

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
  };

  console.log(appliedCoupon);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      return;
    }

    dispatch(clearError());
    const result = await dispatch(applyCoupon(couponCode.trim()));
    if (result.type.endsWith("/fulfilled")) {
      onCouponApplied && onCouponApplied(result.payload.cart);
      showSuccess("Coupon applied successfully!");
      setCouponCode("");
    }
  };

  const handleRemoveCoupon = async () => {
    dispatch(clearError());
    const result = await dispatch(removeCoupon());
    if (result.type.endsWith("/fulfilled")) {
      onCouponApplied && onCouponApplied(result.payload.cart);
      showSuccess("Coupon removed successfully!");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && couponCode.trim() && !isApplyingCoupon) {
      handleApplyCoupon();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    setCouponCode(value);
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <div className="relative w-full">
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-10 flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {successMessage}
            </span>
          </div>
        </div>
      )}

      {appliedCoupon != null && (
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              1 Coupon applied
            </span>
            <span className="text-sm text-green-600 dark:text-green-400">
              You saved additional ₹{appliedCoupon.savings || 0}
            </span>
          </div>
          <button
            onClick={handleRemoveCoupon}
            disabled={isRemovingCoupon}
            className="px-3 py-1 text-sm text-red-500 border border-red-500 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            {isRemovingCoupon ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              "REMOVE"
            )}
          </button>
        </div>
      )}

      {appliedCoupon == null && (
        <div className="space-y-2 w-full">
          <div className="flex gap-2 w-full">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                disabled={operationInProgress}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:opacity-50 w-full"
              />
            </div>
            <button
              onClick={handleApplyCoupon}
              disabled={!couponCode.trim() || isApplyingCoupon}
              className="px-3 py-1 text-sm text-red-500 border border-red-500 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              {isApplyingCoupon ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                "APPLY"
              )}
            </button>
          </div>

          {error && (
            <div className="p-2 border border-red-200 dark:border-red-800 rounded-md flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
              <span className="text-sm text-red-700 dark:text-red-300">
                {error}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CouponInput;
