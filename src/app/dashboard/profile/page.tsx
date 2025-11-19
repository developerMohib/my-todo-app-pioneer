"use client";
import { useState } from 'react';
import { Camera, Upload } from 'lucide-react';

export default function ProfileDashboard() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        contactNumber: '',
        birthday: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Profile updated:', formData);
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Account Information</h1>
                    <hr className='h-0.5 w-full sm:w-3/12 bg-[#5272FF] mt-2' />
                </div>

                <div className="bg-white rounded-xl w-full">
                    <div className="w-full p-4 sm:p-6 lg:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                            {/* Profile Photo Section */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-xl border border-gray-200 w-full sm:w-1/2 p-4 sm:p-6">
                                <div className="relative">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#9F9F9F] flex items-center justify-center">
                                    </div>
                                    <button
                                        type="button"
                                        className="absolute -bottom-1 -right-1 sm:bottom-2 sm:right-2 bg-[#5272FF] text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Camera size={14} className="sm:size-4" />
                                    </button>
                                </div>

                                <div className="flex-1 text-center sm:text-left w-full sm:w-auto">
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-white bg-[#5272FF] hover:bg-blue-600 transition-colors w-full sm:w-auto"
                                    >
                                        <Upload size={16} />
                                        Upload New Photo
                                    </button>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-6 border border-gray-200 p-4 sm:p-6 rounded-xl">
                                {/* Name Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-[#0C0C0C] mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-[#0C0C0C] mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-[#0C0C0C] mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                                    />
                                </div>

                                {/* Address & Contact Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-[#0C0C0C] mb-2">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-[#0C0C0C] mb-2">
                                            Contact Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="contactNumber"
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Birthday */}
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-[#0C0C0C] mb-2">
                                        Birthday
                                    </label>
                                    <input
                                        type="date"
                                        name="birthday"
                                        value={formData.birthday}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 w-full sm:w-2/3 mx-auto">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-[#5272FF] text-white py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        className="flex-1 bg-[#8CA3CD] text-white py-3 px-4 sm:px-6 rounded-lg font-semibold border border-gray-300 hover:bg-[#9F9F9F] transition-colors text-sm sm:text-base"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}