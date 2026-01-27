import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { authApi } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: 'buyer'
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const { token, user } = await authApi.register(formData);
            login(token, user);
            navigate('/');
        } catch (err: any) {
            console.error(err);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-10">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Create an account</h1>
                <p className="text-slate-500 mb-6">Join us to start shopping</p>

                {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                            <Input
                                required
                                value={formData.firstName}
                                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                            <Input
                                required
                                value={formData.lastName}
                                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <Input
                            type="email"
                            required
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <Input
                            type="password"
                            required
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">I want to:</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className={`p-4 rounded-xl border-2 text-center transition-all ${formData.role === 'buyer'
                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                                    }`}
                                onClick={() => setFormData({ ...formData, role: 'buyer' })}
                            >
                                <div className="font-semibold">Buy Product</div>
                                <div className="text-xs mt-1 opacity-80">Personal Account</div>
                            </button>
                            <button
                                type="button"
                                className={`p-4 rounded-xl border-2 text-center transition-all ${formData.role === 'seller'
                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                                    }`}
                                onClick={() => setFormData({ ...formData, role: 'seller' })}
                            >
                                <div className="font-semibold">Sell Product</div>
                                <div className="text-xs mt-1 opacity-80">Business Account</div>
                            </button>
                        </div>
                    </div>

                    <Button type="submit" className="w-full">Register</Button>
                </form>

                <p className="mt-4 text-center text-sm text-slate-500">
                    Already have an account? <Link to="/login" className="text-blue-600 font-medium">Sign in</Link>
                </p>
            </div >
        </div >
    );
}
