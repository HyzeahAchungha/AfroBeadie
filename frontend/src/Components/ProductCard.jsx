import React, { useState} from 'react';
import { ShoppingCart,  Star,  Heart,  } from 'lucide-react';



const ProductCard = ({ product, onAddToCart, featured = false, onToggleWishlist, wishlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  
  // Check if product is in wishlist by directly checking the array
  const isLiked = wishlist ? wishlist.some(item => item.id === product.id) : false;

  const handleHeartClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  return (
    <div 
      className={`bg-white rounded-2xl overflow-hidden transition-all duration-500 group ${
        isHovered ? 'shadow-2xl transform -translate-y-2' : 'shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-80 object-cover transition-transform duration-700"
          style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
        />
        {featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-600 to-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-lg">
            ★ FEATURED
          </div>
        )}
        <button 
          onClick={handleHeartClick}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-all z-20"
          type="button"
        >
          <Heart className={`w-5 h-5 transition-all duration-300 ${isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-600'}`} />
        </button>
        
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <button
              onClick={() => onAddToCart({ ...product, selectedColor })}
              className="w-full bg-white text-amber-700 py-3 rounded-xl font-bold hover:bg-amber-50 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {product.rating && (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
              ))}
            </div>
          )}
          {product.reviews && (
            <span className="text-xs text-gray-600">({product.reviews})</span>
          )}
        </div>
        
        <h3 className="text-lg font-bold text-gray-800 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-700 mb-2">Available Colors:</p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1 text-xs rounded-full transition-all ${
                  selectedColor === color
                    ? 'bg-gradient-to-r from-amber-600 to-orange-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
            {product.price.toLocaleString()} FCFA
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard