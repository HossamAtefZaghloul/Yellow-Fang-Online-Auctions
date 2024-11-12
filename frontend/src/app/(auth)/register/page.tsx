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

    // handleSubmit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        console.log(email);
        console.log(password);
        try {
            const res = await axios.post("/api/register", { email, password })

            if (res.status === 201) {
                router.push('/login')
            } else {
                setError('Registration failed. Please check your credentials and try again.')
            }
        } catch (err) {
            console.error('Register error:', err)
            setError('An error occurred during registration. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center opacity-1 bg-[url('/123.jpg')] bg-cover">
            <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                Back
            </Link>

            <div className="bg-white w-full max-w-md rounded-lg shadow-md p-8">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="flex justify-center items-center mr-[44px] text-[20px] font-bold text-[#d98a04] ">
                        <Image src="/2.png" width={70} height={70} alt="Logo" className="mb-4 w-[70px] h-[70px]" />
                        <span>Museum</span>
                    </h1>
                    <p className="text-sm text-[#d98a04]">Register Page</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#d98a04]">Email</label>
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
                        <label htmlFor="password" className="block text-sm font-medium text-[#d98a04]">Password</label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="mt-1 block w-full px-3 py-2 border bg-transparent text-[#ca8a04] border-[#ffbf50] rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-[#d98a04]"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-sm text-red-600" role="alert" aria-live="assertive">{error}</p>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center  py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#d98a04] hover:bg-[#d98a04] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d98a04] disabled:opacity-50"
                    >
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6">
                    <Link href="/login" className="w-full inline-flex justify-center py-2 px-4 rounded-md text-[#d98a04] font-bold text-xs">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    )
}
