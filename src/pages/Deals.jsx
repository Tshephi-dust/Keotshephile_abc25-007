import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';

export default function Deals() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list('-created_date', 100),
  });

  const deals = products.filter(p => p.is_deal);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="h-5 w-5 text-primary" />
          <p className="text-primary font-heading text-sm uppercase tracking-[0.3em]">Hot Deals</p>
        </div>
        <h1 className="font-heading text-3xl lg:text-5xl font-bold">Deals & Offers</h1>
        <p className="text-muted-foreground mt-3">Grab these limited-time offers before they're gone.</p>
      </motion.div>

      {/* Promo Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-2xl p-8 lg:p-12 mb-12 border border-primary/20"
      >
        <p className="text-primary font-heading font-bold text-lg lg:text-2xl mb-2">
          Up to 40% Off
        </p>
        <p className="text-muted-foreground text-sm lg:text-base">
          Shop our best deals on graphic and oversized tees. Limited stock available.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-muted rounded-2xl" />
            </div>
          ))}
        </div>
      ) : deals.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {deals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No active deals right now. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
