import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { ShoppingBag, Star, Minus, Plus, ArrowLeft, Truck, RotateCcw } from 'lucide-react';

export default function ProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = window.location.pathname.split('/product/')[1];

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list('-created_date', 100),
  });

  const product = products.find(p => p.id === productId);

  const addToCartMutation = useMutation({
    mutationFn: (cartData) => base44.entities.CartItem.create(cartData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Added to cart!');
    },
  });

  const handleAddToCart = () => {
    if (product.sizes?.length && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (product.colors?.length && !selectedColor) {
      toast.error('Please select a color');
      return;
    }

    addToCartMutation.mutate({
      product_id: product.id,
      product_name: product.name,
      product_image: product.image_url,
      price: product.price,
      quantity,
      size: selectedSize || '',
      color: selectedColor || '',
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-[3/4] bg-muted rounded-2xl" />
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded w-32" />
            <div className="h-8 bg-muted rounded w-64" />
            <div className="h-6 bg-muted rounded w-24" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground text-lg">Product not found.</p>
        <Link to="/shop">
          <Button variant="outline" className="mt-4 rounded-full">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const sizes = product.sizes || ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = product.colors || ['Black', 'White', 'Grey'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted"
        >
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.collection === 'limited_edition' && (
            <Badge className="absolute top-4 left-4 bg-foreground text-background">LIMITED EDITION</Badge>
          )}
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col"
        >
          <p className="text-primary font-heading text-sm uppercase tracking-[0.3em] mb-2">
            {product.category?.replace('_', ' ')}
          </p>
          <h1 className="font-heading text-2xl lg:text-4xl font-bold mb-4">{product.name}</h1>

          {product.rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} rating</span>
            </div>
          )}

          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-heading text-3xl font-bold">${product.price?.toFixed(2)}</span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-lg text-muted-foreground line-through">${product.original_price?.toFixed(2)}</span>
            )}
          </div>

          {product.description && (
            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>
          )}

          {/* Size */}
          <div className="mb-6">
            <p className="font-heading font-semibold text-sm uppercase tracking-wider mb-3">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[48px] h-12 px-4 rounded-xl border-2 font-heading font-semibold text-sm transition-all ${
                    selectedSize === size
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-foreground/30'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="mb-8">
            <p className="font-heading font-semibold text-sm uppercase tracking-wider mb-3">Color</p>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 h-10 rounded-full border-2 font-body text-sm transition-all ${
                    selectedColor === color
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-foreground/30'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <p className="font-heading font-semibold text-sm uppercase tracking-wider mb-3">Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-10 w-10 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-heading font-semibold text-lg w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="h-10 w-10 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            size="lg"
            onClick={handleAddToCart}
            disabled={addToCartMutation.isPending}
            className="w-full bg-primary text-primary-foreground font-heading font-semibold text-sm uppercase tracking-wider rounded-full h-14 hover:opacity-90 transition-opacity"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            {addToCartMutation.isPending ? 'Adding...' : 'Add to Cart'}
          </Button>

          {/* Perks */}
          <div className="mt-8 space-y-3 pt-8 border-t border-border">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Truck className="h-4 w-4" /> Free shipping on orders over $50
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <RotateCcw className="h-4 w-4" /> 30-day easy returns
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
