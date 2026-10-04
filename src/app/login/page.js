"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();

        setError("");

        // Default admin credentials
        const defaultEmail = "admin@maafoundation.org";
        const defaultPassword = "Maa@1234";

        // Get saved profile from Settings
        const savedProfile = localStorage.getItem(
            "maaFoundationProfile"
        );

        let adminEmail = defaultEmail;

        if (savedProfile) {
            try {
                const profile = JSON.parse(savedProfile);

                if (profile.email) {
                    adminEmail = profile.email;
                }
            } catch (error) {
                console.log("Profile data error");
            }
        }

        // Get saved password from Settings
        const savedPassword =
            localStorage.getItem(
                "maaFoundationPassword"
            ) || defaultPassword;

        // Check login
        if (
            email.trim() === adminEmail &&
            password === savedPassword
        ) {
            // Save admin authorization
            document.cookie =
                "adminAuthorized=true; path=/";

            // Open dashboard
            router.push("/dashboard");
        } else {
            setError("Invalid email or password.");
        }
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">

            {/* Background Image */}
            <div
                className="absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        "url('/images/gallery/hero-bird-bg.png')",
                }}
            ></div>

            {/* Light Background Effect */}
            <div className="absolute inset-0 bg-white/20"></div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/60 bg-white/95 p-8 shadow-2xl backdrop-blur-sm">

                {/* Logo */}
                <div className="mb-6 flex justify-center">
                    <img
                        src="/images/logo.png"
                        alt="Maa Foundation Logo"
                        className="h-32 w-32 object-contain"
                    />
                </div>

                {/* Heading */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-green-950">
                        Admin Login
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Maa Foundation Administration
                    </p>
                </div>

                {/* Login Form */}
                <form
                    onSubmit={handleLogin}
                    className="mt-8 space-y-5"
                >

                    {/* Email */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-green-950">
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter admin email"
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-green-950">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter password"
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            required
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                            {error}
                        </p>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-green-700 px-5 py-3.5 font-semibold text-white shadow-md transition hover:bg-green-800 hover:shadow-lg"
                    >
                        Login to Dashboard
                    </button>

                </form>

                {/* Footer Text */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Admin access only
                </p>

            </div>
        </main>
    );
}