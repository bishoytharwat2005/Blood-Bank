import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

function Navbar() {
  const navigate = useNavigate();

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

    window.dispatchEvent(new Event("authChange"));

    navigate("/login");
  };

  return (
    <section className="fixed left-0 top-0 z-50 w-full bg-white px-4 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl p-4 shadow-lg">
        <Link
          to="/"
          className="text-3xl font-bold text-red-500"
        >
          Blood Bank
        </Link>

        <ul className="flex items-center gap-5">
          <li>
            <Link to="/" className="hover:text-red-500">
              Home
            </Link>
          </li>

          <li>
            <Link to="/about" className="hover:text-red-500">
              About
            </Link>
          </li>

          <li>
            <Link to="/find-blood" className="hover:text-red-500">
              Find Blood
            </Link>
          </li>

          <li>
            <Link to="/posts" className="hover:text-red-500">
              Posts Blood
            </Link>
          </li>

          <li>
            <Link to="/donate" className="hover:text-red-500">
              Donate Blood
            </Link>
          </li>

          <li>
            <Link to="/contact" className="hover:text-red-500">
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button className="rounded-full bg-red-500 px-5 text-white hover:bg-red-600">
                  Login
                </Button>
              </Link>

              <Link to="/register">
                <Button className="rounded-full bg-red-500 px-5 text-white hover:bg-red-600">
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-red-100 transition hover:bg-red-200"
              >
                {userPhoto ? (
                  <img
                    src={userPhoto}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xl">👤</span>
                )}
              </Link>

              <Link
                to="/profile"
                className="max-w-40 truncate text-sm font-medium text-gray-700 hover:text-red-600"
              >
                {userName}
              </Link>

              <Button
                onClick={handleLogout}
                className="rounded-full bg-gray-100 px-4 text-red-500 hover:bg-red-50"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Navbar;