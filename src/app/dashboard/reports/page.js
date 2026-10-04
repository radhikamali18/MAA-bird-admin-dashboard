"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const reports = [
  {
    id: "BR-001",
    bird: "Pigeon",
    location: "Andheri East, Mumbai",
    date: "27 Sep 2026",
    status: "Pending",
  },
  {
    id: "BR-002",
    bird: "Crow",
    location: "Marol, Mumbai",
    date: "26 Sep 2026",
    status: "Under Care",
  },
  {
    id: "BR-003",
    bird: "Sparrow",
    location: "Andheri West, Mumbai",
    date: "25 Sep 2026",
    status: "Recovered",
  },
];

export default function ReportsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  const router = useRouter();

  const handleLogout = () => {
    document.cookie =
      "adminAuthorized=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push("/login");
  };

  const filteredReports = reports.filter((report) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      report.id.toLowerCase().includes(searchText) ||
      report.bird.toLowerCase().includes(searchText) ||
      report.location.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      report.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalReports = reports.length;

  const pendingReports = reports.filter(
    (report) => report.status === "Pending"
  ).length;

  const underCareReports = reports.filter(
    (report) => report.status === "Under Care"
  ).length;

  const recoveredReports = reports.filter(
    (report) => report.status === "Recovered"
  ).length;

  return (
    <main className="h-screen overflow-hidden bg-green-50">
      <div className="flex h-screen overflow-hidden">

        {/* ================= SIDEBAR ================= */}
        <aside
          className="relative hidden h-screen w-64 shrink-0 overflow-hidden bg-cover bg-center bg-no-repeat text-white lg:flex lg:flex-col"
          style={{
            backgroundImage:
              "url('/images/gallery/hero-bird-bg.png')",
          }}
        >

          {/* Sidebar Content */}
          <div className="relative z-10 flex h-full flex-col">

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

            <nav className="flex-1 overflow-y-auto px-4 py-6">

              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-green-300">
                Main Menu
              </p>

              <div className="space-y-2">

                {/* Dashboard */}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-green-100 transition hover:bg-green-900"
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
                  className="flex items-center gap-3 rounded-xl bg-green-800 px-4 py-3 font-semibold"
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

        {/* ================= MAIN CONTENT ================= */}
        <section className="h-screen min-w-0 flex-1 overflow-y-auto">

          {/* Header */}
          <header className="border-b border-green-100 bg-white px-6 py-5 shadow-sm">

            <h2 className="text-2xl font-bold text-green-950">
              Bird Reports
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              View and manage injured bird reports submitted by the community.
            </p>

          </header>

          {/* Content */}
          <div className="px-6 py-8">

            {/* ================= SUMMARY CARDS ================= */}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

              {/* Total */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">

                  <img
                    src="/images/icons/r1.jpg"
                    alt="Total Reports"
                    className="h-7 w-7 object-contain"
                  />

                </div>

                <p className="text-sm text-gray-500">
                  Total Reports
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-950">
                  {totalReports}
                </h3>

              </div>

              {/* Pending */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100">

                  <img
                    src="/images/icons/pendding.jpg"
                    alt="Total Reports"
                    className="h-7 w-7 object-contain"
                  />

                </div>

                <p className="text-sm text-gray-500">
                  Pending
                </p>

                <h3 className="mt-2 text-3xl font-bold text-yellow-700">
                  {pendingReports}
                </h3>

              </div>

              {/* Under Care */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">

                  <img
                    src="/images/icons/our services.png"
                    alt="Under Care"
                    className="h-7 w-7 object-contain"
                  />

                </div>

                <p className="text-sm text-gray-500">
                  Under Care
                </p>

                <h3 className="mt-2 text-3xl font-bold text-blue-700">
                  {underCareReports}
                </h3>

              </div>

              {/* Recovered */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">

                  <img
                    src="/images/icons/read msg.jpg"
                    alt="Recovered"
                    className="h-7 w-7 object-contain"
                  />

                </div>

                <p className="text-sm text-gray-500">
                  Recovered
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-700">
                  {recoveredReports}
                </h3>

              </div>

            </div>

            {/* ================= PAGE HEADING ================= */}

            <div className="mt-8 mb-6">

              <h3 className="text-xl font-bold text-green-950">
                Recent Reports
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Reports received from users.
              </p>

            </div>

            {/* ================= SEARCH AND FILTER ================= */}

            <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

              <div className="grid gap-4 md:grid-cols-[1fr_220px]">

                {/* Search */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-green-950">
                    Search Reports
                  </label>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by ID, bird or location..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />

                </div>

                {/* Status Filter */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-green-950">
                    Filter by Status
                  </label>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  >
                    <option value="All">
                      All Status
                    </option>

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Under Care">
                      Under Care
                    </option>

                    <option value="Recovered">
                      Recovered
                    </option>

                  </select>

                </div>

              </div>

            </div>

            {/* ================= REPORTS TABLE ================= */}

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[800px] text-left">

                  <thead className="bg-green-50">

                    <tr>

                      <th className="px-6 py-4 text-sm font-semibold text-green-950">
                        Report ID
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-green-950">
                        Bird
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-green-950">
                        Location
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-green-950">
                        Date
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

                    {filteredReports.length > 0 ? (

                      filteredReports.map((report) => (

                        <tr
                          key={report.id}
                          className="transition hover:bg-green-50"
                        >

                          <td className="px-6 py-5 font-semibold text-green-950">
                            {report.id}
                          </td>

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">

                                <img
                                  src="/images/icons/release.png"
                                  alt="Bird"
                                  className="h-6 w-6 object-contain"
                                />

                              </div>

                              <span className="font-medium text-gray-700">
                                {report.bird}
                              </span>

                            </div>

                          </td>

                          <td className="px-6 py-5 text-gray-600">
                            {report.location}
                          </td>

                          <td className="px-6 py-5 text-gray-600">
                            {report.date}
                          </td>

                          <td className="px-6 py-5">

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                report.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : report.status === "Under Care"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {report.status}
                            </span>

                          </td>

                          <td className="px-6 py-5">

                            <button
                              type="button"
                              onClick={() => setSelectedReport(report)}
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
                          colSpan="6"
                          className="px-6 py-12 text-center"
                        >

                          <p className="font-semibold text-green-800">
                            No reports found
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            Try changing your search or status filter.
                          </p>

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

      {/* ================= VIEW REPORT MODAL ================= */}

      {selectedReport && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">

          <div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-green-600">
                  Bird Report
                </p>

                <h3 className="mt-1 text-2xl font-bold text-green-950">
                  {selectedReport.id}
                </h3>

              </div>

              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-lg text-gray-600 transition hover:bg-gray-200"
              >
                ×
              </button>

            </div>

            {/* Bird */}
            <div className="mt-6 rounded-2xl bg-green-50 p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">

                  <img
                    src="/images/icons/release.png"
                    alt="Bird"
                    className="h-8 w-8 object-contain"
                  />

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Bird
                  </p>

                  <p className="text-lg font-bold text-green-950">
                    {selectedReport.bird}
                  </p>

                </div>

              </div>

            </div>

            {/* Details */}
            <div className="mt-6 space-y-4">

              <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">

                <span className="text-sm text-gray-500">
                  Location
                </span>

                <span className="text-right text-sm font-semibold text-gray-800">
                  {selectedReport.location}
                </span>

              </div>

              <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">

                <span className="text-sm text-gray-500">
                  Report Date
                </span>

                <span className="text-sm font-semibold text-gray-800">
                  {selectedReport.date}
                </span>

              </div>

              <div className="flex items-center justify-between gap-4">

                <span className="text-sm text-gray-500">
                  Status
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    selectedReport.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : selectedReport.status === "Under Care"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {selectedReport.status}
                </span>

              </div>

            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => setSelectedReport(null)}
              className="mt-7 w-full rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </main>
  );
}