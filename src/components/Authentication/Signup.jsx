import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/confirm-otp');
  };

  const inputClass = "block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer";
  const labelClass = "peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center";

  return (
    <div className="lg:min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col border border-gray-400 justify-center items-center p-6 rounded-lg transition-all duration-500">
        <h1 className="text-2xl font-bold text-center mb-4">Signup</h1>
        
        <form onSubmit={handleSignup} className="w-full max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className={inputClass}
              placeholder=" "
              required
            />
            <label htmlFor="floating_first_name" className={labelClass}>
              <FaUser className="mr-2" aria-label="Name icon" /> Name
            </label>
          </div>
          
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className={inputClass}
              placeholder=" "
              required
            />
            <label htmlFor="floating_email" className={labelClass}>
              <FaEnvelope className="mr-2" aria-label="Email icon" /> Email
            </label>
          </div>
          
          <div className="relative z-0 w-full mb-5 group">
            <input
              type={showPassword ? "text" : "password"}
              name="floating_password"
              id="floating_password"
              className={inputClass}
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floating_password" className={labelClass}>
              <FaLock className="mr-2" aria-label="Password icon" /> Password
            </label>
            <button
              type="button"
              onClick={handlePasswordVisibility}
              className="absolute top-4 right-0"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex items-center mb-5">
            <input
              id="showPassword"
              type="checkbox"
              checked={showPassword}
              onChange={handlePasswordVisibility}
              className="w-4 h-4 mr-2 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
            />
            <label htmlFor="showPassword">Show password</label>
          </div>

          <button
            type="submit"
            className="w-full dark:bg-gray-100 text-white dark:text-black bg-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105"
          >
            Signup
          </button>
        </form>

        <div className="text-black dark:text-white my-2">
          <span>Already have an account?</span>
          <Link to="/login" className="underline text-red-700 ml-1">
            LogIn!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
