"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    document.cookie =
      "adminAuthorized=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push("/login");
  };

  return (
    <main className="h-screen overflow-hidden bg-green-50">

      <div className="flex h-screen overflow-hidden">

        {/* ================= SIDEBAR ================= */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col overflow-hidden bg-cover bg-center bg-no-repeat text-white transition-transform duration-300 lg:relative lg:translate-x-0 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          style={{
            backgroundImage: "url('/images/gallery/hero-bird-bg.png')",
          }}
        >

          {/* Sidebar content */}
          <div className="relative z-10 flex h-full flex-col">

            {/* Logo */}
            <div className="flex items-center gap-3 border-b border-green-800 px-5 py-6">

              <img
                src="/images/logo.png"
                alt="Maa Foundation Logo"
                className="h-12 w-12 rounded-full bg-white object-contain"
              />

              <div>
                <h1 className="font-bold">
                  Maa Foundation
                </h1>

                <p className="text-xs text-green-200">
                  Admin Panel
                </p>
              </div>

            </div>


            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">

              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-green-300">
                Main Menu
              </p>

              <div className="space-y-2">

                {/* Dashboard */}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-xl bg-green-800 px-4 py-3 font-semibold"
                >
                  <img
                    src="/images/icons/dashboard.jpg"
                    alt="Dashboard"
                    className="h-6 w-6 object-contain"
                  />
                  Dashboard
                </Link>


                {/* Bird Reports */}
                <Link
                  href="/dashboard/reports"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-green-100 transition hover:bg-green-900"
                >
                  <img
                    src="/images/icons/release.png"
                    alt="Bird Reports"
                    className="h-6 w-6 object-contain"
                  />
                  Bird Reports
                </Link>


                {/* Birds Under Care */}
                <Link
                  href="/dashboard/care"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-green-100 transition hover:bg-green-900"
                >
                  <img
                    src="/images/icons/our services.png"
                    alt="Bird Care"
                    className="h-6 w-6 object-contain"
                  />
                  Birds Under Care
                </Link>


                {/* Volunteers */}
                <Link
                  href="/dashboard/volunteers"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-green-100 transition hover:bg-green-900"
                >
                  <img
                    src="/images/icons/volunteer.png"
                    alt="Volunteers"
                    className="h-6 w-6 object-contain"
                  />
                  Volunteers
                </Link>


                {/* Gallery */}
                <Link
                  href="/dashboard/gallery"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-green-100 transition hover:bg-green-900"
                >
                  <img
                    src="/images/icons/gallery.png"
                    alt="Gallery"
                    className="h-6 w-6 object-contain"
                  />
                  Gallery
                </Link>


                {/* Messages */}
                <Link
                  href="/dashboard/messages"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-green-100 transition hover:bg-green-900"
                >
                  <img
                    src="/images/icons/messages.png"
                    alt="Messages"
                    className="h-6 w-6 object-contain"
                  />
                  Messages
                </Link>

              </div>


              {/* Settings */}
              <div className="mt-8 border-t border-green-800 pt-6">

                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-green-300">
                  Other
                </p>

                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-green-100 transition hover:bg-green-900"
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


            {/* Logout */}
            <div className="border-t border-green-800 p-4">

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-green-100 transition hover:bg-green-900"
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

        {mobileMenuOpen && (
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          />
        )}


        {/* ================= MAIN CONTENT ================= */}
        <section className="h-screen min-w-0 flex-1 overflow-y-auto">

          {/* Top Header */}
          <header className="border-b border-green-100 bg-white px-6 py-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="rounded-lg bg-green-800 px-3 py-2 text-xl text-white lg:hidden"
                >
                  ☰
                </button>

                <h2 className="text-2xl font-bold text-green-950">
                  Dashboard Overview
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  Manage Maa Foundation activities from here.
                </p>

              </div>


              <div className="hidden items-center gap-3 sm:flex">

                <div className="text-right">

                  <p className="font-semibold text-green-950">
                    Admin
                  </p>

                  <p className="text-xs text-gray-500">
                    Maa Foundation
                  </p>

                </div>


                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 font-bold text-green-800">
                  A
                </div>

              </div>

            </div>

          </header>


          {/* Dashboard Content */}
          <div className="px-6 py-8">


            {/* ================= WELCOME ================= */}

            <div
              className="relative overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat p-8 text-white shadow-sm"
              style={{
                backgroundImage:
                  "url('/images/gallery/hero-bird-bg.png')",
              }}
            >

              <div className="relative z-10">

                <h3 className="text-2xl font-bold">
                  Welcome to Maa Foundation Admin Panel
                </h3>

                <p className="mt-2 max-w-2xl text-green-100">
                  Manage injured bird reports, care records, volunteers,
                  gallery content and community messages.
                </p>

              </div>

            </div>


            {/* ================= STAT CARDS ================= */}

            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">


              {/* Total Bird Reports */}
              <Link
                href="/dashboard/reports"
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">

                  <img
                    src="/images/icons/release.png"
                    alt="Bird Reports"
                    className="h-7 w-7 object-contain"
                  />

                </div>


                <p className="text-sm text-gray-500">
                  Total Bird Reports
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-950">
                  0
                </h3>

                <p className="mt-2 text-xs font-medium text-green-700">
                  View bird reports →
                </p>

              </Link>


              {/* Birds Under Care */}
              <Link
                href="/dashboard/care"
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">

                  <img
                    src="/images/icons/our services.png"
                    alt="Birds Under Care"
                    className="h-7 w-7 object-contain"
                  />

                </div>


                <p className="text-sm text-gray-500">
                  Birds Under Care
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-950">
                  0
                </h3>

                <p className="mt-2 text-xs font-medium text-green-700">
                  View birds under care →
                </p>

              </Link>


              {/* Recovered Birds */}
              <Link
                href="/dashboard/gallery"
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">

                  <img
                    src="/images/icons/h1.png"
                    alt="Recovered Birds"
                    className="h-7 w-7 object-contain"
                  />

                </div>


                <p className="text-sm text-gray-500">
                  Recovered Birds
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-950">
                  0
                </h3>

                <p className="mt-2 text-xs font-medium text-green-700">
                  View gallery →
                </p>

              </Link>


              {/* Volunteers */}
              <Link
                href="/dashboard/volunteers"
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">

                  <img
                    src="/images/icons/volunteer.png"
                    alt="Volunteers"
                    className="h-7 w-7 object-contain"
                  />

                </div>


                <p className="text-sm text-gray-500">
                  Volunteers
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-950">
                  0
                </h3>

                <p className="mt-2 text-xs font-medium text-green-700">
                  Manage volunteers →
                </p>

              </Link>

            </div>


            {/* ================= QUICK ACTIONS ================= */}

            <div className="mt-8">

              <h3 className="text-xl font-bold text-green-950">
                Quick Actions
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Quickly access important sections of the admin panel.
              </p>


              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">


                {/* Reports */}
                <Link
                  href="/dashboard/reports"
                  className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >

                  <img
                    src="/images/icons/release.png"
                    alt="Reports"
                    className="h-8 w-8 object-contain"
                  />

                  <h4 className="mt-4 font-bold text-green-950">
                    Bird Reports
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    Check injured bird reports.
                  </p>

                </Link>


                {/* Care */}
                <Link
                  href="/dashboard/care"
                  className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >

                  <img
                    src="/images/icons/our services.png"
                    alt="Bird Care"
                    className="h-8 w-8 object-contain"
                  />

                  <h4 className="mt-4 font-bold text-green-950">
                    Bird Care
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage birds under care.
                  </p>

                </Link>


                {/* Volunteers */}
                <Link
                  href="/dashboard/volunteers"
                  className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >

                  <img
                    src="/images/icons/volunteer.png"
                    alt="Volunteers"
                    className="h-8 w-8 object-contain"
                  />

                  <h4 className="mt-4 font-bold text-green-950">
                    Volunteers
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage registered volunteers.
                  </p>

                </Link>


                {/* Messages */}
                <Link
                  href="/dashboard/messages"
                  className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >

                  <img
                    src="/images/icons/messages.png"
                    alt="Messages"
                    className="h-8 w-8 object-contain"
                  />

                  <h4 className="mt-4 font-bold text-green-950">
                    Messages
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    Check community messages.
                  </p>

                </Link>

              </div>

            </div>


            {/* ================= RECENT REPORTS ================= */}

            <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-xl font-bold text-green-950">
                    Recent Bird Reports
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Latest reports submitted by users.
                  </p>

                </div>


                <Link
                  href="/dashboard/reports"
                  className="rounded-full bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  View All
                </Link>

              </div>


              <div className="mt-6 rounded-xl border border-dashed border-green-200 bg-green-50 p-8 text-center">

                <p className="font-semibold text-green-800">
                  No reports yet
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Bird reports will appear here after backend integration.
                </p>

                <Link
                  href="/dashboard/reports"
                  className="mt-4 inline-block rounded-full bg-green-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  Go to Reports
                </Link>

              </div>

            </div>


          </div>

        </section>

      </div>

    </main>
  );
}