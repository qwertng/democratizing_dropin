import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Users, Settings, X, Save, ArrowLeft } from 'lucide-react';
import { Button } from '../src/components/ui/button';
import { Select } from '../src/components/ui/select';
import { Checkbox } from '../src/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';
import { registrationService } from '../src/services/api';

const EditRegistrationPage = () => {
  const router = useRouter();
  const { phone } = router.query;
  const [registration, setRegistration] = useState(null);
  const [formData, setFormData] = useState({
    guests: 0,
    slot: 'regular',
    cannotMakeIt: false
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (phone) {
      fetchRegistration();
    } else {
      setFetching(false);
    }
  }, [phone]);

  const fetchRegistration = async () => {
    try {
      const data = await registrationService.getRegistrationByPhone(phone);
      setRegistration(data);
      setFormData({
        guests: data.guests,
        slot: data.slot,
        cannotMakeIt: false
      });
    } catch (error) {
      console.error('Error fetching registration:', error);
      alert('Registration not found. Please check your phone number.');
      router.push('/confirmation');
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = async () => {
    if (formData.cannotMakeIt) {
      await handleCancelRegistration();
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        guests: parseInt(formData.guests),
        slot: formData.slot
      };

      await registrationService.updateRegistration(registration._id, updateData);
      alert('Registration updated successfully!');
      router.push('/confirmation');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Update failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRegistration = async () => {
    setLoading(true);
    try {
      await registrationService.cancelRegistration(registration._id);
      alert('Registration cancelled successfully!');
      router.push('/confirmation');
    } catch (error) {
      console.error('Cancellation failed:', error);
      alert('Cancellation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToConfirmation = () => {
    router.push('/confirmation');
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 p-4 sm:p-6 lg:p-8">
        <div className="max-w-md lg:max-w-lg mx-auto">
          <Card className="bg-white shadow-xl border-0">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading registration...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 p-4 sm:p-6 lg:p-8">
        <div className="max-w-md lg:max-w-lg mx-auto">
          <Card className="bg-white shadow-xl border-0">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <X className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Registration Not Found</h2>
                <p className="text-gray-600">Please check your phone number and try again.</p>
                <Button
                  onClick={handleBackToConfirmation}
                  className="mt-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Confirmation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 p-4 sm:p-6 lg:p-8">
      <div className="max-w-md lg:max-w-lg mx-auto">
        {/* Header Card */}
        <Card className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-2xl">
          <CardHeader className="text-center p-6 sm:p-8">
            <CardTitle className="text-2xl sm:text-3xl font-bold mb-4">Edit Registration</CardTitle>
            <div className="text-sm sm:text-base space-y-2 opacity-90">
              <p className="font-medium">Tuesday Social Game July 29 2025</p>
              <p>Current registration for: {registration.name}</p>
            </div>
          </CardHeader>
        </Card>

        {/* Edit Form */}
        <Card className="bg-white shadow-xl border-0">
          <CardContent className="p-6 sm:p-8">
            <div className="space-y-6">
              {/* Current Registration Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Current Registration</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Name:</strong> {registration.name}</p>
                  <p><strong>Phone:</strong> {registration.phone}</p>
                  <p><strong>Guests:</strong> {registration.guests}</p>
                  <p><strong>Slot:</strong> {registration.slot === 'early-bird' ? 'Early Bird (7pm)' : 'Regular (8pm)'}</p>
                </div>
              </div>

              {/* Edit Options */}
              <div className="space-y-6">
                {/* Number of Guests */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <label className="text-sm font-semibold text-gray-700">Number of Guests</label>
                  </div>
                  <Select
                    value={formData.guests}
                    onChange={(e) => handleInputChange('guests', e.target.value)}
                    className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
                  >
                    <option value={0}>No guests</option>
                    <option value={1}>1 guest</option>
                    <option value={2}>2 guests</option>
                    <option value={3}>3 guests</option>
                    <option value={4}>4 guests</option>
                    <option value={5}>5 guests</option>
                  </Select>
                </div>

                {/* Slot Type Selection */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-purple-600" />
                    <label className="text-sm font-semibold text-gray-700">Select Ticket Type</label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Early Bird Option */}
                    <div
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                        formData.slot === 'early-bird'
                          ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                          : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-25'
                      }`}
                      onClick={() => handleInputChange('slot', 'early-bird')}
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-lg text-gray-800">Early Bird</p>
                          <p className="text-sm text-gray-600">7pm start</p>
                        </div>
                      </div>
                    </div>

                    {/* Regular Option */}
                    <div
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                        formData.slot === 'regular'
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                      }`}
                      onClick={() => handleInputChange('slot', 'regular')}
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                          <div className="w-4 h-4 bg-white rounded-sm"></div>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-lg text-gray-800">Regular</p>
                          <p className="text-sm text-gray-600">8pm start</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cancel Registration Option */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="cannotMakeIt"
                      checked={formData.cannotMakeIt}
                      onChange={(e) => handleInputChange('cannotMakeIt', e.target.checked)}
                    />
                    <label htmlFor="cannotMakeIt" className="text-sm font-semibold text-red-600">
                      I cannot make it to the event
                    </label>
                  </div>
                  {formData.cannotMakeIt && (
                    <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                      This will cancel your registration. You can always register again later.
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 pt-4">
                  <Button
                    onClick={handleSaveChanges}
                    className="w-full h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={loading}
                  >
                    <Save className="h-5 w-5 mr-3" />
                    {loading ? 'Saving...' : formData.cannotMakeIt ? 'Cancel Registration' : 'Save Changes'}
                  </Button>

                  <Button
                    onClick={handleBackToConfirmation}
                    variant="outline"
                    className="w-full h-12 border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50 text-gray-700 font-medium transition-all duration-200"
                  >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Confirmation
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditRegistrationPage;
