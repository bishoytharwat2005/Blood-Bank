import React from "react";
import { useNavigate } from "react-router";
import {
  Heart,
  Trash2,
  MessageCircle,
  Phone,
} from "lucide-react";

import useBloodRequests from "../hooks/useBloodRequests";
import useLikedRequests from "../hooks/useLikedRequests";

function Posts() {
  const navigate = useNavigate();

  const {
    requests,
    addRequest,
    deleteRequest,
  } = useBloodRequests();

  const {
    toggleLike,
    removeLike,
    isLiked,
  } = useLikedRequests();

  const getCurrentUser = () => {
    try {
      return JSON.parse(
        localStorage.getItem("userData") || "{}"
      );
    } catch {
      return {};
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const currentUser = getCurrentUser();

    const newRequest = {
      id: Date.now(),
      name: formData.get("firstName"),
      phone: formData.get("phone"),
      bloodGroup: formData.get("bloodGroup"),
      unitsNeeded: formData.get("unitsNeeded"),
      city: formData.get("city"),
      hospital: formData.get("hospital"),
      createdAt: new Date().toLocaleDateString("en-US"),
      createdBy:
        currentUser.email ||
        currentUser.userName ||
        currentUser.firstName ||
        "guest",
    };

    addRequest(newRequest);

    e.target.reset();

    alert("Blood request published successfully! 🩸");
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this request?"
    );

    if (!confirmed) return;

    deleteRequest(id);
    removeLike(id);
  };

  const handleChat = (request) => {
    const currentUser = getCurrentUser();

    const currentUserId =
      currentUser.email ||
      currentUser.userName ||
      currentUser.firstName ||
      "guest";

    const requestOwner =
      request.createdBy ||
      request.email ||
      request.phone ||
      request.name ||
      request.id;

    const conversationId =
      `request-${request.id}-${requestOwner}-${currentUserId}`;

    let chats = {};

    try {
      chats = JSON.parse(
        localStorage.getItem("blood_chats") || "{}"
      );
    } catch {
      chats = {};
    }

    if (!chats[conversationId]) {
      chats[conversationId] = [
        {
          id: Date.now(),
          sender: "system",
          text: `You started a conversation about the blood request for ${request.name}.`,
          createdAt: new Date().toISOString(),
        },
      ];
    }

    localStorage.setItem(
      "blood_chats",
      JSON.stringify(chats)
    );

    navigate("/chat", {
      state: {
        donor: {
          id: `request-${request.id}`,
          firstName: request.name,
          lastName: "",
          phone: request.phone,
          bloodGroup: request.bloodGroup,
          address: {
            city: request.city,
          },
          image: null,
          requestId: request.id,
          isRequest: true,
        },
        conversationId,
        request,
      },
    });
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12 mt-20">
      <div className="container mx-auto max-w-4xl">

        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-red-600 md:text-4xl">
            Create Blood Request 🩸
          </h2>

          <p className="text-sm text-slate-600 md:text-base">
            Fill in the required information below to publish your
            request to potential donors.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl md:p-8"
        >
          <h3 className="border-b pb-3 text-xl font-bold text-slate-800">
            Patient & Hospital Information
          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">
                Full Name *
              </label>

              <input
                type="text"
                name="firstName"
                required
                placeholder="John Doe"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">
                Phone Number *
              </label>

              <input
                type="tel"
                name="phone"
                required
                placeholder="+20 100 000 0000"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">
                Required Blood Group *
              </label>

              <select
                name="bloodGroup"
                required
                defaultValue="O+"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {[
                  "A+",
                  "A-",
                  "B+",
                  "B-",
                  "AB+",
                  "AB-",
                  "O+",
                  "O-",
                ].map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">
                Units / Bags Needed *
              </label>

              <select
                name="unitsNeeded"
                required
                defaultValue="1"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                  (num) => (
                    <option key={num} value={num}>
                      {num}{" "}
                      {num === 1
                        ? "Unit (Bag)"
                        : "Units (Bags)"}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">
                City / Region *
              </label>

              <select
                name="city"
                required
                defaultValue="Cairo"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="Cairo">Cairo</option>
                <option value="Giza">Giza</option>
                <option value="Alexandria">Alexandria</option>
                <option value="Mansoura">Mansoura</option>
                <option value="Tanta">Tanta</option>
                <option value="Aswan">Aswan</option>
                <option value="Luxor">Luxor</option>
                <option value="Qalyubia">Qalyubia</option>
                <option value="Asyut">Asyut</option>
                <option value="Sohag">Sohag</option>
                <option value="Fayoum">Fayoum</option>
                <option value="Minya">Minya</option>
                <option value="Beni Suef">Beni Suef</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-slate-600">
                Hospital / Specific Address *
              </label>

              <input
                type="text"
                name="hospital"
                required
                placeholder="e.g. City General Hospital - Main Branch"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded-xl bg-red-600 py-4 text-base font-bold text-white shadow-md transition hover:bg-red-700"
            >
              Publish Request 🩸
            </button>
          </div>
        </form>

        <div className="mt-12">

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">
              Blood Requests
            </h2>

            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600">
              {requests.length} Request(s)
            </span>
          </div>

          {requests.length === 0 ? (
            <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
              <p className="font-semibold text-slate-600">
                No blood requests yet.
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Create a request using the form above.
              </p>
            </div>
          ) : (
            <div className="space-y-4">

              {requests.map((request) => {
                const liked = isLiked(request.id);

                return (
                  <div
                    key={request.id}
                    className="rounded-2xl border border-slate-100 bg-white p-5 shadow-md transition hover:shadow-lg"
                  >

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                      <div className="flex items-center gap-4">

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-xl font-black text-red-600">
                          {request.bloodGroup}
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-slate-800">
                            {request.name}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            📍 {request.city} · 🏥{" "}
                            {request.hospital}
                          </p>

                          <p className="mt-1 text-sm text-slate-400">
                            📞 {request.phone}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Posted: {request.createdAt}
                          </p>
                        </div>

                      </div>

                      <div className="flex flex-wrap items-center gap-3">

                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                          {request.unitsNeeded}{" "}
                          {Number(request.unitsNeeded) === 1
                            ? "Bag"
                            : "Bags"}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleChat(request)}
                          className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
                        >
                          <MessageCircle size={17} />
                          Chat
                        </button>

                        <a
                          href={`tel:${request.phone}`}
                          className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-600 transition hover:bg-emerald-600 hover:text-white"
                        >
                          <Phone size={17} />
                          Call
                        </a>

                      </div>

                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">

                      <button
                        type="button"
                        onClick={() =>
                          toggleLike(request.id)
                        }
                        className={`flex items-center gap-2 rounded-xl px-4 py-2 transition ${
                          liked
                            ? "bg-red-50 text-red-600"
                            : "text-slate-400 hover:bg-red-50 hover:text-red-600"
                        }`}
                      >
                        <Heart
                          size={19}
                          fill={
                            liked
                              ? "currentColor"
                              : "none"
                          }
                        />

                        <span className="text-sm font-semibold">
                          {liked ? "Liked" : "Like"}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(request.id)
                        }
                        className="flex items-center gap-2 rounded-xl px-4 py-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={18} />

                        <span className="text-sm font-semibold">
                          Delete
                        </span>
                      </button>

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

export default Posts;
