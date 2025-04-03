import { useDispatch } from 'react-redux';
import { addWishlistItem, removeWishlistItem } from '../../redux/Wishlist/wishlistSlice';
import { useCallback } from 'react';

function useWishlistActions() {
  const dispatch = useDispatch();

  const handleAddToWishlist = useCallback(
    (productId) => {
      dispatch(addWishlistItem(productId));
    },
    [dispatch]
  );

  const handleRemoveFromWishlist = useCallback(
    (productId) => {
      dispatch(removeWishlistItem(productId));
    },
    [dispatch]
  );

  return { handleAddToWishlist, handleRemoveFromWishlist };
}

export default useWishlistActions;