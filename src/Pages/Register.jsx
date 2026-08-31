import React from "react";
import { Link } from "react-router";
import {
  User,
  Mail,
  Phone,
  CreditCard,
  MapPin,
  Lock,
  Image,
  FileImage,
  Heart,
} from "lucide-react";
import useRegister from "@/hooks/useRegister";

function Register() {
  const {
    formData,
    handleChange,
    handleFileChange,
    handleSubmit,
  } = useRegister();
  return (
    <div className="mt-16 min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-100 px-4 py-16 sm:px-6 lg:py-20">
      <section className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 shadow-sm">
            <Heart
              size={32}
              className="fill-red-600 text-red-600"
            />
          </div>

          <p className="mt-5 font-semibold uppercase tracking-wider text-red-600">
            🩸 Join Our Community
          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
            Create Your Account
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Join our community and help connect blood donors
            with people who need them.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 text-white sm:px-10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <User size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Personal Information
                </h2>

                <p className="text-sm text-red-100">
                  Please enter your information below
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 md:p-10"
          >
            <div className="mb-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-600">
                  <User size={18} />
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  Basic Information
                </h3>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    First Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Last Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      required
                      className=    "w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      required
                      className=    "w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01xxxxxxxxx"
                      required
                      className=    "w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8 border-t border-gray-100 pt-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-600">
                  <CreditCard size={18} />
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  Identification
                </h3>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  National ID
                </label>

                <div className="relative">
                  <CreditCard
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleChange}
                    placeholder="Enter your 14-digit National ID"
                    maxLength={14}
                    pattern="[0-9]{14}"
                    inputMode="numeric"
                    required
                    className=    "w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                  />
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  National ID must contain exactly 14 digits.
                </p>
              </div>
            </div>

            <div className="mb-8 border-t border-gray-100 pt-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-600">
                  <Heart size={18} />
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  Blood Information
                </h3>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Blood Type
                  </label>

                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 px-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"

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
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    City
                  </label>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`$"w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
 appearance-none`}
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
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Address
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your full address"
                    required
                    className=    "w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                  />
                </div>
              </div>
            </div>

            <div className="mb-8 border-t border-gray-100 pt-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-600">
                  <Image size={18} />
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  Profile Photo
                </h3>
              </div>

              <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center transition hover:border-red-300 hover:bg-red-50/30">
                {formData.photo ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={formData.photo}
                      alt="Profile"
                      className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
                    />

                    <p className="mt-3 text-sm font-medium text-green-600">
                      ✓ Profile photo selected
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                      <Image size={25} />
                    </div>

                    <p className="mt-3 font-semibold text-gray-700">
                      Upload your profile photo
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      JPG, PNG or other image formats
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                  className="mt-5 w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
                />
              </div>
            </div>

            <div className="mb-8 border-t border-gray-100 pt-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-600">
                  <FileImage size={18} />
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  National ID Card
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-5 transition hover:border-red-300">
                  <div className="mb-4">
                    <p className="font-semibold text-gray-800">
                      ID Card - Front
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Upload the front side
                    </p>
                  </div>

                  {formData.idFront && (
                    <img
                      src={formData.idFront}
                      alt="ID Front"
                      className="mb-4 h-40 w-full rounded-xl border bg-white object-cover shadow-sm"
                    />
                  )}

                  <input
                    type="file"
                    name="idFront"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                    className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm"
                  />
                </div>

                <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-5 transition hover:border-red-300">
                  <div className="mb-4">
                    <p className="font-semibold text-gray-800">
                      ID Card - Back
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Upload the back side
                    </p>
                  </div>

                  {formData.idBack && (
                    <img
                      src={formData.idBack}
                      alt="ID Back"
                      className="mb-4 h-40 w-full rounded-xl border bg-white object-cover shadow-sm"
                    />
                  )}

                  <input
                    type="file"
                    name="idBack"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                    className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="mb-8 border-t border-gray-100 pt-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-600">
                  <Lock size={18} />
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  Account Security
                </h3>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      minLength={6}
                      required
                      className=    "w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      minLength={6}
                      required
                      className=    "w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-8">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-red-200 transition duration-200 hover:bg-red-700 hover:shadow-xl"
              >
                <Heart size={20} className="fill-white" />
                Create Account
              </button>

              <p className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-red-600 transition hover:text-red-700"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Your information is used only to help connect donors
          with people who need blood.
        </p>
      </section>
    </div>
  );
}

export default Register;