"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery,
} from "@/api/galleryApi";


export default function GalleryPage() {
  const router = useRouter();

  // Gallery API data
  const [items, setItems] = useState([]);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Modals
  const [showAddForm, setShowAddForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  // Selected gallery
  const [selectedItem, setSelectedItem] =
    useState(null);

  // Form
  const [title, setTitle] = useState("");
  const [status, setStatus] =
    useState("Published");

  // Image
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] =
    useState("");

  // Search/filter
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");


  /* =========================================================
     LOAD GALLERY FROM API
  ========================================================= */

  const loadGallery = async () => {
    try {
      setLoading(true);

      const response = await getGallery();

      console.log(
        "Gallery API Response:",
        response
      );

      let galleryData = [];

      if (Array.isArray(response)) {
        galleryData = response;
      } else if (
        Array.isArray(response?.data)
      ) {
        galleryData = response.data;
      } else if (
        Array.isArray(response?.gallery)
      ) {
        galleryData = response.gallery;
      } else if (
        Array.isArray(response?.items)
      ) {
        galleryData = response.items;
      }

      const formattedData =
        galleryData.map((item, index) => ({
          id:
            item._id ||
            item.id ||
            `G-${String(index + 1).padStart(
              3,
              "0"
            )}`,

          title: item.title || "",

          date: item.createdAt
            ? new Date(
                item.createdAt
              ).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "",

          status:
            item.status || "Published",

          image:
            item.image ||
            item.imageUrl ||
            item.image_url ||
            "",
        }));

      setItems(formattedData);
    } catch (error) {
      console.error(
        "Gallery load error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Gallery data load nahi ho saka."
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadGallery();
  }, []);


  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    document.cookie =
      "adminAuthorized=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push("/login");
  };


  /* =========================================================
     MOBILE MENU
  ========================================================= */

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };


  /* =========================================================
     FILTER
  ========================================================= */

  const filteredItems = items.filter(
    (item) => {
      const searchText =
        search.toLowerCase();

      const itemId = String(
        item.id || ""
      ).toLowerCase();

      const itemTitle = String(
        item.title || ""
      ).toLowerCase();

      const matchesSearch =
        itemId.includes(searchText) ||
        itemTitle.includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );


  /* =========================================================
     IMAGE CHANGE
  ========================================================= */

  const handleImageChange = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    setImage(file);

    const reader =
      new FileReader();

    reader.onloadend = () => {
      setImagePreview(
        reader.result
      );
    };

    reader.readAsDataURL(file);
  };


  /* =========================================================
     ADD PHOTO
  ========================================================= */

  const handleAddPhoto = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter title.");
      return;
    }

    if (!image) {
      alert("Please select a photo.");
      return;
    }

    try {
      setSaving(true);

      const formData =
        new FormData();

      formData.append(
        "title",
        title.trim()
      );

      formData.append(
        "status",
        status
      );

      formData.append(
        "image",
        image
      );

      console.log(
        "Creating Gallery:",
        {
          title: title.trim(),
          status,
          image: image.name,
        }
      );

      const response =
        await createGallery(
          formData
        );

      console.log(
        "Create Gallery Response:",
        response
      );

      alert(
        "Gallery photo added successfully."
      );

      await loadGallery();

      resetForm();

      setShowAddForm(false);
    } catch (error) {
      console.error(
        "Create gallery error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Gallery photo add nahi ho saki."
      );
    } finally {
      setSaving(false);
    }
  };


  /* =========================================================
     VIEW
  ========================================================= */

  const handleView = (item) => {
    setSelectedItem(item);
    setShowView(true);
  };


  /* =========================================================
     EDIT OPEN
  ========================================================= */

  const handleEdit = (item) => {
    setSelectedItem(item);

    setTitle(item.title || "");

    setStatus(
      item.status || "Published"
    );

    setImagePreview(
      item.image || ""
    );

    // Important:
    // New image abhi select nahi hui
    setImage(null);

    setShowEdit(true);
  };


  /* =========================================================
     UPDATE
  ========================================================= */

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !selectedItem
    ) {
      return;
    }

    try {
      setSaving(true);

      const galleryId =
        selectedItem.id ||
        selectedItem._id;

      const formData =
        new FormData();

      formData.append(
        "title",
        title.trim()
      );

      formData.append(
        "status",
        status
      );

      // Only send image when
      // user selected a new image
      if (image) {
        formData.append(
          "image",
          image
        );
      }

      console.log(
        "Updating Gallery:",
        galleryId
      );

      await updateGallery(
        galleryId,
        formData
      );

      alert(
        "Gallery photo updated successfully."
      );

      await loadGallery();

      setShowEdit(false);

      setSelectedItem(null);

      resetForm();
    } catch (error) {
      console.error(
        "Update gallery error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Gallery photo update nahi ho saki."
      );
    } finally {
      setSaving(false);
    }
  };


  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this gallery item?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      setSaving(true);

      console.log(
        "Deleting Gallery:",
        id
      );

      await deleteGallery(id);

      alert(
        "Gallery photo deleted successfully."
      );

      await loadGallery();
    } catch (error) {
      console.error(
        "Delete gallery error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Gallery photo delete nahi ho saki."
      );
    } finally {
      setSaving(false);
    }
  };


  /* =========================================================
     RESET FORM
  ========================================================= */

  const resetForm = () => {
    setTitle("");
    setStatus("Published");
    setImage(null);
    setImagePreview("");
  };


  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <main className="min-h-screen overflow-x-hidden bg-green-50">
      <div className="relative flex min-h-screen">

        {/* =================================================
            SIDEBAR
        ================================================= */}

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

            <div className="flex items-center justify-between gap-3 border-b border-green-800 px-5 py-5 sm:py-6">

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

              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close navigation menu"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-2xl text-white hover:bg-green-800 lg:hidden"
              >
                ×
              </button>

            </div>


            {/* Navigation */}

            <nav className="flex-1 overflow-y-auto px-4 py-6">

              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-green-200">
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
                  className="flex items-center gap-3 rounded-xl bg-green-800 px-4 py-3 font-semibold text-white"
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


        {/* Mobile Backdrop */}

        {mobileMenuOpen && (
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMobileMenu}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          />
        )}


        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <section className="min-h-screen min-w-0 flex-1">

          {/* Header */}

          <header className="border-b border-green-100 bg-white px-4 py-5 shadow-sm sm:px-6">

            <div className="flex items-start gap-3">

              <button
                type="button"
                onClick={() =>
                  setMobileMenuOpen(true)
                }
                aria-label="Open navigation menu"
                className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-800 text-2xl text-white transition hover:bg-green-900 lg:hidden"
              >
                ☰
              </button>


              <div className="min-w-0 flex-1">

                <h2 className="text-xl font-bold text-green-950 sm:text-2xl">
                  Gallery
                </h2>

                <p className="mt-1 text-sm leading-5 text-gray-600">
                  Manage rescued bird photos and rehabilitation memories.
                </p>

              </div>


              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowAddForm(true);
                }}
                className="shrink-0 rounded-xl bg-green-700 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-green-800 sm:px-5 sm:text-sm"
              >
                <span className="sm:hidden">
                  + Add
                </span>

                <span className="hidden sm:inline">
                  + Add Photo
                </span>
              </button>

            </div>

          </header>


          {/* Content */}

          <div className="px-4 py-5 sm:px-6 sm:py-8">

            {/* Summary */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">

              <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

                <p className="text-sm text-gray-500">
                  Total Photos
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-950">
                  {items.length}
                </h3>

              </div>


              <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

                <p className="text-sm text-gray-500">
                  Published
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-700">
                  {
                    items.filter(
                      (item) =>
                        item.status ===
                        "Published"
                    ).length
                  }
                </h3>

              </div>


              <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

                <p className="text-sm text-gray-500">
                  Drafts
                </p>

                <h3 className="mt-2 text-3xl font-bold text-gray-700">
                  {
                    items.filter(
                      (item) =>
                        item.status ===
                        "Draft"
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


              {/* Search */}

              <div className="mb-5 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:p-5 md:flex-row">

                <div className="min-w-0 flex-1">

                  <label className="mb-2 block text-sm font-semibold text-green-950">
                    Search Gallery
                  </label>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    placeholder="Search by title or ID..."
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />

                </div>


                <div className="w-full md:w-48">

                  <label className="mb-2 block text-sm font-semibold text-green-950">
                    Filter by Status
                  </label>

                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(
                        e.target.value
                      )
                    }
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


              {/* Loading */}

              {loading ? (

                <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-green-700" />

                  <p className="mt-4 text-sm text-gray-500">
                    Loading gallery...
                  </p>

                </div>

              ) : (

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

                  <div className="overflow-x-auto">

                    <table className="w-full min-w-[850px] text-left">

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

                        {filteredItems.length >
                        0 ? (

                          filteredItems.map(
                            (item) => (

                              <tr
                                key={item.id}
                                className="transition hover:bg-green-50"
                              >

                                {/* Photo */}

                                <td className="px-6 py-5">

                                  <div className="h-16 w-20 overflow-hidden rounded-xl border border-gray-200 bg-green-50">

                                    {item.image ? (

                                      <img
                                        src={
                                          item.image
                                        }
                                        alt={
                                          item.title
                                        }
                                        className="h-full w-full object-cover"
                                      />

                                    ) : (

                                      <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                        No Image
                                      </div>

                                    )}

                                  </div>

                                </td>


                                {/* Gallery Item */}

                                <td className="px-6 py-5">

                                  <div>

                                    <p className="font-bold text-green-950">
                                      {
                                        item.title
                                      }
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
                                      item.status ===
                                      "Published"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {
                                      item.status
                                    }
                                  </span>

                                </td>


                                {/* Actions */}

                                <td className="px-6 py-5">

                                  <div className="flex items-center gap-2">

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleView(
                                          item
                                        )
                                      }
                                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
                                    >
                                      View
                                    </button>


                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleEdit(
                                          item
                                        )
                                      }
                                      className="rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
                                    >
                                      Edit
                                    </button>


                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleDelete(
                                          item.id
                                        )
                                      }
                                      disabled={
                                        saving
                                      }
                                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                      Delete
                                    </button>

                                  </div>

                                </td>

                              </tr>

                            )
                          )

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

              )}

            </div>

          </div>

        </section>

      </div>


      {/* =================================================
          ADD PHOTO MODAL
      ================================================= */}

      {showAddForm && (

        <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/50 p-3 py-5 sm:items-center sm:p-5">

          <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-4 shadow-xl sm:p-6">

            <div className="flex items-start justify-between gap-3">

              <div>

                <h3 className="text-lg font-bold text-green-950 sm:text-xl">
                  Add Gallery Photo
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Add a rescued or recovered bird photo.
                </p>

              </div>


              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  resetForm();
                }}
                aria-label="Close add photo form"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                ×
              </button>

            </div>


            <form
              onSubmit={handleAddPhoto}
              className="mt-5 space-y-4 sm:mt-6 sm:space-y-5"
            >

              {/* Title */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Photo Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  placeholder="Enter photo title"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
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
                  onChange={
                    handleImageChange
                  }
                  required={!image}
                  className="w-full min-w-0 rounded-xl border border-gray-200 px-3 py-3 text-sm"
                />

              </div>


              {/* Preview */}

              {imagePreview && (

                <div className="overflow-hidden rounded-xl border border-green-100">

                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-40 w-full object-cover sm:h-48"
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
                  onChange={(e) =>
                    setStatus(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600"
                >
                  <option value="Published">
                    Published
                  </option>

                  <option value="Draft">
                    Draft
                  </option>
                </select>

              </div>


              <div className="flex flex-col-reverse gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    resetForm();
                  }}
                  disabled={saving}
                  className="flex-1 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Adding..."
                    : "Add Photo"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =================================================
          VIEW MODAL
      ================================================= */}

      {showView &&
        selectedItem && (

          <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/50 p-3 py-5 sm:items-center sm:p-5">

            <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-4 shadow-xl sm:p-6">

              <div className="flex items-center justify-between gap-3">

                <h3 className="text-lg font-bold text-green-950 sm:text-xl">
                  Gallery Photo
                </h3>


                <button
                  type="button"
                  onClick={() =>
                    setShowView(false)
                  }
                  aria-label="Close gallery photo"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  ×
                </button>

              </div>


              <div className="mt-5 overflow-hidden rounded-xl">

                {selectedItem.image ? (

                  <img
                    src={
                      selectedItem.image
                    }
                    alt={
                      selectedItem.title
                    }
                    className="max-h-[55vh] w-full object-contain sm:h-72 sm:object-cover"
                  />

                ) : (

                  <div className="flex h-72 items-center justify-center bg-gray-100 text-gray-400">
                    No Image
                  </div>

                )}

              </div>


              <div className="mt-5">

                <h4 className="break-words text-xl font-bold text-green-950">
                  {
                    selectedItem.title
                  }
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  ID: {selectedItem.id}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Date:{" "}
                  {
                    selectedItem.date
                  }
                </p>

                <p className="mt-3">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      selectedItem.status ===
                      "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {
                      selectedItem.status
                    }
                  </span>

                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setShowView(false)
                }
                className="mt-6 w-full rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
              >
                Close
              </button>

            </div>

          </div>

        )}


      {/* =================================================
          EDIT MODAL
      ================================================= */}

      {showEdit &&
        selectedItem && (

          <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/50 p-3 py-5 sm:items-center sm:p-5">

            <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-4 shadow-xl sm:p-6">

              <div className="flex items-start justify-between gap-3">

                <div>

                  <h3 className="text-lg font-bold text-green-950 sm:text-xl">
                    Edit Gallery Photo
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Update gallery item details.
                  </p>

                </div>


                <button
                  type="button"
                  onClick={() => {
                    setShowEdit(false);
                    resetForm();
                    setSelectedItem(null);
                  }}
                  aria-label="Close edit form"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  ×
                </button>

              </div>


              <form
                onSubmit={handleUpdate}
                className="mt-5 space-y-4 sm:mt-6 sm:space-y-5"
              >

                {/* Title */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Photo Title
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(e) =>
                      setTitle(
                        e.target.value
                      )
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
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
                    onChange={
                      handleImageChange
                    }
                    className="w-full min-w-0 rounded-xl border border-gray-200 px-3 py-3 text-sm"
                  />

                </div>


                {/* Preview */}

                {imagePreview && (

                  <div className="overflow-hidden rounded-xl border border-green-100">

                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-40 w-full object-cover sm:h-48"
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
                    onChange={(e) =>
                      setStatus(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600"
                  >
                    <option value="Published">
                      Published
                    </option>

                    <option value="Draft">
                      Draft
                    </option>
                  </select>

                </div>


                <div className="flex flex-col-reverse gap-3 sm:flex-row">

                  <button
                    type="button"
                    onClick={() => {
                      setShowEdit(false);
                      resetForm();
                      setSelectedItem(null);
                    }}
                    disabled={saving}
                    className="flex-1 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

    </main>
  );
}