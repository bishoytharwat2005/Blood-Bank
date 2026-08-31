import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

import AboutU from "../image/peUhF8-bdT1xrp-lx9gfNq-vWDO6sBo6u6FJyyUUNYCnIbSS2Z0H7sZdUl40fdBGEvMQUJbM-fCmwkepN2OOt2RPrB7nm-6ig26tIPskxqUtCN2j1Y-1nR2Z5ycWGklqB2kFbWRHxCOdrHSjufEajHiolJz-qAEDdt-Nf2oWq2Jcld9TUToaJvUjrk_Lu-_A.jpg";
import HeadAbout from "../image/header-bg.jpg";
import aboutImage from "../image/aboutimgjpg.jpg";
function About() {
  return (
    <>
      <section className="mt-25">
        <div className="px-4">
          <div className="relative h-[300px] overflow-hidden rounded-3xl">
            <img
              src={HeadAbout}
              alt="Blood Bank"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <h1 className="mb-12 text-center text-4xl font-bold text-red-600 md:text-5xl">
          About Blood Bank
        </h1>

        <div className="mx-auto grid max-w-6xl items-center gap-12 overflow-hidden rounded-3xl bg-red-50 p-6 md:grid-cols-2 md:p-10">
          <div className="space-y-6">
            <span className="inline-block rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
              ❤️ About Our Blood Bank
            </span>

            <h2 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              Save a Life,
              <span className="block text-red-600">
                Donate Blood
              </span>
            </h2>

            <p className="max-w-xl text-lg leading-8 text-gray-600">
              Every drop of blood can give someone another chance at life. Our
              mission is to connect generous donors with patients who need
              blood during emergencies and medical procedures.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="rounded-xl bg-red-600 px-6 py-6 font-semibold text-white hover:bg-red-700"
              >
                <Link to="/posts">
                  Request Blood Now 🩸
                </Link>
              </Button>

              <Button
                asChild
                className="rounded-xl border-2 border-red-600 bg-transparent px-6 py-6 font-semibold text-red-600 hover:bg-red-600 hover:text-white"
              >
                <Link to="/find-blood">
                  Find Blood Requests
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={aboutImage}
                alt="Blood donation"
                className="h-[420px] w-full object-cover"
              />
            </div>

            <div className="absolute bottom-5 left-5 rounded-2xl bg-white px-5 py-4 shadow-lg">
              <p className="text-sm text-gray-500">
                Your donation matters
              </p>

              <p className="text-xl font-bold text-red-600">
                ❤️ Save Lives
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src={AboutU}
                alt="Blood donation"
                loading="lazy"
                className="h-[450px] w-full object-cover"
              />
            </div>

            <div className="absolute bottom-5 left-5 rounded-2xl bg-white px-6 py-4 shadow-xl">
              <p className="text-sm text-gray-500">
                Every Drop Matters
              </p>

              <p className="text-xl font-bold text-red-600">
                ❤️ Save Lives
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <span className="inline-block rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
              ❤️ WHO WE ARE
            </span>

            <h2 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              We Connect Donors
              <span className="block text-red-600">
                With Those in Need
              </span>
            </h2>

            <p className="text-lg leading-8 text-gray-600">
              Our Blood Bank is a healthcare-focused platform that connects
              generous blood donors with patients and hospitals that need
              blood.
            </p>

            <p className="leading-7 text-gray-500">
              We make the blood donation process easier, faster, and more
              accessible while helping people find the right blood type when
              they need it most.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
                <div className="mb-2 text-2xl">
                  🩸
                </div>

                <h3 className="font-bold text-gray-900">
                  Easy Donation
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Find and connect with blood donation opportunities.
                </p>
              </div>

              <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
                <div className="mb-2 text-2xl">
                  🤝
                </div>

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

      <section className="bg-red-50 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
              Make a Difference
            </span>

            <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
              Why Donate Blood?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              A small act of kindness can make a huge difference in someone's
              life.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl bg-white p-7 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
                ❤️
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Save Lives
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Your blood donation can help patients during emergencies and
                medical procedures.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-7 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
                🤝
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Help Others
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Support people in your community who urgently need blood.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-7 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
                🏥
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Support Hospitals
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Help hospitals maintain enough blood supplies for patients in
                need.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-7 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
                ⭐
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Be a Hero
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                A simple donation can give someone another chance at life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl rounded-3xl bg-red-600 px-6 py-12 text-white md:px-12">
          <div className="mb-10 text-center">
            <p className="font-semibold text-red-100">
              OUR IMPACT
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              Together, We Make a Difference
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <p className="text-4xl font-bold">
                5,000+
              </p>

              <p className="mt-2 text-red-100">
                Registered Donors
              </p>
            </div>

            <div className="text-center">
              <p className="text-4xl font-bold">
                2,500+
              </p>

              <p className="mt-2 text-red-100">
                Blood Donations
              </p>
            </div>

            <div className="text-center">
              <p className="text-4xl font-bold">
                1,200+
              </p>

              <p className="mt-2 text-red-100">
                Lives Helped
              </p>
            </div>

            <div className="text-center">
              <p className="text-4xl font-bold">
                24/7
              </p>

              <p className="mt-2 text-red-100">
                Emergency Support
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 to-red-500 px-6 py-16 text-center text-white md:px-12">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 text-5xl">
              ❤️
            </div>

            <h2 className="text-4xl font-bold md:text-5xl">
              Your Blood Can Save a Life
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-red-100">
              Don't wait for an emergency to become a donor. Your donation
              today could give someone another chance at life.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                asChild
                className="rounded-xl bg-white px-8 py-6 font-semibold text-red-600 hover:bg-red-50"
              >
                <Link to="/donate">
                  Become a Donor
                </Link>
              </Button>

              <Button
                asChild
                className="rounded-xl border-2 border-white bg-transparent px-8 py-6 font-semibold text-white hover:bg-white hover:text-red-600"
              >
                <Link to="/find-blood">
                  Find Blood
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
