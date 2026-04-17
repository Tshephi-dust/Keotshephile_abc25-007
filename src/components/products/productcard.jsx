import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

export default function ProductCard({ product }) {
  const hasDiscount = product.original_price && product.original_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.collection === 'new_arrivals' && (
              <Badge className="bg-primary text-primary-foreground text-xs font-semibold">NEW</Badge>
            )}
            {product.collection === 'limited_edition' && (
              <Badge className="bg-foreground text-background text-xs font-semibold">LIMITED</Badge>
            )}
            {hasDiscount && (
              <Badge className="bg-destructive text-destructive-foreground text-xs font-semibold">-{discountPercent}%</Badge>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {product.category?.replace('_', ' ')}
          </p>
          <h3 className="font-heading font-semibold text-sm lg:text-base truncate">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-lg">${product.price?.toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">${product.original_price?.toFixed(2)}</span>
            )}
          </div>
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span className="text-xs text-muted-foreground">{product.rating}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
