import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Users, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '../src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';
import { registrationService } from '../src/services/api';

const SignupListPage = () => {
  const router = useRouter();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const data = await registrationService.getAllRegistrations();
      // Filter out cancelled registrations
      const activeRegistrations = data.filter(reg => !reg.cancelled);
      setRegistrations(activeRegistrations);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      alert('Failed to load registrations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRegistrations();
    setRefreshing(false);
  };

  const handleBackToRegistration = () => {
    router.push('/register');
  };

  const getSlotDisplayName = (slot) => {
    return slot === 'early-bird' ? 'Early Bird' : 'Regular';
  };

  const getGuestText = (guests) => {
    if (guests === 0) return '';
    if (guests === 1) return ' + 1 guest';
    return ` + ${guests} guests`;
  };

  // Group registrations by slot type
  const earlyBirdRegistrations = registrations.filter(reg => reg.slot === 'early-bird');
  const regularRegistrations = registrations.filter(reg => reg.slot === 'regular');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading sign-up list...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <Card className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-2xl">
          <CardHeader className="text-center p-6 sm:p-8">
            <CardTitle className="text-2xl sm:text-3xl font-bold mb-4">Sign-up List</CardTitle>
            <div className="text-sm sm:text-base space-y-2 opacity-90">
              <p className="font-medium">Tuesday Social Game July 29 2025</p>
              <p>6 Early Bird Courts at 7pm</p>
              <p>12 Courts at 8pm</p>
            </div>
          </CardHeader>
        </Card>

        {/* Registrations List */}
        <Card className="bg-white shadow-xl border-0">
          <CardContent className="p-6 sm:p-8">
            <div className="space-y-8">
              {/* Early Bird Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full mr-3 flex items-center justify-center shadow-md">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  Early Bird (7pm) - {earlyBirdRegistrations.length} registrations
                </h3>
                <div className="grid gap-4">
                  {earlyBirdRegistrations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                      <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-lg">No Early Bird registrations yet</p>
                      <p className="text-sm">Be the first to register!</p>
                    </div>
                  ) : (
                    earlyBirdRegistrations.map((registration, index) => (
                      <div
                        key={registration._id}
                        className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {registration.name}
                              {getGuestText(registration.guests)}
                            </p>
                            <p className="text-sm text-gray-600">{registration.phone}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {new Date(registration.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Regular Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-lg mr-3 flex items-center justify-center shadow-md">
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                  </div>
                  Regular (8pm) - {regularRegistrations.length} registrations
                </h3>
                <div className="grid gap-4">
                  {regularRegistrations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                      <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-lg">No Regular registrations yet</p>
                      <p className="text-sm">Be the first to register!</p>
                    </div>
                  ) : (
                    regularRegistrations.map((registration, index) => (
                      <div
                        key={registration._id}
                        className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {registration.name}
                              {getGuestText(registration.guests)}
                            </p>
                            <p className="text-sm text-gray-600">{registration.phone}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {new Date(registration.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Summary</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">{earlyBirdRegistrations.length}</p>
                    <p className="text-sm text-gray-600">Early Bird</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{regularRegistrations.length}</p>
                    <p className="text-sm text-gray-600">Regular</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{registrations.length}</p>
                    <p className="text-sm text-gray-600">Total</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  className="flex-1 h-12 border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50 text-gray-700 font-medium transition-all duration-200"
                  disabled={refreshing}
                >
                  <RefreshCw className={`h-5 w-5 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  {refreshing ? 'Refreshing...' : 'Refresh List'}
                </Button>

                <Button
                  onClick={handleBackToRegistration}
                  className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Registration
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupListPage;
