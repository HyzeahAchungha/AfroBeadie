const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',
    "https://afrobeadie-1.onrender.com/"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);


app.post('/api/orders', async (req, res) => {
  const { customer, items, total, deliveryFee } = req.body;

  // Validate request
  if (!customer || !items || !total) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields'
    });
  }

  try {
    // Generate unique order reference
    const orderRef = `AfroBeadie-${Date.now()}`;
    
    // Format items for email
    const itemsList = items.map(item => 
      `<li style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
        <strong>${item.name}</strong> x${item.quantity} 
        <span style="color: #6b7280;">(${item.selectedType || 'Standard'})</span>
        <span style="float: right; color: #D97706 font-weight: bold;">XAF ${(item.price * item.quantity).toFixed(0)}</span>
      </li>`
    ).join('');

    const subtotal = total - deliveryFee;
    const orderDate = new Date().toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
    const neededDate = new Date(customer.date).toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });

    // ============================================
    // SEND EMAIL TO CUSTOMER WITH PAYMENT INSTRUCTIONS
    // ============================================
    await resend.emails.send({
      from: 'AfroBeadie <onboarding@resend.dev>',
      to: customer.email,
      subject: '📋 Order Received - Payment Instructions',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6; 
              color: #1f2937;
              margin: 0;
              padding: 0;
              background-color: #f9fafb;
            }
            .container { max-width: 600px; margin: 0 auto; background: white; }
            .header { 
              background: linear-gradient(135deg, #F97316 0%, #F97316 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center; 
            }
            .header h1 { margin: 0 0 10px 0; font-size: 28px; }
            .content { padding: 40px 30px; }
            .payment-box { 
              background: #FEF3C7; 
              padding: 25px; 
              border-radius: 12px; 
              margin: 25px 0; 
              border: 3px solid #D97706;
            }
            .payment-box h3 { 
              color: #92400E; 
              margin: 0 0 15px 0; 
              font-size: 20px;
              text-align: center;
            }
            .payment-details {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin: 15px 0;
            }
            .payment-details p {
              margin: 10px 0;
              font-size: 16px;
            }
            .payment-details .label {
              color: #6B7280;
              font-size: 14px;
              margin-bottom: 5px;
            }
            .payment-details .value {
              color: #1F2937;
              font-size: 20px;
              font-weight: bold;
            }
            .amount-due {
              background: #D97706,;
              color: white;
              padding: 20px;
              border-radius: 8px;
              text-align: center;
              margin: 20px 0;
            }
            .amount-due .label {
              font-size: 14px;
              opacity: 0.9;
              margin-bottom: 5px;
            }
            .amount-due .value {
              font-size: 36px;
              font-weight: bold;
            }
            .order-box { 
              background: #F9FAFB; 
              padding: 20px; 
              border-radius: 8px; 
              margin: 20px 0; 
              border-left: 4px solid #D97706; 
            }
            .order-box h3 { color: #D97706,; margin: 0 0 15px 0; }
            .order-box p { margin: 8px 0; color: #4B5563; }
            .items { 
              background: #FFFFFF; 
              border: 1px solid #E5E7EB;
              border-radius: 8px; 
              margin: 20px 0;
              overflow: hidden;
            }
            .items h3 {
              color: #D97706,;
              margin: 0;
              padding: 20px;
              background: #F9FAFB;
              border-bottom: 1px solid #E5E7EB;
            }
            .items ul { list-style: none; padding: 0; margin: 0; }
            .items li:last-child { border-bottom: none; }
            .alert-box {
              background: #DBEAFE;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #3B82F6;
            }
            .footer {
              text-align: center;
              padding: 30px;
              color: #6B7280;
              font-size: 14px;
              background: #F9FAFB;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Received!</h1>
              <p style="margin: 0; opacity: 0.9;">Hi ${customer.name}, thank you for your order</p>
            </div>
            
            <div class="content">
              <p style="font-size: 16px;">Thank you for choosing <strong> AfroBeadie </strong>!</p>
              <p>We have received your order request. Please complete your payment to confirm your order.</p>
              
              <div class="payment-box">
                <h3>💳 Payment Required</h3>
                
                <div class="amount-due">
                  <div class="label">Amount Due</div>
                  <div class="value">XAF ${total.toFixed(0)}</div>
                </div>
                
                <div class="payment-details">
                  <div class="label">Mobile Money Number:</div>
                  <div class="value">+237 ${process.env.MOMO_NUMBER || '6XX XXX XXX'}</div>
                </div>
                
                <div class="payment-details">
                  <div class="label">Account Name:</div>
                  <div class="value">${process.env.MOMO_NAME || 'AfroBeadie'}</div>
                </div>
                
                <div class="alert-box">
                  <p style="margin: 0 0 10px 0;"><strong>⚠️ Please use your Name as the Reference:</strong></p>
                  <p style="margin: 0; font-size: 18px; font-weight: bold; color: #1F2937;">${customer.name}</p>
                </div>
              </div>

              <div style="background: #FEE2E2; padding: 15px; border-radius: 8px; border-left: 4px solid #EF4444; margin: 20px 0;">
                <p style="margin: 0; color: #991B1B;"><strong>Note: Payment validates your order.</strong></p>
                <p style="margin: 10px 0 0 0; color: #991B1B; font-size: 14px;">Once payment is confirmed, we will begin crafting your delicious treats!</p>
              </div>
              
              <div class="order-box">
                <h3>📋 Your Order</h3>
                <p><strong>Order Reference:</strong> ${orderRef}</p>
                <p><strong>Order Date:</strong> ${orderDate}</p>
                <p><strong>Delivery Method:</strong> ${customer.deliveryMethod}</p>
                <p><strong>Date Needed:</strong> ${neededDate}</p>
                ${customer.address 
                  ? `<p><strong>Delivery Address:</strong> ${customer.address}</p>` 
                  : `<p><strong>Pickup Location:</strong> Your Street, Douala<br>
                     <span style="font-size: 14px; color: #6B7280;">Call +237 ${process.env.OWNER_PHONE || 'XXX XXX XXX'} upon arrival</span></p>`
                }
              </div>

              <div class="items">
                <h3>🍰 Your Items</h3>
                <ul>${itemsList}</ul>
              </div>

              <div style="background: #F9FAFB; padding: 20px; border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; padding: 10px 0;">
                  <span>Subtotal:</span>
                  <span>XAF ${subtotal.toFixed(0)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 10px 0;">
                  <span>Delivery Fee:</span>
                  <span>${deliveryFee === 0 ? 'FREE' : `XAF ${deliveryFee.toFixed(0)}`}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 15px 0; border-top: 2px solid #D97706,; margin-top: 10px; font-size: 20px; color: #D97706,; font-weight: bold;">
                  <span>Total</span>
                  <span>XAF ${total.toFixed(0)}</span>
                </div>
              </div>
            </div>

            <div class="footer">
              <p><strong>Need Help?</strong></p>
              <p>📞 Call: <strong>+237 ${process.env.OWNER_PHONE || 'XXX XXX XXX'}</strong></p>
              <p>📧 Email: <strong>${process.env.OWNER_EMAIL}</strong></p>
              <p style="color: #9CA3AF; font-size: 12px; margin-top: 20px;">
                © ${new Date().getFullYear()} NiNi Nayah Bakery. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    // ============================================
    // SEND NOTIFICATION TO Seller
    // ============================================
    await resend.emails.send({
      from: 'AfroBeadie Orders <onboarding@resend.dev>',
      to: process.env.OWNER_EMAIL,
      subject: `🔔 NEW ORDER - ${orderRef}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6; 
              color: #1F2937;
              margin: 0;
              padding: 0;
              background-color: #F9FAFB;
            }
            .container { max-width: 600px; margin: 0 auto; background: white; }
            .header { 
              background: linear-gradient(135deg, #DC2626 0%, #EF4444 100%); 
              color: white; 
              padding: 30px; 
              text-align: center; 
            }
            .header h1 { margin: 0 0 10px 0; font-size: 26px; }
            .content { padding: 30px; }
            .info-box { 
              background: #F9FAFB; 
              padding: 20px; 
              border-radius: 8px; 
              margin: 15px 0; 
              border-left: 4px solid #DC2626; 
            }
            .info-box h3 { color: #DC2626; margin: 0 0 15px 0; }
            .info-box p { margin: 8px 0; color: #4B5563; }
            .items ul { list-style: none; padding: 0; margin: 0; }
            .items li { padding: 12px; border-bottom: 1px solid #E5E7EB; }
            .items li:last-child { border-bottom: none; }
            .action-box {
              background: #FEF3C7;
              padding: 20px;
              border-radius: 8px;
              margin-top: 20px;
              border-left: 4px solid #F59E0B;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 NEW ORDER!</h1>
              <p style="margin: 0; opacity: 0.9;">
                ${new Date().toLocaleString('en-GB', { 
                  day: '2-digit', 
                  month: 'long', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            
            <div class="content">
              <div class="info-box">
                <h3>👤 Customer Information</h3>
                <p><strong>Name:</strong> ${customer.name}</p>
                <p><strong>Email:</strong> ${customer.email}</p>
                <p><strong>Phone:</strong> <a href="tel:${customer.phone}" style="color: #DC2626; text-decoration: none; font-weight: bold;">${customer.phone}</a></p>
              </div>

              <div class="info-box">
                <h3>🚚 Delivery Details</h3>
                <p><strong>Method:</strong> ${customer.deliveryMethod}</p>
                <p><strong>Date Needed:</strong> ${neededDate}</p>
                ${customer.address 
                  ? `<p><strong>Address:</strong> ${customer.address}</p>` 
                  : '<p><em>Customer will pickup at store</em></p>'
                }
              </div>

              <div class="info-box items">
                <h3>🛒 Order Items</h3>
                <ul>${itemsList}</ul>
              </div>

              <div class="info-box">
                <p style="margin: 0;"><strong>Subtotal:</strong> XAF ${subtotal.toFixed(0)}</p>
                <p style="margin: 10px 0;"><strong>Delivery:</strong> ${deliveryFee === 0 ? 'FREE' : `XAF ${deliveryFee.toFixed(0)}`}</p>
                <p style="margin: 10px 0 0 0; font-size: 20px; color: #DC2626; font-weight: bold;">TOTAL: XAF ${total.toFixed(0)}</p>
              </div>

              <div style="background: #FEE2E2; padding: 15px; border-radius: 8px; border-left: 4px solid #EF4444;">
                <p style="margin: 0 0 5px 0;"><strong style="color: #991B1B;">⚠️ Awaiting Payment</strong></p>
                <p style="margin: 5px 0; color: #991B1B; font-size: 14px;">Order Reference: ${orderRef}</p>
                <p style="margin: 5px 0 0 0; color: #991B1B; font-size: 14px;">Customer should use their name (${customer.name}) as reference</p>
              </div>

              <div class="action-box">
                <p style="margin: 0 0 10px 0; font-size: 18px;"><strong>📱 Next Steps</strong></p>
                <p style="margin: 0;">
                  Wait for payment confirmation from <strong>${customer.name}</strong><br>
                  Contact: <strong>${customer.phone}</strong>
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });

    console.log(`✅ Order created successfully: ${orderRef}`);

    res.json({
      success: true,
      message: 'Order created and emails sent successfully',
      orderRef: orderRef
    });

  } catch (error) {
    console.error('❌ Order creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process order',
      details: error.message
    });
  }
});

// ============================================
// HEALTH CHECK
// ============================================
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    services: {
      resend: !!process.env.RESEND_API_KEY
    }
  });
});

// ============================================
// TEST EMAIL
// ============================================
app.post('/api/test-email', async (req, res) => {
  try {
    await resend.emails.send({
      from: 'AfroBeadie <onboarding@resend.dev>',
      to: process.env.OWNER_EMAIL,
      subject: 'AfroBeadie',
      html: '<h1>✅ Email System Working!</h1><p>Your Resend integration is configured correctly.</p>'
    });
    res.json({ success: true, message: 'Test email sent to ' + process.env.OWNER_EMAIL });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


const PORT = process.env.PORT || 8000;
app.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});
