"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const validateForm = () => {
        const newErrors = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        // Important: IF POSSIBLE TO CREATE BOUNDARY TO HANDLE FORM VALIDATION ERRORS FROM FRONTEND, THEN WHY NEED TO SEND TO BACKEND FOR VALIDATION AGAIN?

        // Name validation - only letters and spaces allowed
        const nameRegex = /^[A-Za-z\s]+$/;

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'Please enter a valid name format.';
        } else if (!nameRegex.test(formData.firstName)) {
            newErrors.firstName = 'Please enter a valid name format.';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Please enter a valid name format.';
        } else if (!nameRegex.test(formData.lastName)) {
            newErrors.lastName = 'Please enter a valid name format.';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Please enter a valid email address.';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = '4 characters minimum.';
        } else if (formData.password.length < 4) {
            newErrors.password = '4 characters minimum.';
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password.';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Form is valid, proceed with submission
            console.log('Form submitted:', formData);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-7">
            {/* LEFT SIDE IMAGE */}
            <div className="col-span-3 lg:flex items-center justify-center bg-[#E2ECF8] p-6">
                <Image
                    src="/signup-banner-Photoroom.png"
                    alt="Signup Illustration"
                    width={600}
                    height={600}
                    className="object-contain relative z-0 opacity-80"
                    priority
                    loading="eager"
                />
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="col-span-4 flex flex-col justify-center px-8 py-10 w-4/5 mx-auto">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-[#0D224A] mb-2">
                        Create your account
                    </h1>
                    <p className="text-[#4B5563] mb-10">
                        Start managing your tasks efficiently
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className='text-[#0C0C0C]'>First Name</label>
                            <input
                                name="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={`border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-1 ${errors.firstName
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                            )}
                        </div>
                        <div>
                            <label className='text-[#0C0C0C]'>Last Name</label>
                            <input
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={`border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-1 ${errors.lastName
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className='text-[#0C0C0C]'>Email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-1 ${errors.email
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-blue-500'
                                }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div className='relative'>
                        <label className='text-[#0C0C0C]'>Password</label>
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            className={`border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-1 pr-10 ${errors.password
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-blue-500'
                                }`}
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute right-3 top-8 cursor-pointer text-gray-500 hover:text-gray-700'
                        >
                            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </span>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    <div>
                        <label className='text-[#0C0C0C]'>Confirm Password</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-1 ${errors.confirmPassword
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-blue-500'
                                }`}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

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