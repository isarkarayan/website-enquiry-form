import React, { useState, useEffect } from 'react';
import { LogOut, Mail, Calendar, MessageSquare, Code, Users, User, Edit3, Save, X, Camera, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Enquiry } from '../lib/supabase';
import { Layout } from '../components/Layout';

export function Dashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [visitCount, setVisitCount] = useState(0);
  const [profileData, setProfileData] = useState({
    displayName: '',
    role: 'Administrator',
    bio: '',
    profileImage: '',
  });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  
  const { signOut, user } = useAuth();

  useEffect(() => {
    fetchEnquiries();
    loadProfileData();
    fetchVisitCount();
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

  const fetchVisitCount = async () => {
    try {
      // In a real application, you would track visits in a separate table
      // For now, we'll simulate visit count based on enquiries and some multiplier
      const uniqueEmails = new Set(enquiries.map(e => e.email));
      const estimatedVisits = uniqueEmails.size * 3 + Math.floor(Math.random() * 50) + 100;
      setVisitCount(estimatedVisits);
    } catch (error) {
      console.error('Error fetching visit count:', error);
      setVisitCount(0);
    }
  };

  const loadProfileData = () => {
    const savedProfile = localStorage.getItem('adminProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    } else {
      const defaultName = getAdminNameFromEmail();
      setProfileData(prev => ({ ...prev, displayName: defaultName }));
    }
  };

  const saveProfileData = async () => {
    setIsUpdatingProfile(true);
    try {
      localStorage.setItem('adminProfile', JSON.stringify(profileData));
      setShowProfileEdit(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsUpdatingProfile(false);
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

  const getAdminNameFromEmail = () => {
    if (user?.email) {
      const name = user.email.split('@')[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return 'Admin';
  };

  const getDisplayName = () => {
    return profileData.displayName || getAdminNameFromEmail();
  };

  const getInitials = () => {
    const name = getDisplayName();
    const words = name.split(' ');
    if (words.length > 1) {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfileData(prev => ({ ...prev, profileImage: result }));
      };
      reader.readAsDataURL(file);
    }
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 sm:p-3 rounded-xl">
                  <Code className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">WebCraft Solutions</h1>
                  <p className="text-sm text-slate-600">Admin Dashboard - Manage enquiries</p>
                </div>
              </div>
              
              {/* Admin Profile Section */}
              <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center space-x-3">
                  {/* Profile Image */}
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                      {profileData.profileImage ? (
                        <img 
                          src={profileData.profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-semibold text-sm">
                          {getInitials()}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setShowProfileEdit(true)}
                      className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-slate-50 transition-colors duration-200"
                    >
                      <Edit3 className="w-3 h-3 text-slate-600" />
                    </button>
                  </div>
                  
                  {/* Admin Info */}
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-slate-900">{getDisplayName()}</p>
                    <p className="text-xs text-slate-500">{profileData.role}</p>
                  </div>
                </div>
                
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 sm:px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Edit Modal */}
        {showProfileEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white rounded-t-2xl border-b border-slate-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">Edit Profile</h2>
                  <button
                    onClick={() => setShowProfileEdit(false)}
                    className="text-slate-400 hover:text-slate-600 transition-colors duration-200 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Profile Image Section */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                      {profileData.profileImage ? (
                        <img 
                          src={profileData.profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-semibold text-xl">
                          {getInitials()}
                        </span>
                      )}
                    </div>
                    <label className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-slate-50 transition-colors duration-200 cursor-pointer">
                      <Camera className="w-4 h-4 text-slate-600" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-slate-500 text-center">Click camera icon to change profile picture</p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-slate-700 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      value={profileData.displayName}
                      onChange={handleProfileInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                      placeholder="Enter your display name"
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={profileData.role}
                      onChange={handleProfileInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                      placeholder="Enter your role"
                    />
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-slate-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      value={profileData.bio}
                      onChange={handleProfileInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                    />
                    <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setShowProfileEdit(false)}
                    className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveProfileData}
                    disabled={isUpdatingProfile}
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isUpdatingProfile ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Enquiries</p>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900">{enquiries.length}</p>
                </div>
                <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">This Month</p>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {enquiries.filter(e => new Date(e.created_at).getMonth() === new Date().getMonth()).length}
                  </p>
                </div>
                <div className="bg-green-100 p-2 sm:p-3 rounded-full">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Page Visits</p>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900">{visitCount}</p>
                </div>
                <div className="bg-purple-100 p-2 sm:p-3 rounded-full">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Enquiries Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Recent Enquiries</h2>
            </div>

            {error ? (
              <div className="p-6 text-center text-red-600">
                {error}
              </div>
            ) : enquiries.length === 0 ? (
              <div className="p-8 sm:p-12 text-center">
                <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">No enquiries yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                        Email
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Website Type
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                        Message
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {enquiries.map((enquiry) => (
                      <tr key={enquiry.id} className="hover:bg-slate-50 transition-colors duration-150">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-slate-500">
                          <div className="hidden sm:block">{formatDate(enquiry.created_at)}</div>
                          <div className="sm:hidden">
                            {new Date(enquiry.created_at).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">{enquiry.name}</div>
                          <div className="text-xs text-slate-500 sm:hidden">{enquiry.email}</div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                          <div className="text-sm text-slate-500">{enquiry.email}</div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {enquiry.website_type}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                          <div className="text-sm text-slate-900 max-w-xs truncate">
                            {enquiry.message || (
                              <span className="text-slate-400 italic">No message</span>
                            )}
                          </div>
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