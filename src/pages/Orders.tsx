import { OrderList } from '@/components/order/OrderList';

export function OrdersPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">My Orders</h1>
                <p className="text-slate-500 mt-2">View and track your past purchases.</p>
            </div>
            <OrderList />
        </div>
    );
}
