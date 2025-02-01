import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [otpValues, setOtpValues] = useState(Array(8).fill(''));
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    if (value !== '' && index < 7) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 8).split('');
    const newOtpValues = [...otpValues];
    
    pastedData.forEach((value, index) => {
      if (index < 8 && /^\d$/.test(value)) {
        newOtpValues[index] = value;
      }
    });
    
    setOtpValues(newOtpValues);
  };

  const handleVerify = () => {
    navigate("/login")
  }

  return (
    <div className="min-h-screen md:w-full flex items-center justify-center">
      <div className="rounded-2xl p-8 w-full max-w-md shadow-sm border border-gray-300">
        <h1 className="text-xl font-semibold text-center mb-2">
          Verify your email
        </h1>
        <p className="text-center text-sm text-gray-600 dark:text-gray-100 mb-6">
          Enter the 8 digit code you have received on<br />
          dev***@revpay.com
        </p>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 dark:text-gray-100 mb-2">Code</label>
          <div className="flex gap-2">
            {otpValues.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                ref={(ref) => (inputRefs.current[index] = ref)}
                className="w-10 h-10 border border-gray-300 rounded-md text-center text-lg focus:border-gray-400 focus:ring-0 focus:outline-none bg-transparent"
              />
            ))}
          </div>
        </div>

        <button 
          className="w-full bg-black dark:bg-gray-100 text-white dark:text-gray-800  rounded-md py-3 font-medium text-sm hover:bg-gray-900 transition-colors"
          onClick={handleVerify}
        >
          VERIFY
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;