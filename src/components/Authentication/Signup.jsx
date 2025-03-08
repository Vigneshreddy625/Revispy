import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { AvatarIcon } from '@radix-ui/react-icons';
import { X } from 'lucide-react';
import { useAuth } from '../../authContext/useAuth';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { register, error: authError, loading: authLoading } = useAuth();

  // Update local error when auth error changes
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
    // Clear error message when user makes changes
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Image size should be less than 5MB');
        return;
      }
      
      if (!file.type.match('image.*')) {
        setErrorMessage('Please select an image file');
        return;
      }
      
      setSelectedImage(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      setErrorMessage('');
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!selectedImage) {
      setErrorMessage('Please select an avatar image');
      return;
    }
    
    setIsLoading(true);
    setErrorMessage("");

    try {
      // The register function in auth context expects userData object and avatarFile separately
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        password: formData.password
      };
      
      await register(userData, selectedImage);
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

          <div className="w-full mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center text-sm">
                <AvatarIcon className="mr-2" /> Avatar (Required)
              </span>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <button
                type="button"
                onClick={handleImageUploadClick}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Choose File
              </button>
            </div>
            
            {previewUrl ? (
              <div className="relative w-full">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-12 h-12 object-cover rounded-full mx-auto border-2 border-blue-500" 
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImage(null);
                    setPreviewUrl(null);
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
                  aria-label="Remove image"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <div 
                onClick={handleImageUploadClick}
                className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto cursor-pointer hover:bg-gray-300"
              >
                <FaUser className="text-gray-400 text-xl" />
              </div>
            )}
            
            {selectedImage && (
              <p className="text-xs text-center mt-2 text-gray-500">
                {selectedImage.name} ({Math.round(selectedImage.size / 1024)} KB)
              </p>
            )}
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