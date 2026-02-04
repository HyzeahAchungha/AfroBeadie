import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Filter, } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductCard  from '../Components/ProductCard'
 
const ShopPage = ({ onAddToCart, onToggleWishlist, wishlist }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = ['All', 'Bags', 'Slippers','Earings'];
  const priceRanges = ['All', 'Under 30,000 FCFA', '30,000 - 45,000 FCFA', 'Above 45,000 FCFA'];

  const filteredProducts = PRODUCTS.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    
    let priceMatch = true;
    if (selectedPriceRange === 'Under 30,000 FCFA') priceMatch = product.price < 30000;
    else if (selectedPriceRange === '30,000 - 45,000 FCFA') priceMatch = product.price >= 30000 && product.price <= 45000;
    else if (selectedPriceRange === 'Above 45,000 FCFA') priceMatch = product.price > 45000;
    
    return categoryMatch && priceMatch;
  });

  const FilterButton = ({ active, onClick, label }) => (
    <button
      onClick={onClick}
      className={`block w-full text-left px-5 py-3 rounded-xl transition-all duration-200 ${
        active 
          ? 'bg-gradient-to-r from-amber-600 to-orange-500 text-white font-bold shadow-lg' 
          : 'bg-white text-gray-700 hover:bg-amber-50 shadow-md hover:shadow-lg'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="pt-24 px-4 pb-16 bg-gradient-to-br from-amber-50/50 to-orange-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">Shop</span>
            </h1>
            <p className="text-gray-600 text-lg">Discover {filteredProducts.length} exquisite handcrafted pieces</p>
          </div>
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            <Filter className="w-5 h-5" /> Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters - Left Sidebar */}
          <div className="hidden md:block w-80 flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-28">
              <h2 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Filters</h2>
              
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-amber-600 to-orange-500 rounded-full"></span>
                  Category
                </h3>
                <div className="space-y-3">
                  {categories.map(category => (
                    <FilterButton
                      key={category}
                      active={selectedCategory === category}
                      onClick={() => setSelectedCategory(category)}
                      label={category}
                    />
                  ))}
                </div>
              </div>

              <div className="border-t pt-8">
                <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-amber-600 to-orange-500 rounded-full"></span>
                  Price Range
                </h3>
                <div className="space-y-3">
                  {priceRanges.map(range => (
                    <FilterButton
                      key={range}
                      active={selectedPriceRange === range}
                      onClick={() => setSelectedPriceRange(range)}
                      label={range}
                    />
                  ))}
                </div>
              </div>

              {(selectedCategory !== 'All' || selectedPriceRange !== 'All') && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedPriceRange('All');
                  }}
                  className="w-full mt-8 px-4 py-3 border-2 border-amber-500 text-amber-600 rounded-xl font-semibold hover:bg-amber-50 transition-all"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters - Full Screen Overlay */}
          {showMobileFilters && (
            <div className="md:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
              <div className="sticky top-0 bg-white border-b shadow-md z-10 px-6 py-5">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>Filters</h2>
                  <button 
                    onClick={() => setShowMobileFilters(false)} 
                    className="p-3 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 pb-32">
                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-4">Category</h3>
                  <div className="space-y-3">
                    {categories.map(category => (
                      <FilterButton
                        key={category}
                        active={selectedCategory === category}
                        onClick={() => setSelectedCategory(category)}
                        label={category}
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-4">Price Range</h3>
                  <div className="space-y-3">
                    {priceRanges.map(range => (
                      <FilterButton
                        key={range}
                        active={selectedPriceRange === range}
                        onClick={() => setSelectedPriceRange(range)}
                        label={range}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-6 shadow-2xl">
                <div className="flex gap-3">
                  {(selectedCategory !== 'All' || selectedPriceRange !== 'All') && (
                    <button
                      onClick={() => {
                        setSelectedCategory('All');
                        setSelectedPriceRange('All');
                      }}
                      className="flex-1 px-4 py-3 border-2 border-amber-500 text-amber-600 rounded-xl font-semibold hover:bg-amber-50 transition-all"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-orange-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg"
                  >
                    View {filteredProducts.length} Products
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid - Takes remaining space */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-500 text-xl mb-6">No products match your filters</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedPriceRange('All');
                  }}
                  className="bg-gradient-to-r from-amber-600 to-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={`shop-${product.id}`}
                    product={product} 
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    wishlist={wishlist}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage