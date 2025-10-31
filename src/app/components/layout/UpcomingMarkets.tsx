import { Calendar, MapPin, Sparkles } from 'lucide-react';

export interface Market {
  name: string;
  date: string;
  location: string;
  description?: string;
}

interface UpcomingMarketsProps {
  markets?: Market[];
}

export function UpcomingMarkets({ markets = [] }: UpcomingMarketsProps) {
  // Default sample data if no markets provided
  const defaultMarkets: Market[] = [
    {
      name: 'Spring Craft Fair',
      date: 'March 15-17, 2024',
      location: 'City Park Pavilion',
      description: 'Join us for our biggest market of the season!'
    },
    {
      name: 'Farmers Market',
      date: 'Every Saturday',
      location: 'Downtown Square',
      description: 'Weekly market with fresh crafts and more'
    }
  ];

  const displayMarkets = markets.length > 0 ? markets : defaultMarkets;

  return (
    // Using a full-width section with updated typography
    <section className="w-full bg-white py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* FIXED: Consistent heading size with the Shop heading */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-[#7CB342]" />
          {/* Using section-heading class for consistent styling */}
          <h2 className="section-heading text-center mb-0">
            Upcoming Markets
          </h2>
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-[#7CB342]" />
        </div>
        
        {/* Traditional responsive grid with updated typography classes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayMarkets.map((market, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-[#7CB342] transition-all duration-200"
            >
              {/* Using market-title class */}
              <h3 className="market-title mb-3">
                {market.name}
              </h3>
              
              <div className="space-y-2">
                {/* Using market-details class */}
                <div className="flex items-center space-x-2 text-gray-700">
                  <Calendar className="w-5 h-5 text-[#9C27B0]" />
                  <span className="market-details font-medium">{market.date}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-[#9C27B0]" />
                  <span className="market-details">{market.location}</span>
                </div>
                
                {market.description && (
                  <p className="text-sm text-gray-600 mt-3 pt-3 border-t border-[#E8F5E9] text-pretty">
                    {market.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}