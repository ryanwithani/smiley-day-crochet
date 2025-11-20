import Link from 'next/link';

interface CTAButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function CTAButton({
    children,
    href,
    onClick,
    variant = 'primary',
    size = 'md',
    className = ''
}: CTAButtonProps) {
    const baseStyles = "inline-block font-semibold rounded-full transition-all duration-300 text-center";

    const variantStyles = {
        // Primary: Sunflower yellow background with dark brown text for readability
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl",
        // Secondary: Brown background with cream text
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:shadow-xl"
    };

    const sizeStyles = {
        sm: "px-4 py-1.5 text-xs",
        md: "px-6 py-2 text-sm",
        lg: "px-8 py-2.5 text-base"
    };

    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
        return (
            <Link
                href={href}
                className={combinedStyles}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className={combinedStyles}
        >
            {children}
        </button>
    );
}