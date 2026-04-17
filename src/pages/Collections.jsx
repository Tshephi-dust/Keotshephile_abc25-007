import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '../components/products/ProductCard';

const COLLECTION_BANNER = 'https://media.base44.com/images/public/69e232444f412f3a0867e4c0/aea05a3e8_generated_0403e9f1.png';

const tabs = [
  { value: 'new_arrivals', label: 'New Arrivals' },
  { value: 'best_sellers', label: 'Best Sellers' },
  { value: 'limited_edition', label: 'Limited Edition' },
];

export default function Collections() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialTab = urlParams.get('tab') || 'new_arrivals';
  const [activeTab, setActiveTab] = useState(initialTab);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list('-created_date', 100),
  });

  const filtered = products.filter(p => p.collection === activeTab);

  return (
    <div>
      {/* Banner */}
      <div className="relative h-64 lg:h-80 overflow-hidden">
        <img src={COLLECTION_BANNER} alt="Collections" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <p className="text-amber-400 font-heading text-sm uppercase tracking-[0.3em] mb-2">Curated</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold text-white">Collections</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
          <TabsList className="bg-muted rounded-full p-1 h-auto">
            {tabs.map(tab => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-full font-heading text-xs uppercase tracking-wider px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-muted rounded-2xl" />
                <div className="mt-4 space-y-2">
                  <div className="h-3 bg-muted rounded w-20" />
                  <div className="h-4 bg-muted rounded w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No products in this collection yet.</p>
          </div>
        )}
      </div>
    </div>
  );
