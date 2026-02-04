import React, { useState, useEffect } from 'react';
import {  Star, ChevronRight, Package, CreditCard, ShieldCheck } from 'lucide-react';
import { ProductCard } from '../components';
import { PRODUCTS } from '../data/products';
import { REVIEWS } from '../data/reviews';

const HomePage = ({ onAddToCart, setActiveLink, onToggleWishlist, wishlist }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 shadow-lg">
                <span className="text-sm font-semibold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">✨ Handcrafted with Love</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 bg-clip-text text-transparent">
                  Exquisite Beaded
                </span>
                <br />
                <span className="text-gray-800">Accessories</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Discover the artistry of African craftsmanship. Each piece is meticulously handcrafted with premium beads, celebrating tradition and elegance.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setActiveLink('Shop')}
                  className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2"
                >
                  Shop Collection <ChevronRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setActiveLink('Gallery')}
                  className="border-2 border-amber-600 text-amber-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-amber-50 transition-all"
                >
                  View Gallery
                </button>
              </div>
              
              <div className="mt-12 flex items-center gap-8 flex-wrap">
                <div>
                  <div className="text-3xl font-bold text-amber-600">500+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="w-px h-12 bg-gray-300 hidden sm:block"></div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">4.9★</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div className="w-px h-12 bg-gray-300 hidden sm:block"></div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">100%</div>
                  <div className="text-sm text-gray-600">Handmade</div>
                </div>
              </div>
            </div>
            
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-amber-400/30 to-orange-400/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-full blur-3xl"></div>
              <img 
                src="https://res.cloudinary.com/ddvhiikmz/image/upload/v1770114498/ChatGPT_Image_Feb_3_2026_02_26_35_AM_ljulex.png" 
                alt="Featured beaded bag"
                className="relative rounded-3xl shadow-2xl w-full h-[500px] lg:h-[600px] object-cover border-8 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">Featured Collection</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our most loved pieces, handpicked for their exceptional beauty and craftsmanship
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.filter(p => p.featured).map(product => (
              <ProductCard 
                key={`featured-${product.id}`}
                product={product} 
                onAddToCart={onAddToCart} 
                featured 
                onToggleWishlist={onToggleWishlist}
                wishlist={wishlist}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck className="w-12 h-12" />, title: "Authentic Craftsmanship", desc: "Each piece is handmade by skilled artisans using traditional techniques passed down through generations." },
              { icon: <Package className="w-12 h-12" />, title: "Premium Materials", desc: "We use only the finest quality beads and materials to ensure durability and lasting beauty." },
              { icon: <CreditCard className="w-12 h-12" />, title: "Secure Payments", desc: "Multiple payment options including MTN MoMo, Orange Money, and PayPal for your convenience." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="text-amber-600 mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Preview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">What Our Customers Say</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {REVIEWS.slice(0, 2).map(review => (
              <div key={review.id} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <img src={review.image} alt={review.name} className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md" />
                  <div>
                    <h4 className="font-bold text-gray-800">{review.name}</h4>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{review.comment}"</p>
                <p className="text-sm text-gray-500 mt-4">{review.date}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button 
              onClick={() => setActiveLink('Reviews')}
              className="text-amber-600 font-semibold hover:text-amber-700 transition-colors flex items-center gap-2 mx-auto"
            >
              View All Reviews <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
 export default HomePage