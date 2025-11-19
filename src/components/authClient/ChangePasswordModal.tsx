"use client";
import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

interface ChangePasswordModalProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}

interface FormFieldProps {
    label: string;
    id: string;
    type?: "password" | "text";
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    showPassword?: boolean;
    togglePassword?: () => void;
    placeholder?: string;
}

const API_URL = `${process.env.NEXT_PUBLIC_BASE_API}`;

const ChangePasswordModal = ({ openModal, setOpenModal }: ChangePasswordModalProps) => {
    const [loading, setLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.warning("Please fill all fields.");
            return;
        }

        if (newPassword.length < 6) {
            toast.warning("New password must be at least 6 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.warning("New passwords don't match.");
            return;
        }

        if (currentPassword === newPassword) {
            toast.warning("New password must be different from current password.");
            return;
        }

        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            toast.error("No access token found");
            return;
        }

        setLoading(true);

        const passwordData = {
            old_password: currentPassword,
            new_password: newPassword,
            confirm_password: confirmPassword,
        };

        try {
            const response = await axios.post(
                `${API_URL}/users/change-password/`,
                passwordData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (response.status === 200) {
                toast.success(response.data.detail || "Password updated successfully.");
                setOpenModal(false);
                resetForm();
            }
        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const error = err as AxiosError<any>;

            console.error("Error changing password:", error);

            const data = error.response?.data;

            if (data?.detail) {
                toast.error(data.detail);
            } else if (data?.current_password) {
                toast.error(data.current_password[0]);
            } else if (data?.new_password) {
                toast.error(data.new_password[0]);
            } else {
                toast.error("Failed to change password. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
    };

    if (!openModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                onClick={() => setOpenModal(false)}
                className="fixed inset-0 bg-black/70 transition-opacity"
            />

            <div className="bg-white rounded-lg relative w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Lock size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Change Password
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Update your account password
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setOpenModal(false)}
                        type="button"
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <PasswordField
                            label="Current Password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={setCurrentPassword}
                            required
                            showPassword={showCurrentPassword}
                            togglePassword={() => setShowCurrentPassword((p) => !p)}
                            placeholder="Enter your current password"
                        />

                        <PasswordField
                            label="New Password"
                            id="newPassword"
                            value={newPassword}
                            onChange={setNewPassword}
                            required
                            showPassword={showNewPassword}
                            togglePassword={() => setShowNewPassword((p) => !p)}
                            placeholder="Enter new password (min 6 characters)"
                        />

                        <PasswordField
                            label="Confirm New Password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            required
                            showPassword={showConfirmPassword}
                            togglePassword={() => setShowConfirmPassword((p) => !p)}
                            placeholder="Confirm your new password"
                        />

                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                Password Requirements:
                            </p>
                            <ul className="text-xs text-gray-600 space-y-1">
                                <li className="flex items-center gap-2">
                                    <div
                                        className={`w-1.5 h-1.5 rounded-full ${newPassword.length >= 6 ? "bg-green-500" : "bg-gray-400"
                                            }`}
                                    />
                                    At least 6 characters long
                                </li>
                                <li className="flex items-center gap-2">
                                    <div
                                        className={`w-1.5 h-1.5 rounded-full ${newPassword !== currentPassword && currentPassword
                                                ? "bg-green-500"
                                                : "bg-gray-400"
                                            }`}
                                    />
                                    Different from current password
                                </li>
                                <li className="flex items-center gap-2">
                                    <div
                                        className={`w-1.5 h-1.5 rounded-full ${newPassword === confirmPassword && newPassword
                                                ? "bg-green-500"
                                                : "bg-gray-400"
                                            }`}
                                    />
                                    Passwords match
                                </li>
                            </ul>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setOpenModal(false)}
                                className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex-1 px-4 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {loading ? "Updating..." : "Update Password"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const PasswordField = ({
    label,
    id,
    value,
    onChange,
    required,
    showPassword,
    togglePassword,
    placeholder,
}: FormFieldProps) => (
    <div>
        <label htmlFor={id} className="text-sm font-medium text-gray-700 block mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder={placeholder}
                required={required}
            />
            <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    </div>
);

export default ChangePasswordModal;
