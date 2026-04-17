import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '../products/ProductCard';

export default function FeaturedProducts({ products, title, subtitle, linkTo }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-primary font-heading text-sm uppercase tracking-[0.3em] mb-2">{subtitle}</p>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold">{title}</h2>
        </div>
        {linkTo && (
          <Link to={linkTo}>
            <Button variant="ghost" className="font-heading text-sm uppercase tracking-wider hidden sm:flex">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {linkTo && (
        <div className="mt-8 text-center sm:hidden">
          <Link to={linkTo}>
            <Button variant="outline" className="font-heading text-sm uppercase tracking-wider rounded-full">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
