import React, { useState } from "react";
import { useNavigate } from "react-router";

import {
  Phone,
  MapPin,
  CalendarIcon,
  Activity,
  Heart,
  MessageCircle,
  Search,
  Plus,
  X,
} from "lucide-react";

import useFindBlood from "@/hooks/useFindBlood";

function FindBlood() {
  const navigate = useNavigate();

  const {
    activeTab,
    setActiveTab,
    requests,
    bloodType,
    setBloodType,
    city,
    setCity,
    loading,
    filteredDonors,
    handleContact,
    addBloodRequest,
  } = useFindBlood(navigate);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bloodGroup: "A+",
    city: "",
    hospital: "",
    phone: "",
    urgency: "Normal",
    unitsNeeded: 1,
  });

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.phone || !formData.hospital) {
      alert("Please fill in all required fields.");
      return;
    }

    addBloodRequest(formData);

    setFormData({
      firstName: "",
      lastName: "",
      bloodGroup: "A+",
      city: "",
      hospital: "",
      phone: "",
      urgency: "Normal",
      unitsNeeded: 1,
    });

    setShowModal(false);
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-30">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            🩸 FIND BLOOD
          </span>

          <h1 className="mt-5 text-4xl font-bold text-gray-900 md:text-5xl">
            Find Blood You Need
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Search for available donors or people who need blood near you.
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="flex w-full max-w-xl rounded-2xl bg-white p-2 shadow-sm">
            <button
              onClick={() => setActiveTab("donors")}
              className={`flex-1 rounded-xl px-5 py-3 font-semibold transition ${
                activeTab === "donors"
                  ? "bg-red-600 text-white"
                  : "text-gray-500 hover:bg-red-50"
              }`}
            >
              ❤️ Donors
            </button>

            <button
              onClick={() => setActiveTab("requests")}
              className={`flex-1 rounded-xl px-5 py-3 font-semibold transition ${
                activeTab === "requests"
                  ? "bg-red-600 text-white"
                  : "text-gray-500 hover:bg-red-50"
              }`}
            >
              🩸 Blood Requests
            </button>
          </div>
        </div>

        {activeTab === "donors" && (
          <>
            <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <Search className="h-5 w-5 text-red-600" />

                <h2 className="text-xl font-bold text-gray-900">
                  Search Donors
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <select
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
                >
                  <option value="">All Blood Types</option>

                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>

                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Search by city..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
                />
              </div>
            </div>

            {loading ? (
              <div className="py-16 text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-red-200 border-t-red-600" />

                <p className="mt-4 text-gray-500">Loading donors...</p>
              </div>
            ) : filteredDonors.length === 0 ? (
              <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
                <Heart className="mx-auto h-16 w-16 text-red-500" />

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  No available donors found
                </h3>

                <p className="mt-2 text-gray-500">
                  Try changing the blood type or city.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredDonors.map((donor, index) => {
                  const name = donor.firstName
                    ? `${donor.firstName} ${donor.lastName || ""}`
                    : donor.name || "Blood Donor";

                  const blood =
                    donor.bloodGroup || donor.bloodType || "N/A";

                  const donorCity =
                    donor.address?.city || donor.city || "Unknown";

                  const image =
                    donor.image ||
                    `https://dummyjson.com/icon/${donor.id || index}/128`;

                  return (
                    <div
                      key={`${donor.id || "donor"}-${index}`}
                      className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={image}
                            alt={name}
                            className="h-16 w-16 rounded-full object-cover"
                          />

                          <div>
                            <h3 className="font-bold text-gray-900">
                              {name}
                            </h3>

                            <p className="flex items-center gap-1 text-sm text-gray-500">
                              <MapPin className="h-4 w-4" />
                              {donorCity}
                            </p>
                          </div>
                        </div>

                        <span className="rounded-xl bg-red-600 px-3 py-2 font-bold text-white">
                          {blood}
                        </span>
                      </div>

                      <div className="mt-6 space-y-3 text-sm text-gray-600">
                        <p className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {donorCity}
                        </p>

                        {donor.phone && (
                          <p className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {donor.phone}
                          </p>
                        )}

                        {donor.availableDate && (
                          <p className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            Available: {donor.availableDate}
                          </p>
                        )}

                        <p className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-green-600" />

                          <span className="font-semibold text-green-600">
                            Available
                          </span>
                        </p>
                      </div>

                      <button
                        onClick={() => handleContact(donor)}
                        className="mt-6 flex w-full items-center justify-center rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Contact Donor
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {activeTab === "requests" && (
          <div>
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                <Plus className="h-5 w-5" />
                Create Blood Request
              </button>
            </div>

            {requests.length === 0 ? (
              <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
                <Heart className="mx-auto h-16 w-16 text-red-500" />

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  No blood requests found
                </h3>

                <p className="mt-2 text-gray-500">
                  There are no blood requests at the moment.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {requests.map((request, index) => {
                  const requestName = request.firstName
                    ? `${request.firstName} ${request.lastName || ""}`
                    : request.name || "Blood Request";

                  const requestCity =
                    request.address?.city || request.city || "";

                  const requestBlood =
                    request.bloodGroup || request.bloodType || "N/A";

                  return (
                    <div
                      key={request.id || index}
                      className="rounded-3xl bg-white p-6 shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          {requestName}
                        </h3>

                        <span className="rounded-xl bg-red-600 px-3 py-2 font-bold text-white">
                          {requestBlood}
                        </span>
                      </div>

                      <div className="mt-5 space-y-3 text-sm text-gray-600">
                        {requestCity && (
                          <p className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {requestCity}
                          </p>
                        )}

                        {request.phone && (
                          <p className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {request.phone}
                          </p>
                        )}

                        {request.hospital && (
                          <p className="flex items-center gap-2">
                            <Heart className="h-4 w-4" />
                            {request.hospital}
                          </p>
                        )}

                        {request.urgency && (
                          <p className="font-semibold text-red-600">
                            Urgency: {request.urgency}
                          </p>
                        )}

                        {request.unitsNeeded && (
                          <p>Units Needed: {request.unitsNeeded}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Create Blood Request
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="rounded-xl border border-gray-200 p-3 outline-none focus:border-red-500"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="rounded-xl border border-gray-200 p-3 outline-none focus:border-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) =>
                      setFormData({ ...formData, bloodGroup: e.target.value })
                    }
                    className="rounded-xl border border-gray-200 p-3 outline-none focus:border-red-500"
                  >
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      )
                    )}
                  </select>

                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="rounded-xl border border-gray-200 p-3 outline-none focus:border-red-500"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Hospital Name"
                  required
                  value={formData.hospital}
                  onChange={(e) =>
                    setFormData({ ...formData, hospital: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-red-500"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="rounded-xl border border-gray-200 p-3 outline-none focus:border-red-500"
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder="Units Needed"
                    value={formData.unitsNeeded}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        unitsNeeded: Number(e.target.value),
                      })
                    }
                    className="rounded-xl border border-gray-200 p-3 outline-none focus:border-red-500"
                  />
                </div>

                <select
                  value={formData.urgency}
                  onChange={(e) =>
                    setFormData({ ...formData, urgency: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-red-500"
                >
                  <option value="Normal">Normal</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Critical">Critical</option>
                </select>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-xl px-4 py-2 font-semibold text-gray-500 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-red-600 px-6 py-2 font-semibold text-white transition hover:bg-red-700"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default FindBlood;
