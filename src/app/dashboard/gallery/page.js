"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const galleryItems = [
  {
    id: "G-001",
    title: "Rescued Owl",
    date: "25 Sep 2024",
    status: "Published",
    image: "/images/gallery/images3.avif",
  },
  {
    id: "G-002",
    title: "Recovered Sparrow",
    date: "22 dec 2024",
    status: "Published",
    image: "/images/gallery/images5.webp",
  },
  {
    id: "G-003",
    title: "Bird Rehabilitation",
    date: "20 jan 2025",
    status: "Draft",
    image: "/images/gallery/images4.webp",
  },
  {
    id: "G-004",
    title: "Recovered Crow",
    date: "18 oct 2025",
    status: "Published",
    image: "/images/gallery/crow.jpg",
  },
  {
    id: "G-005",
    title: "Rescued Pigeon",
    date: "16 feb 2026",
    status: "Published",
    image: "/images/gallery/pegion.jpg",
  },
  {
    id: "G-006",
    title: "Bird Care and Recovery",
    date: "14 july 2026",
    status: "Published",
    image: "/images/gallery/images1.webp",
  },
  {
    id: "G-007",
    title: "Bird Rescue and Release",
    date: "12 Sep 2026",
    status: "Published",
    image: "/images/gallery/images6.jpg",
  },
];

export default function GalleryPage() {
  const router = useRouter();

  const [items, setItems] = useState(galleryItems);
  const [galleryLoaded, setGalleryLoaded] = useState(false);

  /* ================= LOAD SAVED GALLERY ================= */

  useEffect(() => {
    const savedGallery = localStorage.getItem("maaFoundationGalleryItems");

    if (savedGallery) {
      try {
        const parsedGallery = JSON.parse(savedGallery);

        if (Array.isArray(parsedGallery)) {
          setItems(parsedGallery);
        }
      } catch (error) {
        console.log("Gallery data error");
      }
    }

    setGalleryLoaded(true);
  }, []);

  /* ================= SAVE GALLERY ================= */

  useEffect(() => {
    if (galleryLoaded) {
      localStorage.setItem(
        "maaFoundationGalleryItems",
        JSON.stringify(items)
      );
    }
  }, [items, galleryLoaded]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Published");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleLogout = () => {
    document.cookie =
      "adminAuthorized=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push("/login");
  };

  /* ================= FILTER ================= */

  const filteredItems = items.filter((item) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      item.id.toLowerCase().includes(searchText) ||
      item.title.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* ================= ADD PHOTO ================= */

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();

    if (!title || !imagePreview) {
      alert("Please enter title and select a photo.");
      return;
    }

    const newItem = {
      id: `G-${String(items.length + 1).padStart(3, "0")}`,
      title: title,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: status,
      image: imagePreview,
    };

    setItems([...items, newItem]);

    setTitle("");
    setStatus("Published");
    setImage(null);
    setImagePreview("");
    setShowAddForm(false);
  };

  /* ================= VIEW ================= */

  const handleView = (item) => {
    setSelectedItem(item);
    setShowView(true);
  };

  /* ================= EDIT ================= */

  const handleEdit = (item) => {
    setSelectedItem(item);

    setTitle(item.title);
    setStatus(item.status);
    setImagePreview(item.image);

    setShowEdit(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    setItems(
      items.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              title: title,
              status: status,
              image: imagePreview,
            }
          : item
      )
    );

    setShowEdit(false);
    setSelectedItem(null);
    setTitle("");
    setStatus("Published");
    setImagePreview("");
  };

  /* ================= DELETE ================= */

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gallery item?"
    );

    if (confirmDelete) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

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

              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-green-200">
                Main Menu
              </p>


              <div className="space-y-2">

                {/* Dashboard */}

                <Link
                  href="/dashboard"
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
                  className="flex items-center gap-3 rounded-xl bg-green-800 px-4 py-3 font-semibold text-white"
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


        {/* ================= MAIN CONTENT ================= */}

        <section className="h-screen min-w-0 flex-1 overflow-y-auto">

          {/* Header */}

          <header className="border-b border-green-100 bg-white px-6 py-5 shadow-sm">

            <div className="flex items-center justify-between gap-4">

              <div>

                <h2 className="text-2xl font-bold text-green-950">
                  Gallery
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  Manage rescued bird photos and rehabilitation memories.
                </p>

              </div>


              <button
                type="button"
                onClick={() => {
                  setShowAddForm(true);
                  setTitle("");
                  setStatus("Published");
                  setImagePreview("");
                }}
                className="rounded-full bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                + Add Photo
              </button>

            </div>

          </header>


          {/* Content */}

          <div className="px-6 py-8">

            {/* Summary */}

            <div className="grid gap-5 sm:grid-cols-3">

              <div className="rounded-2xl bg-white p-6 shadow-sm">

                <p className="text-sm text-gray-500">
                  Total Photos
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-950">
                  {items.length}
                </h3>

              </div>


              <div className="rounded-2xl bg-white p-6 shadow-sm">

                <p className="text-sm text-gray-500">
                  Published
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-700">
                  {
                    items.filter(
                      (item) => item.status === "Published"
                    ).length
                  }
                </h3>

              </div>


              <div className="rounded-2xl bg-white p-6 shadow-sm">

                <p className="text-sm text-gray-500">
                  Drafts
                </p>

                <h3 className="mt-2 text-3xl font-bold text-gray-700">
                  {
                    items.filter(
                      (item) => item.status === "Draft"
                    ).length
                  }
                </h3>

              </div>

            </div>


            {/* Gallery Items */}

            <div className="mt-8">

              <div className="mb-5">

                <h3 className="text-xl font-bold text-green-950">
                  Gallery Items
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Rescued and recovered bird photos.
                </p>

              </div>


              {/* Search and Filter */}

              <div className="mb-5 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm md:flex-row">

                <div className="flex-1">

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title or ID..."
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />

                </div>


                <div className="md:w-48">

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  >

                    <option value="All">
                      All Status
                    </option>

                    <option value="Published">
                      Published
                    </option>

                    <option value="Draft">
                      Draft
                    </option>

                  </select>

                </div>

              </div>


              {/* ================= LIST ================= */}

              <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

                <div className="overflow-x-auto">

                  <table className="w-full min-w-[950px] text-left">

                    <thead className="bg-green-50">

                      <tr>

                        <th className="px-6 py-4 text-sm font-semibold text-green-950">
                          Photo
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold text-green-950">
                          Gallery Item
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

                      {filteredItems.length > 0 ? (

                        filteredItems.map((item) => (

                          <tr
                            key={item.id}
                            className="transition hover:bg-green-50"
                          >

                            {/* Photo */}

                            <td className="px-6 py-5">

                              <div className="h-16 w-20 overflow-hidden rounded-xl border border-gray-200 bg-green-50">

                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="h-full w-full object-cover"
                                />

                              </div>

                            </td>


                            {/* Gallery Item */}

                            <td className="px-6 py-5">

                              <div>

                                <p className="font-bold text-green-950">
                                  {item.title}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                  {item.id}
                                </p>

                              </div>

                            </td>


                            {/* Date */}

                            <td className="px-6 py-5 text-gray-600">
                              {item.date}
                            </td>


                            {/* Status */}

                            <td className="px-6 py-5">

                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                  item.status === "Published"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {item.status}
                              </span>

                            </td>


                            {/* Actions */}

                            <td className="px-6 py-5">

                              <div className="flex items-center gap-2">

                                {/* View */}

                                <button
                                  type="button"
                                  onClick={() => handleView(item)}
                                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
                                >
                                  View
                                </button>


                                {/* Edit */}

                                <button
                                  type="button"
                                  onClick={() => handleEdit(item)}
                                  className="rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
                                >
                                  Edit
                                </button>


                                {/* Delete */}

                                <button
                                  type="button"
                                  onClick={() => handleDelete(item.id)}
                                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                >
                                  Delete
                                </button>

                              </div>

                            </td>

                          </tr>

                        ))

                      ) : (

                        <tr>

                          <td
                            colSpan="5"
                            className="px-6 py-10 text-center text-gray-500"
                          >
                            No gallery items found.
                          </td>

                        </tr>

                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

          </div>

        </section>

      </div>


      {/* ================================================= */}
      {/* ================= ADD PHOTO MODAL =============== */}
      {/* ================================================= */}

      {showAddForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">

          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-xl font-bold text-green-950">
                  Add Gallery Photo
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Add a rescued or recovered bird photo.
                </p>

              </div>


              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-2xl text-gray-500 hover:text-gray-800"
              >
                ×
              </button>

            </div>


            <form
              onSubmit={handleAddPhoto}
              className="mt-6 space-y-5"
            >

              {/* Title */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Photo Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter photo title"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />

              </div>


              {/* Image */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Bird Photo
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
                />

              </div>


              {/* Preview */}

              {imagePreview && (

                <div className="overflow-hidden rounded-xl border border-green-100">

                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-48 w-full object-cover"
                  />

                </div>

              )}


              {/* Status */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                >

                  <option value="Published">
                    Published
                  </option>

                  <option value="Draft">
                    Draft
                  </option>

                </select>

              </div>


              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-600"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
                >
                  Add Photo
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* ================================================= */}
      {/* ================= VIEW MODAL ==================== */}
      {/* ================================================= */}

      {showView && selectedItem && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">

          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

            <div className="flex items-center justify-between">

              <h3 className="text-xl font-bold text-green-950">
                Gallery Photo
              </h3>

              <button
                type="button"
                onClick={() => setShowView(false)}
                className="text-2xl text-gray-500 hover:text-gray-800"
              >
                ×
              </button>

            </div>


            <div className="mt-5 overflow-hidden rounded-xl">

              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="h-72 w-full object-cover"
              />

            </div>


            <div className="mt-5">

              <h4 className="text-xl font-bold text-green-950">
                {selectedItem.title}
              </h4>

              <p className="mt-2 text-sm text-gray-500">
                ID: {selectedItem.id}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Date: {selectedItem.date}
              </p>

              <p className="mt-3">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    selectedItem.status === "Published"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {selectedItem.status}
                </span>

              </p>

            </div>


            <button
              type="button"
              onClick={() => setShowView(false)}
              className="mt-6 w-full rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
            >
              Close
            </button>

          </div>

        </div>

      )}


      {/* ================================================= */}
      {/* ================= EDIT MODAL ==================== */}
      {/* ================================================= */}

      {showEdit && selectedItem && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">

          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-xl font-bold text-green-950">
                  Edit Gallery Photo
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Update gallery item details.
                </p>

              </div>


              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="text-2xl text-gray-500 hover:text-gray-800"
              >
                ×
              </button>

            </div>


            <form
              onSubmit={handleUpdate}
              className="mt-6 space-y-5"
            >

              {/* Title */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Photo Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />

              </div>


              {/* New Image */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Change Photo
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
                />

              </div>


              {/* Preview */}

              {imagePreview && (

                <div className="overflow-hidden rounded-xl border border-green-100">

                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-48 w-full object-cover"
                  />

                </div>

              )}


              {/* Status */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                >

                  <option value="Published">
                    Published
                  </option>

                  <option value="Draft">
                    Draft
                  </option>

                </select>

              </div>


              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() => setShowEdit(false)}
                  className="flex-1 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-600"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
                >
                  Save Changes
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}