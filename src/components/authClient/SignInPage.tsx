"use client";
import { signInUser } from '@/services/AuthService/signin';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface FormData {
    email: string;
    password: string;
    rememberMe: boolean;
}


const SignInPage = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        rememberMe: false
    });
    const router = useRouter();

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        const data = { email: formData.email, password: formData.password };
        try {
            setLoading(true)
            const res = await signInUser(data);
            if (res.success) {
                toast.success(res.message)
                router.push('/dashboard')
            }

            if (!res.success) {
                setErrorMessage(res.message);
                return;
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    };





    return (
        <div className="min-h-screen md:grid grid-cols-7 md:gap-4 gap-0">
            {/* LEFT SIDE IMAGE */}
            <div className="col-span-3 lg:flex items-center justify-center bg-[#E2ECF8] md:block hidden">
                <Image
                    src="/signin-page-banner-Photoroom.png"
                    alt="Signup Illustration"
                    width={600}
                    height={600}
                    className="object-cover relative z-0 opacity-80"
                    priority
                    loading="eager"
                />
            </div>

            {/* RIGHT SIDE FORM signup-banner-Photoroom.png*/}
            <div className="col-span-4 flex flex-col justify-center px-8 lg:px-20 py-10 items-center mx-auto h-screen">
                <div className='text-center'>
                    <h1 className="text-3xl font-bold text-[#0D224A] mb-2">
                        Log in to your account
                    </h1>
                    <p className="text-[#4B5563] mb-10">
                        Start managing your tasks efficiently
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
                    <div>
                        {errorMessage && (
                            <p className="bg-red-100 text-red-700 p-2 rounded text-sm">{errorMessage}</p>
                        )}
                        <label className='text-[#0C0C0C]'>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Enter Your Email'
                            className="border border-gray-300 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-[#8CA3CD]"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className='text-[#0C0C0C]'>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Enter Your Password'
                            className="border border-gray-300 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-[#8CA3CD]"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="rememberMe"
                                type="checkbox"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                disabled={loading}
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-[#0C0C0C]">
                                Remember Me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link href="/forgot-password" className="text-[#5272FF] hover:text-blue-500">
                                Forgot Your Password?
                            </Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#5272FF] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in..." : "Log in"}
                    </button>
                </form>

                <p className="mt-6 text-center text-[#4B5563] text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-blue-600 hover:underline">
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignInPage;