'use client';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [captcha, setCaptcha] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          phone: e.target.phone.value,
          message: e.target.message.value,
          captcha
        })
      });

      if (response.ok) {
        setSubmitted(true);
        e.target.reset();
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-amber-700 mb-8 animate-fade-in-up">
        Get in Touch
      </h1>
      
      {submitted ? (
        <div className="bg-green-100 p-4 rounded-lg animate-fade-in-up" role="alert" aria-live="polite">
          Message sent successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="animate-fade-in-up delay-100">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div className="animate-fade-in-up delay-200">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div className="animate-fade-in-up delay-300">
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div className="animate-fade-in-up delay-400">
            <label className="block text-gray-700 mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              required
              className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div className="animate-fade-in-up delay-500">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={(token) => setCaptcha(token)}
              className="mb-4"
            />
          </div>

          <button
            type="submit"
            disabled={!captcha || loading}
            className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2"></span>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      )}
    </div>
  );
}