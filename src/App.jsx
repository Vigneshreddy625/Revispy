import { useState, useCallback, lazy, Suspense } from 'react';
import { ThemeProvider } from './components/Darkmode/Theme-provider';
import { AuthProvider } from './authContext/useAuth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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



function App() {
  const [count, setCount] = useState(0);
  const handleSetCount = useCallback((value) => setCount(value), []);

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
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
