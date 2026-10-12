"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const volunteers = [
  {
    id: "V-001",
    name: "Aarav Sharma",
    phone: "+91 9876543210",
    email: "aarav@example.com",
    area: "Andheri",
    status: "Active",
  },
  {
    id: "V-002",
    name: "Priya Patel",
    phone: "+91 9876543211",
    email: "priya@example.com",
    area: "Marol",
    status: "Active",
  },
  {
    id: "V-003",
    name: "Rohan Mehta",
    phone: "+91 9876543212",
    email: "rohan@example.com",
    area: "Andheri East",
    status: "Inactive",
  },
];

export default function VolunteersPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    document.cookie =
      "adminAuthorized=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push("/login");
  };

  const filteredVolunteers = volunteers.filter((volunteer) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      volunteer.id.toLowerCase().includes(searchText) ||
      volunteer.name.toLowerCase().includes(searchText) ||
      volunteer.phone.toLowerCase().includes(searchText) ||
      volunteer.email.toLowerCase().includes(searchText) ||
      volunteer.area.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      volunteer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalVolunteers = volunteers.length;

  const activeVolunteers = volunteers.filter(
    (volunteer) => volunteer.status === "Active"
  ).length;

  const serviceAreas = new Set(
    volunteers.map((volunteer) => volunteer.area)
  ).size;

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-green-50">
      <div className="relative flex min-h-screen">

        {/* ================= SIDEBAR ================= */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col overflow-hidden bg-cover bg-center bg-no-repeat text-white transition-transform duration-300 lg:sticky lg:top-0 lg:z-20 lg:translate-x-0 ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
          style={{
            backgroundImage:
              "url('/images/gallery/hero-bird-bg.png')",
          }}
        >
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

              {/* Mobile Close Button */}
              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close sidebar"
                className="ml-auto rounded-lg px-2 py-1 text-2xl text-white hover:bg-green-800 lg:hidden"
              >
                ×
              </button>
            </div>

            {/* Navigation */}
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
                  className="flex items-center gap-3 rounded-xl bg-green-800 px-4 py-3 font-semibold text-white"
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

              {/* Settings */}
              <div className="mt-8 border-t border-green-800 pt-6">

                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-green-300">
                  Other
                </p>

                <Link
                  href="/dashboard/settings"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-green-100 transition hover:bg-green-700"
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

        {/* Mobile Background Overlay */}
        {mobileMenuOpen && (
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMobileMenu}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          />
        )}

        {/* ================= MAIN CONTENT ================= */}
        <section className="min-h-screen min-w-0 flex-1">

          {/* Header */}
          <header className="border-b border-green-100 bg-white px-4 py-4 shadow-sm sm:px-6 sm:py-5">

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
                <h2 className="text-xl font-bold text-green-950 sm:text-2xl">
                  Volunteers
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  Manage volunteers who support bird rescue activities.
                </p>
              </div>

            </div>
          </header>

          {/* Content */}
          <div className="px-4 py-5 sm:px-6 sm:py-8">

            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">

              {/* Total Volunteers */}
              <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                  <img
                    src="/images/icons/support 1.jpg"
                    alt="Volunteers"
                    className="h-7 w-7 object-contain"
                  />
                </div>

                <p className="text-sm text-gray-500">
                  Total Volunteers
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-950">
                  {totalVolunteers}
                </h3>

              </div>

              {/* Active Volunteers */}
              <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                  <img
                    src="/images/icons/active volunteer.jpg"
                    alt="Active Volunteers"
                    className="h-7 w-7 object-contain"
                  />
                </div>

                <p className="text-sm text-gray-500">
                  Active Volunteers
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-700">
                  {activeVolunteers}
                </h3>

              </div>

              {/* Service Areas */}
              <div className="rounded-2xl bg-white p-5 shadow-sm sm:col-span-2 sm:p-6 xl:col-span-1">

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                  <img
                    src="/images/icons/visit us.jpg"
                    alt="Service Areas"
                    className="h-7 w-7 object-contain"
                  />
                </div>

                <p className="text-sm text-gray-500">
                  Service Areas
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-950">
                  {serviceAreas}
                </h3>

              </div>

            </div>

            {/* Volunteer Table */}
            <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm sm:mt-8">

              <div className="border-b border-gray-100 px-4 py-5 sm:px-6">

                <h3 className="text-xl font-bold text-green-950">
                  Volunteer List
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Registered volunteers and their contact information.
                </p>

              </div>

              {/* Search and Filter */}
              <div className="flex flex-col gap-4 border-b border-gray-100 px-4 py-5 sm:px-6 md:flex-row">

                <div className="min-w-0 flex-1">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, ID, phone or area..."
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <div className="md:w-48">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

              </div>

              {/* Table: scroll horizontally on mobile */}
              <div className="w-full overflow-x-auto">

                <table className="w-full min-w-[900px] text-left">

                  <thead className="bg-green-50">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-green-950">
                        ID
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-green-950">
                        Volunteer
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-green-950">
                        Phone
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-green-950">
                        Email
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-green-950">
                        Area
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-green-950">
                        Status
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-green-950">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">

                    {filteredVolunteers.length > 0 ? (
                      filteredVolunteers.map((volunteer) => (
                        <tr
                          key={volunteer.id}
                          className="transition hover:bg-green-50"
                        >
                          <td className="px-6 py-5 font-semibold text-green-950">
                            {volunteer.id}
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                                {volunteer.name.charAt(0)}
                              </div>

                              <span className="font-medium text-gray-700">
                                {volunteer.name}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-5 text-gray-600">
                            {volunteer.phone}
                          </td>

                          <td className="px-6 py-5 text-gray-600">
                            {volunteer.email}
                          </td>

                          <td className="px-6 py-5 text-gray-600">
                            {volunteer.area}
                          </td>

                          <td className="px-6 py-5">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                volunteer.status === "Active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {volunteer.status}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedVolunteer(volunteer)
                              }
                              className="rounded-full bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="px-6 py-10 text-center text-gray-500"
                        >
                          No volunteers found.
                        </td>
                      </tr>
                    )}

                  </tbody>
                </table>
              </div>

            </div>

          </div>
        </section>
      </div>

      {/* ================= VOLUNTEER DETAILS MODAL ================= */}
      {selectedVolunteer && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-6">

          <div className="my-auto w-full max-w-lg rounded-3xl bg-white p-5 shadow-2xl sm:p-7">

            <div className="flex items-center justify-between gap-3">

              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-lg font-bold text-green-700">
                  {selectedVolunteer.name.charAt(0)}
                </div>

                <div className="min-w-0">
                  <h3 className="break-words text-xl font-bold text-green-950">
                    {selectedVolunteer.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Volunteer ID: {selectedVolunteer.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedVolunteer(null)}
                className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xl text-gray-500 transition hover:bg-gray-200"
              >
                ×
              </button>

            </div>

            <div className="mt-6 space-y-4">

              <div className="rounded-xl bg-green-50 p-4">
                <p className="text-xs font-semibold uppercase text-gray-500">
                  Phone
                </p>

                <p className="mt-1 break-words font-medium text-green-950">
                  {selectedVolunteer.phone}
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-4">
                <p className="text-xs font-semibold uppercase text-gray-500">
                  Email
                </p>

                <p className="mt-1 break-words font-medium text-green-950">
                  {selectedVolunteer.email}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Service Area
                  </p>

                  <p className="mt-1 font-medium text-green-950">
                    {selectedVolunteer.area}
                  </p>
                </div>

                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Status
                  </p>

                  <span
                    className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      selectedVolunteer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {selectedVolunteer.status}
                  </span>
                </div>

              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedVolunteer(null)}
                className="rounded-xl bg-green-700 px-5 py-2.5 font-semibold text-white transition hover:bg-green-800"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}