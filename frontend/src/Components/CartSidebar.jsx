
import React, { useState, useEffect } from 'react';
import { ShoppingCart, X,  Package,  } from 'lucide-react';


const CartSidebar = ({ isOpen, onClose, cart, onRemove, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      )}
      
      <div className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-amber-50 to-orange-50">
            <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>Your Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center mt-20">
                <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={`${item.id}-${item.selectedColor}`} className="flex gap-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 shadow-md">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow-md" />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-600 mb-1">{item.selectedColor}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-amber-600 font-bold mt-1">{item.price.toLocaleString()} FCFA</p>
                    </div>
                    <button onClick={() => onRemove(item.id, item.selectedColor)} className="text-red-500 hover:text-red-700 transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t p-6 space-y-4 bg-gradient-to-r from-amber-50 to-orange-50">
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                  {total.toLocaleString()} FCFA
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 text-white py-4 rounded-xl font-bold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Package className="w-5 h-5" />
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default CartSidebar