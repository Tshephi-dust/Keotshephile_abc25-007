import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function Cart() {
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => base44.entities.CartItem.list(),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.CartItem.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.CartItem.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Item removed');
    },
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (!isLoading && cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
        <h1 className="font-heading text-2xl font-bold mb-3">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Start adding some fire pieces to your cart.</p>
        <Link to="/shop">
          <Button className="bg-primary text-primary-foreground rounded-full font-heading text-sm uppercase tracking-wider px-8">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <p className="text-primary font-heading text-sm uppercase tracking-[0.3em] mb-2">Shopping</p>
        <h1 className="font-heading text-3xl lg:text-5xl font-bold mb-10">Your Cart</h1>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex gap-4 p-4 rounded-2xl border border-border bg-card"
              >
                <div className="w-24 h-28 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                  {item.product_image && (
                    <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product_id}`} className="font-heading font-semibold hover:text-primary transition-colors">
                    {item.product_name}
                  </Link>
                  <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                    {item.size && <span>Size: {item.size}</span>}
                    {item.color && <span>Color: {item.color}</span>}
                  </div>
                  <p className="font-heading font-bold text-lg mt-2">${(item.price * (item.quantity || 1)).toFixed(2)}</p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateMutation.mutate({ id: item.id, data: { quantity: Math.max(1, (item.quantity || 1) - 1) } })}
                        className="h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-heading font-semibold w-6 text-center">{item.quantity || 1}</span>
                      <button
                        onClick={() => updateMutation.mutate({ id: item.id, data: { quantity: (item.quantity || 1) + 1 } })}
                        className="h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => deleteMutation.mutate(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-card border border-border rounded-2xl p-6">
            <h3 className="font-heading font-bold text-lg mb-6">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-border pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-heading font-bold">Total</span>
                  <span className="font-heading font-bold text-xl">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link to="/checkout">
              <Button className="w-full mt-6 bg-primary text-primary-foreground rounded-full font-heading font-semibold text-sm uppercase tracking-wider h-12 hover:opacity-90">
                Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/shop" className="block text-center mt-4">
              <Button variant="ghost" className="text-sm text-muted-foreground">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
