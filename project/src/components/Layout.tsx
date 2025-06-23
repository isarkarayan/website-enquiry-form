import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-white">
      <main className="flex-1">
        {children}
      </main>
      {showFooter && (
        <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-slate-600">
              <p>&copy; 2025 Your Company Name. All rights reserved.</p>
              <div className="flex space-x-6 mt-2 sm:mt-0">
                <Link 
                  to="/privacy" 
                  className="hover:text-slate-900 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="/terms" 
                  className="hover:text-slate-900 transition-colors duration-200"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}