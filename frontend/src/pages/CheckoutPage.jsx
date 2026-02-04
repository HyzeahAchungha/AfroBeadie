



import React, { useState } from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';

const CheckoutPage = ({ cart, onRemove }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    deliveryMethod: 'delivery',
    paymentMethod: 'mtn-momo',
    deliveryDate: ''  
  });

  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = formData.deliveryMethod === 'delivery' ? 2000 : 0;
  const total = subtotal + shipping;

  // Form validation
  const validateForm = () => {
    const errors = [];
    if (!formData.fullName.trim()) errors.push('Full Name is required');
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('A valid Email is required');
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      errors.push('A valid Phone number is required');
    }
    if (!formData.deliveryDate) errors.push('Please select a delivery/pickup date');

    if (formData.deliveryMethod === 'delivery') {
      if (!formData.address.trim()) errors.push('Delivery Address is required');
      if (!formData.city.trim()) errors.push('City is required');
      if (!formData.region.trim()) errors.push('Region is required');
    }
    if (cart.length === 0) errors.push('Your cart is empty');

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return false;
    }
    return true;
  };

  const sendOrderToBackend = async () => {
    try {
      const backendUrl = 'https://afrobeadie.onrender.com'; 
      
      const response = await fetch(`${backendUrl}/api/orders`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            deliveryMethod: formData.deliveryMethod,
            date: formData.deliveryDate, 
            address: formData.deliveryMethod === 'delivery' 
              ? `${formData.address}, ${formData.city}, ${formData.region}`
              : 'Pickup at store',
          },
          items: cart.map(item => ({ 
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            selectedColor: item.selectedColor, 
          })),
          total: total,
          deliveryFee: shipping, 
          paymentMethod: formData.paymentMethod,
        })
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        console.log('✅ Order saved successfully:', result);
        setOrderComplete(true); 
        setLoading(false);
      
        if (window.clearCart) {
          window.clearCart();
        }
        
        return true; 
      } else {
        throw new Error(result.error || 'Failed to save order');
      }
    } catch (error) {
      console.error('❌ Error saving order:', error);
      alert(`There was an issue submitting your order: ${error.message}\n\nPlease contact us at 0542780286`);
      setLoading(false); 
      return false; 
    }

    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);

    // ✅ Fixed: Now waits for backend response before showing success
    const success = await sendOrderToBackend();
    
    if (!success) {
      setLoading(false);
      // Don't show success message if backend failed
    }
  };

  // Success / Thank You message
  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50/50 to-orange-50/50 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-12 max-w-xl text-center">
          <div className="w-24 h-24 mx-auto flex items-center justify-center rounded-full bg-green-100 mb-6">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Received!</h1>
          <p className="text-gray-700 mb-2">
            Thank you, <span className="font-semibold text-amber-600">{formData.fullName}</span>!
          </p>
          <p className="text-gray-600 mb-6">
            Your order has been successfully placed. A confirmation email has been sent to <span className="font-semibold text-amber-600">{formData.email}</span>.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-amber-600 hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 pb-16 bg-gradient-to-br from-amber-50/50 to-orange-50/50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
          <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">Checkout</span>
        </h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>Shipping Information</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-700">Email *</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-700">Phone *</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-3 text-gray-700">Delivery Method *</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label 
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.deliveryMethod === 'delivery'
                          ? 'border-amber-600 bg-gradient-to-r from-amber-50 to-orange-50 shadow-md'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="delivery"
                        checked={formData.deliveryMethod === 'delivery'}
                        onChange={(e) => setFormData({...formData, deliveryMethod: e.target.value})}
                        className="w-5 h-5 text-amber-600 focus:ring-amber-500"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-gray-800">🚚 Home Delivery</div>
                        <div className="text-xs text-gray-600">2,000 FCFA</div>
                      </div>
                    </label>
                    <label 
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.deliveryMethod === 'pickup'
                          ? 'border-amber-600 bg-gradient-to-r from-amber-50 to-orange-50 shadow-md'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="pickup"
                        checked={formData.deliveryMethod === 'pickup'}
                        onChange={(e) => setFormData({...formData, deliveryMethod: e.target.value})}
                        className="w-5 h-5 text-amber-600 focus:ring-amber-500"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-gray-800">🏪 Pickup</div>
                        <div className="text-xs text-gray-600">Free</div>
                      </div>
                    </label>
                  </div>
  
                  <div>
                    <label className='block text-sm font-bold mt-3 mb-2 text-gray-700'>
                      {formData.deliveryMethod === 'delivery' 
                        ? "Desired Delivery Date *" 
                        : "Desired Pickup Date *"}
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.deliveryDate}
                      onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                {formData.deliveryMethod === 'delivery' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-700">Delivery Address *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-700">City *</label>
                        <input 
                          type="text" 
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-700">Region *</label>
                        <input 
                          type="text" 
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                          value={formData.region}
                          onChange={(e) => setFormData({...formData, region: e.target.value})}
                        />
                      </div>
                    </div>
                  </>
                )}

                {formData.deliveryMethod === 'pickup' && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border-2 border-amber-200">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">📍</div>
                      <div>
                        <div className="font-bold text-gray-800 mb-1">Pickup Location</div>
                        <div className="text-sm text-gray-700">
                          AfroBeadie Accessories Store<br />
                          Douala, Littoral<br />
                          Cameroon<br />
                          <span className="text-amber-600 font-semibold">Phone: 0542780286</span>
                        </div>
                        <div className="text-xs text-gray-600 mt-2">
                          We'll notify you when your order is ready for pickup (usually within 24 hours)
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>Payment Method</h2>
              <div className="space-y-4">
                {[
                  { id: 'mtn-momo', name: 'MTN Mobile Money', icon: '📱' },
                  { id: 'orange-money', name: 'Orange Money', icon: '🟠' },
                  { id: 'paypal', name: 'PayPal', icon: '💳' }
                ].map(method => (
                  <label 
                    key={method.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === method.id
                        ? 'border-amber-600 bg-gradient-to-r from-amber-50 to-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      className="w-5 h-5 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-2xl">{method.icon}</span>
                    <span className="font-semibold text-gray-800">{method.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-28">
              <h2 className="text-2xl font-bold mb-6 text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={`${item.id}-${item.selectedColor}`} className="flex gap-3 pb-4 border-b border-gray-100">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg shadow-md" />
                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-gray-800">{item.name}</h3>
                      <p className="text-xs text-gray-600">{item.selectedColor}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-amber-600 font-bold text-sm mt-1">{(item.price * item.quantity).toLocaleString()} FCFA</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">{subtotal.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>
                    {formData.deliveryMethod === 'delivery' ? 'Delivery' : 'Pickup'}
                  </span>
                  <span className="font-semibold">
                    {shipping > 0 ? `${shipping.toLocaleString()} FCFA` : 'Free'}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t-2 border-gray-200">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                    {total.toLocaleString()} FCFA
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 text-white py-4 rounded-xl font-bold hover:shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>Processing...</>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Complete Order
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;


