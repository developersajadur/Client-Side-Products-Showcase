import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../../Providers/AuthProvider';

const Login = () => {
    const { signInUser, googleLogin, loading } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signInUser(email, password);
        navigate('/'); // Navigate to the home page after successful login
    };

    const handleGoogleLogin = async () => {
        await googleLogin();
        navigate('/'); // Navigate to the home page after successful Google login
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
                        disabled={loading}
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <button 
                        onClick={handleGoogleLogin} 
                        className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600"
                        disabled={loading}
                    >
                        Login with Google
                    </button>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        {"Don't"} have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
