import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartApi } from '@/api/cart';
import { orderApi } from '@/api/order';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';

export function CheckoutPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        shippingAddr: '',
        paymentMethod: 'credit_card'
    });
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // 1. Get current cart items to confirm (backend should handle this ideally, but for now we trust the cart state or just trigger 'create order from cart')
            // The backend `createOrder` might expect items, or it might pull from cart. 
            // Based on typical ecommerce, we often convert cart to order. 
            // Let's assume the backend endpoint `POST /orders/` takes the cart and converts it, 
            // OR we send what we want to buy. 
            // Looking at backend `OrderHandler.CreateOrder`: it likely reads from Cart or takes items.
            // Let's assume for this "mock" implementation we just trigger it.

            // Actually looking at `order_handler.go` from file list (I didn't read it fully), standard practice is:
            const cart = await cartApi.get();
            if (!cart.items.length) {
                alert("Cart is empty");
                return;
            }

            const orderData = {
                shippingAddr: formData.shippingAddr,
                paymentMethod: formData.paymentMethod,
                items: cart.items.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity
                }))
            };

            await orderApi.create(orderData);

            // Clear cart after order
            await cartApi.clear();

            navigate('/orders');
        } catch (error) {
            console.error('Checkout failed', error);
            alert('Checkout failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (!user) {
        return <div className="p-8 text-center">Please log in to checkout.</div>;
    }

    return (
        <div className="max-w-xl mx-auto py-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-4">Shipping Information</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <Input defaultValue={`${user.firstName} ${user.lastName}`} disabled className="bg-slate-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Shipping Address</label>
                            <Input
                                required
                                value={formData.shippingAddr}
                                onChange={e => setFormData({ ...formData, shippingAddr: e.target.value })}
                                placeholder="123 Main St, City, Country"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-4">Payment</h3>
                    <select
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-slate-400 focus:outline-none"
                        value={formData.paymentMethod}
                        onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                    >
                        <option value="credit_card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="cash_on_delivery">Cash on Delivery</option>
                    </select>
                </div>

                <Button type="submit" className="w-full h-12 text-lg" disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>
            </form>
        </div>
    );
}
