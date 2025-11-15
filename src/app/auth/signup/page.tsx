import Image from 'next/image';

const SignUpPage = () => {
    return (
        <div className="min-h-screen grid grid-cols-7">
            {/* LEFT SIDE IMAGE */}
            <div className="col-span-3 lg:flex items-center justify-center bg-[#E2ECF8] p-6">
                <Image
                    src="/signup-page-banner-Photoroom.png"
                    alt="Signup Illustration"
                    width={600}
                    height={600}
                    className="object-contain relative z-0 opacity-80"
                />
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="col-span-4 flex flex-col justify-center px-8 lg:px-20 py-10">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-[#0D224A] mb-2">
                        Create your account
                    </h1>
                    <p className="text-[#4B5563] mb-10">
                        Start managing your tasks efficiently
                    </p>
                </div>

                <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <input
                        type="email"
                        placeholder="Email"
                        className="border w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="border w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="border w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{" "}
                    <a href="/auth/signin" className="text-blue-600 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;