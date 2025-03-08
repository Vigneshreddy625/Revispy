import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext/useAuth";
import { FaLock, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { Button } from "../ui/button";

const Login = () => {
  const { login, error: authError, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: ""
  });

  useEffect(() => {
    if (authError) {
      setErrors(prev => ({
        ...prev,
        general: authError
      }));
    }
  }, [authError]);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if (passwordRef.current) {
      passwordRef.current.type = showPassword ? "password" : "text";
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    
    if (errors[name] || errors.general) {
      setErrors({
        ...errors,
        [name]: "",
        general: ""
      });
    }
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    
    let newErrors = {};
    let isValid = true;

    if (!formValues.email) {
        newErrors.email = "Email is required";
        isValid = false;
    } else if (!validateEmail(formValues.email)) {
        newErrors.email = "Please enter a valid email";
        isValid = false;
    }

    if (!formValues.password) {
        newErrors.password = "Password is required";
        isValid = false;
    }

    if (!isValid) {
        setErrors({ ...errors, ...newErrors });
        return;
    }

    setIsLoading(true);

    try {
        await login(formValues.email, formValues.password);
        navigate("/categories");
    } catch (error) {

        setErrors({
            ...errors,
            general: error.message || "Login failed. Please check your credentials and try again.",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="lg:min-h-screen w-full md:min-w-96 flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-6 border-2 rounded-lg transition-all duration-500">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleLogin} className="w-full">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              value={formValues.email}
              onChange={handleChange}
              name="email"
              id="floating_email"
              className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              <FaEnvelope className="inline mr-2 mb-1" />
              Email
            </label>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div className="relative z-0 w-full mb-5 group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="floating_password"
              className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder=" "
              value={formValues.password}
              ref={passwordRef}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              <FaLock className="inline mr-2 mb-1" />
              Password
            </label>
            <button
              type="button"
              onClick={handlePasswordVisibility}
              className="absolute top-4 right-0"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 text-xs text-gray-600">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          
          {errors.general && <p className="text-red-500 text-sm mb-2">{errors.general}</p>}
          
          <Button
            type="submit"
            disabled={isLoading || authLoading}
            className="w-full px-5 py-2.5 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none transition-transform transform hover:scale-105 my-2"
          >
            {(isLoading || authLoading) ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Log In"
            )}
          </Button>
          
          <hr className="my-2 text-black" />
          <div className="flex justify-center items-center my-2">
            <label className="ml-2 text-sm font-medium">
              Don't have an account?
            </label>
            <Link to="/signup" className="ml-1 text-blue-600 hover:underline">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;