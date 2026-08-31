import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

function Navbar() {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getUserData = () => {
    const savedUser = localStorage.getItem("userData");

    if (!savedUser) return null;

    try {
      return JSON.parse(savedUser);
    } catch {
      return null;
    }
  };

  const getUserName = () => {
    const user = getUserData();

    if (user) {
      return `${user.firstName} ${user.lastName}`;
    }

    return localStorage.getItem("userName") || "";
  };

  const getUserPhoto = () => {
    const user = getUserData();
    return user?.photo || "";
  };

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const [userName, setUserName] = useState(getUserName());
  const [userPhoto, setUserPhoto] = useState(getUserPhoto());

  useEffect(() => {
    const updateAuth = () => {
      setIsAuthenticated(
        localStorage.getItem("isAuthenticated") === "true"
      );

      setUserName(getUserName());
      setUserPhoto(getUserPhoto());
    };

    window.addEventListener("authChange", updateAuth);

    return () => {
      window.removeEventListener("authChange", updateAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");

    setIsAuthenticated(false);
    setUserName("");
    setUserPhoto("");
    setIsMenuOpen(false);

    window.dispatchEvent(new Event("authChange"));

    navigate("/login");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <section className="fixed left-0 top-0 z-50 w-full bg-white px-2 py-3 sm:px-4 sm:py-4">
      <div className="mx-auto max-w-7xl rounded-2xl p-3 shadow-lg sm:p-4">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/"
            className="shrink-0 text-2xl font-bold text-red-500 sm:text-3xl"
          >
            Blood Bank
          </Link>

          <ul className="hidden items-center gap-3 text-sm md:flex lg:gap-5 lg:text-base">
            <li>
              <Link to="/" className="whitespace-nowrap hover:text-red-500">
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="whitespace-nowrap hover:text-red-500"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/find-blood"
                className="whitespace-nowrap hover:text-red-500"
              >
                Find Blood
              </Link>
            </li>

            <li>
              <Link
                to="/posts"
                className="whitespace-nowrap hover:text-red-500"
              >
                Posts Blood
              </Link>
            </li>

            <li>
              <Link
                to="/donate"
                className="whitespace-nowrap hover:text-red-500"
              >
                Donate Blood
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="whitespace-nowrap hover:text-red-500"
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="hidden shrink-0 items-center gap-2 lg:gap-3 md:flex">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button className="rounded-full bg-red-500 px-4 text-sm text-white hover:bg-red-600 lg:px-5 lg:text-base">
                    Login
                  </Button>
                </Link>

                <Link to="/register">
                  <Button className="rounded-full bg-red-500 px-4 text-sm text-white hover:bg-red-600 lg:px-5 lg:text-base">
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-100 transition hover:bg-red-200 lg:h-10 lg:w-10"
                >
                  {userPhoto ? (
                    <img
                      src={userPhoto}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-lg lg:text-xl">👤</span>
                  )}
                </Link>

                <Link
                  to="/profile"
                  className="max-w-24 truncate text-xs font-medium text-gray-700 hover:text-red-600 lg:max-w-40 lg:text-sm"
                >
                  {userName}
                </Link>

                <Button
                  onClick={handleLogout}
                  className="rounded-full bg-gray-100 px-3 text-xs text-red-500 hover:bg-red-50 lg:px-4 lg:text-sm"
                >
                  Logout
                </Button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-2xl text-red-500 md:hidden"
          >
            {isMenuOpen ? "×" : "☰"}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mt-4 border-t border-gray-100 pt-4 md:hidden">
            <ul className="flex flex-col gap-1">
              <li>
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3 hover:bg-red-50 hover:text-red-500"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3 hover:bg-red-50 hover:text-red-500"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/find-blood"
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3 hover:bg-red-50 hover:text-red-500"
                >
                  Find Blood
                </Link>
              </li>

              <li>
                <Link
                  to="/posts"
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3 hover:bg-red-50 hover:text-red-500"
                >
                  Posts Blood
                </Link>
              </li>

              <li>
                <Link
                  to="/donate"
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3 hover:bg-red-50 hover:text-red-500"
                >
                  Donate Blood
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3 hover:bg-red-50 hover:text-red-500"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className="mt-4 border-t border-gray-100 pt-4">
              {!isAuthenticated ? (
                <div className="flex flex-col gap-3">
                  <Link to="/login" onClick={closeMenu}>
                    <Button className="w-full rounded-full bg-red-500 py-5 text-white hover:bg-red-600">
                      Login
                    </Button>
                  </Link>

                  <Link to="/register" onClick={closeMenu}>
                    <Button className="w-full rounded-full bg-red-500 py-5 text-white hover:bg-red-600">
                      Register
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-xl bg-red-50 p-3"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-100">
                      {userPhoto ? (
                        <img
                          src={userPhoto}
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-xl">👤</span>
                      )}
                    </div>

                    <span className="truncate font-medium text-gray-700">
                      {userName}
                    </span>
                  </Link>

                  <Button
                    onClick={handleLogout}
                    className="w-full rounded-full bg-gray-100 py-5 text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Navbar;

