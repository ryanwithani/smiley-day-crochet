'use client';

import { useState } from 'react';
import { SocialIcon } from 'react-social-icons';

interface FooterLink {
    label: string;
    href: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

interface SocialLink {
    icon: React.ReactNode;
    label: string;
}

interface FooterProps {
    sections?: FooterSection[];
    socialLinks?: SocialLink[];
    contactEmail?: string;
    contactLocation?: string;
    contactHours?: string;
    copyrightText?: string;
    onNewsletterSubmit?: (email: string) => void;
}

const defaultSections: FooterSection[] = [
    {
        title: 'Quick Links',
        links: [
            { label: 'Shop All', href: '#shop' },
            { label: 'Custom Orders', href: '#custom' },
            { label: 'Care Instructions', href: '#care' },
            { label: 'Shipping & Returns', href: '#shipping' },
            { label: 'FAQ', href: '#faq' },
        ],
    },
];

const defaultSocialLinks: SocialLink[] = [
    { icon: <SocialIcon url="https://www.facebook.com/smileydaycrochet" bgColor='#FFB300' style={{ width: 40, height: 40 }} />, label: 'Facebook' },
    { icon: <SocialIcon url="https://www.instagram.com/smileydaycrochet" bgColor='#FFB300' style={{ width: 40, height: 40 }} />, label: 'Instagram' },
    { icon: <SocialIcon url="https://www.pinterest.com/smileydaycrochet" bgColor='#FFB300' style={{ width: 40, height: 40 }} />, label: 'Pinterest' },
    { icon: <SocialIcon url="https://www.shop.smileydaycrochet.com" bgColor='#FFB300' style={{ width: 40, height: 40 }} />, label: 'Shop' },
];

const legalLinks: FooterLink[] = [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Return Policy', href: '#returns' },
    { label: 'Accessibility', href: '#accessibility' },
];

export function Footer({
    sections = defaultSections,
    socialLinks = defaultSocialLinks,
    contactEmail = 'hello@smileydaycrochet.com',
    copyrightText = '© 2024 Smiley Day Crochet. Made with 💛 and lots of yarn.',
    onNewsletterSubmit,
}: FooterProps) {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setSubmitMessage('Please enter your email');
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            if (onNewsletterSubmit) {
                await onNewsletterSubmit(email);
            }
            setSubmitMessage('Thank you for subscribing! 🌻');
            setEmail('');
        } catch (error) {
            setSubmitMessage('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer className="bg-background/80 backdrop-blur-sm bottom-0 z-50 border-t border-border pt-16 pb-8 px-5">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
                    {/* Dynamic Sections */}
                    {sections.map((section, index) => (
                        <div key={index}>
                            <h3 className="text-base font-bold mb-3 text-foreground">
                                {section.title}
                            </h3>
                            <div className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <a
                                        key={linkIndex}
                                        href={link.href}
                                        className="block text-sm text-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-base font-bold mb-3 text-foreground">
                            Contact
                        </h3>
                        <div className="space-y-2 text-foreground">
                            <p className="text-sm">📧 {contactEmail}</p>
                            <div className="flex gap-4 mt-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        className="flex items-center justify-center text-xl transition-all duration-300 hover:scale-110"
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div>
                        <h3 className="text-base font-bold mb-3 text-foreground">
                            Newsletter
                        </h3>
                        <p className="text-sm text-foreground mb-4">
                            Get updates on new products and upcoming markets!
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email"
                                className="w-full px-3 py-2 text-sm rounded-lg border-2 border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary text-foreground bg-background"
                                disabled={isSubmitting}
                            />
                            <button
                                type="submit"
                                className="w-full px-3 py-2 text-sm bg-primary text-primary-foreground font-semibold rounded-lg transition-all duration-300 hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                            </button>
                            {submitMessage && (
                                <p className={`text-sm ${submitMessage.includes('Thank you') ? 'text-primary' : 'text-destructive'}`}>
                                    {submitMessage}
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                {/* Footer Bottom - Legal Links & Copyright */}
                <div className="flex flex-col items-center w-full">
                    <div className="flex flex-wrap justify-center gap-4 mb-3">
                        {legalLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="text-sm text-primary hover:text-primary-hover font-semibold transition-colors duration-200"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <p className="text-sm text-primary mt-3">{copyrightText}</p>
                </div>
            </div>
        </footer>
    );
}