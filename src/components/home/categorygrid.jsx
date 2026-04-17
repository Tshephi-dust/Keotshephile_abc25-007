import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  { name: 'Graphic Tees', slug: 'graphic', image: 'https://media.base44.com/images/public/69e232444f412f3a0867e4c0/df2ebdb42_generated_33b1179a.png' },
  { name: 'Plain Tees', slug: 'plain', image: 'https://media.base44.com/images/public/69e232444f412f3a0867e4c0/1b5233095_generated_ba1330ca.png' },
  { name: 'Oversized', slug: 'oversized', image: 'https://media.base44.com/images/public/69e232444f412f3a0867e4c0/6bf25a099_generated_ba5f2ced.png' },
  { name: 'Custom Designs', slug: 'custom', image: 'https://media.base44.com/images/public/69e232444f412f3a0867e4c0/a702a505a_generated_4dc32714.png' },
];

export default function CategoryGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-primary font-heading text-sm uppercase tracking-[0.3em] mb-2">Categories</p>
        <h2 className="font-heading text-3xl lg:text-4xl font-bold">Shop by Style</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link
              to={`/shop?category=${cat.slug}`}
              className="group block relative aspect-square rounded-2xl overflow-hidden"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <h3 className="font-heading font-bold text-white text-sm lg:text-lg">{cat.name}</h3>
                <div className="bg-primary rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
