import { Link } from 'react-router-dom';
import { ShoppingCart, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';


export function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="text-blue-600">PBL</span>Store
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/shop" className="text-slate-600 hover:text-slate-900 font-medium">Shop</Link>
                    <Link to="/about" className="text-slate-600 hover:text-slate-900 font-medium">About</Link>
                </div>

                <div className="flex items-center gap-4">
                    

                    <Link to="/cart">
                        <Button variant="ghost" size="sm" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                        </Button>
                    </Link>


                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-slate-700">Hi, {user.firstName}</span>
                            <Button variant="ghost" size="sm" onClick={logout}>
                                <LogOut className="h-5 w-5" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="ghost" size="sm">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button size="sm">Register</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
