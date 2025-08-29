import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { CheckCircle, Phone, Edit, List } from 'lucide-react';
import { Button } from '../src/components/ui/button';
import { Input } from '../src/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';

const ConfirmationPage = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleEditResponse = () => {
    if (phoneNumber.trim()) {
      router.push(`/edit?phone=${encodeURIComponent(phoneNumber)}`);
    } else {
      alert('Please enter your phone number to edit your registration.');
    }
  };

  const handleViewList = () => {
    router.push('/list');
  };

  const handleNewRegistration = () => {
    router.push('/register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 p-4 sm:p-6 lg:p-8">
      <div className="max-w-md lg:max-w-lg mx-auto">
        {/* Header Card */}
        <Card className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-2xl">
          <CardHeader className="text-center p-6 sm:p-8">
            <CardTitle className="text-2xl sm:text-3xl font-bold mb-4">Registration Confirmed!</CardTitle>
            <div className="text-sm sm:text-base space-y-2 opacity-90">
              <p className="font-medium">Tuesday Social Game July 29 2025</p>
              <p>6 Early Bird Courts at 7pm</p>
              <p>12 Courts at 8pm</p>
            </div>
          </CardHeader>
        </Card>

        {/* Confirmation Content */}
        <Card className="bg-white shadow-xl border-0">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center space-y-8">
              {/* Success Icon and Message */}
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    You're going to Tuesday Social Game July 29 2025
                  </h2>
                  <p className="text-gray-600 text-base">
                    A confirmation was sent to your email.
                  </p>
                </div>
              </div>

              {/* Phone Number Input for Editing */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-purple-600" />
                  <label className="text-sm font-semibold text-gray-700">
                    Enter your phone number to edit your registration
                  </label>
                </div>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-12 text-base border-2 border-gray-200 focus:border-purple-500 transition-colors"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4">
                <Button
                  onClick={handleEditResponse}
                  className="w-full h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Edit className="h-5 w-5 mr-3" />
                  Edit Response
                </Button>

                <Button
                  onClick={handleViewList}
                  variant="outline"
                  className="w-full h-12 border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50 text-gray-700 font-medium transition-all duration-200"
                >
                  <List className="h-5 w-5 mr-2" />
                  View Sign-up List
                </Button>

                <Button
                  onClick={handleNewRegistration}
                  variant="outline"
                  className="w-full h-12 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 font-medium transition-all duration-200"
                >
                  Register Another Person
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfirmationPage;
