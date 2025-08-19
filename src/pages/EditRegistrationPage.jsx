import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Users, Settings, X, Save, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Select } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { registrationService } from '../services/api';

const EditRegistrationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [registration, setRegistration] = useState(null);
  const [formData, setFormData] = useState({
    guests: 0,
    slot: 'regular',
    cannotMakeIt: false
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const phoneNumber = searchParams.get('phone');

  useEffect(() => {
    if (phoneNumber) {
      fetchRegistration();
    } else {
      setFetching(false);
    }
  }, [phoneNumber]);

  const fetchRegistration = async () => {
    try {
      const data = await registrationService.getRegistrationByPhone(phoneNumber);
      setRegistration(data);
      setFormData({
        guests: data.guests,
        slot: data.slot,
        cannotMakeIt: false
      });
    } catch (error) {
      console.error('Error fetching registration:', error);
      alert('Registration not found. Please check your phone number.');
      navigate('/confirmation');
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
      navigate('/confirmation');
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
      navigate('/confirmation');
    } catch (error) {
      console.error('Cancellation failed:', error);
      alert('Cancellation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToConfirmation = () => {
    navigate('/confirmation');
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading registration...</p>
        </div>
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4">
        <div className="max-w-md mx-auto">
          <Card className="bg-white">
            <CardContent className="p-6 text-center">
              <p className="text-gray-600 mb-4">Registration not found.</p>
              <Button onClick={handleBackToConfirmation}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Confirmation
              </Button>
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
              <p>6 Early Bird Courts at 7pm</p>
              <p>12 Courts at 8pm</p>
            </div>
          </CardHeader>
        </Card>

        {/* Edit Form */}
        <Card className="bg-white shadow-xl border-0">
          <CardContent className="p-6 sm:p-8">
            <div className="space-y-8">
              {/* Current Registration Info */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3 text-lg">Current Registration</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600"><span className="font-semibold">Name:</span> {registration.name}</p>
                  <p className="text-sm text-gray-600"><span className="font-semibold">Phone:</span> {registration.phone}</p>
                </div>
              </div>

              {/* Number of Guests */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <label className="text-sm font-semibold text-blue-600">Number of Guests</label>
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

              {/* Update Registration Options */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-purple-600" />
                  <label className="text-sm font-semibold text-gray-700">Update Your Registration</label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Early Bird Option */}
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                      formData.slot === 'early-bird'
                        ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                        : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-25'
                    }`}
                    onClick={() => handleInputChange('slot', 'early-bird')}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-sm">Early Bird</p>
                        <p className="text-xs text-gray-600">7pm start</p>
                      </div>
                    </div>
                  </div>

                  {/* Regular Option */}
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                      formData.slot === 'regular'
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                    }`}
                    onClick={() => handleInputChange('slot', 'regular')}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-sm">Regular</p>
                        <p className="text-xs text-gray-600">8pm start</p>
                      </div>
                    </div>
                  </div>

                  {/* Cancel Option */}
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                      formData.cannotMakeIt
                        ? 'border-red-500 bg-red-50 shadow-lg'
                        : 'border-gray-200 hover:border-red-300 hover:bg-red-25'
                    }`}
                    onClick={() => handleInputChange('cannotMakeIt', !formData.cannotMakeIt)}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-md">
                        <X className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-sm">No longer able to make it</p>
                        <p className="text-xs text-gray-600">Cancel registration</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4">
                <Button
                  onClick={handleSaveChanges}
                  className="w-full h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={loading}
                >
                  <Save className="h-5 w-5 mr-3" />
                  {loading ? 'Updating...' : 'Update Registration'}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditRegistrationPage;
