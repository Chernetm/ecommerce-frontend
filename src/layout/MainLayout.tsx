import { ReactNode } from 'react';
import { Navbar } from '../components/layout/Navbar';

interface MainLayoutProps {
    children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>
            <footer className="bg-slate-900 text-slate-400 py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>© 2024 PBL Ecommerce. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
