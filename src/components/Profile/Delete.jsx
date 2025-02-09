import React from 'react';
import img from "../../assets/delete.jpg";

const DeleteAccount = () => {
  return (
    <div className="max-w-xl mx-auto px-6 py-4 border">
      <h1 className="text-lg font-semibold mb-4">Delete Account</h1>
      
      <div className="flex justify-center mb-8">
        <img 
          src={img}
          alt="Sad goodbye illustration"
          className="w-32 h-32"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-md font-medium">
          Is this goodbye? Are you sure you don't want to reconsider?
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-md font-medium mb-2">
              You'll lose your order history, saved details, SuperCoins and all other coupons and benefits.
            </p>
            <p className="text-sm">
              Any account related benefits will be forfeited once the account is deleted and will no longer be available to you. You cannot recover the same. However, you can always create a new account. By deleting your account, you acknowledge you have read our{' '}
              <span className="text-pink-500">Privacy Policy</span>.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-start space-x-2">
            <input type="checkbox" className="mt-1" />
            <span className="text-sm">I agree to all the terms and conditions*</span>
          </label>
        </div>

        <div className="flex space-x-4 pt-2">
          <button className="flex-1 py-2 text-sm border border-pink-500 text-pink-500 rounded-md hover:bg-pink-50">
            DELETE ANYWAY
          </button>
          <button className="flex-1 py-2 text-sm bg-pink-500 text-white rounded-md hover:bg-pink-600">
            KEEP ACCOUNT
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;