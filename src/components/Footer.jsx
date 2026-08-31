import React from "react";
import { Link } from "react-router";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600">
                <Heart
                  size={25}
                  className="fill-white text-white"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  Blood<span className="text-red-500">Bank</span>
                </h2>

                <p className="text-xs text-gray-400">
                  Save Lives Together
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm leading-7 text-gray-400">
              Connecting blood donors with people in need.
              Together, we can make sure that every patient
              gets the blood they need when they need it.
            </p>

            {/* Social Media */}
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-sm font-bold text-gray-300 transition hover:bg-red-600 hover:text-white"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-sm font-bold text-gray-300 transition hover:bg-red-600 hover:text-white"
              >
                ig
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-sm font-bold text-gray-300 transition hover:bg-red-600 hover:text-white"
              >
                X
              </a>
            </div>
          </div>

          {/* =========================
              QUICK LINKS
          ========================== */}
          <div>
            <h3 className="mb-6 text-lg font-bold">
              Quick Links
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 transition hover:text-red-500"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/find-blood"
                  className="text-gray-400 transition hover:text-red-500"
                >
                  Find Blood
                </Link>
              </li>

              <li>
                <Link
                  to="/posts"
                  className="text-gray-400 transition hover:text-red-500"
                >
                  Blood Requests
                </Link>
              </li>

              <li>
                <Link
                  to="/donate-blood"
                  className="text-gray-400 transition hover:text-red-500"
                >
                  Donate Blood
                </Link>
              </li>

              <li>
                <Link
                  to="/campaigns"
                  className="text-gray-400 transition hover:text-red-500"
                >
                  Campaigns
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-gray-400 transition hover:text-red-500"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 transition hover:text-red-500"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-lg font-bold">
              Contact Us
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600/10 text-red-500">
                  <MapPin size={19} />
                </div>

                <div>
                  <p className="font-semibold text-gray-200">
                    Location
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Cairo, Egypt
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600/10 text-red-500">
                  <Phone size={19} />
                </div>

                <div>
                  <p className="font-semibold text-gray-200">
                    Phone
                  </p>

                  <a
                    href="tel:+201000000000"
                    className="mt-1 block text-sm text-gray-500 transition hover:text-red-500"
                  >
                    +20 100 000 0000
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600/10 text-red-500">
                  <Mail size={19} />
                </div>

                <div>
                  <p className="font-semibold text-gray-200">
                    Email
                  </p>

                  <a
                    href="mailto:info@bloodbank.com"
                    className="mt-1 block text-sm text-gray-500 transition hover:text-red-500"
                  >
                    info@bloodbank.com
                  </a>
                </div>
              </div>

            </div>
          </div>
          <div>
            <h3 className="mb-6 text-lg font-bold">
              Why Donate Blood?
            </h3>

            <p className="leading-7 text-gray-400">
              Your donation can help save lives. Every blood
              donation can make a real difference for patients
              who urgently need blood.
            </p>

            <div className="mt-6 rounded-xl border border-gray-800 bg-gray-900 p-5">
              <p className="text-sm font-semibold text-red-500">
                ❤️ Every Drop Counts
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Be someone's reason to live. Donate blood and
                help your community.
              </p>
            </div>
          </div>

        </div>
      </div>
      <div className="border-y border-gray-800 bg-gray-900">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 text-center md:flex-row md:text-left">

          <div>
            <h3 className="text-xl font-bold">
              Ready to Save a Life?
            </h3>

            <p className="mt-1 text-gray-400">
              Become a blood donor today.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/donate"
              className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Donate Blood ❤️
            </Link>

            <Link
              to="/find-blood"
              className="rounded-xl border border-gray-700 px-6 py-3 font-semibold text-white transition hover:border-red-600 hover:text-red-500"
            >
              Find Blood
            </Link>
          </div>

        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 py-6 text-center md:flex-row">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BloodBank.
            All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-sm">
            <Link
              to="/privacy"
              className="text-gray-500 transition hover:text-red-500"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-gray-500 transition hover:text-red-500"
            >
              Terms & Conditions
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition hover:bg-red-700 hover:scale-110"
          >
            <ArrowUp size={20} />
          </button>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
