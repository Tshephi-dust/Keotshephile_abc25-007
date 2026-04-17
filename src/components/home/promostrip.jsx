import React from 'react';
import { motion } from 'framer-motion';
import { Truck, RotateCcw, Shield, Headphones } from 'lucide-react';

const perks = [
  { icon: Truck, label: 'Free Shipping', desc: 'On orders over $50' },
  { icon: RotateCcw, label: 'Easy Returns', desc: '30-day return policy' },
  { icon: Shield, label: 'Secure Payment', desc: 'SSL encrypted' },
  { icon: Headphones, label: '24/7 Support', desc: 'We\'re here to help' },
];

export default function PromoStrip() {
  return (
    <section className="border-y border-border bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="bg-primary/10 rounded-xl p-3">
                <perk.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-heading font-semibold text-sm">{perk.label}</p>
                <p className="text-xs text-muted-foreground">{perk.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
