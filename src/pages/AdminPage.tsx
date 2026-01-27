import { useState } from 'react';
import { CategoryManager } from '@/components/admin/CategoryManager';
import { ProductManager } from '@/components/admin/ProductManager';

export function AdminPage() {
    const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-slate-500">Manage your store's inventory and organization.</p>
            </div>

            <div className="flex space-x-1 rounded-xl bg-slate-100 p-1 w-fit">
                <button
                    onClick={() => setActiveTab('products')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'products' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
                >
                    Products
                </button>
                <button
                    onClick={() => setActiveTab('categories')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'categories' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
                >
                    Categories
                </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                {activeTab === 'products' ? <ProductManager /> : <CategoryManager />}
            </div>
        </div>
    );
}
