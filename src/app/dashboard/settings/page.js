"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Mobile Menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Admin Profile
  const [adminName, setAdminName] = useState("Admin");
  const [adminEmail, setAdminEmail] = useState(
    "admin@maafoundation.org"
  );

  // Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Messages
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  /* ================= LOAD SAVED DATA ================= */

  useEffect(() => {
    const savedProfile = localStorage.getItem("maaFoundationProfile");

    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);

        if (profile.name) {
          setAdminName(profile.name);
        }

        if (profile.email) {
          setAdminEmail(profile.email);
        }
      } catch (error) {
        console.log("Profile data error");
      }
    }
  }, []);

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    document.cookie =
      "adminAuthorized=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push("/login");
  };

  /* ================= SAVE PROFILE ================= */

  const handleSaveProfile = () => {
    setProfileMessage("");

    if (!adminName.trim() || !adminEmail.trim()) {
      setProfileMessage("Please enter name and email.");
      return;
    }

    localStorage.setItem(
      "maaFoundationProfile",
      JSON.stringify({
        name: adminName,
        email: adminEmail,
      })
    );

    setProfileMessage("Profile saved successfully.");

    setTimeout(() => {
      setProfileMessage("");
    }, 3000);
  };

  /* ================= UPDATE PASSWORD ================= */

  const handleUpdatePassword = () => {
    setPasswordMessage("");

    if (!currentPassword || !newPassword) {
      setPasswordMessage("Please enter both passwords.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage(
        "New password must be at least 6 characters."
      );
      return;
    }

    // Default password
    const defaultPassword = "Maa@1234";

    // New separate storage key
    const savedPassword =
      localStorage.getItem("maaFoundationPassword") ||
      defaultPassword;

    // Check current password
    if (currentPassword !== savedPassword) {
      setPasswordMessage("Current password is incorrect.");
      return;
    }

    // Save new password
    localStorage.setItem(
      "maaFoundationPassword",
      newPassword
    );

    setCurrentPassword("");
    setNewPassword("");

    setPasswordMessage("Password updated successfully.");

    setTimeout(() => {
      setPasswordMessage("");
    }, 3000);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-green-50">
      <div className="relative flex min-h-screen">

        {/* ================= SIDEBAR ================= */}

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col overflow-hidden bg-cover bg-center bg-no-repeat text-white transition-transform duration-300 lg:sticky lg:top-0 lg:z-20 lg:translate-x-0 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{
            backgroundImage:
              "url('/images/gallery/hero-bird-bg.png')",
          }}
        >
          {/* Sidebar Content */}

          <div className="relative z-10 flex h-full flex-col">

            {/* Logo and Mobile Close Button */}

            <div className="flex items-center justify-between gap-3 border-b border-green-800 px-5 py-6">
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src="/images/logo.png"
                  alt="Maa Foundation Logo"
                  className="h-12 w-12 shrink-0 rounded-full bg-white object-contain"
                />

                <div>
                  <h1 className="font-bold">Maa Foundation</h1>

                  <p className="text-xs text-green-200">
                    Admin Panel
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close navigation menu"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-2xl text-white transition hover:bg-green-700 lg:hidden"
              >
                ×
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-6">

              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-green-300">
                Main Menu
              </p>

              <div className="space-y-2">

                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-green-100 transition hover:bg-green-700"
                >
                  <img
                    src="/images/icons/dashboard.jpg"
                    alt="Dashboard"
                    className="h-6 w-6 object-contain"
                  />

                  Dashboard
                </Link>

                <Link
                  href="/dashboard/reports"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-green-100 transition hover:bg-green-700"
                >
                  <img
                    src="/images/icons/release.png"
                    alt="Bird Reports"
                    className="h-6 w-6 object-contain"
                  />

                  Bird Reports
                </Link>

                <Link
                  href="/dashboard/care"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-green-100 transition hover:bg-green-700"
                >
                  <img
                    src="/images/icons/our services.png"
                    alt="Bird Care"
                    className="h-6 w-6 object-contain"
                  />

                  Birds Under Care
                </Link>

                <Link
                  href="/dashboard/volunteers"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-green-100 transition hover:bg-green-700"
                >
                  <img
                    src="/images/icons/volunteer.png"
                    alt="Volunteers"
                    className="h-6 w-6 object-contain"
                  />

                  Volunteers
                </Link>

                <Link
                  href="/dashboard/gallery"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-green-100 transition hover:bg-green-700"
                >
                  <img
                    src="/images/icons/gallery.png"
                    alt="Gallery"
                    className="h-6 w-6 object-contain"
                  />

                  Gallery
                </Link>

                <Link
                  href="/dashboard/messages"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-green-100 transition hover:bg-green-700"
                >
                  <img
                    src="/images/icons/messages.png"
                    alt="Messages"
                    className="h-6 w-6 object-contain"
                  />

                  Messages
                </Link>

              </div>

              <div className="mt-8 border-t border-green-800 pt-6">

                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-green-300">
                  Other
                </p>

                <Link
                  href="/dashboard/settings"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl bg-green-800 px-4 py-3 font-semibold text-white"
                >
                  <img
                    src="/images/icons/setting.jpg"
                    alt="Settings"
                    className="h-6 w-6 object-contain"
                  />

                  Settings
                </Link>

              </div>

            </nav>

            <div className="border-t border-green-800 p-4">

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-green-100 transition hover:bg-green-700"
              >
                <img
                  src="/images/icons/logout.jpg"
                  alt="Logout"
                  className="h-6 w-6 object-contain"
                />

                Logout
              </button>

            </div>

          </div>
        </aside>

        {/* ================= MOBILE MENU BACKDROP ================= */}

        {mobileMenuOpen && (
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMobileMenu}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          />
        )}

        {/* ================= MAIN CONTENT ================= */}

        <section className="min-h-screen min-w-0 flex-1">

          {/* Header */}

          <header className="border-b border-green-100 bg-white px-4 py-5 shadow-sm sm:px-6">

            <div className="flex items-start gap-3">

              {/* Mobile Hamburger Button */}

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-800 text-2xl text-white transition hover:bg-green-900 lg:hidden"
              >
                ☰
              </button>

              <div className="min-w-0">
                <h2 className="text-2xl font-bold text-green-950">
                  Settings
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  Manage your admin profile and dashboard preferences.
                </p>
              </div>

            </div>

          </header>

          {/* Content */}

          <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">

            {/* Admin Profile */}

            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">

              <h3 className="text-xl font-bold text-green-950">
                Admin Profile
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Update your administrator information.
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Admin Name
                  </label>

                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) =>
                      setAdminName(e.target.value)
                    }
                    className="w-full min-w-0 rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) =>
                      setAdminEmail(e.target.value)
                    }
                    className="w-full min-w-0 rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />
                </div>

              </div>

              <div className="flex flex-wrap items-center gap-3">

                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="mt-6 rounded-full bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  Save Profile
                </button>

                {profileMessage && (
                  <p className="mt-6 break-words text-sm font-semibold text-green-700">
                    {profileMessage}
                  </p>
                )}

              </div>

            </div>

            {/* Password */}

            <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm sm:p-6">

              <h3 className="text-xl font-bold text-green-950">
                Change Password
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Update your administrator account password.
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-2">

                {/* Current Password */}

                <div className="min-w-0">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Current Password
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showCurrentPassword
                          ? "text"
                          : "password"
                      }
                      value={currentPassword}
                      onChange={(e) =>
                        setCurrentPassword(e.target.value)
                      }
                      placeholder="Enter current password"
                      className="w-full min-w-0 rounded-xl border border-gray-200 px-4 py-3 pr-20 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(
                          !showCurrentPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-green-700 hover:text-green-900"
                    >
                      {showCurrentPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>
                </div>

                {/* New Password */}

                <div className="min-w-0">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    New Password
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showNewPassword
                          ? "text"
                          : "password"
                      }
                      value={newPassword}
                      onChange={(e) =>
                        setNewPassword(e.target.value)
                      }
                      placeholder="Enter new password"
                      className="w-full min-w-0 rounded-xl border border-gray-200 px-4 py-3 pr-20 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowNewPassword(
                          !showNewPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-green-700 hover:text-green-900"
                    >
                      {showNewPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>
                </div>

              </div>

              <div className="flex flex-wrap items-center gap-3">

                <button
                  type="button"
                  onClick={handleUpdatePassword}
                  className="mt-6 rounded-full border-2 border-green-700 px-5 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-50"
                >
                  Update Password
                </button>

                {passwordMessage && (
                  <p
                    className={`mt-6 break-words text-sm font-semibold ${
                      passwordMessage.includes("successfully")
                        ? "text-green-700"
                        : "text-red-600"
                    }`}
                  >
                    {passwordMessage}
                  </p>
                )}

              </div>

            </div>

            {/* Notifications */}

            <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm sm:p-6">

              <h3 className="text-xl font-bold text-green-950">
                Notifications
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Choose which notifications you want to receive.
              </p>

              <div className="mt-6 space-y-5">

                {/* Notification Toggle */}

                <div className="flex items-center justify-between gap-4">

                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800">
                      Dashboard Notifications
                    </p>

                    <p className="text-sm text-gray-500">
                      Receive notifications for new reports and messages.
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label="Toggle dashboard notifications"
                    aria-pressed={notifications}
                    onClick={() =>
                      setNotifications(!notifications)
                    }
                    className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                      notifications
                        ? "bg-green-700"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                        notifications
                          ? "left-6"
                          : "left-1"
                      }`}
                    />
                  </button>

                </div>

                {/* Email Toggle */}

                <div className="flex items-center justify-between gap-4">

                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800">
                      Email Alerts
                    </p>

                    <p className="text-sm text-gray-500">
                      Receive important alerts through email.
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label="Toggle email alerts"
                    aria-pressed={emailAlerts}
                    onClick={() =>
                      setEmailAlerts(!emailAlerts)
                    }
                    className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                      emailAlerts
                        ? "bg-green-700"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                        emailAlerts
                          ? "left-6"
                          : "left-1"
                      }`}
                    />
                  </button>

                </div>

              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}