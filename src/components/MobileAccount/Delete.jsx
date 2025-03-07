import React from 'react';
import { ArrowLeft } from 'lucide-react';
import img from "../../assets/delete.jpg"; 

const DeleteAccount = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="flex items-center mb-4">
        <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => window.history.back()} />
        <h1 className="text-xl font-bold ml-2">Delete Account</h1>
      </div>

      <div className="flex justify-center mb-4">
        <img src={img} alt="Sad goodbye illustration" className="w-48 h-48" />
      </div>

      <h2 className="text-md font-bold mb-2">
        Is this goodbye? Are you sure you don’t want to reconsider?
      </h2>

      <div className="text-md space-y-3">
        <p>
          <strong>• You’ll lose your order history, saved details, SuperCoins, and all other coupons and benefits.</strong>
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Any account-related benefits will be forfeited once the account is deleted and will no longer be available to you. You cannot recover the same. However, you can always create a new account. By deleting your account, you acknowledge you have read our{' '}
          <span className="text-pink-500 underline cursor-pointer">Privacy Policy</span>.
        </p>
        <p>
          <strong>• Any pending orders, exchanges, returns, or refunds will no longer be accessible via your account.</strong>
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Vcommerce will try to complete open transactions in the next 30 days on a best-effort basis. We cannot ensure tracking of transactions once the account is deleted.
        </p>
        <p>
          <strong>• Vcommerce may not extend New User coupon if an account is created with the same mobile number or email ID.</strong>
        </p>
      </div>

      <div className="flex justify-between mt-6">
        <button className="flex-1 py-2 text-sm border border-gray-500 text-gray-700 dark:text-gray-300 font-bold rounded-md hover:bg-gray-100">
          DELETE ANYWAY
        </button>
        <div className="w-2"></div>
        <button className="flex-1 py-2 text-sm bg-pink-500 text-white font-bold rounded-md hover:bg-pink-600">
          KEEP ACCOUNT
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
