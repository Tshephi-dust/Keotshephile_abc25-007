import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection({ heroImage }) {
  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Dust Threads Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-amber-400 font-heading text-sm uppercase tracking-[0.3em] mb-4"
          >
            New Season Drop
          </motion.p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
            Wear The
            <br />
            <span className="text-primary">Culture</span>
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-md leading-relaxed">
            Premium streetwear that speaks your language. Bold designs, unmatched comfort, and styles that turn heads.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/shop">
              <Button size="lg" className="bg-primary text-primary-foreground font-heading font-semibold text-sm uppercase tracking-wider px-8 rounded-full hover:opacity-90 transition-opacity">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/collections">
              <Button size="lg" variant="outline" className="border-white/30 text-white font-heading font-semibold text-sm uppercase tracking-wider px-8 rounded-full hover:bg-white/10 transition-colors">
                View Collections
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
