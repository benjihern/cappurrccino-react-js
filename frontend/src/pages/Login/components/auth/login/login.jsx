import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import { useAuth } from '../../../contexts/authContext';

const Login = () => {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isSigningIn) {
            setIsSigningIn(true)
            await doSignInWithEmailAndPassword(email, password)
            // doSendEmailVerification()
        }
    }

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            doSignInWithGoogle().catch(err => {
                setIsSigningIn(false)
            })
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-400 to-purple-500">
            {userLoggedIn && <Navigate to={'/menu'} replace={true} />}

            <main className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome Back</h1>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-100 border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-100 border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <button
                        type="submit"
                        disabled={isSigningIn}
                        className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    >
                        {isSigningIn ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-700">
                    Don't have an account? <Link to="/register" className="text-indigo-500 font-semibold">Sign up</Link>
                </p>
                <div className="flex items-center justify-center mt-6">
                    <div className="border-b border-gray-300 flex-grow"></div>
                    <p className="mx-3 text-gray-500 font-semibold">OR</p>
                    <div className="border-b border-gray-300 flex-grow"></div>
                </div>
                <button
                    disabled={isSigningIn}
                    onClick={onGoogleSignIn}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 focus:outline-none focus:border-indigo-500"
                >
                    <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                        <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                        <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                        <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                    </svg>
                    <span>{isSigningIn ? 'Signing In...' : 'Continue with Google'}</span>
                </button>
            </main>
        </div>
    );
};

export default Login;