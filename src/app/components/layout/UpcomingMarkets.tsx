import { Calendar, MapPin } from 'lucide-react';

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
    <div className="bg-white w-full pt-12 lg:pt-16 pb-16 lg:pb-20 border-t-4 border-[#FFB300]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="text-5xl sm:text-6xl lg:text-7xl">🌻</span>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFB300] mb-0 text-center"
            style={{ 
              fontFamily: 'var(--font-dynapuff)',
            }}
          >
            Upcoming Markets
          </h2>
          <span className="text-5xl sm:text-6xl lg:text-7xl">🌻</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayMarkets.map((market, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md border-2 border-[#FFE082] hover:shadow-xl hover:border-[#FFB300] transition-all duration-200"
            >
              <h3 className="text-xl font-bold text-[#FFB300] mb-3">
                {market.name}
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#6B4423]">
                  <Calendar className="w-5 h-5 text-[#8B4513]" />
                  <span className="text-sm font-medium">{market.date}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-[#6B4423]">
                  <MapPin className="w-5 h-5 text-[#8B4513]" />
                  <span className="text-sm">{market.location}</span>
                </div>
                
                {market.description && (
                  <p className="text-sm text-[#6B4423] mt-3 pt-3 border-t border-[#FFE082]">
                    {market.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}