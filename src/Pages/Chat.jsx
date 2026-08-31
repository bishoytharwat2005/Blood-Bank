import React from "react";

import {
  ArrowLeft,
  Send,
  Phone,
  MapPin,
  Heart,
  User,
} from "lucide-react";

import useChat from "@/hooks/useChat";

function Chat() {
  const {
    donor,
    message,
    setMessage,
    messages,
    donorName,
    donorCity,
    donorBloodType,
    handleSend,
    handleBack,
    handleFindBlood,
  } = useChat();

  if (!donor) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <Heart className="h-10 w-10 text-red-600" />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            Donor Not Found
          </h2>

          <p className="mt-2 text-gray-500">
            Please select a donor from Find Blood.
          </p>

          <button
            type="button"
            onClick={handleFindBlood}
            className="mt-6 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Find Blood
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-100 px-4 py-10">
      <div className="mx-auto flex max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

        <div className="flex items-center gap-4 border-b bg-white p-5">

          <button
            type="button"
            onClick={handleBack}
            className="rounded-xl p-2 transition hover:bg-gray-100"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-100">
            {donor.image || donor.photo ? (
              <img
                src={donor.image || donor.photo}
                alt={donorName}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 text-red-600" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate font-bold text-gray-900">
              {donorName}
            </h1>

            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              <span>{donorCity}</span>
            </div>
          </div>

          {donor.phone && (
            <a
              href={`tel:${donor.phone}`}
              className="rounded-xl bg-green-100 p-3 text-green-600 transition hover:bg-green-200"
            >
              <Phone className="h-5 w-5" />
            </a>
          )}
        </div>

        <div className="flex items-center justify-between border-b bg-red-50 px-5 py-4">

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Blood Type
            </p>

            <p className="mt-1 text-lg font-bold text-red-600">
              {donorBloodType}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Status
            </p>

            <p className="mt-1 font-semibold text-green-600">
              Contact Started
            </p>
          </div>

        </div>

        <div className="min-h-[500px] space-y-4 bg-gray-50 p-5">

          {messages.length === 0 ? (
            <div className="flex h-[450px] flex-col items-center justify-center text-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <Heart className="h-10 w-10 fill-red-600 text-red-600" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                Start a Conversation
              </h2>

              <p className="mt-2 max-w-md text-gray-500">
                Send a message to {donorName} about the blood donation.
              </p>

            </div>
          ) : (
            messages.map((item) => {

              if (item.sender === "system") {
                return (
                  <div
                    key={item.id}
                    className="mx-auto max-w-md rounded-xl bg-red-50 p-3 text-center text-sm text-red-600"
                  >
                    {item.text}
                  </div>
                );
              }

              const isMine = item.sender === "user";

              return (
                <div
                  key={item.id}
                  className={`flex ${
                    isMine
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      isMine
                        ? "rounded-br-none bg-red-600 text-white"
                        : "rounded-bl-none bg-white text-gray-800 shadow-sm"
                    }`}
                  >
                    <p className="text-sm font-semibold">
                      {isMine
                        ? "You"
                        : item.senderName || donorName}
                    </p>

                    <p className="mt-1 break-words">
                      {item.text}
                    </p>

                    <p
                      className={`mt-2 text-xs ${
                        isMine
                          ? "text-red-100"
                          : "text-gray-400"
                      }`}
                    >
                      {new Date(
                        item.createdAt
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}

        </div>

        <form
          onSubmit={handleSend}
          className="flex gap-3 border-t bg-white p-4"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
          />

          <button
            type="submit"
            disabled={!message.trim()}
            className="flex items-center justify-center rounded-xl bg-red-600 px-5 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>

      </div>
    </section>
  );
}

export default Chat;
