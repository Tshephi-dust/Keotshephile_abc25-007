import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import PromoStrip from '../components/home/PromoStrip';

const HERO_IMAGE = 'https://media.base44.com/images/public/69e232444f412f3a0867e4c0/82490b3b4_generated_99107414.png';

export default function Home() {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list('-created_date', 50),
  });

  const bestSellers = products.filter(p => p.collection === 'best_sellers').slice(0, 4);
  const newArrivals = products.filter(p => p.collection === 'new_arrivals').slice(0, 4);
  const deals = products.filter(p => p.is_deal).slice(0, 4);

  // Fallback to any products if no tagged ones
  const featured = bestSellers.length ? bestSellers : products.slice(0, 4);
  const latest = newArrivals.length ? newArrivals : products.slice(4, 8);

  return (
    <div>
      <HeroSection heroImage={HERO_IMAGE} />
      <PromoStrip />
      <CategoryGrid />
      {featured.length > 0 && (
        <FeaturedProducts
          products={featured}
          title="Best Sellers"
          subtitle="Fan Favorites"
          linkTo="/shop"
        />
      )}
      {latest.length > 0 && (
        <div className="bg-muted/30">
          <FeaturedProducts
            products={latest}
            title="New Arrivals"
            subtitle="Just Dropped"
            linkTo="/collections?tab=new_arrivals"
          />
        </div>
      )}
    </div>
  );
}
