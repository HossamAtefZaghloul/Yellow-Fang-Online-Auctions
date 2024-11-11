'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
    
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
    
        try {
            const res = await axios.post('/api/login', formData);
    
            await new Promise((resolve) => setTimeout(resolve, 500));
    
            if (res.status === 200) {
                router.push('/'); 
            } else {
                await new Promise((resolve) => setTimeout(resolve, 500));
                setError('Login failed. Please check your credentials and try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            await new Promise((resolve) => setTimeout(resolve, 500));
            setError('An error occurred during login. Please try again.');
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    const handleGmailLogin = () => {
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center opacity-1  bg-[url('/123.jpg')] bg-cover">

            <Link
                href="/"
                className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center text-gray-600 hover:text-gray-900"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                >
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                Back
            </Link>

            <div className="bg-white w-full max-w-md  rounded-lg shadow-md p-8">
                <div className="flex flex-col items-center mb-8">

                    <h1 className="flex justify-center items-center mr-[44px] text-[20px] font-bold text-[#d98a04] ">
                        <Image
                            src="/2.png"
                            width={70}
                            height={70}
                            alt="Logo"
                            className="mb-4 w-[70px] h-[70px] object-coverS"
                        /> <span >Musuem</span></h1>
                    <p className="text-sm text-[#d98a04]">
                        Enter your email to sign in to your account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#d98a04]">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="mt-1 block w-full px-3 py-2 border text-[#ca8a04] bg-transparent border-[#ffbf50] rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-[#d98a04]"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-[#d98a04]">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="mt-1 block w-full px-3 py-2 border bg-transparent text-[#ca8a04]  border-[#ffbf50]  rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-[#d98a04]"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600" role="alert">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#d98a04] hover:bg-[#d98a04] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d98a04] disabled:opacity-50"
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center top-7 ">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2  text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={handleGmailLogin}
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm  bg-transparent text-sm font-medium text-[#d98a04] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-[#d98a04]"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Sign in with Gmail
                        </button>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="font-medium text-[#d98a04] hover:text-[#d98a04]">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}