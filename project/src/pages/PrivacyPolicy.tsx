import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe } from 'lucide-react';
import { Layout } from '../components/Layout';

export function PrivacyPolicy() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Enquiry Form</span>
          </Link>
          
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 prose prose-slate max-w-none">
          <h2>Information We Collect</h2>
          <p>
            When you submit an enquiry through our form, we collect the following information:
          </p>
          <ul>
            <li>Your full name</li>
            <li>Email address</li>
            <li>Website type requirements</li>
            <li>Any additional messages you provide</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information you provide to:
          </p>
          <ul>
            <li>Respond to your enquiry about website development services</li>
            <li>Provide you with relevant information about our services</li>
            <li>Improve our services and customer experience</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties 
            without your consent, except as described in this policy.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through our 
            enquiry form or email.
          </p>
        </div>
      </div>
    </Layout>
  );
}