import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/Cart/cartSlice";

export const useAddToCart = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.cart.loading);

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId));
  };

  return { handleAddToCart, loading };
};
