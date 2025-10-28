// app/components/layout/Footer.tsx
export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-white mt-12">
            <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-sm text-gray-500">
                    &copy; {currentYear} Sunny Day Crochet. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}