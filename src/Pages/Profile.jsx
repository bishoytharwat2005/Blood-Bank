import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Droplet,
  CreditCard,
  Edit,
  Save,
  LogOut,
  Camera,
  Activity,
  CalendarIcon,
} from "lucide-react";
import useProfile from "@/hooks/useProfile";

function getDonationStatus(lastDonationDate, blockedUntil) {
  if (!lastDonationDate && !blockedUntil) {
    return {
      blocked: false,
      availableDate: null,
      remainingDays: 0,
    };
  }

  let untilDate;

  if (blockedUntil) {
    untilDate = new Date(blockedUntil);
  } else {
    const lastDonation = new Date(lastDonationDate);

    if (Number.isNaN(lastDonation.getTime())) {
      return {
        blocked: false,
        availableDate: null,
        remainingDays: 0,
      };
    }

    untilDate = new Date(lastDonation);
    untilDate.setMonth(untilDate.getMonth() + 3);
  }

  const now = new Date();

  const blocked = now < untilDate;

  const remainingDays = blocked
    ? Math.ceil((untilDate - now) / (1000 * 60 * 60 * 24))
    : 0;

  return {
    blocked,
    availableDate: untilDate,
    remainingDays,
  };
}

function formatDate(date) {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString("en-GB");
}

function Profile() {
  const {
    user,
    editing,
    formData,
    handleChange,
    handleFileChange,
    handleSave,
    handleLogout,
    handleEdit,
    handleCancel,
  } = useProfile();

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
            👤
          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            Please Login First
          </h2>

          <p className="mt-2 text-gray-500">
            You need to login to view your profile.
          </p>

          <button
            onClick={() => (window.location.href = "/login")}
            className="mt-6 w-full rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const donationStatus = getDonationStatus(
    user.lastDonationDate,
    user.blockedUntil
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-100 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="font-semibold uppercase tracking-wider text-red-600">
            🩸 My Profile
          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-3 text-gray-500">
            Manage your personal information
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-10 text-center text-white">
            <div className="mx-auto h-28 w-28">
              {user.photo ? (
                <img
                  src={user.photo}
                  alt="Profile"
                  className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-5xl shadow-lg">
                  👤
                </div>
              )}
            </div>

            <h2 className="mt-5 text-3xl font-bold">
              {user.firstName} {user.lastName}
            </h2>

            <p className="mt-2 text-red-100">
              Blood Bank Member
            </p>
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            {!editing ? (
              <>
                <div className="grid gap-5 md:grid-cols-2">
                  <InfoCard
                    icon={<User size={22} />}
                    title="Full Name"
                    value={`${user.firstName} ${user.lastName}`}
                  />

                  <InfoCard
                    icon={<Mail size={22} />}
                    title="Email"
                    value={user.email}
                  />

                  <InfoCard
                    icon={<Phone size={22} />}
                    title="Phone Number"
                    value={user.phone}
                  />

                  <InfoCard
                    icon={<CreditCard size={22} />}
                    title="National ID"
                    value={user.nationalId}
                  />

                  <InfoCard
                    icon={<Droplet size={22} />}
                    title="Blood Type"
                    value={user.bloodType}
                    red
                  />

                  <InfoCard
                    icon={<MapPin size={22} />}
                    title="City"
                    value={user.city}
                  />

                  <div className="rounded-2xl bg-gray-50 p-5 md:col-span-2">
                    <div className="flex items-center gap-3">
                      <MapPin size={22} className="text-red-600" />

                      <div>
                        <p className="text-sm text-gray-500">
                          Address
                        </p>

                        <p className="font-semibold text-gray-800">
                          {user.address || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 rounded-3xl border border-gray-100 bg-gray-50 p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <Activity className="text-red-600" />

                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Donation Status
                      </h3>

                      <p className="text-sm text-gray-500">
                        Your blood donation availability
                      </p>
                    </div>
                  </div>

                  {donationStatus.blocked ? (
                    <div className="rounded-2xl bg-red-50 p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl">
                          🔴
                        </div>

                        <div>
                          <p className="font-bold text-red-600">
                            Currently Unavailable
                          </p>

                          <p className="text-sm text-gray-600">
                            You can donate again after{" "}
                            <span className="font-bold">
                              {formatDate(donationStatus.availableDate)}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                        <CalendarIcon size={18} />

                        <span>
                          Remaining:{" "}
                          <strong>
                            {donationStatus.remainingDays} days
                          </strong>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-green-50 p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl">
                          🟢
                        </div>

                        <div>
                          <p className="font-bold text-green-600">
                            Available
                          </p>

                          <p className="text-sm text-gray-600">
                            You are currently available to donate blood.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {user.lastDonationDate && (
                    <p className="mt-4 text-sm text-gray-500">
                      Last donation:{" "}
                      <span className="font-semibold text-gray-700">
                        {formatDate(user.lastDonationDate)}
                      </span>
                    </p>
                  )}
                </div>

                <div className="mt-10">
                  <h3 className="mb-5 flex items-center gap-2 text-xl font-bold text-gray-800">
                    <CreditCard className="text-red-600" />
                    National ID Card
                  </h3>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="mb-2 font-medium text-gray-600">
                        Front Side
                      </p>

                      {user.idFront ? (
                        <img
                          src={user.idFront}
                          alt="National ID Front"
                          className="h-56 w-full rounded-2xl border object-cover shadow"
                        />
                      ) : (
                        <div className="flex h-56 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                          No ID image
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="mb-2 font-medium text-gray-600">
                        Back Side
                      </p>

                      {user.idBack ? (
                        <img
                          src={user.idBack}
                          alt="National ID Back"
                          className="h-56 w-full rounded-2xl border object-cover shadow"
                        />
                      ) : (
                        <div className="flex h-56 w-full items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                          No ID image
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                  >
                    <Edit size={19} />
                    Edit Profile
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-100 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={19} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-8">
                <div className="flex flex-col items-center">
                  {formData.photo ? (
                    <img
                      src={formData.photo}
                      alt="Profile"
                      className="h-28 w-28 rounded-full border-4 border-red-100 object-cover shadow"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-100 text-4xl">
                      👤
                    </div>
                  )}

                  <label className="mt-4 flex cursor-pointer items-center gap-2 rounded-xl bg-red-50 px-5 py-2.5 font-semibold text-red-600 transition hover:bg-red-100">
                    <Camera size={18} />
                    Change Photo

                    <input
                      type="file"
                      name="photo"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <InputField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  <InputField
                    label="National ID"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleChange}
                    maxLength={14}
                  />

                  <div>
                    <label className="mb-2 block font-semibold text-gray-700">
                      Blood Type
                    </label>

                    <select
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
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
                    <label className="mb-2 block font-semibold text-gray-700">
                      City
                    </label>

                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                    >
                      <option value="Cairo">Cairo</option>
                      <option value="Giza">Giza</option>
                      <option value="Alexandria">Alexandria</option>
                      <option value="Mansoura">Mansoura</option>
                      <option value="Tanta">Tanta</option>
                      <option value="Asyut">Asyut</option>
                      <option value="Sohag">Sohag</option>
                      <option value="Luxor">Luxor</option>
                      <option value="Aswan">Aswan</option>
                      <option value="Minya">Minya</option>
                      <option value="Fayoum">Fayoum</option>
                    </select>
                  </div>
                </div>

                <InputField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />

                <div>
                  <label className="mb-3 block font-semibold text-gray-700">
                    National ID Card
                  </label>

                  <div className="grid gap-5 md:grid-cols-2">
                    <FileField
                      label="Front"
                      name="idFront"
                      value={formData.idFront}
                      onChange={handleFileChange}
                    />

                    <FileField
                      label="Back"
                      name="idBack"
                      value={formData.idBack}
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                  >
                    <Save size={19} />
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 rounded-xl bg-gray-100 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, value, red = false }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-5">
      <div className="flex items-center gap-3">
        <div className={red ? "text-red-600" : "text-red-600"}>
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <p
            className={
              red
                ? "font-semibold text-red-600"
                : "font-semibold text-gray-800"
            }
          >
            {value || "Not provided"}
          </p>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  maxLength,
}) {
  return (
    <div>
      <label className="mb-2 block font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
      />
    </div>
  );
}

function FileField({ label, name, value, onChange }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-4">
      <label className="mb-3 block font-semibold text-gray-700">
        ID Card - {label}
      </label>

      {value && (
        <img
          src={value}
          alt={`ID ${label}`}
          className="mb-4 h-40 w-full rounded-xl border bg-white object-cover"
        />
      )}

      <input
        type="file"
        name={name}
        onChange={onChange}
        accept="image/*"
        className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm"
      />

    </div>

  );
}

export default Profile;
