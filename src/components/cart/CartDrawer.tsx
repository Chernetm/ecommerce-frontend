// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { cartApi } from '@/api/cart';
// import { CartResponse } from '@/types';
// import { useNavigate } from 'react-router-dom';

// interface CartDrawerProps {
//     isOpen: boolean;
//     onClose: () => void;
// }

// export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
//     const [cart, setCart] = useState<CartResponse | null>(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (isOpen) {
//             loadCart();
//         }
//     }, [isOpen]);

//     const loadCart = async () => {
//         setIsLoading(true);
//         try {
//             const data = await cartApi.get();
//             setCart(data);
//         } catch (error) {
//             console.error('Failed to load cart', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const updateQuantity = async (productId: number, newQty: number) => {
//         if (newQty < 1) return;
//         try {
//             await cartApi.update(productId, newQty);
//             loadCart();
//         } catch (err) { console.error(err); }
//     };

//     const removeItem = async (productId: number) => {
//         try {
//             await cartApi.remove(productId);
//             loadCart();
//         } catch (err) { console.error(err); }
//     };

//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <div className="relative z-50">
//                     {/* Backdrop */}
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         onClick={onClose}
//                         className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
//                     />

//                     {/* Drawer */}
//                     <motion.div
//                         initial={{ x: '100%' }}
//                         animate={{ x: 0 }}
//                         exit={{ x: '100%' }}
//                         transition={{ type: 'spring', damping: 25, stiffness: 200 }}
//                         className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col"
//                     >
//                         <div className="flex items-center justify-between p-6 border-b border-slate-100">
//                             <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
//                                 <ShoppingBag className="h-5 w-5" /> Cart
//                                 <span className="text-sm font-normal text-slate-500">({cart?.itemCount || 0} items)</span>
//                             </h2>
//                             <Button variant="ghost" size="sm" onClick={onClose}>
//                                 <X className="h-5 w-5" />
//                             </Button>
//                         </div>

//                         <div className="flex-1 overflow-y-auto p-6 space-y-6">
//                             {isLoading ? (
//                                 <div className="text-center py-10 text-slate-500">Loading cart...</div>
//                             ) : !cart || cart.items.length === 0 ? (
//                                 <div className="text-center py-10">
//                                     <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                                         <ShoppingBag className="h-8 w-8 text-slate-300" />
//                                     </div>
//                                     <p className="text-slate-500">Your cart is empty</p>
//                                     <Button className="mt-4" onClick={onClose}>Continue Shopping</Button>
//                                 </div>
//                             ) : (
//                                 cart.items.map((item) => (
//                                     <div key={item.id} className="flex gap-4">
//                                         <div className="h-20 w-20 rounded-lg bg-slate-100 shrink-0 overflow-hidden">
//                                             {item.product.images ? (
//                                                 <img
//                                                     src={
//                                                         Array.isArray(item.product.images)
//                                                             ? item.product.images[0]
//                                                             : item.product.images
//                                                     }
//                                                     alt={item.product.name}
//                                                     className="h-full w-full object-cover"
//                                                 />
//                                             ) : (
//                                                 <div className="h-full w-full flex items-center justify-center text-slate-300">
//                                                     No Img
//                                                 </div>
//                                             )}

//                                         </div>
//                                         <div className="flex-1">
//                                             <h4 className="font-medium text-slate-900 line-clamp-1">{item.product.name}</h4>
//                                             <p className="text-sm text-slate-500 mt-1">${item.product.price.toFixed(2)}</p>

//                                             <div className="flex items-center justify-between mt-3">
//                                                 <div className="flex items-center border border-slate-200 rounded-md">
//                                                     <Button
//                                                         className="p-1 hover:bg-slate-50 text-slate-500"
//                                                         onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
//                                                     >
//                                                         <Minus className="h-3 w-3" />
//                                                     </Button>
//                                                     <span className="text-xs font-medium w-8 text-center">{item.quantity}</span>
//                                                     <Button
//                                                         className="p-1 hover:bg-slate-50 text-slate-500"
//                                                         onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
//                                                     >
//                                                         <Plus className="h-3 w-3" />
//                                                     </Button>
//                                                 </div>
//                                                 <Button onClick={() => removeItem(item.product.id)} className="text-slate-400 hover:text-red-500 transition-colors">
//                                                     <Trash2 className="h-4 w-4" />
//                                                 </Button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))
//                             )}
//                         </div>

//                         {cart && cart.items.length > 0 && (
//                             <div className="p-6 border-t border-slate-100 bg-slate-50/50">
//                                 <div className="flex justify-between items-center mb-4">
//                                     <span className="text-slate-600">Subtotal</span>
//                                     <span className="text-xl font-bold text-slate-900">${cart.subtotal.toFixed(2)}</span>
//                                 </div>
//                                 <Button className="w-full h-12 text-lg" onClick={() => { onClose(); navigate('/checkout'); }}>
//                                     Checkout Now
//                                 </Button>
//                             </div>
//                         )}
//                     </motion.div>
//                 </div>
//             )}
//         </AnimatePresence>
//     );
// }

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cartApi } from '@/api/cart';
import { CartResponse } from '@/types';
import { useNavigate } from 'react-router-dom';

export function CartDrawer() {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const close = () => navigate(-1);

  const loadCart = async () => {
    setIsLoading(true);
    try {
      const rawCart = await cartApi.get();

      // 🔥 unwrap + normalize
      

      setCart({
        ...rawCart,
        items: rawCart.items ?? [],
      });
    } catch (error) {
      console.error('Failed to load cart', error);
      setCart({
        items: [],
        subtotal: 0,
        itemCount: 0,
      } as CartResponse);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: number, newQty: number) => {
    if (newQty < 1) return;
    await cartApi.update(productId, newQty);
    loadCart();
  };

  const removeItem = async (productId: number) => {
    await cartApi.remove(productId);
    loadCart();
  };

  const items = cart?.items ?? [];

  return (
    <AnimatePresence>
      <div className="relative z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 bg-slate-900/50"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="fixed inset-y-0 right-0 w-full max-w-md bg-white flex flex-col"
        >
          <div className="p-6 border-b flex justify-between">
            <h2 className="font-bold flex gap-2">
              <ShoppingBag /> Cart
              <span className="text-slate-500">
                ({items.length} items)
              </span>
            </h2>
            <Button variant="ghost" onClick={close}>
              <X />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {isLoading ? (
              <p>Loading cart…</p>
            ) : items.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex-1">
                    <p>{item.product.name}</p>
                    <p>${item.product.price}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t">
              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <strong>${cart!.subtotal.toFixed(2)}</strong>
              </div>
              <Button className="w-full" onClick={() => navigate('/checkout')}>
                Checkout
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
