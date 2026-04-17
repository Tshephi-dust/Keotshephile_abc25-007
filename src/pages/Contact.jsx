import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields');
      return;
    }
    setSending(true);
    // Simulate send
    await new Promise(r => setTimeout(r, 1000));
    toast.success('Message sent! We\'ll get back to you soon.');
    setForm({ name: '', email: '', message: '' });
    setSending(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <p className="text-primary font-heading text-sm uppercase tracking-[0.3em] mb-2">Get in Touch</p>
        <h1 className="font-heading text-3xl lg:text-5xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-6">
          {[
            { icon: Mail, label: 'Email', value: 'hello@dustthreads.com' },
            { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
            { icon: MapPin, label: 'Location', value: 'Downtown Fashion District' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4 p-4 rounded-2xl border border-border">
              <div className="bg-primary/10 rounded-xl p-3">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-heading font-semibold text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 lg:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs uppercase tracking-wider">Name</Label>
                <Input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="mt-1 rounded-xl"
                />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider">Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="mt-1 rounded-xl"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider">Message</Label>
              <Textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="How can we help you?"
                className="mt-1 rounded-xl h-32"
              />
            </div>
            <Button
              type="submit"
              disabled={sending}
              className="bg-primary text-primary-foreground rounded-full font-heading font-semibold text-sm uppercase tracking-wider px-8 hover:opacity-90"
            >
              <Send className="mr-2 h-4 w-4" />
              {sending ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
