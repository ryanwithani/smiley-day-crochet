// app/components/layout/Header.tsx
import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="shrink-0">
                        <Link href="/" className="text-2xl font-bold text-brand-purple-dark">
                            Sunny Day Crochet
                        </Link>
                    </div>
                    <nav className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/" className="text-gray-500 hover:text-brand-purple-dark px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link href="/products" className="text-gray-500 hover:text-brand-purple-dark px-3 py-2 rounded-md text-sm font-medium">Shop</Link>
                            <Link href="/blog" className="text-gray-500 hover:text-brand-purple-dark px-3 py-2 rounded-md text-sm font-medium">Blog</Link>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}