import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <span className="font-heading text-2xl font-bold tracking-tight">
              DUST<span className="text-primary">THREADS</span>
            </span>
            <p className="mt-4 text-sm text-background/60 leading-relaxed">
              Premium streetwear for those who dare to stand out. Every thread tells a story.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-background/40 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/40 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/40 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">Shop</h4>
            <div className="flex flex-col gap-3">
              <Link to="/shop?category=graphic" className="text-sm text-background/60 hover:text-primary transition-colors">Graphic Tees</Link>
              <Link to="/shop?category=plain" className="text-sm text-background/60 hover:text-primary transition-colors">Plain Tees</Link>
              <Link to="/shop?category=oversized" className="text-sm text-background/60 hover:text-primary transition-colors">Oversized</Link>
              <Link to="/shop?category=custom" className="text-sm text-background/60 hover:text-primary transition-colors">Custom Designs</Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">Company</h4>
            <div className="flex flex-col gap-3">
              <Link to="/contact" className="text-sm text-background/60 hover:text-primary transition-colors">Contact Us</Link>
              <a href="#" className="text-sm text-background/60 hover:text-primary transition-colors">About</a>
              <a href="#" className="text-sm text-background/60 hover:text-primary transition-colors">Shipping</a>
              <a href="#" className="text-sm text-background/60 hover:text-primary transition-colors">Returns</a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">Newsletter</h4>
            <p className="text-sm text-background/60 mb-4">Get 10% off your first order.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-background/10 border border-background/20 rounded-lg px-3 py-2 text-sm text-background placeholder:text-background/40 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center">
          <p className="text-xs text-background/40">© 2026 Dust Threads. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
