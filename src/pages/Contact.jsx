import React, { useState } from 'react';
import optimizedDatabase from '../services/optimizedSupabaseDatabase';
import api from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    occupation: '',
    customOccupation: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Load form draft on component mount
  React.useEffect(() => {
    const draft = optimizedDatabase.getFormDraft('contact');
    if (draft) {
      setFormData(prev => ({ ...prev, ...draft }));
    }
  }, []);

  // Save form draft on changes
  React.useEffect(() => {
    if (formData.name || formData.email || formData.message) {
      optimizedDatabase.saveFormDraft('contact', formData);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.mobile || !formData.message) {
      setError('Please fill in all required fields (Name, Mobile, Message)');
      return;
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(formData.mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    // If occupation is "Other", use custom occupation
    const finalOccupation = formData.occupation === 'Other' ? formData.customOccupation : formData.occupation;

    setLoading(true);
    setError('');
    
    try {
      await api.saveContact({
        ...formData,
        occupation: finalOccupation
      });
      
      // Clear form draft on successful submission
      optimizedDatabase.clearFormDraft('contact');
      
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        mobile: '',
        occupation: '',
        customOccupation: '',
        company: '',
        message: ''
      });
    } catch (error) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadableResources = [
    { title: "Product Catalog", subtitle: "Complete product range - May 2025", icon: "📄", size: "2.5 MB" },
    { title: "Crop-wise Advisory", subtitle: "Toor, Brinjal, Paddy guidelines", icon: "📄", size: "1.8 MB" },
    { title: "Farmer Templates", subtitle: "Hindi, Telugu, Marathi", icon: "📄", size: "950 KB" },
    { title: "Application Protocols", subtitle: "Foliar Spray & Drip methods", icon: "📄", size: "1.2 MB" }
  ];

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e9e7e3] via-[#f4f1ee] to-[#d7e7c4] flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif text-[#2f3a29] mb-4">Message Sent Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for contacting Biolia. Our team will get back to you within 24 hours with the information you requested.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setSuccess(false)}
              className="w-full bg-[#a4be88] hover:bg-[#d7e7c4] text-[#2f3a29] font-semibold py-3 px-6 rounded-lg transition-all"
            >
              Send Another Message
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-earth-50 to-sage-100">
      {/* Header Section */}
      <section className="w-full py-20 px-4 text-center bg-gradient-to-br from-forest-900 via-olive-800 to-forest-800">
        <div className="mb-6 flex justify-center">
          <img 
            src="/src/assets/Bio Lia Full & Individual Logo - no background-05.png" 
            alt="Biolia Brand Mark" 
            className="h-20 w-auto opacity-95 drop-shadow-2xl filter brightness-110"
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-serif text-white font-light mb-6 animate-fade-in">
          Contact <span className="text-sage-300">Biolia</span>
        </h1>
        <p className="text-xl text-earth-200 max-w-3xl mx-auto mb-8 font-jakarta">
          Get in touch with our agricultural experts for product information, technical support, or partnership opportunities.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Company Info */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-3xl font-serif text-forest-800 mb-8">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-forest-800 mb-1">Head Office</h3>
                    <p className="text-forest-600">
                      Biolia Bio-Organic Solutions<br />
                      Agricultural Innovation Center<br />
                      Hyderabad, Telangana 500032<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-forest-800 mb-1">Phone</h3>
                    <p className="text-forest-600">
                      +91 40 1234 5678 (Head Office)<br />
                      +91 40 1234 5679 (Sales)<br />
                      +91 40 1234 5680 (Technical Support)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-forest-800 mb-1">Email</h3>
                    <p className="text-forest-600">
                      info@biolia.com<br />
                      sales@biolia.com<br />
                      support@biolia.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979.446.74.736 1.747.736 2.771 0 1.024-.29 2.031-.736 2.771C10.792 13.807 10.304 14 10 14c-.304 0-.792-.193-1.264-.979C8.29 12.281 8 11.274 8 10.25c0-1.024.29-2.031.736-2.771z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-forest-800 mb-1">Business Hours</h3>
                    <p className="text-forest-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Downloadable Resources */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-serif text-forest-800 mb-6">Download Resources</h2>
              <div className="space-y-3">
                {downloadableResources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-sage-50 rounded-lg hover:bg-sage-100 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <div className="text-lg">{resource.icon}</div>
                      <div>
                        <h3 className="font-semibold text-forest-800 group-hover:text-sage-600 transition-colors text-sm">{resource.title}</h3>
                        <p className="text-xs text-forest-600">{resource.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-forest-500 mb-1">{resource.size}</div>
                      <div className="text-sage-600 font-semibold text-xs">Download</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 h-fit">
            <h2 className="text-3xl font-serif text-forest-800 mb-8">Send us a Message</h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-forest-800 text-sm font-semibold mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-sage-200 focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20 transition-all duration-300 outline-none"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="mobile" className="block text-forest-800 text-sm font-semibold mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-sage-200 focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20 transition-all duration-300 outline-none"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-forest-800 text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-sage-200 focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20 transition-all duration-300 outline-none"
                  placeholder="your.email@example.com (optional)"
                />
              </div>

              <div>
                <label htmlFor="occupation" className="block text-forest-800 text-sm font-semibold mb-2">
                  Occupation
                </label>
                <select
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-sage-200 focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20 transition-all duration-300 outline-none appearance-none bg-white"
                >
                  <option value="">Select your occupation (optional)</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Employee">Employee</option>
                  <option value="Business Owner">Business Owner</option>
                  <option value="Agricultural Consultant">Agricultural Consultant</option>
                  <option value="Dealer/Distributor">Dealer/Distributor</option>
                  <option value="Student">Student</option>
                  <option value="Researcher">Researcher</option>
                  <option value="Government Official">Government Official</option>
                  <option value="NGO Worker">NGO Worker</option>
                  <option value="Retired">Retired</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {formData.occupation === 'Other' && (
                <div>
                  <label htmlFor="customOccupation" className="block text-forest-800 text-sm font-semibold mb-2">
                    Please specify your occupation
                  </label>
                  <input
                    type="text"
                    id="customOccupation"
                    name="customOccupation"
                    value={formData.customOccupation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-sage-200 focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20 transition-all duration-300 outline-none"
                    placeholder="Enter your occupation"
                  />
                </div>
              )}

              <div>
                <label htmlFor="company" className="block text-forest-800 text-sm font-semibold mb-2">
                  Company/Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-sage-200 focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20 transition-all duration-300 outline-none"
                  placeholder="Your company name (optional)"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-forest-800 text-sm font-semibold mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-sage-200 focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20 transition-all duration-300 outline-none resize-vertical"
                  placeholder="Tell us about your inquiry, product questions, or how we can help you..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-sage-500 to-sage-400 hover:from-sage-400 hover:to-sage-300 text-white font-bold px-8 py-4 rounded-xl shadow transition-all text-lg hover:scale-105 focus:ring-2 focus:ring-sage-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending Message...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;