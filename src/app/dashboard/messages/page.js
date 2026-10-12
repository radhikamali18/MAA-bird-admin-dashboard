"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const initialMessages = [
  {
    id: "M-001",
    name: "Neha Sharma",
    email: "neha@example.com",
    phone: "+91 9876543210",
    message: "I found an injured pigeon near Andheri.",
    date: "27 Sep 2026",
    status: "Unread",
  },
  {
    id: "M-002",
    name: "Rahul Patel",
    email: "rahul@example.com",
    phone: "+91 9876543211",
    message: "I would like to volunteer for bird rescue activities.",
    date: "26 Sep 2026",
    status: "Read",
  },
  {
    id: "M-003",
    name: "Priya Mehta",
    email: "priya@example.com",
    phone: "+91 9876543212",
    message: "I want to know more about supporting the foundation.",
    date: "25 Sep 2026",
    status: "Read",
  },
];

export default function MessagesPage() {
  const router = useRouter();

  const [messageList, setMessageList] = useState(initialMessages);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showView, setShowView] = useState(false);

  // Mobile Menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    document.cookie =
      "adminAuthorized=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push("/login");
  };

  /* ================= FILTER MESSAGES ================= */

  const filteredMessages = messageList.filter((message) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      message.id.toLowerCase().includes(searchText) ||
      message.name.toLowerCase().includes(searchText) ||
      message.email.toLowerCase().includes(searchText) ||
      message.phone.toLowerCase().includes(searchText) ||
      message.message.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      message.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* ================= COUNTS ================= */

  const totalMessages = messageList.length;

  const unreadMessages = messageList.filter(
    (message) => message.status === "Unread"
  ).length;

  const readMessages = messageList.filter(
    (message) => message.status === "Read"
  ).length;

  /* ================= VIEW MESSAGE ================= */

  const handleView = (message) => {
    setSelectedMessage({
      ...message,
      status: message.status === "Unread" ? "Read" : message.status,
    });

    setShowView(true);

    if (message.status === "Unread") {
      setMessageList((previousMessages) =>
        previousMessages.map((item) =>
          item.id === message.id
            ? {
                ...item,
                status: "Read",
              }
            : item
        )
      );
    }
  };

  /* ================= CLOSE VIEW ================= */

  const handleCloseView = () => {
    setShowView(false);
    setSelectedMessage(null);
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

            {/* Logo Section */}

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
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-2xl text-white transition hover:bg-green-700 lg:hidden"
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

                {/* Dashboard */}

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

                {/* Bird Reports */}

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

                {/* Birds Under Care */}

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

                {/* Volunteers */}

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

                {/* Gallery */}

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

                {/* Messages */}

                <Link
                  href="/dashboard/messages"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl bg-green-800 px-4 py-3 font-semibold text-white"
                >

                  <img
                    src="/images/icons/messages.png"
                    alt="Messages"
                    className="h-6 w-6 object-contain"
                  />

                  Messages

                </Link>

              </div>

              {/* Other */}

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
                  Messages
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  View messages and enquiries received from the community.
                </p>

              </div>

            </div>

          </header>

          {/* Content */}

          <div className="px-4 py-6 sm:px-6 sm:py-8">

            {/* Summary Cards */}

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">

              {/* Total Messages */}

              <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">

                  <img
                    src="/images/icons/messages.png"
                    alt="Total Messages"
                    className="h-7 w-7 object-contain"
                  />

                </div>

                <p className="text-sm text-gray-500">
                  Total Messages
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-950">
                  {totalMessages}
                </h3>

              </div>

              {/* Unread Messages */}

              <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100">

                  <img
                    src="/images/icons/unread msg.webp"
                    alt="Unread Messages"
                    className="h-7 w-7 object-contain"
                  />

                </div>

                <p className="text-sm text-gray-500">
                  Unread Messages
                </p>

                <h3 className="mt-2 text-3xl font-bold text-yellow-600">
                  {unreadMessages}
                </h3>

              </div>

              {/* Read Messages */}

              <div className="rounded-2xl bg-white p-5 shadow-sm sm:col-span-2 sm:p-6 xl:col-span-1">

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">

                  <img
                    src="/images/icons/read msg.jpg"
                    alt="Read Messages"
                    className="h-7 w-7 object-contain"
                  />

                </div>

                <p className="text-sm text-gray-500">
                  Read Messages
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-700">
                  {readMessages}
                </h3>

              </div>

            </div>

            {/* Messages Table */}

            <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">

              {/* Table Header */}

              <div className="border-b border-gray-100 px-4 py-5 sm:px-6">

                <h3 className="text-xl font-bold text-green-950">
                  Community Messages
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Recent enquiries and messages from website visitors.
                </p>

              </div>

              {/* Search and Filter */}

              <div className="flex flex-col gap-4 border-b border-gray-100 px-4 py-5 sm:px-6 md:flex-row">

                {/* Search */}

                <div className="min-w-0 flex-1">

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, email, phone or message..."
                    className="w-full min-w-0 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />

                </div>

                {/* Status Filter */}

                <div className="w-full md:w-48">

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  >

                    <option value="All">
                      All Status
                    </option>

                    <option value="Unread">
                      Unread
                    </option>

                    <option value="Read">
                      Read
                    </option>

                  </select>

                </div>

              </div>

              {/* Table */}

              <div className="w-full overflow-x-auto">

                <table className="w-full min-w-[1000px] text-left">

                  <thead className="bg-green-50">

                    <tr>

                      <th className="px-6 py-4 text-sm font-semibold text-green-950">
                        ID
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-green-950">
                        Name
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-green-950">
                        Contact
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-green-950">
                        Message
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

                    {filteredMessages.length > 0 ? (

                      filteredMessages.map((message) => (

                        <tr
                          key={message.id}
                          className="transition hover:bg-green-50"
                        >

                          {/* ID */}

                          <td className="px-6 py-5 font-semibold text-green-950">
                            {message.id}
                          </td>

                          {/* Name */}

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                                {message.name.charAt(0)}
                              </div>

                              <span className="font-medium text-gray-700">
                                {message.name}
                              </span>

                            </div>

                          </td>

                          {/* Contact */}

                          <td className="px-6 py-5">

                            <p className="text-sm text-gray-700">
                              {message.email}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                              {message.phone}
                            </p>

                          </td>

                          {/* Message */}

                          <td className="max-w-xs px-6 py-5 text-sm text-gray-600">
                            {message.message}
                          </td>

                          {/* Date */}

                          <td className="px-6 py-5 text-gray-600">
                            {message.date}
                          </td>

                          {/* Status */}

                          <td className="px-6 py-5">

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                message.status === "Unread"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {message.status}
                            </span>

                          </td>

                          {/* Action */}

                          <td className="px-6 py-5">

                            <button
                              type="button"
                              onClick={() => handleView(message)}
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
                          No messages found.
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

      {/* ================= VIEW MESSAGE MODAL ================= */}

      {showView && selectedMessage && (

        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-6 sm:px-5"
          onClick={handleCloseView}
        >

          <div
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}

            <div className="flex items-center justify-between gap-3">

              <div className="min-w-0">

                <h3 className="text-xl font-bold text-green-950">
                  Message Details
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedMessage.id}
                </p>

              </div>

              <button
                type="button"
                aria-label="Close message details"
                onClick={handleCloseView}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-500 hover:bg-gray-200 hover:text-gray-800"
              >
                ×
              </button>

            </div>

            {/* Sender */}

            <div className="mt-6 rounded-xl bg-green-50 p-4 sm:p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-lg font-bold text-green-700">
                  {selectedMessage.name.charAt(0)}
                </div>

                <div className="min-w-0">

                  <h4 className="break-words font-bold text-green-950">
                    {selectedMessage.name}
                  </h4>

                  <p className="break-all text-sm text-gray-600">
                    {selectedMessage.email}
                  </p>

                </div>

              </div>

            </div>

            {/* Contact Details */}

            <div className="mt-5 space-y-4">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Phone
                </p>

                <p className="mt-1 break-words text-sm text-gray-700">
                  {selectedMessage.phone}
                </p>

              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Date
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {selectedMessage.date}
                </p>

              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </p>

                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    selectedMessage.status === "Unread"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {selectedMessage.status}
                </span>

              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Message
                </p>

                <div className="mt-2 break-words rounded-xl border border-gray-200 bg-white p-4 text-sm leading-6 text-gray-700">
                  {selectedMessage.message}
                </div>

              </div>

            </div>

            {/* Close Button */}

            <button
              type="button"
              onClick={handleCloseView}
              className="mt-6 w-full rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </main>
  );
}