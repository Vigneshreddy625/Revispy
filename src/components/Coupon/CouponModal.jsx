import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Tag, Loader2, ShoppingCart } from "lucide-react";
import {
  getAvailableCoupons,
  selectAvailableCoupons,
  selectCouponLoading,
} from "../../redux/Coupon/couponSlice";

const CouponDisplayModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  
  const availableCoupons = useSelector(selectAvailableCoupons);
  const loading = useSelector(selectCouponLoading);

  useEffect(() => {
    if (isOpen) {
      dispatch(getAvailableCoupons());
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Tag className="h-5 w-5 text-pink-500" />
            AVAILABLE COUPONS
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
            <span className="ml-2 text-gray-600 dark:text-gray-300">Loading coupons...</span>
          </div>
        )}

        {/* Scrollable Content */}
        {!loading && (
          <div className="overflow-y-auto flex-1" style={{ maxHeight: '400px' }}>
            {/* Available Coupons Display */}
            {availableCoupons.length > 0 && (
              <div className="p-4 space-y-4">
                {availableCoupons.map((coupon, index) => (
                  <div 
                    key={coupon.id || coupon.code || index} 
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/20"
                  >
                    {/* Coupon Code */}
                    <div className="border border-dashed border-pink-300 dark:border-pink-600 rounded px-3 py-1 inline-block mb-3 bg-pink-50 dark:bg-pink-900/20">
                      <span className="text-sm font-bold text-pink-600 dark:text-pink-400">
                        {coupon.code}
                      </span>
                    </div>

                    {/* Discount Value */}
                    <div className="mb-2">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        Save ₹{coupon.savings || 0}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {coupon.discount}
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      {coupon.minPurchase && (
                        <div>
                          Minimum purchase: ₹{coupon.minPurchase}
                        </div>
                      )}
                      
                      {coupon.expiryDate && (
                        <div>
                          Expires: {coupon.expiryDate}
                          {coupon.expiryTime && ` at ${coupon.expiryTime}`}
                        </div>
                      )}
                      
                      {coupon.description && (
                        <div className="text-gray-500 dark:text-gray-500">
                          {coupon.description}
                        </div>
                      )}
                      
                      {coupon.terms && (
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          T&C: {coupon.terms}
                        </div>
                      )}
                    </div>

                    {/* Status Indicators */}
                    {coupon.isExpired && (
                      <div className="mt-2 inline-block px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs rounded">
                        Expired
                      </div>
                    )}
                    
                    {coupon.isUsed && (
                      <div className="mt-2 inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                        Already Used
                      </div>
                    )}
                    
                    {coupon.canApply === false && coupon.reason && (
                      <div className="mt-2 inline-block px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-xs rounded">
                        {coupon.reason}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* No Coupons State */}
            {availableCoupons.length === 0 && !loading && (
              <div className="p-8 text-center">
                <ShoppingCart className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">No coupons available</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Check back later for new offers
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponDisplayModal;