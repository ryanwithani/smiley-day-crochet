// MarketAnnouncementBar.tsx - UPDATED with proper centering
import { Calendar, MapPin, Snowflake } from 'lucide-react';

export interface Market {
    name: string;
    date: string;
    location: string;
    description?: string;
}

interface MarketAnnouncementBarProps {
    market?: Market | null;
    backgroundColor?: string;
    textColor?: string;
}

export function MarketAnnouncementBar({
    market,
    backgroundColor = '#FFB300',
    textColor = '#FFFFFF'
}: MarketAnnouncementBarProps) {
    // Don't render if no market data
    if (!market) {
        return null;
    }

    return (
        <div
            className="sticky top-0 z-[60] text-center py-3 px-4 font-semibold shadow-md"
            style={{
                backgroundColor,
                color: textColor,
            }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap text-xs sm:text-sm md:text-base">
                    {/* Market Title */}
                    <span className="flex items-center gap-1.5 sm:gap-2">
                        <Snowflake className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" aria-hidden="true" />
                        <span><strong>Find Me At:</strong> {market.name}</span>
                    </span>

                    {/* Date */}
                    <span className="flex items-center gap-1.5 sm:gap-2">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                        <span className="font-medium whitespace-nowrap">{market.date}</span>
                    </span>

                    {/* Location */}
                    <span className="flex items-center gap-1.5 sm:gap-2">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                        <span className="font-medium">{market.location}</span>
                    </span>
                </div>
            </div>
        </div>
    );
}