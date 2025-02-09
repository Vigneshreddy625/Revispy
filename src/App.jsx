import { useState, useCallback, lazy, Suspense, useEffect } from 'react';
import { ThemeProvider } from './components/Darkmode/Theme-provider';
import { AuthProvider } from './authContext/useAuth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const Delete = lazy(() => import('./components/Profile/Delete'));
const Addresses = lazy(() => import('./components/Profile/Addresses'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const Account = lazy(() => import('./components/Account'));
const Layout = lazy(() => import('./components/Layout'));
const Login = lazy(() => import('./components/Authentication/Login'));
const Signup = lazy(() => import('./components/Authentication/Signup'));
const ConfirmOTP = lazy(() => import('./components/Authentication/OTP'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const Categories = lazy(() => import('./components/Categories'));
const Home = lazy(() => import('./components/Home'));
const SalePage = lazy(() => import('./components/Sale'));
const TrendingPage = lazy(() => import('./components/Trending'));
const LoadingScreen = lazy(() => import('./components/LoadingScreen'));
const Cart = lazy(() => import('./components/Cart'));
const Wishlist = lazy(() => import('./components/Wishlist'));
const Search = lazy(() => import('./components/Search'));
const PageNotFound = lazy(() => import('./components/PNF'));

function App() {
  const [count, setCount] = useState(0);
  const handleSetCount = useCallback((value) => setCount(value), []);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="home" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="sale" element={<SalePage />} />
                <Route path="cart" element={<Cart />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path='account' element={<Account />} >
                  <Route path="overview" element={<div>Overview</div>} />
                  <Route path="orders" element={<div>Orders</div>} />
                  <Route path="profile" element={<Profile/>} />
                  <Route path="savedcards" element={<div>Saved Cards</div>} />
                  <Route path="addresses" element={<Addresses/>} />
                  <Route path="delete" element={<Delete/>} />
                </Route>
                <Route path="/trending" element={<TrendingPage />} />
                <Route path="confirm-otp" element={<ConfirmOTP />} />
                <Route
                  path="categories"
                  element={
                    <ProtectedRoute>
                      <Categories />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<PageNotFound />} />
              </Route>
              {isMobile && (
                <Route path='search' element={<Search />} />
              )}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;