import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext/useAuth";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { Button } from "../ui/button";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if (passwordRef.current) {
      passwordRef.current.type = showPassword ? "password" : "text";
    }
  };

  const predefinedUser = {
    email: "admin@gmail.com",
    password: "pass@123",
  };

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleLogin = () => {
    const { email, password } = formValues;
    if (
      email === predefinedUser.email &&
      password === predefinedUser.password
    ) {
      login();
      navigate("/categories");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="lg:min-h-screen w-full md:min-w-96 flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-6 border-2 rounded-lg transition-all duration-500">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <div className="w-full">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              value={formValues.email}
              onChange={handleChange}
              name="email"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              <FaEnvelope className="inline mr-2 mb-1" />
              Email
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
          <Button
            onClick={handleLogin}
            className="w-full px-5 py-2.5 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none transition-transform transform hover:scale-105 my-2"
          >
            Log In
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
        </div>
      </div>
    </div>
  );
};

export default Login;
