import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Camera, 
  Image, 
  MapPin, 
  Home, 
  Search, 
  Settings,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';

type Screen = 
  | 'splash' 
  | 'auth-choice' 
  | 'register' 
  | 'login' 
  | 'otp' 
  | 'permissions' 
  | 'main';

type Tab = 'home' | 'search' | 'profile' | 'settings';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: ''
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [loginValue, setLoginValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [permissions, setPermissions] = useState({
    camera: false,
    media: false,
    location: false
  });

  // Splash screen auto-navigation
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('auth-choice');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentScreen('otp');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentScreen('otp');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpVerify = () => {
    setCurrentScreen('permissions');
  };

  const handlePermissionGrant = (permission: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [permission]: true }));
  };

  const handlePermissionsComplete = () => {
    setCurrentScreen('main');
  };

  // Splash Screen
  if (currentScreen === 'splash') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
        <div className="text-center animate-pulse">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 mx-auto animate-bounce">
            <Smartphone className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Promo</h1>
          <p className="text-blue-100">Your promotional companion</p>
        </div>
      </div>
    );
  }

  // Auth Choice Screen
  if (currentScreen === 'auth-choice') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Promo</h1>
            <p className="text-gray-600">Get started with your account</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => setCurrentScreen('register')}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Create Account
            </button>
            
            <button
              onClick={() => setCurrentScreen('login')}
              className="w-full bg-white text-gray-700 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Registration Screen
  if (currentScreen === 'register') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-8 pt-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  required
                  value={userData.firstName}
                  onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  required
                  value={userData.lastName}
                  onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={userData.email}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={userData.phone}
                  onChange={(e) => setUserData({...userData, phone: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                required
                value={userData.gender}
                onChange={(e) => setUserData({...userData, gender: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  required
                  value={userData.dateOfBirth}
                  onChange={(e) => setUserData({...userData, dateOfBirth: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 mt-6"
            >
              Continue
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => setCurrentScreen('auth-choice')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to options
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Login Screen
  if (currentScreen === 'login') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-8 pt-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <div className="flex bg-gray-200 rounded-xl p-1 mb-6">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                loginMethod === 'email' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                loginMethod === 'phone' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600'
              }`}
            >
              Phone
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
              </label>
              <div className="relative">
                {loginMethod === 'email' ? (
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                ) : (
                  <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                )}
                <input
                  type={loginMethod === 'email' ? 'email' : 'tel'}
                  required
                  value={loginValue}
                  onChange={(e) => setLoginValue(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={loginMethod === 'email' ? 'john@example.com' : '+1 (555) 123-4567'}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Continue with OTP
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => setCurrentScreen('auth-choice')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to options
            </button>
          </div>
        </div>
      </div>
    );
  }

  // OTP Verification Screen
  if (currentScreen === 'otp') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-8 pt-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
            <p className="text-gray-600">
              We've sent a 6-digit code to<br />
              <span className="font-medium">{userData.email || loginValue}</span>
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ))}
            </div>

            <button
              onClick={handleOtpVerify}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Verify Code
            </button>

            <div className="text-center">
              <p className="text-gray-600 mb-2">Didn't receive the code?</p>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Resend Code
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Permissions Screen
  if (currentScreen === 'permissions') {
    const allPermissionsGranted = Object.values(permissions).every(Boolean);

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-8 pt-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">App Permissions</h1>
            <p className="text-gray-600">Grant permissions to unlock all features</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Camera className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Camera</h3>
                    <p className="text-sm text-gray-600">Take photos and videos</p>
                  </div>
                </div>
                <button
                  onClick={() => handlePermissionGrant('camera')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    permissions.camera
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {permissions.camera ? 'Granted' : 'Allow'}
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Image className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Photos & Media</h3>
                    <p className="text-sm text-gray-600">Access your photo library</p>
                  </div>
                </div>
                <button
                  onClick={() => handlePermissionGrant('media')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    permissions.media
                      ? 'bg-green-100 text-green-700'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {permissions.media ? 'Granted' : 'Allow'}
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <p className="text-sm text-gray-600">Find nearby promotions</p>
                  </div>
                </div>
                <button
                  onClick={() => handlePermissionGrant('location')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    permissions.location
                      ? 'bg-green-100 text-green-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {permissions.location ? 'Granted' : 'Allow'}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handlePermissionsComplete}
            disabled={!allPermissionsGranted}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
              allPermissionsGranted
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {allPermissionsGranted ? 'Continue to App' : 'Grant All Permissions'}
          </button>
        </div>
      </div>
    );
  }

  // Main App with Bottom Navigation
  if (currentScreen === 'main') {
    const TabContent = () => {
      switch (activeTab) {
        case 'home':
          return (
            <div className="flex-1 p-4">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome back, {userData.firstName || 'User'}!
                </h1>
                <p className="text-gray-600">Discover amazing promotions near you</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white">
                  <h3 className="font-semibold mb-1">Active Deals</h3>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl text-white">
                  <h3 className="font-semibold mb-1">Saved</h3>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">50% Off Pizza</h3>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                      2 days left
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Tony's Pizza - 0.5 miles away</p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium">
                    View Deal
                  </button>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Buy 1 Get 1 Coffee</h3>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      5 days left
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Starbucks - 0.2 miles away</p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium">
                    View Deal
                  </button>
                </div>
              </div>
            </div>
          );
        
        case 'search':
          return (
            <div className="flex-1 p-4">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Deals</h1>
                <div className="relative">
                  <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for deals, stores, or categories..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Popular Categories</h2>
                <div className="grid grid-cols-2 gap-4">
                  {['Food & Dining', 'Shopping', 'Entertainment', 'Services'].map((category) => (
                    <div key={category} className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2"></div>
                      <p className="font-medium text-gray-900">{category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        
        case 'profile':
          return (
            <div className="flex-1 p-4">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">
                  {userData.firstName} {userData.lastName}
                </h1>
                <p className="text-gray-600">{userData.email}</p>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Account Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="text-gray-900">{userData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gender:</span>
                      <span className="text-gray-900 capitalize">{userData.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date of Birth:</span>
                      <span className="text-gray-900">{userData.dateOfBirth}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                      <span>Edit Profile</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                      <span>Saved Deals</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                      <span>Deal History</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        
        case 'settings':
          return (
            <div className="flex-1 p-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Push Notifications</span>
                      <button className="w-12 h-6 bg-blue-600 rounded-full p-1">
                        <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Email Updates</span>
                      <button className="w-12 h-6 bg-gray-300 rounded-full p-1">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Privacy</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                      <span>Location Settings</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                      <span>Data & Privacy</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Support</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                      <span>Help Center</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                      <span>Contact Us</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between text-red-600">
                      <span>Sign Out</span>
                      <ArrowRight className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        
        default:
          return null;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <TabContent />
        
        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex justify-around">
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'search', icon: Search, label: 'Search' },
              { id: 'profile', icon: User, label: 'Profile' },
              { id: 'settings', icon: Settings, label: 'Settings' }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;