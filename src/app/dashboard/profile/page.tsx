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
        <div className="min-h-screen p-8 bg-white rounded-lg">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Account Information</h1>
                    <hr className='h-0.5 w-3/12 bg-[#5272FF]' />
                </div>

                <div className="bg-white rounded-xl overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Profile Photo Section */}
                            <div className="flex flex-col sm:flex-row items-center gap-1 rounded-xl border border-gray-200 w-1/2 justify-start">
                                <div className="relative p-8">
                                    <div className="w-24 h-24 rounded-full bg-[#9F9F9F] flex items-center justify-start">
                                    </div>
                                    <button
                                        type="button"
                                        className="absolute bottom-8 right-9 bg-[#5272FF] text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Camera size={16} />
                                    </button>
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-white bg-[#5272FF] hover:bg-blue-600 transition-colors"
                                    >
                                        <Upload size={16} />
                                        Upload New Photo
                                    </button>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-6 border border-gray-200 p-6 rounded-xl">
                                {/* Name Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
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
                                    <div>
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
                                <div>
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
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
                                    <div>
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
                                <div>
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
                                <div className="flex flex-col sm:flex-row gap-4 pt-6 w-2/3 mx-auto">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-[#5272FF] text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        className="flex-1 bg-[#8CA3CD] text-white py-3 px-6 rounded-lg font-semibold border border-gray-300 hover:bg-[#9F9F9F] transition-colors"
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