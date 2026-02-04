import React from 'react';
import {  Instagram, Mail, Phone  } from 'lucide-react';



const AboutPage = () => {
  return (
    <div className="pt-24 px-4 pb-16 bg-gradient-to-br from-amber-50/50 to-orange-50/50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">About AfroBeadie</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Celebrating African craftsmanship through exquisite beaded accessories
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              AfroBeadie Accessories was born from a passion for preserving and celebrating traditional African beadwork. Each piece in our collection is meticulously handcrafted by skilled artisans who have inherited their craft through generations.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We believe that every bead tells a story, and every accessory carries the spirit of African heritage. Our mission is to bring these beautiful, authentic pieces to fashion enthusiasts around the world while supporting local artisans and preserving traditional craftsmanship.
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>Our Commitment</h2>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2 text-gray-800">Quality Craftsmanship</h3>
                <p className="text-gray-700">Every piece is handmade with attention to detail using premium materials that ensure durability and beauty.</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2 text-gray-800">Authentic Designs</h3>
                <p className="text-gray-700">We honor traditional African patterns and techniques while creating contemporary pieces that suit modern lifestyles.</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2 text-gray-800">Artisan Support</h3>
                <p className="text-gray-700">We work directly with local artisans, ensuring fair compensation and supporting their communities.</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2 text-gray-800">Customer Satisfaction</h3>
                <p className="text-gray-700">Your happiness is our priority. We offer excellent customer service and stand behind every product we sell.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
                  <p className="text-gray-600">0542780286</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Instagram</p>
                  <p className="text-gray-600">@AfroBeadieAccessories</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-gray-600">info@afrobeadie.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutPage