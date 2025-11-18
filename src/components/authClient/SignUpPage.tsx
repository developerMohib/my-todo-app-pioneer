/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
// import { signUpUser } from '@/services/AuthService';
// import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

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

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (validateForm()) {

    //         console.log(formData);

    //         const res = await signUpUser(formData)
    //         if (res?.success) {
    //             toast.success(res?.message);
    //             router.push("/signin");
    //         } else {

    //             // if (publicId) {
    //             //     await deleteImageFromCloudinary(publicId);
    //             // }
    //             toast.error(res?.message);
    //         }

    //         // Form is valid, proceed with submission
    //         console.log('Form submittedsss:', formData);
    //     }
    // };

    //     const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     if (validateForm()) {

    //         // Convert Object → FormData
    //         // const fd = new FormData();
    //         // fd.append("first_name", formData.firstName);
    //         // fd.append("last_name", formData.lastName);
    //         // fd.append("email", formData.email);
    //         // fd.append("password", formData.password);

    //         // যদি confirmPassword দরকার না হয় backend-এ, পাঠাবে না
    //         // fd.append("confirmPassword", formData.confirmPassword);

    //         // console.log(fd);


    //         // const res = await signUpUser(fd);
    //         const res = await signUpUser({
    //             first_name: formData?.firstName,
    //             last_name: formData?.lastName,
    //             email: formData?.email,
    //             password: formData?.password
    //         });

    //         if (res?.success) {
    //             toast.success(res?.message);
    //             router.push("/signin");
    //         } else {
    //             toast.error(res?.message);
    //         }

    //         console.log("Final FormData Sent:", fd);
    //     }
    // };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     if (!validateForm()) return;

    //     // Convert Object → FormData
    //     const fd = new FormData();
    //     fd.append("first_name", formData.firstName);
    //     fd.append("last_name", formData.lastName);
    //     fd.append("email", formData.email);
    //     fd.append("password", formData.password);

    //     // যদি confirmPassword backend-এ না লাগে, append করো না
    //     // fd.append("confirmPassword", formData.confirmPassword);

    //     console.log("FormData to send:", ...fd);

    //     // Call signup function
    //     const res = await signUpUser(fd);

    //     if (res?.success) {
    //         toast.success(res.message);
    //         router.push("/signin");
    //     } else {
    //         toast.error(res.message);
    //     }
    // };

    //     const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     if (!validateForm()) return;

    //     // 🚀 Postman-এর মতো FormData তৈরি করো
    //     const fd = new FormData();
    //     fd.append("first_name", formData.firstName);  // SAME KEY NAME as POSTMAN
    //     fd.append("last_name", formData.lastName);
    //     fd.append("email", formData.email);
    //     fd.append("password", formData.password);

    //     console.log("Sending FormData:", [...fd.entries()]);

    //     // API Call
    //     const res = await signUpUser(fd);

    //     if (res?.success) {
    //         toast.success(res.message);
    //         router.push("/signin");
    //     } else {
    //         toast.error(res.message);
    //     }
    // };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     if (!validateForm()) return;

    //     // const fd = new FormData();
    //     // fd.append("first_name", formData.firstName);
    //     // fd.append("last_name", formData.lastName);
    //     // fd.append("email", formData.email);
    //     // fd.append("password", formData.password);

    //     const res = await signUpUser(formData);

    //     console.log(res);


    //     if (res?.success) {
    //         toast.success(res.message);
    //         router.push("/signin");
    //     } else {
    //         toast.error(res.message);
    //     }
    // };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     if (!validateForm()) return;

    //     try {

    //         const data = {
    //             first_name: formData.firstName,
    //             last_name: formData.lastName,
    //             email: formData.email,
    //             password: formData.password
    //         };

    //         console.log(data);


    //         const res = await signUpUser(data);
    //         console.log("Response:", res);

    //         if (res?.success) {
    //             toast.success(res.message);
    //             router.push("/signin");
    //         } else {
    //             toast.error(res.message);
    //         }
    //     } catch (error: any) {
    //         console.error("Submission error:", error);
    //         toast.error("Signup failed: " + error.message);
    //     }
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        console.log(formData);
        

        // try {
        //     const data = {
        //         first_name: formData.firstName,
        //         last_name: formData.lastName,
        //         email: formData.email,
        //         password: formData.password
        //     };

        //     console.log("Final Data Sent:", data);

        //     const res = await signUpUser(data);
        //     console.log("Response:", res);

        //     if (res?.success) {
        //         toast.success(res.message);
        //         router.push("/signin");
        //     } else {
        //         toast.error(res.message);
        //     }
        // } catch (error: any) {
        //     console.error("Submission error:", error);
        //     toast.error("Signup failed: " + error.message);
        // }
    };


    return (
        <div className="min-h-screen md:grid grid-cols-7">
            {/* LEFT SIDE IMAGE */}
            <div className="col-span-3 lg:flex items-center justify-center bg-[#E2ECF8] md:p-6 md:block hidden ">
                <Image
                    src="/signup-banner-Photoroom.png"
                    alt="Signup Illustration"
                    width={600}
                    height={600}
                    className="object-cover relative z-0 opacity-80"
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
                        {formData.password && (<span
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute right-3 top-8 cursor-pointer text-gray-500 hover:text-gray-700'
                        >
                            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </span>)}
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    <div className='relative'>
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
                        className="w-full bg-[#5272FF] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Sign Up
                    </button>
                </form>


                <p className="mt-6 text-center text-[#4B5563] text-sm">
                    Already have an account?{" "}
                    <Link href="/signin" className="text-blue-600 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;