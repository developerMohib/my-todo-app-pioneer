'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'



export default function NotFound() {
    const router = useRouter()

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="max-w-xl w-full text-center py-16">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-50 mb-6">
                    <svg
                        className="w-12 h-12 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
                    </svg>
                </div>

                <h1 className="text-4xl font-semibold text-gray-900 mb-2">Page not found</h1>
                <p className="text-gray-600 mb-8">
                    We couldn&apos;t find the page you were looking for. It may have been removed or the URL may be incorrect.
                </p>

                <div className="flex items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Go home
                    </Link>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        Go back
                    </button>
                </div>
            </div>
        </main>
    )
}