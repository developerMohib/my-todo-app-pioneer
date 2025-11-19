"use client"
import { useState } from "react";
import ChangePasswordModal from "@/components/authClient/ChangePasswordModal";

export default function DashboardPage() {
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h1>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Security</h2>
            <p className="text-gray-600">Manage your account security</p>
          </div>
        </div>

        <button
          onClick={() => setChangePasswordModal(true)}
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Change Password
        </button>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> After changing your password, you&apos;ll need to login again on other devices.
          </p>
        </div>
      </div>

      <ChangePasswordModal
        openModal={changePasswordModal}
        setOpenModal={setChangePasswordModal}
      />
    </div>
  );
}
