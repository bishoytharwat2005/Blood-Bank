import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import homeImage from "../image/home img.jpg";
import aboutImage from "../image/aboutimgjpg.jpg";
import aboutWhoImage from "../image/peUhF8-bdT1xrp-lx9gfNq-vWDO6sBo6u6FJyyUUNYCnIbSS2Z0H7sZdUl40fdBGEvMQUJbM-fCmwkepN2OOt2RPrB7nm-6ig26tIPskxqUtCN2j1Y-1nR2Z5ycWGklqB2kFbWRHxCOdrHSjufEajHiolJz-qAEDdt-Nf2oWq2Jcld9TUToaJvUjrk_Lu-_A.jpg";

import useBloodCompatibility from "@/hooks/useBloodCompatibility";

function HomePage() {
  const {
    selectedType,
    setSelectedType,
    bloodTypes,
    bloodCompatibility,
  } = useBloodCompatibility();

  return (
    <>
      <section className="px-3 pt-3 sm:px-4 sm:pt-4">
        <div className="relative min-h-[650px] overflow-hidden rounded-2xl sm:min-h-[750px] sm:rounded-3xl lg:min-h-[800px] xl:min-h-[900px]">
          <img
            src={homeImage}
            alt="Blood Donation"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute inset-0 z-10 flex max-w-3xl flex-col justify-center px-5 py-10 text-white sm:px-8 md:px-12">
            <p className="mb-3 text-base font-medium text-red-400 sm:text-lg md:text-xl">
              Donate blood, save a life!
            </p>

            <h1 className="text-3xl font-bold uppercase leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Your blood donation can bring hope to someone in need
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200 sm:mt-5 sm:text-base md:text-lg">
              Join our network connecting critical blood supply requests with
              voluntary donors near you.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button
                asChild
                className="w-full rounded-2xl bg-red-600 px-5 py-6 text-sm font-semibold text-white hover:bg-red-700 sm:w-auto sm:px-6 sm:text-base"
              >
                <Link to="/posts">Request Blood Now 🩸</Link>
              </Button>

              <Button
                asChild
                className="w-full rounded-2xl bg-white px-5 py-6 text-sm font-semibold text-red-600 hover:bg-slate-100 sm:w-auto sm:px-6 sm:text-base"
              >
                <Link to="/find-blood">Find Blood Requests</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-3 py-12 sm:px-4 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <span className="text-lg font-bold text-red-600 sm:text-2xl">
            🩸 BLOOD COMPATIBILITY
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            Find Your Blood Compatibility
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Select your blood type to discover which blood types you can
            receive from and donate to.
          </p>

          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4 sm:gap-4">
            {bloodTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`rounded-2xl border-2 px-4 py-5 text-xl font-bold transition duration-300 sm:px-6 sm:py-6 sm:text-2xl ${
                  selectedType === type
                    ? "scale-105 border-red-600 bg-red-600 text-white shadow-lg"
                    : "border-red-100 bg-red-50 text-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {selectedType && (
            <div className="mx-auto mt-10 max-w-4xl sm:mt-12">
              <div className="mb-6 sm:mb-8">
                <p className="text-sm text-gray-500 sm:text-base">
                  Compatibility results for
                </p>

                <h3 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                  {selectedType}
                </h3>
              </div>

              <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                <div className="rounded-3xl border border-green-100 bg-white p-5 text-left shadow-sm sm:p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 text-xl sm:h-12 sm:w-12 sm:text-2xl">
                      🩸
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 sm:text-xl">
                        You Can Receive From
                      </h4>

                      <p className="text-xs text-gray-500 sm:text-sm">
                        Compatible blood types
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {bloodCompatibility[selectedType].receive.map((type) => (
                      <span
                        key={type}
                        className="rounded-xl bg-green-50 px-4 py-2 font-bold text-green-600 sm:px-5 sm:py-3"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-red-100 bg-white p-5 text-left shadow-sm sm:p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-xl sm:h-12 sm:w-12 sm:text-2xl">
                      ❤️
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 sm:text-xl">
                        You Can Donate To
                      </h4>

                      <p className="text-xs text-gray-500 sm:text-sm">
                        Compatible blood types
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {bloodCompatibility[selectedType].donate.map((type) => (
                      <span
                        key={type}
                        className="rounded-xl bg-red-50 px-4 py-2 font-bold text-red-600 sm:px-5 sm:py-3"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                asChild
                className="mt-8 w-full rounded-xl bg-red-600 px-8 py-6 font-semibold text-white hover:bg-red-700 sm:mt-10 sm:w-auto"
              >
                <Link to="/find-blood">Find Compatible Donors</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="px-3 py-12 sm:px-4 sm:py-16 lg:py-20">
        <h1 className="mb-8 text-center text-3xl font-bold text-red-600 sm:mb-12 sm:text-4xl md:text-5xl">
          About Blood Bank
        </h1>

        <div className="mx-auto grid max-w-7xl items-center gap-8 overflow-hidden rounded-3xl bg-red-50 p-5 sm:p-6 md:grid-cols-2 md:gap-10 md:p-10">
          <div className="space-y-5 sm:space-y-6">
            <span className="inline-block rounded-full bg-red-100 px-4 py-2 text-xs font-semibold text-red-600 sm:text-sm">
              ❤️ About Our Blood Bank
            </span>

            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
              Save a Life,
              <span className="block text-red-600">
                Donate Blood
              </span>
            </h2>

            <p className="max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              Every drop of blood can give someone another chance at life. Our
              mission is to connect generous donors with patients who need
              blood during emergencies and medical procedures.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button
                asChild
                className="w-full rounded-xl bg-red-600 px-6 py-6 font-semibold text-white hover:bg-red-700 sm:w-auto"
              >
                <Link to="/posts">Request Blood Now 🩸</Link>
              </Button>

              <Button
                asChild
                className="w-full rounded-xl border-2 border-red-600 bg-transparent px-6 py-6 font-semibold text-red-600 hover:bg-red-600 hover:text-white sm:w-auto"
              >
                <Link to="/find-blood">Find Blood Requests</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={aboutImage}
                alt="Blood donation"
                className="h-[300px] w-full object-cover sm:h-[380px] md:h-[420px]"
              />
            </div>

            <div className="absolute bottom-4 left-4 rounded-2xl bg-white px-4 py-3 shadow-lg sm:bottom-5 sm:left-5 sm:px-5 sm:py-4">
              <p className="text-xs text-gray-500 sm:text-sm">
                Your donation matters
              </p>

              <p className="text-base font-bold text-red-600 sm:text-xl">
                ❤️ Save Lives
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 py-12 sm:px-4 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2 md:gap-10">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src={aboutWhoImage}
                alt="Blood donation"
                loading="lazy"
                className="h-[320px] w-full object-cover sm:h-[400px] md:h-[450px]"
              />
            </div>

            <div className="absolute bottom-4 left-4 rounded-2xl bg-white px-4 py-3 shadow-xl sm:bottom-5 sm:left-5 sm:px-6 sm:py-4">
              <p className="text-xs text-gray-500 sm:text-sm">
                Every Drop Matters
              </p>

              <p className="text-base font-bold text-red-600 sm:text-xl">
                ❤️ Save Lives
              </p>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6">
            <span className="inline-block rounded-full bg-red-100 px-4 py-2 text-xs font-semibold text-red-600 sm:text-sm">
              ❤️ WHO WE ARE
            </span>

            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
              We Connect Donors
              <span className="block text-red-600">
                With Those in Need
              </span>
            </h2>

            <p className="text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              Our Blood Bank is a healthcare-focused platform that connects
              generous blood donors with patients and hospitals that need
              blood.
            </p>

            <p className="text-sm leading-7 text-gray-500 sm:text-base">
              We make the blood donation process easier, faster, and more
              accessible while helping people find the right blood type when
              they need it most.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
                <div className="mb-2 text-2xl">🩸</div>

                <h3 className="font-bold text-gray-900">
                  Easy Donation
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Find and connect with blood donation opportunities.
                </p>
              </div>

              <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
                <div className="mb-2 text-2xl">🤝</div>

                <h3 className="font-bold text-gray-900">
                  Help Others
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Your donation can give someone another chance at life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-red-50 px-3 py-12 sm:px-4 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center sm:mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-red-600 sm:text-sm">
              Make a Difference
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              Why Donate Blood?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              A small act of kindness can make a huge difference in someone's
              life.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div className="rounded-3xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl sm:p-7">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-3xl sm:h-16 sm:w-16">
                ❤️
              </div>

              <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                Save Lives
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Your blood donation can help patients during emergencies and
                medical procedures.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl sm:p-7">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-3xl sm:h-16 sm:w-16">
                🤝
              </div>

              <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                Help Others
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Support people in your community who urgently need blood.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl sm:p-7">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-3xl sm:h-16 sm:w-16">
                🏥
              </div>

              <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                Support Hospitals
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Help hospitals maintain enough blood supplies for patients in
                need.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl sm:p-7">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-3xl sm:h-16 sm:w-16">
                ⭐
              </div>

              <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                Be a Hero
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                A simple donation can give someone another chance at life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 py-12 sm:px-4 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl rounded-3xl bg-red-600 px-5 py-10 text-white sm:px-8 sm:py-12 md:px-12">
          <div className="mb-8 text-center sm:mb-10">
            <p className="text-sm font-semibold text-red-100">
              OUR IMPACT
            </p>

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Together, We Make a Difference
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            <div className="text-center">
              <p className="text-3xl font-bold sm:text-4xl">5,000+</p>
              <p className="mt-2 text-sm text-red-100 sm:text-base">
                Registered Donors
              </p>
            </div>

            <div className="text-center">
              <p className="text-3xl font-bold sm:text-4xl">2,500+</p>
              <p className="mt-2 text-sm text-red-100 sm:text-base">
                Blood Donations
              </p>
            </div>

            <div className="text-center">
              <p className="text-3xl font-bold sm:text-4xl">1,200+</p>
              <p className="mt-2 text-sm text-red-100 sm:text-base">
                Lives Helped
              </p>
            </div>

            <div className="text-center">
              <p className="text-3xl font-bold sm:text-4xl">24/7</p>
              <p className="mt-2 text-sm text-red-100 sm:text-base">
                Emergency Support
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 pb-12 sm:px-4 sm:pb-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 to-red-500 px-5 py-12 text-center text-white sm:px-8 sm:py-16 md:px-12">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 text-4xl sm:text-5xl">
              ❤️
            </div>

            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Your Blood Can Save a Life
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-red-100 sm:text-lg sm:leading-8">
              Don't wait for an emergency to become a donor. Your donation
              today could give someone another chance at life.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button
                asChild
                className="w-full rounded-xl bg-white px-8 py-6 font-semibold text-red-600 hover:bg-red-50 sm:w-auto"
              >
                <Link to="/Donate">Become a Donor</Link>
              </Button>

              <Button
                asChild
                className="w-full rounded-xl border-2 border-white bg-transparent px-8 py-6 font-semibold text-white hover:bg-white hover:text-red-600 sm:w-auto"
              >
                <Link to="/find-blood">Find Blood</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;