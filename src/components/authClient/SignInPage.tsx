
import Image from 'next/image';
import Link from 'next/link';

const SignInPage = () => {
    return (
        <div className="min-h-screen grid grid-cols-7">
            {/* LEFT SIDE IMAGE */}
            <div className="col-span-3 lg:flex items-center justify-center bg-[#E2ECF8] p-6">
                <Image
                    src="/signin-page-banner-Photoroom.png"
                    alt="Signup Illustration"
                    width={600}
                    height={600}
                    className="object-contain relative z-0 opacity-80"
                />
            </div>

            {/* RIGHT SIDE FORM signup-banner-Photoroom.png*/}
            <div className="col-span-4 flex flex-col justify-center px-8 lg:px-20 py-10 w-4/5 mx-auto">
                <div className='text-center'>
                    <h1 className="text-3xl font-bold text-[#0D224A] mb-2">
                    Log in to your account
                </h1>
                <p className="text-[#4B5563] mb-10">
                    Start managing your tasks efficiently
                </p>
                </div>

                <form className="space-y-4">
                    <div>
                        <label className='text-[#0C0C0C]' >Email </label>
                        <input
                            type="email"
                            placeholder='Enter Your Email'
                            className="border border-gray-300 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-[#8CA3CD]"
                        />
                    </div>

                    <div>
                        <label className='text-[#0C0C0C]' >Password </label>
                        <input
                            type="password"
                            placeholder='Enter Your Password'
                            className="border border-gray-300 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-[#8CA3CD]"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-[#0C0C0C]">
                                Remember Me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link href="#" className="text-[#5272FF] hover:text-blue-500">
                                Forgot Your Password?
                            </Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#5272FF] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Log In
                    </button>
                </form>

                <p className="mt-6 text-center text-[#4B5563] text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/" className="text-blue-600 hover:underline">
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignInPage;