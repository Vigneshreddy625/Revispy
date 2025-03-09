import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../authContext/useAuth';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { register, error: authError, loading: authLoading } = useAuth();

  React.useEffect(() => {
    if (authError) {
      setErrorMessage(authError);
    }
  }, [authError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setErrorMessage("");

    try {
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        password: formData.password
      };
      
      await register(userData);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer";
  const labelClass = "peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center";

  return (
    <div className="lg:min-h-screen w-full md:min-w-96 flex items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col border border-gray-400 justify-center items-center p-6 rounded-lg transition-all duration-500">
        <h1 className="text-2xl font-bold text-center mb-4">Signup</h1>
        
        {errorMessage && (
          <div className="w-full p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleSignup} className="w-full max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="username"
              id="floating_username"
              className={inputClass}
              placeholder=" "
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="floating_username" className={labelClass}>
              <FaUser className="mr-2" aria-label="Username icon" /> Username
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="fullName"
              id="floating_full_name"
              className={inputClass}
              placeholder=" "
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <label htmlFor="floating_full_name" className={labelClass}>
              <FaUser className="mr-2" aria-label="Name icon" /> Full Name
            </label>
          </div>
          
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="floating_email"
              className={inputClass}
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="floating_email" className={labelClass}>
              <FaEnvelope className="mr-2" aria-label="Email icon" /> Email
            </label>
          </div>
          
          <div className="relative z-0 w-full mb-5 group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="floating_password"
              className={inputClass}
              placeholder=" "
              value={formData.password}
              onChange={handleChange}
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

          <button
            type="submit"
            disabled={isLoading || authLoading}
            className="w-full dark:bg-gray-100 text-white dark:text-black bg-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center"
          >
            {isLoading || authLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Processing...
              </>
            ) : (
              "Signup"
            )}
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