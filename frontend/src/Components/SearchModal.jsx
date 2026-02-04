
import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';




const SearchModal = ({ isOpen, onClose, products, onProductClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
          
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-50 mx-4">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Search className="w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for bags, slippers, colors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-lg outline-none"
                  autoFocus
                />
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {searchQuery && (
                  <div className="mb-2 text-sm text-gray-600">
                    {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found
                  </div>
                )}
                
                {searchQuery && filteredProducts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No products found matching "{searchQuery}"
                  </div>
                )}

                {searchQuery && filteredProducts.length > 0 && (
                  <div className="space-y-3">
                    {filteredProducts.map(product => (
                      <button
                        key={product.id}
                        onClick={() => {
                          onProductClick(product);
                          onClose();
                        }}
                        className="w-full flex items-center gap-4 p-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 rounded-xl transition-all text-left"
                      >
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">{product.name}</h3>
                          <p className="text-sm text-gray-600">{product.category}</p>
                          <p className="text-amber-600 font-bold">{product.price.toLocaleString()} FCFA</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {!searchQuery && (
                  <div className="text-center py-8 text-gray-500">
                    Start typing to search products...
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SearchModal