import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  CalendarIcon,
  Activity,
  Heart,
  HeartIcon,
  HospitalIcon,
  HeartHandshakeIcon,
  MessageCircle,
  Phone,
  Search,
  Filter,
  Users,
} from "lucide-react";
import useDonors from "@/hooks/useDonors";

function DonateBlood() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    bloodType: "O+",
    phone: "",
    city: "",
    hasDonatedRecently: false,
    lastDonationDate: "",
  });

  // حالات الفلترة والبحث
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBloodFilter, setSelectedBloodFilter] = useState("ALL");
  const [onlyAvailableFilter, setOnlyAvailableFilter] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { donors, addDonor, getBlockedUntil, formatDate } = useDonors();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!formData.name || !formData.phone || !formData.city) {
      setError("Please complete all required fields.");
      return;
    }

    const isAlreadyRegistered = donors.some(
      (d) => d.phone && String(d.phone).trim() === formData.phone.trim()
    );

    if (isAlreadyRegistered) {
      setError("This phone number is already registered as a donor!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.name,
          phone: formData.phone,
          bloodGroup: formData.bloodType,
          address: {
            city: formData.city,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register donor.");
      }

      const newDonor = await response.json();

      let donationDateString = null;
      let blockedUntilString = null;

      if (
        formData.hasDonatedRecently &&
        formData.lastDonationDate &&
        formData.lastDonationDate.trim() !== ""
      ) {
        const donationDate = new Date(formData.lastDonationDate);

        if (!isNaN(donationDate.getTime())) {
          const blockedUntilDate = new Date(donationDate);
          blockedUntilDate.setMonth(blockedUntilDate.getMonth() + 3);

          donationDateString = donationDate.toISOString();
          blockedUntilString = blockedUntilDate.toISOString();
        }
      }

      const donor = {
        id: `local-${Date.now()}`,
        name: formData.name,
        firstName: formData.name,
        lastName: "",
        phone: formData.phone,
        bloodGroup: formData.bloodType,
        bloodType: formData.bloodType,
        address: {
          city: formData.city,
        },
        city: formData.city,
        lastDonationDate: donationDateString,
        blockedUntil: blockedUntilString,
        available: !blockedUntilString,
        image:
          newDonor.image ||
          `https://dummyjson.com/icon/${newDonor.id || 1}/128`,
        source: "local",
      };

      const success = addDonor(donor);

      if (!success) {
        setError("This donor is already registered!");
        return;
      }

      const userData = localStorage.getItem("userData");

      if (userData) {
        try {
          const currentUser = JSON.parse(userData);

          const updatedUser = {
            ...currentUser,
            lastDonationDate: donationDateString,
            blockedUntil: blockedUntilString,
            availableDate: blockedUntilString
              ? blockedUntilString.split("T")[0]
              : null,
            available: !blockedUntilString,
          };

          localStorage.setItem("userData", JSON.stringify(updatedUser));
        } catch (err) {
          console.error(err);
        }
      }

      setMessage(
        donor.blockedUntil
          ? `Registered successfully ❤️. You will be available again on ${formatDate(
              donor.blockedUntil
            )}.`
          : "Registered successfully ❤️. You are now visible as an available donor!"
      );

      setFormData({
        name: "",
        bloodType: "O+",
        phone: "",
        city: "",
        hasDonatedRecently: false,
        lastDonationDate: "",
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChat = (donor) => {
    navigate("/chat", {
      state: {
        donor,
      },
    });
  };

  // فلترة المتبرعين بناءً على البحث والفصيلة وحالة التوفر
  const filteredDonors = useMemo(() => {
    return donors.filter((donor) => {
      const name = (
        donor.firstName
          ? `${donor.firstName} ${donor.lastName || ""}`
          : donor.name || ""
      ).toLowerCase();

      const city = (donor.address?.city || donor.city || "").toLowerCase();
      const blood = donor.bloodGroup || donor.bloodType || "";
      const isBlocked = !!getBlockedUntil(donor);

      const matchesSearch =
        name.includes(searchQuery.toLowerCase()) ||
        city.includes(searchQuery.toLowerCase());

      const matchesBlood =
        selectedBloodFilter === "ALL" || blood === selectedBloodFilter;

      const matchesAvailable = onlyAvailableFilter ? !isBlocked : true;

      return matchesSearch && matchesBlood && matchesAvailable;
    });
  }, [donors, searchQuery, selectedBloodFilter, onlyAvailableFilter]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-red-50 to-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm">
            <HeartIcon className="h-5 w-5 fill-red-600 animate-pulse" />
            BECOME A HERO TODAY
          </span>

          <h1 className="mt-5 text-4xl font-extrabold text-gray-900 md:text-5xl">
            Donate Blood, Save Lives
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Join our network of heroes. Your single donation can save up to 3 lives in emergency situations.
          </p>
        </div>

        {/* Section 1: Hero Info & Form */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* Hero Banner */}
          <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-red-600 to-red-700 p-8 text-white shadow-xl md:p-10">
            <div>
              <div className="inline-block rounded-2xl bg-white/20 p-4 text-5xl backdrop-blur-md">
                🩸
              </div>

              <h2 className="mt-6 text-3xl font-bold">
                Your Blood Can Save a Life
              </h2>

              <p className="mt-4 leading-relaxed text-red-100">
                Blood donation is a simple, safe act that makes a huge impact. Hospitals constantly need blood donors for urgent cases and surgeries.
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3.5 backdrop-blur-sm transition hover:bg-white/20">
                  <HeartIcon className="h-6 w-6 text-red-200" />
                  <span className="font-medium">1 Donation = Up to 3 Lives Saved</span>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3.5 backdrop-blur-sm transition hover:bg-white/20">
                  <HospitalIcon className="h-6 w-6 text-red-200" />
                  <span className="font-medium">Direct support to local hospitals</span>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3.5 backdrop-blur-sm transition hover:bg-white/20">
                  <HeartHandshakeIcon className="h-6 w-6 text-red-200" />
                  <span className="font-medium">Instant contact with patients in need</span>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-black/10 p-4 text-center text-xs text-red-200 border border-white/10">
              🔒 Your data is securely listed to connect you with urgent blood requests.
            </div>
          </div>

          {/* Registration Form */}
          <div className="rounded-3xl bg-white p-8 shadow-xl border border-gray-100 md:p-10">
            <h2 className="text-2xl font-bold text-gray-900">
              Register as a Donor
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Fill in your details to join the active donor list.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Blood Type *
                  </label>
                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition bg-white"
                  >
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Cairo"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01xxxxxxxxx"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="hasDonatedRecently"
                  name="hasDonatedRecently"
                  checked={formData.hasDonatedRecently}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <label
                  htmlFor="hasDonatedRecently"
                  className="cursor-pointer text-sm font-medium text-gray-700 select-none"
                >
                  Have you donated blood recently?
                </label>
              </div>

              {formData.hasDonatedRecently && (
                <div className="bg-red-50/50 p-4 rounded-2xl border border-red-100 transition-all">
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Last Donation Date
                  </label>
                  <input
                    type="date"
                    name="lastDonationDate"
                    value={formData.lastDonationDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-red-500 bg-white"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    * Donors must wait 3 months between donations.
                  </p>
                </div>
              )}

              {message && (
                <div className="rounded-xl bg-green-50 p-4 font-medium text-sm text-green-700 border border-green-200">
                  {message}
                </div>
              )}

              {error && (
                <div className="rounded-xl bg-red-50 p-4 font-medium text-sm text-red-600 border border-red-200">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-red-600 py-6 text-base font-semibold text-white hover:bg-red-700 shadow-lg shadow-red-200 transition"
              >
                {loading ? (
                  "Registering..."
                ) : (
                  <>
                    Register as Hero Donor
                    <Heart className="ml-2 h-5 w-5 fill-white" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Section 2: Donor List & Interactive Filters */}
        <div className="mt-20">
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-4 py-1.5 text-xs font-bold text-red-600 uppercase tracking-wide">
              <Users className="h-4 w-4" /> ACTIVE DONORS COMMUNITY
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
              Registered Blood Donors
            </h2>

            <p className="mt-2 text-gray-500">
              Search and filter registered heroes ready to help save lives.
            </p>
          </div>

          {/* Interactive Search & Filter Bar */}
          <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-sm border border-gray-100 md:flex-row md:items-center md:justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-red-200 transition"
              />
            </div>

            {/* Blood Group Quick Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {["ALL", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedBloodFilter(type)}
                  className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                    selectedBloodFilter === type
                      ? "bg-red-600 text-white shadow-md shadow-red-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Toggle Only Available */}
            <button
              onClick={() => setOnlyAvailableFilter(!onlyAvailableFilter)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-xs font-bold transition border ${
                onlyAvailableFilter
                  ? "bg-green-50 text-green-700 border-green-300"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span className={`h-2.5 w-2.5 rounded-full ${onlyAvailableFilter ? "bg-green-500 animate-ping" : "bg-gray-400"}`}></span>
              Available Only 🟢
            </button>
          </div>

          {/* Donor Cards Grid */}
          {filteredDonors.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm border border-gray-100">
              <Heart className="mx-auto h-16 w-16 text-gray-300" />
              <h3 className="mt-4 text-xl font-bold text-gray-900">
                No matching donors found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search query or filters.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredDonors.map((donor, index) => {
                const name = donor.firstName
                  ? `${donor.firstName} ${donor.lastName || ""}`.trim()
                  : donor.name || "Blood Donor";

                const blood = donor.bloodGroup || donor.bloodType || "N/A";
                const city = donor.address?.city || donor.city || "Unknown";
                const image =
                  donor.image ||
                  `https://dummyjson.com/icon/${donor.id || index}/128`;

                const blockedUntil = getBlockedUntil(donor);
                const isBlocked = !!blockedUntil;

                return (
                  <div
                    key={donor.id || `donor-${index}`}
                    className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-red-100"
                  >
                    <div>
                      {/* Header Card */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={image}
                            alt={name}
                            className="h-14 w-14 rounded-full object-cover border-2 border-red-100 shadow-sm"
                          />
                          <div>
                            <h3 className="font-bold text-gray-900 text-base">
                              {name}
                            </h3>
                            <p className="flex items-center gap-1 text-xs text-gray-500">
                              <MapPin className="h-3.5 w-3.5 text-gray-400" />
                              {city}
                            </p>
                          </div>
                        </div>

                        <span className="rounded-2xl bg-red-50 border border-red-100 px-3 py-1.5 font-extrabold text-red-600 text-sm shadow-sm">
                          {blood}
                        </span>
                      </div>

                      {/* Info Details */}
                      <div className="mt-5 space-y-2.5 text-sm text-gray-600">
                        {donor.phone && (
                          <p className="flex items-center gap-2 text-xs font-medium text-gray-700">
                            <Phone className="h-4 w-4 text-red-500" />
                            <span>{donor.phone}</span>
                          </p>
                        )}

                        {donor.lastDonationDate && (
                          <p className="flex items-center gap-2 text-xs text-gray-500">
                            <CalendarIcon className="h-4 w-4 text-gray-400" />
                            Last Donated:{" "}
                            <span className="font-semibold text-gray-700">
                              {formatDate(donor.lastDonationDate)}
                            </span>
                          </p>
                        )}
                      </div>

                      {/* Visual Status & Progress Bar */}
                      <div className="mt-5">
                        {isBlocked ? (
                          <div className="rounded-2xl bg-red-50/70 p-3.5 border border-red-100">
                            <div className="flex items-center justify-between text-xs mb-1.5">
                              <span className="font-bold text-red-600 flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                Resting Period
                              </span>
                              <span className="text-gray-500 font-medium">
                                Ready: {formatDate(blockedUntil)}
                              </span>
                            </div>

                            {/* Dynamic Progress Bar */}
                            {(() => {
                              const start = donor.lastDonationDate
                                ? new Date(donor.lastDonationDate).getTime()
                                : new Date().getTime();
                              const end = new Date(blockedUntil).getTime();
                              const now = new Date().getTime();
                              const progress = Math.min(
                                100,
                                Math.max(0, ((now - start) / (end - start)) * 100)
                              );

                              return (
                                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-2">
                                  <div
                                    className="bg-gradient-to-r from-red-400 to-red-600 h-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : (
                          <div className="flex items-center justify-between rounded-2xl bg-green-50/80 p-3.5 border border-green-100">
                            <span className="font-bold text-xs text-green-700 flex items-center gap-2">
                              <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
                              Ready to Donate
                            </span>
                            <span className="text-xs font-semibold text-green-600">
                              Can save 3 lives ❤️
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions Button */}
                    <div className="mt-6">
                      {!isBlocked ? (
                        <button
                          type="button"
                          onClick={() => handleChat(donor)}
                          className="flex w-full items-center justify-center rounded-2xl bg-red-600 py-3 text-sm font-semibold text-white shadow-md shadow-red-100 transition hover:bg-red-700 active:scale-[0.98]"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Contact Donor
                        </button>
                      ) : (
                        <div className="w-full rounded-2xl bg-gray-100 py-3 text-center text-xs font-semibold text-gray-400">
                          Unavailable Temporarily
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DonateBlood;
