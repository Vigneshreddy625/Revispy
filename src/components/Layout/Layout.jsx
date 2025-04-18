import React, {useEffect} from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import BottomBar from "./BottomBar";
import { useDispatch } from "react-redux";
import { fetchAddresses } from "../../redux/Address/addressSlice";
import { fetchProducts } from "../../redux/Products/productSlice";
import { fetchCart } from "../../redux/Cart/cartSlice";

function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);
  return (
    <div className="min-h-screen w-full flex flex-col bg-white dark:bg-black">
      <div className="fixed right-0 left-0 z-50 backdrop-filter backdrop-blur-lg bg-background">
        <Header />
      </div>
      <div className="lg:max-w-5xl lg:mx-auto bg-white dark:bg-black mb-16 md:mb-0 placeholder mt-14 flex-grow flex lg:min-h-screen">
        <Outlet />
      </div>
      <div className="hidden md:block">
        <Footer />
      </div>
      <div className="block lg:hidden">
        <BottomBar />
      </div>
    </div>
  );
}

export default Layout;
