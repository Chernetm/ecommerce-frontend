// import { useState, useEffect } from 'react';
// import { orderApi } from '@/api/order';
// import { Order } from '@/types';
// import { Package, Clock, CheckCircle } from 'lucide-react';

// export function OrderList() {
//     const [orders, setOrders] = useState<Order[]>([]);

//     useEffect(() => {
//         const loadOrders = async () => {
//             try {
//                 const data = await orderApi.getAll();
//                 console.log("Order data",data)
//                 setOrders(data || []);

//             } catch (error) {
//                 console.error('Failed to load orders', error);
//             }
//         };
//         loadOrders();
//     }, []);

//     const getStatusColor = (status?: string) => {
//         switch (status?.toLowerCase()) {
//             case 'delivered': return 'text-emerald-600 bg-emerald-50';
//             case 'shipped': return 'text-blue-600 bg-blue-50';
//             case 'cancelled': return 'text-red-600 bg-red-50';
//             default: return 'text-amber-600 bg-amber-50';
//         }
//     };

//     return (
//         <div className="space-y-6">
//             <h2 className="text-2xl font-bold text-slate-900">Your Orders</h2>
//             <div className="space-y-4">
//                 {orders.map((order) => (
//                     <div key={order.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
//                         <div className="flex flex-wrap gap-4 justify-between items-start border-b border-slate-100 pb-4 mb-4">
//                             <div>
//                                 <p className="text-sm text-slate-500">Order ID</p>
//                                 <div className="font-mono font-medium text-slate-900">{order.id}</div>
//                             </div>
//                             <div>
//                                 <p className="text-sm text-slate-500">Date</p>
//                                 <div className="font-medium text-slate-900">{new Date(order.createdAt).toLocaleDateString()}</div>
//                             </div>
//                             <div>
//                                 <p className="text-sm text-slate-500">Total</p>
//                                 <div className="font-bold text-slate-900">${(order.total || 0).toFixed(2)}</div>
//                             </div>
//                             <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
//                                 {order.status === 'delivered' ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
//                                 {order.status}
//                             </div>
//                         </div>

//                         <div className="space-y-3">
//                             {order.items.map((item) => (
//                                 <div key={item.id} className="flex justify-between items-center text-sm">
//                                     <div className="flex items-center gap-3">
//                                         <div className="bg-slate-100 p-2 rounded-md">
//                                             <Package className="h-4 w-4 text-slate-500" />
//                                         </div>
//                                         <span className="font-medium text-slate-700">{item.name}</span>
//                                         <span className="text-slate-400">x{item.quantity}</span>
//                                     </div>
//                                     <span className="text-slate-600">${(item.price || 0).toFixed(2)}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}

//                 {orders.length === 0 && (
//                     <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
//                         <Package className="h-12 w-12 text-slate-300 mx-auto mb-3" />
//                         <h3 className="text-lg font-medium text-slate-900">No orders yet</h3>
//                         <p className="text-slate-500">Start shopping to see your orders here.</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
import { useEffect, useState } from 'react';
import { orderApi } from '@/api/order';
import { Order } from '@/types';
import { Package, Clock, CheckCircle } from 'lucide-react';

export function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const rawOrders = await orderApi.getAll();


        const normalizedOrders: Order[] = rawOrders.map((o: any) => ({
          id: o.ID,
          userId: o.UserID,
          status: o.Status,
          paymentMethod: o.PaymentMethod,
          paymentStatus: o.PaymentStatus,

          createdAt: o.CreatedAt,

          subtotal: o.Subtotal,
          tax: o.Tax,
          shipping: o.Shipping,
          total: o.Total,

          // backend sends string, Order expects shippingAddr
          shippingAddr: o.ShippingAddr ?? '',

          // normalize items too
          items: o.Items.map((item: any) => ({
            id: item.ID,
            orderId: item.OrderID,
            productId: item.ProductID,
            name: item.Name,
            price: item.Price,
            quantity: item.Quantity,
          })),
        }));

        setOrders(normalizedOrders);
      } catch (err) {
        console.error('Failed to load orders', err);
      }
    };

    loadOrders();
  }, []);

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'text-emerald-600 bg-emerald-50';
      case 'shipped':
        return 'text-blue-600 bg-blue-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-amber-600 bg-amber-50';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Your Orders</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
        >
          <div className="flex flex-wrap gap-4 justify-between border-b pb-4 mb-4">
            <div>
              <p className="text-sm text-slate-500">Order ID</p>
              <div className="font-mono">{order.id}</div>
            </div>

            <div>
              <p className="text-sm text-slate-500">Date</p>
              <div>
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-500">Total</p>
              <div className="font-bold">${order.total.toFixed(2)}</div>
            </div>

            <div
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1 ${getStatusColor(
                order.status
              )}`}
            >
              {order.status === 'delivered' ? (
                <CheckCircle className="h-3 w-3" />
              ) : (
                <Clock className="h-3 w-3" />
              )}
              {order.status}
            </div>
          </div>

          {/* ✅ ITEMS */}
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-md">
                    <Package className="h-4 w-4 text-slate-500" />
                  </div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-slate-400">x{item.quantity}</span>
                </div>
                <span className="text-slate-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {orders.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed">
          <Package className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium">No orders yet</h3>
          <p className="text-slate-500">
            Start shopping to see your orders here.
          </p>
        </div>
      )}
    </div>
  );
}
