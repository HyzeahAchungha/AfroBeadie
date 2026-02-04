
import React from 'react';
import {  Instagram, Mail, Phone} from 'lucide-react';

const Footer = ({ setActiveLink }) => {
  return (
    // <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 pb-8 px-4 text-white">
    //   <div className="max-w-7xl mx-auto">
    //     <div className="grid md:grid-cols-4 gap-8 mb-12">
    //       <div>
    //         <div className="flex items-center space-x-3 mb-4">
    //           <div className="w-12 h-12 bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700 rounded-full flex items-center justify-center shadow-lg">
    //             <span className="text-white font-bold text-xl">AB</span>
    //           </div>
    //           <div>
    //             <h3 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>AfroBeadie</h3>
    //             <p className="text-xs text-gray-400 tracking-widest">ACCESSORIES</p>
    //           </div>
    //         </div>
    //         <p className="text-gray-400 mb-4">Handcrafted with love, celebrating African heritage through exquisite beaded accessories.</p>
    //         <div className="flex gap-3">
    //           <a href="https://instagram.com/afrobeadieaccessories" className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
    //             <Instagram className="w-5 h-5" />
    //           </a>
    //           <a href="mailto:info@afrobeadie.com" className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
    //             <Mail className="w-5 h-5" />
    //           </a>
    //         </div>
    //       </div>
          
    //       <div>
    //         <h4 className="font-bold text-lg mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Quick Links</h4>
    //         <div className="space-y-2">
    //           {['Home', 'Shop', 'Gallery', 'Reviews', 'About'].map(link => (
    //             <button 
    //               key={link}
    //               onClick={() => setActiveLink(link)}
    //               className="block text-gray-400 hover:text-amber-400 transition-colors"
    //             >
    //               {link}
    //             </button>
    //           ))}
    //         </div>
    //       </div>

    //       <div>
    //         <h4 className="font-bold text-lg mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Contact</h4>
    //         <div className="space-y-3 text-gray-400">
    //           <div className="flex items-center gap-2">
    //             <Phone className="w-4 h-4 text-amber-400" />
    //             <span>0542780286</span>
    //           </div>
    //           <div className="flex items-center gap-2">
    //             <Mail className="w-4 h-4 text-amber-400" />
    //             <span>info@afrobeadie.com</span>
    //           </div>
    //           <div className="flex items-center gap-2">
    //             <Instagram className="w-4 h-4 text-amber-400" />
    //             <span>@AfroBeadieAccessories</span>
    //           </div>
    //         </div>
    //       </div>

    //       <div>
    //         <h4 className="font-bold text-lg mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Payment Methods</h4>
    //         <div className="space-y-2 text-gray-400">
    //           <div>📱 MTN Mobile Money</div>
    //           <div>🟠 Orange Money</div>
    //           <div>💳 PayPal</div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
    //       <p>&copy; 2026 AfroBeadie Accessories. All rights reserved.</p>
    //       <p className="text-sm mt-2">Handcrafted with ❤️ in Cameroon</p>
    //     </div>
    //   </div>
    // </footer>
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 pb-8 px-4 text-white">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 justify-items-center md:justify-items-start text-center md:text-left">
      
      {/* Logo Section */}
      <div>
        <div className="flex flex-col items-center md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">AB</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>AfroBeadie</h3>
            <p className="text-xs text-gray-400 tracking-widest">ACCESSORIES</p>
          </div>
        </div>
        <p className="text-gray-400 mb-4">Handcrafted with love, celebrating African heritage through exquisite beaded accessories.</p>
        <div className="flex gap-3 justify-center md:justify-start">
          <a href="https://instagram.com/afrobeadieaccessories" className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="mailto:info@afrobeadie.com" className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="font-bold text-lg mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Quick Links</h4>
        <div className="space-y-2">
          {['Home', 'Shop', 'Gallery', 'Reviews', 'About'].map(link => (
            <button 
              key={link}
              onClick={() => setActiveLink(link)}
              className="block text-gray-400 hover:text-amber-400 transition-colors"
            >
              {link}
            </button>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div>
        <h4 className="font-bold text-lg mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Contact</h4>
        <div className="space-y-3 text-gray-400">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <Phone className="w-4 h-4 text-amber-400" />
            <span>0542780286</span>
          </div>
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <Mail className="w-4 h-4 text-amber-400" />
            <span>info@afrobeadie.com</span>
          </div>
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <Instagram className="w-4 h-4 text-amber-400" />
            <span>@AfroBeadieAccessories</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <h4 className="font-bold text-lg mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Payment Methods</h4>
        <div className="space-y-2 text-gray-400">
          <div>📱 MTN Mobile Money</div>
          <div>🟠 Orange Money</div>
          <div>💳 PayPal</div>
        </div>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
      <p>&copy; 2026 AfroBeadie Accessories. All rights reserved.</p>
      <p className="text-sm mt-2">Handcrafted with ❤️ in Cameroon</p>
    </div>
  </div>
</footer>

  );
};
export default Footer