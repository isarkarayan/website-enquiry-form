import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code } from 'lucide-react';
import { Layout } from '../components/Layout';

export function TermsConditions() {
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
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Terms & Conditions</h1>
              <p className="text-slate-600">WebCraft Solutions</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 prose prose-slate max-w-none">
          <h2>Service Description</h2>
          <p>
            Our website development services include design, development, and delivery of 
            custom websites based on your requirements and specifications.
          </p>

          <h2>Enquiry Process</h2>
          <p>
            By submitting an enquiry through our form, you agree that:
          </p>
          <ul>
            <li>All information provided is accurate and complete</li>
            <li>You have the authority to make enquiries on behalf of your organization</li>
            <li>We may contact you using the provided contact information</li>
          </ul>

          <h2>Service Terms</h2>
          <p>
            Our services are subject to separate terms and conditions that will be provided 
            during the project proposal phase.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content, designs, and materials created as part of our services remain our 
            intellectual property until full payment is received.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            We strive to provide accurate information and quality services, but cannot guarantee 
            specific outcomes or results.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to update these terms at any time. Continued use of our 
            services constitutes acceptance of any changes.
          </p>

          <h2>Contact Information</h2>
          <p>
            For questions about these terms, please contact us at{' '}
            <a href="mailto:support@webcraftsolutions.com" className="text-blue-600 hover:text-blue-700">
              support@webcraftsolutions.com
            </a> or through our{' '}
            <Link to="/support" className="text-blue-600 hover:text-blue-700">
              support page
            </Link>.
          </p>
        </div>
      </div>
    </Layout>
  );
}