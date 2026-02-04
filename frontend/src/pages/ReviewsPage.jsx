import React from 'react';
import {  Star, } from 'lucide-react';
import {REVIEWS} from "../data/reviews"


const ReviewsPage = () => {
  return (
    <div className="pt-24 px-4 pb-16 bg-gradient-to-br from-amber-50/50 to-orange-50/50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">Customer Reviews</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">See what our satisfied customers have to say</p>
          
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-1">4.9</div>
              <div className="flex items-center gap-1 justify-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-sm text-gray-600">Based on {REVIEWS.length} reviews</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {REVIEWS.map(review => (
            <div key={review.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <img src={review.image} alt={review.name} className="w-16 h-16 rounded-full object-cover border-4 border-amber-100 shadow-md flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-800 text-lg">{review.name}</h4>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">"{review.comment}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ReviewsPage