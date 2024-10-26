import { useState } from 'react';
import { ThemeProvider } from './components/Darkmode/Theme-provider';
import { AuthProvider } from './authContext/useAuth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import ConfirmOTP from './components/Authentication/OTP';
import ProtectedRoute from './components/ProtectedRoute';
import Categories from './components/Categories';
import Home from './components/Home';
import SalePage from './components/Sale';
import TrendingPage from './components/Trending';

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/home" replace />} />
              <Route path="home" element={<Home/>}/>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="sale" element={<SalePage />} />
              <Route path="/trending" element={<TrendingPage/>}/>
              <Route path="confirm-otp" element={<ConfirmOTP />} />
              <Route
                path="categories"
                element={
                  <ProtectedRoute>
                    <Categories />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
