import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Phone,
  MapPin,
  CalendarIcon,
  Activity,
  Heart,
  HeartIcon,
  HospitalIcon,
  HeartHandshakeIcon,
  MessageCircle,
} from "lucide-react";
import useDonors from "@/hooks/useDonors";

function DonateBlood() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    bloodType: "O+",
    phone: "",
    city: "",
    availableDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const {
    donors,
    addDonor,
    getBlockedUntil,
    formatDate,
  } = useDonors();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (
      !formData.name ||
      !formData.phone ||
      !formData.city ||
      !formData.availableDate
    ) {
      setError("Please complete all fields.");
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
          availableDate: formData.availableDate,
          available: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register donor.");
      }

      const newDonor = await response.json();

      const donor = {
        id: `local-${Date.now()}`,
        firstName: formData.name,
        lastName: "",
        phone: formData.phone,
        bloodGroup: formData.bloodType,
        address: {
          city: formData.city,
        },
        availableDate: formData.availableDate,
        available: true,
        blockedUntil: null,
        image:
          newDonor.image ||
          `https://dummyjson.com/icon/${newDonor.id || 1}/128`,
        source: "local",
      };

      addDonor(donor);

      setMessage(
        "You have successfully registered as a blood donor ❤️"
      );

      setFormData({
        name: "",
        bloodType: "O+",
        phone: "",
        city: "",
        availableDate: "",
      });
    } catch (error) {
      console.error(error);
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

  return (
    <section className="min-h-screen bg-red-50 px-4 py-16">
      <div className="mx-auto max-w-6xl">

        <div className="mb-12 text-center">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            <HeartIcon className="h-6 w-6" />
            BECOME A DONOR
          </span>

          <h1 className="mt-5 text-4xl font-bold text-gray-900 md:text-5xl">
            Donate Blood, Save a Life
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Register yourself as a blood donor and help people find the blood
            they need.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">

          <div className="rounded-3xl bg-red-600 p-8 text-white md:p-10">
            <div className="text-6xl">🩸</div>

            <h2 className="mt-6 text-3xl font-bold">
              Your Blood Can Save a Life
            </h2>

            <p className="mt-5 leading-8 text-red-100">
              Blood donation is a simple act that can help patients during
              emergencies, surgeries and medical treatments.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-2 rounded-2xl bg-white/10 p-4">
                <HeartIcon className="h-6 w-6" />
                Save lives
              </div>

              <div className="flex items-center gap-2 rounded-2xl bg-white/10 p-4">
                <HospitalIcon className="h-6 w-6" />
                Support hospitals
              </div>

              <div className="flex items-center gap-2 rounded-2xl bg-white/10 p-4">
                <HeartHandshakeIcon className="h-6 w-6" />
                Help your community
              </div>

              <div className="flex items-center gap-2 rounded-2xl bg-white/10 p-4">
                <div className="text-2xl">🩸</div>
                Become a hero
              </div>

            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl md:p-10">

            <h2 className="text-2xl font-bold text-gray-900">
              Register as a Donor
            </h2>

            <p className="mt-2 text-gray-500">
              Enter your information below.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Blood Type
                </label>

                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01xxxxxxxxx"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Cairo"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Available Date
                </label>

                <input
                  type="date"
                  name="availableDate"
                  value={formData.availableDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              {message && (
                <div className="rounded-xl bg-green-50 p-4 font-medium text-green-600">
                  {message}
                </div>
              )}

              {error && (
                <div className="rounded-xl bg-red-50 p-4 font-medium text-red-600">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-red-600 py-6 text-base font-semibold text-white hover:bg-red-700"
              >
                {loading ? (
                  "Registering..."
                ) : (
                  <>
                    Register as Donor
                    <Heart className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

            </form>
          </div>
        </div>

        <div className="mt-16">

          <div className="mb-8 text-center">
            <span className="inline-block rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
              🩸 DONOR LIST
            </span>

            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Registered Blood Donors
            </h2>

            <p className="mt-2 text-gray-500">
              People who registered to help save lives.
            </p>
          </div>

          {donors.length === 0 ? (

            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
              <Heart className="mx-auto h-16 w-16 text-red-600" />

              <h3 className="mt-4 text-xl font-bold text-gray-900">
                No donors registered yet
              </h3>

              <p className="mt-2 text-gray-500">
                Be the first person to register as a donor.
              </p>
            </div>

          ) : (

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {donors.map((donor, index) => {

                const name = donor.firstName
                  ? `${donor.firstName} ${donor.lastName || ""}`
                  : donor.name || "Blood Donor";

                const blood =
                  donor.bloodGroup ||
                  donor.bloodType ||
                  "N/A";

                const city =
                  donor.address?.city ||
                  donor.city ||
                  "Unknown";

                const image =
                  donor.image ||
                  `https://dummyjson.com/icon/${donor.id || index}/128`;

                const blockedUntil = getBlockedUntil(donor);
                const isBlocked = !!blockedUntil;

                return (

                  <div
                    key={`${donor.id || "donor"}-${index}`}
                    className="rounded-3xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
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

                          <p className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="h-4 w-4" />
                            {city}
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
                        Location:
                        <span className="font-medium">
                          {city}
                        </span>
                      </p>

                      {donor.phone && (
                        <p className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone:
                          <span className="font-medium">
                            {donor.phone}
                          </span>
                        </p>
                      )}

                      {donor.availableDate && (
                        <p className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          Available:
                          <span className="font-medium">
                            {donor.availableDate}
                          </span>
                        </p>
                      )}

                      {isBlocked ? (

                        <div className="rounded-xl bg-red-50 p-3">
                          <p className="font-semibold text-red-600">
                            🔴 Currently Unavailable
                          </p>

                          <p className="mt-1 text-sm text-gray-600">
                            Blocked until:{" "}
                            <span className="font-semibold">
                              {formatDate(blockedUntil)}
                            </span>
                          </p>
                        </div>

                      ) : (

                        <p className="flex items-center gap-2">
                          <Activity className="h-4 w-4" />

                          <span className="font-semibold text-green-600">
                            Available
                          </span>
                        </p>

                      )}

                    </div>

                    {!isBlocked && (
                      <button
                        type="button"
                        onClick={() => handleChat(donor)}
                        className="mt-6 flex w-full items-center justify-center rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Contact Donor
                      </button>
                    )}

                    {isBlocked && (
                      <div className="mt-6 rounded-xl bg-gray-100 py-3 text-center font-semibold text-gray-500">
                        Donor is unavailable
                      </div>
                    )}

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
