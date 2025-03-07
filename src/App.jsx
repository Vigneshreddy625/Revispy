import { useState, useCallback, lazy, Suspense, useEffect } from "react";
import { ThemeProvider } from "./components/Darkmode/Theme-provider";
import { AuthProvider } from "./authContext/useAuth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const Orders = lazy(() => import("./components/Account/Orders"));
const Delete = lazy(() => import("./components/Profile/Delete"));
const Addresses = lazy(() => import("./components/Profile/Addresses"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const Account = lazy(() => import("./components/Account/Account"));
const Layout = lazy(() => import("./components/Layout/Layout"));
const Login = lazy(() => import("./components/Authentication/Login"));
const Signup = lazy(() => import("./components/Authentication/Signup"));
const ConfirmOTP = lazy(() => import("./components/Authentication/OTP"));
const ProtectedRoute = lazy(() => import("./components/Items/ProtectedRoute"));
const Categories = lazy(() => import("./components/MainComps/Categories"));
const CategoryPage = lazy(() => import("./components/Category/CategoryPage"));
const Home = lazy(() => import("./components/MainComps/Home"));
const SalePage = lazy(() => import("./components/MainComps/Sale"));
const TrendingPage = lazy(() => import("./components/MainComps/Trending"));
const LoadingScreen = lazy(() => import("./components/Items/LoadingScreen"));
const Cart = lazy(() => import("./components/HeaderComps/Cart"));
const Wishlist = lazy(() => import("./components/HeaderComps/Wishlist"));
const Search = lazy(() => import("./components/HeaderComps/Search"));
const PageNotFound = lazy(() => import("./components/Items/PNF"));
const SearchDesktop = lazy(() => import("./components/Search/Search"));
const DOD = lazy(() => import("./components/MainComps/DOD"));
const MobileAccount = lazy(() => import("./components/MobileAccount/Account"));
import MobileOrders from "./components/MobileAccount/Orders";
import MobileAddresses from "./components/MobileAccount/Addresses";
import Details from "./components/MobileAccount/Details";
import MobileDelete from "./components/MobileAccount/Delete";

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
                {!isMobile ? (
                  <Route path="account" element={<Account />}>
                    <Route path="overview" element={<div>Overview</div>} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="savedcards" element={<div>Saved Cards</div>} />
                    <Route path="addresses" element={<Addresses />} />
                    <Route path="delete" element={<Delete />} />
                  </Route>
                ) : (
                  <>
                    <Route path="account" element={<MobileAccount />} />
                    <Route path="orders" element={<MobileOrders />} />
                    <Route path="account/details" element={<Details />} />
                    <Route path="account/addresses" element={<MobileAddresses />} />
                    <Route path="account/delete" element={<MobileDelete />} />
                  </>
                )}
                <Route path="/trending" element={<TrendingPage />} />
                <Route path="/dod" element={<DOD />} />
                <Route path="confirm-otp" element={<ConfirmOTP />} />
                {/* <Route
                  path="categories"
                  element={
                    <ProtectedRoute>
                      <Categories />
                    </ProtectedRoute>
                  }
                /> */}
                <Route path="/categories" element={<Categories />} />
                <Route
                  path="/categories/:categoryName"
                  element={<CategoryPage />}
                />
                <Route path="searchresults" element={<SearchDesktop />} />
                <Route path="mobileaccount" element={<MobileAccount />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
              {isMobile && <Route path="search" element={<Search />} />}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
