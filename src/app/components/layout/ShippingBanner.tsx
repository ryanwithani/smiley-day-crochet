// ShippingBanner.tsx - UPDATED with proper centering
interface ShippingBannerProps {
    message?: string;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
}

export function ShippingBanner({
    message = 'Free Shipping on Orders Over $50 | Handmade with Love | Ships within 3-5 Business Days',
    backgroundColor = 'var(--secondary)',
    textColor = 'var(--secondary-foreground)',
    borderColor = 'var(--accent)'
}: ShippingBannerProps) {
    // Split message by pipe to handle emoji positioning
    const parts = message.split('|').map(part => part.trim());

    return (
        <div
            className="text-center py-2.5 sm:py-3 px-4 font-semibold border-b-2"
            style={{
                backgroundColor,
                color: textColor,
                borderColor,
            }}
        >
            <div className="max-w-7xl mx-auto">
                <p className="text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 flex-wrap">
                    {parts.map((part, index) => (
                        <span key={index} className="flex items-center gap-1">
                            {index === 0 && <span aria-hidden="true">✨</span>}
                            <span>{part}</span>
                            {index === parts.length - 1 && <span aria-hidden="true">✨</span>}
                            {index < parts.length - 1 && (
                                <span className="hidden sm:inline mx-1">|</span>
                            )}
                        </span>
                    ))}
                </p>
            </div>
        </div>
    );
}