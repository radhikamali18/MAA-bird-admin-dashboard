"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const birds = [
    {
        id: "BC-001",
        bird: "Pigeon",
        condition: "Wing Injury",
        rescueDate: "25 Sep 2026",
        treatment: "Medical Care",
        status: "Under Treatment",
    },
    {
        id: "BC-002",
        bird: "Crow",
        condition: "Weakness",
        rescueDate: "24 Sep 2026",
        treatment: "Rest & Medicines",
        status: "Recovering",
    },
    {
        id: "BC-003",
        bird: "Sparrow",
        condition: "Minor Injury",
        rescueDate: "22 Sep 2026",
        treatment: "Observation",
        status: "Recovering",
    },
];

export default function CarePage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedBird, setSelectedBird] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const router = useRouter();

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const handleLogout = () => {
        document.cookie =
            "adminAuthorized=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        router.push("/login");
    };

    const filteredBirds = birds.filter((bird) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            bird.id.toLowerCase().includes(searchText) ||
            bird.bird.toLowerCase().includes(searchText) ||
            bird.condition.toLowerCase().includes(searchText) ||
            bird.treatment.toLowerCase().includes(searchText);

        const matchesStatus =
            statusFilter === "All" ||
            bird.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const totalUnderCare = birds.length;

    const underTreatment = birds.filter(
        (bird) => bird.status === "Under Treatment"
    ).length;

    const recovering = birds.filter(
        (bird) => bird.status === "Recovering"
    ).length;

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
                        backgroundImage: "url('/images/gallery/hero-bird-bg.png')",
                    }}
                >
                    {/* Sidebar Content */}
                    <div className="relative z-10 flex h-full flex-col">

                        <div className="flex items-center justify-between gap-3 border-b border-green-800 px-5 py-6">

                            <div className="flex min-w-0 items-center gap-3">
                                <img
                                    src="/images/logo.png"
                                    alt="Maa Foundation Logo"
                                    className="h-12 w-12 shrink-0 rounded-full bg-white object-contain"
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

                            {/* Mobile Close Button */}
                            <button
                                type="button"
                                onClick={closeMobileMenu}
                                aria-label="Close navigation menu"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-900 text-2xl text-white transition hover:bg-green-700 lg:hidden"
                            >
                                ×
                            </button>

                        </div>

                        <nav className="flex-1 overflow-y-auto px-4 py-6">

                            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-green-300">
                                Main Menu
                            </p>

                            <div className="space-y-2">

                                {/* Dashboard */}
                                <Link
                                    href="/dashboard"
                                    onClick={closeMobileMenu}
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
                                    onClick={closeMobileMenu}
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
                                    onClick={closeMobileMenu}
                                    className="flex items-center gap-3 rounded-xl bg-green-800 px-4 py-3 font-semibold"
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
                                    onClick={closeMobileMenu}
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
                                    onClick={closeMobileMenu}
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
                                    onClick={closeMobileMenu}
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
                                    onClick={closeMobileMenu}
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

                {/* Mobile Sidebar Backdrop */}
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
                    <header className="border-b border-green-100 bg-white px-4 py-5 shadow-sm sm:px-6">

                        <div className="flex items-start gap-3">

                            {/* Mobile Hamburger */}
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
                                    Birds Under Care
                                </h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Monitor birds receiving medical care and rehabilitation.
                                </p>
                            </div>

                        </div>

                    </header>

                    <div className="px-4 py-5 sm:px-6 sm:py-8">

                        {/* ================= SUMMARY CARDS ================= */}
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">

                            {/* Total */}
                            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

                                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                                    <img
                                        src="/images/icons/our services.png"
                                        alt="Total Under Care"
                                        className="h-7 w-7 object-contain"
                                    />
                                </div>

                                <p className="text-sm text-gray-500">
                                    Total Under Care
                                </p>

                                <h3 className="mt-2 text-3xl font-bold text-green-950">
                                    {totalUnderCare}
                                </h3>

                            </div>

                            {/* Under Treatment */}
                            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

                                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                                    <img
                                        src="/images/icons/medical care.jpg"
                                        alt="Under Treatment"
                                        className="h-7 w-7 object-contain"
                                    />
                                </div>

                                <p className="text-sm text-gray-500">
                                    Under Treatment
                                </p>

                                <h3 className="mt-2 text-3xl font-bold text-blue-700">
                                    {underTreatment}
                                </h3>

                            </div>

                            {/* Recovering */}
                            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

                                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                                    <img
                                        src="/images/icons/read msg.jpg"
                                        alt="Recovering"
                                        className="h-7 w-7 object-contain"
                                    />
                                </div>

                                <p className="text-sm text-gray-500">
                                    Recovering
                                </p>

                                <h3 className="mt-2 text-3xl font-bold text-green-700">
                                    {recovering}
                                </h3>

                            </div>

                        </div>

                        {/* ================= TABLE ================= */}
                        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm sm:mt-8">

                            <div className="border-b border-gray-100 px-4 py-5 sm:px-6">

                                <h3 className="text-lg font-bold text-green-950 sm:text-xl">
                                    Current Care Records
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Birds currently receiving care and rehabilitation.
                                </p>

                            </div>

                            {/* ================= SEARCH & FILTER ================= */}
                            <div className="border-b border-gray-100 px-4 py-5 sm:px-6">

                                <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">

                                    {/* Search */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-green-950">
                                            Search Care Records
                                        </label>

                                        <input
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Search by ID, bird, condition or treatment..."
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

                                            <option value="Under Treatment">
                                                Under Treatment
                                            </option>

                                            <option value="Recovering">
                                                Recovering
                                            </option>
                                        </select>
                                    </div>

                                </div>

                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[900px] text-left">

                                    <thead className="bg-green-50">
                                        <tr>
                                            <th className="px-6 py-4 text-sm font-semibold text-green-950">
                                                ID
                                            </th>

                                            <th className="px-6 py-4 text-sm font-semibold text-green-950">
                                                Bird
                                            </th>

                                            <th className="px-6 py-4 text-sm font-semibold text-green-950">
                                                Condition
                                            </th>

                                            <th className="px-6 py-4 text-sm font-semibold text-green-950">
                                                Rescue Date
                                            </th>

                                            <th className="px-6 py-4 text-sm font-semibold text-green-950">
                                                Treatment
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

                                        {filteredBirds.length > 0 ? (
                                            filteredBirds.map((bird) => (
                                                <tr
                                                    key={bird.id}
                                                    className="transition hover:bg-green-50"
                                                >
                                                    <td className="px-6 py-5 font-semibold text-green-950">
                                                        {bird.id}
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                                                                <img
                                                                    src="/images/icons/release.png"
                                                                    alt="Bird"
                                                                    className="h-7 w-7 object-contain"
                                                                />
                                                            </div>

                                                            <span className="font-medium text-gray-700">
                                                                {bird.bird}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-5 text-gray-600">
                                                        {bird.condition}
                                                    </td>

                                                    <td className="px-6 py-5 text-gray-600">
                                                        {bird.rescueDate}
                                                    </td>

                                                    <td className="px-6 py-5 text-gray-600">
                                                        {bird.treatment}
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <span
                                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                                bird.status === "Under Treatment"
                                                                    ? "bg-blue-100 text-blue-700"
                                                                    : "bg-green-100 text-green-700"
                                                            }`}
                                                        >
                                                            {bird.status}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedBird(bird)}
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
                                                    className="px-6 py-12 text-center"
                                                >
                                                    <p className="font-semibold text-green-800">
                                                        No care records found
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

            {/* ================= VIEW BIRD MODAL ================= */}
            {selectedBird && (
                <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-5 sm:items-center sm:px-5 sm:py-8">

                    <div className="my-auto w-full max-w-lg rounded-3xl bg-white p-5 shadow-2xl sm:p-7">

                        {/* Modal Header */}
                        <div className="flex items-start justify-between gap-3">

                            <div>
                                <p className="text-sm font-semibold text-green-600">
                                    Bird Care Record
                                </p>

                                <h3 className="mt-1 text-2xl font-bold text-green-950">
                                    {selectedBird.id}
                                </h3>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedBird(null)}
                                aria-label="Close bird details"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg text-gray-600 transition hover:bg-gray-200"
                            >
                                ×
                            </button>

                        </div>

                        {/* Bird */}
                        <div className="mt-6 rounded-2xl bg-green-50 p-4 sm:p-5">

                            <div className="flex items-center gap-4">

                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white">
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
                                        {selectedBird.bird}
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Details */}
                        <div className="mt-6 space-y-4">

                            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
                                <span className="text-sm text-gray-500">
                                    Condition
                                </span>

                                <span className="text-right text-sm font-semibold text-gray-800">
                                    {selectedBird.condition}
                                </span>
                            </div>

                            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
                                <span className="text-sm text-gray-500">
                                    Rescue Date
                                </span>

                                <span className="text-right text-sm font-semibold text-gray-800">
                                    {selectedBird.rescueDate}
                                </span>
                            </div>

                            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
                                <span className="text-sm text-gray-500">
                                    Treatment
                                </span>

                                <span className="text-right text-sm font-semibold text-gray-800">
                                    {selectedBird.treatment}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <span className="text-sm text-gray-500">
                                    Status
                                </span>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                        selectedBird.status === "Under Treatment"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-green-100 text-green-700"
                                    }`}
                                >
                                    {selectedBird.status}
                                </span>
                            </div>

                        </div>

                        {/* Close */}
                        <button
                            type="button"
                            onClick={() => setSelectedBird(null)}
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