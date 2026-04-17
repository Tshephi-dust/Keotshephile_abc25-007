import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { CreditCard, Banknote, ArrowLeft, Lock } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    payment_method: 'card',
  });

  const { data: cartItems = [] } = useQuery({
    queryKey: ['cart'],
    queryFn: () => base44.entities.CartItem.list(),
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const createOrderMutation = useMutation({
    mutationFn: async (orderData) => {
      const order = await base44.entities.Order.create(orderData);
      // Clear cart
      for (const item of cartItems) {
        await base44.entities.CartItem.delete(item.id);
      }
      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Order placed successfully!');
      navigate('/order-success');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.customer_name || !form.customer_email || !form.shipping_address) {
      toast.error('Please fill in all required fields');
      return;
    }

    createOrderMutation.mutate({
      items: cartItems.map(item => ({
        product_id: item.product_id,
        product_name: item.product_name,
        price: item.price,
        quantity: item.quantity || 1,
        size: item.size || '',
        color: item.color || '',
      })),
      total,
      ...form,
    });
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Button variant="outline" className="mt-4 rounded-full" onClick={() => navigate('/shop')}>
          Go to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={() => navigate('/cart')} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to Cart
      </button>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <p className="text-primary font-heading text-sm uppercase tracking-[0.3em] mb-2">Finalize</p>
        <h1 className="font-heading text-3xl lg:text-4xl font-bold mb-10">Checkout</h1>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3 space-y-8">
            {/* Contact */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h3 className="font-heading font-bold">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs uppercase tracking-wider">Full Name *</Label>
                  <Input value={form.customer_name} onChange={e => handleChange('customer_name', e.target.value)} className="mt-1 rounded-xl" placeholder="John Doe" />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-wider">Email *</Label>
                  <Input type="email" value={form.customer_email} onChange={e => handleChange('customer_email', e.target.value)} className="mt-1 rounded-xl" placeholder="john@email.com" />
                </div>
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider">Phone</Label>
                <Input value={form.customer_phone} onChange={e => handleChange('customer_phone', e.target.value)} className="mt-1 rounded-xl" placeholder="+1 234 567 890" />
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h3 className="font-heading font-bold">Shipping Address</h3>
              <div>
                <Label className="text-xs uppercase tracking-wider">Full Address *</Label>
                <Input value={form.shipping_address} onChange={e => handleChange('shipping_address', e.target.value)} className="mt-1 rounded-xl" placeholder="123 Street, City, State, ZIP" />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h3 className="font-heading font-bold">Payment Method</h3>
              <RadioGroup value={form.payment_method} onValueChange={v => handleChange('payment_method', v)} className="space-y-3">
                <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${form.payment_method === 'card' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <RadioGroupItem value="card" />
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium text-sm">Credit / Debit Card</span>
                </label>
                <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${form.payment_method === 'cash_on_delivery' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <RadioGroupItem value="cash_on_delivery" />
                  <Banknote className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium text-sm">Cash on Delivery</span>
                </label>
              </RadioGroup>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-6">
              <h3 className="font-heading font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground truncate mr-2">{item.product_name} × {item.quantity || 1}</span>
                    <span className="font-medium">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-4 border-t border-border text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-border">
                  <span className="font-heading font-bold text-lg">Total</span>
                  <span className="font-heading font-bold text-xl">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={createOrderMutation.isPending}
                className="w-full mt-6 bg-primary text-primary-foreground rounded-full font-heading font-semibold text-sm uppercase tracking-wider h-12 hover:opacity-90"
              >
                <Lock className="mr-2 h-4 w-4" />
                {createOrderMutation.isPending ? 'Placing Order...' : 'Place Order'}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1">
                <Lock className="h-3 w-3" /> Secure checkout
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
