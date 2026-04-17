import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function OrderSuccess() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6" />
        </motion.div>
        <h1 className="font-heading text-3xl font-bold mb-3">Order Placed!</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Thank you for your purchase. You'll receive a confirmation email shortly with your order details.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/shop">
            <Button className="bg-primary text-primary-foreground rounded-full font-heading text-sm uppercase tracking-wider px-8">
              Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="rounded-full font-heading text-sm uppercase tracking-wider px-8">
              Go Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
