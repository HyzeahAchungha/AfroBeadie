import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Heart, Search } from 'lucide-react';


const Navbar = ({ activeLink, setActiveLink, cartCount, setShowCart, wishlistCount, setShowWishlist, setShowSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = ['Home', 'Shop', 'Gallery', 'Reviews', 'About', 'Checkout'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">AB</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 bg-clip-text text-transparent">AfroBeadie</span>
              </h1>
              <p className="text-xs text-gray-600 tracking-widest">ACCESSORIES</p>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navLinks.map(link => (
              <button
                key={link}
                onClick={() => setActiveLink(link)}
                className={`relative py-2 text-sm font-medium tracking-wide transition-all ${
                  activeLink === link 
                    ? 'text-amber-600' 
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                {link}
                {activeLink === link && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-500"></span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowSearch(true)}
              className="hidden md:block p-2 hover:bg-amber-50 rounded-full transition-colors"
            >
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            <button 
              onClick={() => setShowWishlist(true)}
              className="hidden md:block relative p-2 hover:bg-amber-50 rounded-full transition-colors"
            >
              <Heart className="w-5 h-5 text-gray-700" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setShowCart(true)}
              className="relative p-2 hover:bg-amber-50 rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-600 to-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button 
              className="md:hidden p-2 hover:bg-amber-50 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-xl">
          <div className="px-4 py-6 space-y-1">
            {navLinks.map(link => (
              <button
                key={link}
                onClick={() => {
                  setActiveLink(link);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${
                  activeLink === link 
                    ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-600 font-semibold' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
 export default Navbar