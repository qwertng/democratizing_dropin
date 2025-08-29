import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { User, Phone, Users, Ticket, Send, List } from 'lucide-react';
import { Button } from '../src/components/ui/button';
import { Input } from '../src/components/ui/input';
import { Select } from '../src/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';
import { registrationService } from '../src/services/api';

const RegistrationPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: 0,
    slot: 'regular'
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const registrationData = {
        name: formData.name,
        phone: formData.phone,
        guests: parseInt(formData.guests),
        slot: formData.slot,
        cancelled: false,
        createdAt: new Date()
      };

      await registrationService.createRegistration(registrationData);
      router.push('/confirmation');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewList = () => {
    router.push('/list');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 p-4 sm:p-6 lg:p-8">
      <div className="max-w-md lg:max-w-lg mx-auto">
        {/* Header Card */}
        <Card className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-2xl">
          <CardHeader className="text-center p-6 sm:p-8">
            <CardTitle className="text-2xl sm:text-3xl font-bold mb-4">Event Registration</CardTitle>
            <div className="text-sm sm:text-base space-y-2 opacity-90">
              <p className="font-medium">Tuesday Social Game July 29 2025</p>
              <p>6 Early Bird Courts at 7pm</p>
              <p>12 Courts at 8pm</p>
            </div>
          </CardHeader>
        </Card>

        {/* Registration Form */}
        <Card className="bg-white shadow-xl border-0">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Full Name Input */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-purple-600" />
                  <label className="text-sm font-semibold text-gray-700">Full Name</label>
                </div>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="h-12 text-base border-2 border-gray-200 focus:border-purple-500 transition-colors"
                />
              </div>

              {/* Phone Number Input */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-purple-600" />
                  <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                </div>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  className="h-12 text-base border-2 border-gray-200 focus:border-purple-500 transition-colors"
                />
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

              {/* Slot Type Selection */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Ticket className="h-5 w-5 text-purple-600" />
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

              {/* Action Buttons */}
              <div className="space-y-4 pt-4">
                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={loading}
                >
                  <Send className="h-5 w-5 mr-3" />
                  {loading ? 'Registering...' : 'Register Now'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50 text-gray-700 font-medium transition-all duration-200"
                  onClick={handleViewList}
                >
                  <List className="h-5 w-5 mr-2" />
                  View Sign-up List
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Security Message */}
        <div className="text-center mt-8 text-sm text-gray-400">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="font-medium">Your information is secure with us</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
