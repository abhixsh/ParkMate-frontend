// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setLoading(true);

//         try {
//             const response = await fetch('http://localhost:8080/parkmate/admin/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json', 
//                     'Accept': 'application/json', 
//                 },
//                 body: JSON.stringify({ email, password }), 
//             });

//             const data = await response.json();

//             if (response.ok) {

//                 localStorage.setItem('admin', JSON.stringify({
//                     email: email,
//                     role: data.admin.role,
//                     adminId: data.admin.adminId,
//                 }));


//                 navigate('/admin/dashboard');
//             } else {
//                 setError(data.message || 'Login failed. Please check your credentials.');
//             }
//         } catch (error) {
//             setError('An unexpected error occurred. Please try again later.');
//             console.error('Login error:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container mx-auto p-6 max-w-lg bg-white rounded-lg shadow-lg mt-10 mb-10">
//             <h2 className="text-3xl font-bold text-center text-[#FFBB00] mb-6">
//                 Admin Login
//             </h2>

//             {error && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                     {error}
//                 </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
                
//                 <div>
//                     <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
//                         Email Address:
//                     </label>
//                     <input
//                         type="email"
//                         id="email"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFBB00] focus:outline-none"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         disabled={loading}
//                     />
//                 </div>

                
//                 <div>
//                     <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
//                         Password:
//                     </label>
//                     <input
//                         type="password"
//                         id="password"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFBB00] focus:outline-none"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         disabled={loading}
//                     />
//                 </div>

                
//                 <button
//                     type="submit"
//                     className="w-full bg-[#FFBB00] text-white text-lg font-semibold py-3 rounded-md hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                     disabled={loading}
//                 >
//                     {loading ? 'Logging in...' : 'Login'}
//                 </button>
//             </form>

//             <p className="mt-6 text-center text-gray-500 text-sm">
//                 New to Admin Panel?{" "}
//                 <a href="/admin/register" className="text-[#FFBB00] font-medium hover:underline">
//                     Sign up
//                 </a>
//             </p>
//         </div>
//     );
// };

// export default AdminLogin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8080/parkmate/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response:', response); // Logs the full response object
      const data = await response.json();
      console.log('Response Data:', data); // Logs the parsed JSON data

      if (response.ok) {
        // Saving user data in localStorage
        console.log('Saving to localStorage:', {
        //   name: data.user.fullName,
          email: email,
        //   phoneNumber: data.user.phoneNumber,
        //   userId: data.user.id,
        });

        localStorage.setItem('admin', JSON.stringify({
                                email: email,
                                role: data.admin.role,
                                adminId: data.admin.adminId,
                            }));

        // Navigate to "My Reservations" page (or the relevant page for user info)
        navigate('/admin'); // First, navigate to the "My Reservations" page

        // Then reload the page to apply changes
        window.location.reload();  // Refresh page after navigation
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg bg-white rounded-lg shadow-lg mt-10 mb-10">
      <h2 className="text-3xl font-bold text-center text-[#FFBB00] mb-6">
        Welcome to ParkMate
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFBB00] focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFBB00] focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-[#FFBB00] text-white text-lg font-semibold py-3 rounded-md hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="mt-6 text-center text-gray-500 text-sm">
        New to ParkMate?{" "}
        <a href="/register" className="text-[#FFBB00] font-medium hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
