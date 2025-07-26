import React from 'react';
import { useOutletContext } from 'react-router-dom';
import OrderTable from './Orders/OrderTable';

const OrdersPage = () => {
  const { selectedOrder, setSelectedOrder } = useOutletContext();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 px-4 overflow-y-auto">
        <OrderTable
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      </main>
    </div>
  );
};

export default OrdersPage;