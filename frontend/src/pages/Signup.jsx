import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 5) {
      setError('Password must be at least 5 characters long.');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Signup failed.');
        setSuccess('');
      } else {
        // Manual login flow: do NOT set token; send user to Login with preserved intent
        const qs = new URLSearchParams(location.search);
        const fromQuery = qs.get('from');
        const fromState = (location.state && location.state.from) ? location.state.from : null;
        const from = encodeURIComponent(fromQuery || fromState || '/recipes');
        setSuccess('Signup successful! Please log in.');
        setError('');
        setTimeout(() => {
          try { sessionStorage.setItem('notice', 'Signup successful! Please log in.'); } catch {}
          navigate(`/login?signup=1&from=${from}`, { replace: true });
        }, 900);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-eggshell to-gray-50 px-4 py-12 animate-fade-in">
      <div className="absolute top-4 left-0 right-0 px-4">
        {(error || success) && (
          <div className={`max-w-2xl mx-auto flex items-center justify-between gap-3 px-4 py-3 rounded-md shadow ${error ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-emerald-700 border border-emerald-800 text-emerald-50'}`}>
            <div className="flex-1 text-sm">
              {error || success}
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => { setError(''); setSuccess(''); }} className={`${error ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-emerald-900 hover:bg-emerald-950 text-white'} px-3 py-1 rounded-md transition`}>OK</button>
              <button type="button" onClick={() => { setError(''); setSuccess(''); }} className={`px-3 py-1 rounded-md transition ${error ? 'border border-red-300 text-red-700 hover:bg-red-100' : 'border border-emerald-200 text-emerald-50 hover:bg-emerald-600/50'}`}>Cancel</button>
            </div>
          </div>
        )}
      </div>
      <div className="w-full max-w-md animate-slide-up">
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-2xl shadow-lg space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-secondary mb-2">Create Account</h2>
            <p className="text-gray-600">Join us and start sharing your recipes</p>
          </div>
          
          
          
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btnColor focus:border-transparent transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btnColor focus:border-transparent transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btnColor focus:border-transparent transition-all"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-btnColor text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
          
          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-btnColor font-semibold hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
