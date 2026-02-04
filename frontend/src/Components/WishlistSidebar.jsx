import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Filter, Instagram, Mail, Phone, MapPin, Star, ChevronRight, Heart, Search, Package, CreditCard, ShieldCheck } from 'lucide-react';


const WishlistSidebar = ({ isOpen, onClose, wishlist, onRemove, onAddToCart }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      )}
      
      <div className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-red-50 to-pink-50">
            <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
              ❤️ Your Wishlist
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {wishlist.length === 0 ? (
              <div className="text-center mt-20">
                <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Your wishlist is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlist.map(item => (
                  <div key={item.id} className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 shadow-md">
                    <div className="flex gap-3">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow-md" />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-sm mb-1">{item.name}</h3>
                        <p className="text-amber-600 font-bold mb-2">{item.price.toLocaleString()} FCFA</p>
                        <button
                          onClick={() => {
                            onAddToCart({ ...item, selectedColor: item.colors[0] });
                            onClose();
                          }}
                          className="text-xs bg-gradient-to-r from-amber-600 to-orange-500 text-white px-3 py-1.5 rounded-lg hover:shadow-md transition-all"
                        >
                          Add to Cart
                        </button>
                      </div>
                      <button onClick={() => onRemove(item)} className="text-red-500 hover:text-red-700 transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default WishlistSidebar