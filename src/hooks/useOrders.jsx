import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  fetchOrders,
  createOrder,
  fetchFilteredOrders,
  resetCreateOrderStatus,
  updateActiveFilters,
  resetFilters,
  clearFilteredOrdersError,
  updateFilteredOrdersPagination,
  selectOrders,
  selectOrdersStatus,
  selectOrdersError,
  selectCreateOrderStatus,
  selectCreateOrderError,
  selectNewlyCreatedOrder,
  selectFilteredOrders,
  selectFilteredOrdersLoading,
  selectFilteredOrdersError,
  selectFilteredOrdersPagination,
  selectActiveFilters,
} from "../redux/Orders/orderSlice";

export const useOrders = () => {
  const dispatch = useDispatch();
  
  // Original selectors
  const orders = useSelector(selectOrders);
  const ordersStatus = useSelector(selectOrdersStatus);
  const ordersError = useSelector(selectOrdersError);
  const createOrderStatus = useSelector(selectCreateOrderStatus);
  const createOrderError = useSelector(selectCreateOrderError);
  const newlyCreatedOrder = useSelector(selectNewlyCreatedOrder);
  
  // New filtered orders selectors
  const filteredOrders = useSelector(selectFilteredOrders);
  const filteredOrdersLoading = useSelector(selectFilteredOrdersLoading);
  const filteredOrdersError = useSelector(selectFilteredOrdersError);
  const filteredOrdersPagination = useSelector(selectFilteredOrdersPagination);
  const activeFilters = useSelector(selectActiveFilters);

  // Original methods
  const fetchUserOrders = useCallback((params = {}) => {
    dispatch(fetchOrders(params));
  }, [dispatch]);

  const createNewOrder = useCallback((orderPayload) => {
    dispatch(createOrder(orderPayload));
  }, [dispatch]);

  const resetOrderCreation = useCallback(() => {
    dispatch(resetCreateOrderStatus());
  }, [dispatch]);

  // New methods for filtered orders
  const fetchFilteredOrdersList = useCallback((customFilters = {}) => {
    const filters = { ...activeFilters, ...customFilters };
    dispatch(fetchFilteredOrders(filters));
  }, [dispatch, activeFilters]);

  const updateFilters = useCallback((newFilters, autoFetch = true) => {
    dispatch(updateActiveFilters(newFilters));
    if (autoFetch) {
      dispatch(fetchFilteredOrders({ ...activeFilters, ...newFilters }));
    }
  }, [dispatch, activeFilters]);

  const resetAllFilters = useCallback(() => {
    dispatch(resetFilters());
    dispatch(fetchFilteredOrders({
      search: '',
      status: '',
      amountRange: '',
      sortBy: 'date',
      page: 1,
      limit: 20,
    }));
  }, [dispatch]);

  const changeFilteredOrdersPage = useCallback((page) => {
    dispatch(updateFilteredOrdersPagination(page));
    dispatch(fetchFilteredOrders({ ...activeFilters, page }));
  }, [dispatch, activeFilters]);

  const searchFilteredOrders = useCallback((searchTerm) => {
    const newFilters = { ...activeFilters, search: searchTerm, page: 1 };
    dispatch(updateActiveFilters({ search: searchTerm, page: 1 }));
    dispatch(fetchFilteredOrders(newFilters));
  }, [dispatch, activeFilters]);

  const filterOrdersByStatus = useCallback((status) => {
    const newFilters = { ...activeFilters, status, page: 1 };
    dispatch(updateActiveFilters({ status, page: 1 }));
    dispatch(fetchFilteredOrders(newFilters));
  }, [dispatch, activeFilters]);

  const filterOrdersByAmountRange = useCallback((amountRange) => {
    const newFilters = { ...activeFilters, amountRange, page: 1 };
    dispatch(updateActiveFilters({ amountRange, page: 1 }));
    dispatch(fetchFilteredOrders(newFilters));
  }, [dispatch, activeFilters]);

  const sortFilteredOrders = useCallback((sortBy) => {
    const newFilters = { ...activeFilters, sortBy, page: 1 };
    dispatch(updateActiveFilters({ sortBy, page: 1 }));
    dispatch(fetchFilteredOrders(newFilters));
  }, [dispatch, activeFilters]);

  const clearFilteredError = useCallback(() => {
    dispatch(clearFilteredOrdersError());
  }, [dispatch]);

  return {
    // Original state and methods
    orders,
    ordersStatus,
    ordersError,
    createOrderStatus,
    createOrderError,
    newlyCreatedOrder,
    fetchUserOrders,
    createNewOrder,
    resetOrderCreation,
    
    // New filtered orders state and methods
    filteredOrders,
    filteredOrdersLoading,
    filteredOrdersError,
    filteredOrdersPagination,
    activeFilters,
    fetchFilteredOrdersList,
    updateFilters,
    resetAllFilters,
    changeFilteredOrdersPage,
    searchFilteredOrders,
    filterOrdersByStatus,
    filterOrdersByAmountRange,
    sortFilteredOrders,
    clearFilteredError,
  };
};