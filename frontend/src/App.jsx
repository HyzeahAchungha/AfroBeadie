import { useState } from 'react'
import { Navbar, CartSidebar, WishlistSidebar, SearchModal, Footer } from '../src/Components';
import { HomePage, ShopPage, GalleryPage, ReviewsPage, AboutPage, CheckoutPage } from '../src/pages';
import { PRODUCTS } from './data/products';
// ... rest of code

function App() {
const [activeLink, setActiveLink] = useState('Home');
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cart, setCart] = useState([]);
const [wishlist, setWishlist] = useState([])

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id && item.selectedColor === product.selectedColor);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id && item.selectedColor === product.selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setShowCart(true);
  };

  const handleRemoveFromCart = (id,selectedColor) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === id && item.selectedColor === selectedColor)));
  };

  const handleCheckout = () => {
    setShowCart(false);
    setActiveLink('Checkout');
  };

  const handleToggleWishlist = (product) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.find(item => item.id === product.id);
      if (exists) {
        return prevWishlist.filter(item => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };
   const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

   return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
        
        * {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
      `}</style>
      
      <Navbar 
        activeLink={activeLink} 
        setActiveLink={setActiveLink}
        cartCount={cartCount}
        setShowCart={setShowCart}
        wishlistCount={wishlistCount}
        setShowWishlist={setShowWishlist}
        setShowSearch={setShowSearch}
      />
      
      <CartSidebar 
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cart={cart}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <WishlistSidebar 
        isOpen={showWishlist}
        onClose={() => setShowWishlist(false)}
        wishlist={wishlist}
        onRemove={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <SearchModal 
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        products={PRODUCTS}
        onProductClick={(product) => {
          setActiveLink('Shop');
        }}
      />

      {activeLink === 'Home' && <HomePage onAddToCart={handleAddToCart} setActiveLink={setActiveLink} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} />}
      {activeLink === 'Shop' && <ShopPage onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} />}
      {activeLink === 'Gallery' && <GalleryPage />}
      {activeLink === 'Reviews' && <ReviewsPage />}
      {activeLink === 'About' && <AboutPage />}
      {activeLink === 'Checkout' && <CheckoutPage cart={cart} onRemove={handleRemoveFromCart} />}

      <Footer setActiveLink={setActiveLink} />
    </div>
  );
}

export default App

