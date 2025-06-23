import React, { useState, useEffect } from 'react';
import { LogOut, Mail, Calendar, MessageSquare, Globe, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Enquiry } from '../lib/supabase';
import { Layout } from '../components/Layout';

export function Dashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { signOut } = useAuth();

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setEnquiries(data || []);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      setError('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <Layout showFooter={false}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
                  <p className="text-slate-600">Manage website enquiries</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Enquiries</p>
                  <p className="text-3xl font-bold text-slate-900">{enquiries.length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">This Month</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {enquiries.filter(e => new Date(e.created_at).getMonth() === new Date().getMonth()).length}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">With Messages</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {enquiries.filter(e => e.message && e.message.trim()).length}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Enquiries Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Recent Enquiries</h2>
            </div>

            {error ? (
              <div className="p-6 text-center text-red-600">
                {error}
              </div>
            ) : enquiries.length === 0 ? (
              <div className="p-12 text-center">
                <Mail className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">No enquiries yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Website Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {enquiries.map((enquiry) => (
                      <tr key={enquiry.id} className="hover:bg-slate-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-slate-900">{enquiry.name}</div>
                            <div className="text-sm text-slate-500">{enquiry.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {enquiry.website_type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-900 max-w-xs truncate">
                            {enquiry.message || (
                              <span className="text-slate-400 italic">No message</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {formatDate(enquiry.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}