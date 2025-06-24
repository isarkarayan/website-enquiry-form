import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { EnquiryForm } from './pages/EnquiryForm';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { useAnalytics } from './hooks/useAnalytics';
import { initGA } from './lib/analytics';

// Analytics wrapper component
function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  useAnalytics();
  return <>{children}</>;
}

function App() {
  useEffect(() => {
    // Initialize Google Analytics when app loads
    initGA();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <AnalyticsWrapper>
          <Routes>
            <Route path="/" element={<EnquiryForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AnalyticsWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;