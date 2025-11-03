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
  // Only render if we have 2+ markets
  if (markets.length < 2) {
    return null;
  }

  return (
    <div className="bg-white w-full pt-12 lg:pt-16 pb-16 lg:pb-20 border-t-4 border-[#FFB300]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="text-5xl sm:text-6xl lg:text-7xl">🌻</span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFB300] mb-0 text-center"
            style={{
              fontFamily: 'var(--font-dynapuff)',
            }}
          >
            Upcoming Markets
          </h2>
          <span className="text-5xl sm:text-6xl lg:text-7xl">🌻</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map((market, index) => (
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