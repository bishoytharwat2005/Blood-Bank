import React from "react";
import {
Mail,
Phone,
MapPin,
Clock,
Send,
MessageCircle,
} from "lucide-react";

import useContact from "@/hooks/useContact";

function Contact() {
const {
formData,
submitted,
handleChange,
handleSubmit,
} = useContact();

return ( <div className="min-h-screen bg-gray-50"> <section className="mt-16 bg-red-600 px-6 py-24 text-center text-white"> <p className="mb-3 font-semibold uppercase tracking-wider">
❤️ Get In Touch </p>

```
    <h1 className="text-4xl font-bold md:text-5xl">
      Contact Us
    </h1>

    <p className="mx-auto mt-5 max-w-2xl text-red-100">
      Have a question, need help, or want to know more about
      blood donation? We are here to help.
    </p>
  </section>

  <section className="px-6 py-16">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 text-center shadow-md transition hover:-translate-y-1">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <MapPin size={25} />
          </div>

          <h3 className="mt-5 text-lg font-bold">
            Our Location
          </h3>

          <p className="mt-2 text-gray-500">
            Cairo, Egypt
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 text-center shadow-md transition hover:-translate-y-1">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <Phone size={25} />
          </div>

          <h3 className="mt-5 text-lg font-bold">
            Phone
          </h3>

          <a
            href="tel:+201000000000"
            className="mt-2 block text-gray-500 hover:text-red-600"
          >
            +20 100 000 0000
          </a>
        </div>

        <div className="rounded-2xl bg-white p-6 text-center shadow-md transition hover:-translate-y-1">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <Mail size={25} />
          </div>

          <h3 className="mt-5 text-lg font-bold">
            Email
          </h3>

          <a
            href="mailto:info@bloodbank.com"
            className="mt-2 block text-gray-500 hover:text-red-600"
          >
            info@bloodbank.com
          </a>
        </div>

        <div className="rounded-2xl bg-white p-6 text-center shadow-md transition hover:-translate-y-1">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <Clock size={25} />
          </div>

          <h3 className="mt-5 text-lg font-bold">
            Working Hours
          </h3>

          <p className="mt-2 text-gray-500">
            Sat - Thu: 9AM - 6PM
          </p>
        </div>
      </div>
    </div>
  </section>

  <section className="px-6 pb-20">
    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
      <div className="flex flex-col justify-center">
        <span className="font-semibold text-red-600">
          💬 SEND US A MESSAGE
        </span>

        <h2 className="mt-3 text-4xl font-bold text-gray-900">
          We Would Love To
          <span className="text-red-600">
            {" "}
            Hear From You
          </span>
        </h2>

        <p className="mt-5 leading-7 text-gray-600">
          Whether you have a question about blood donation,
          need help finding a donor, or want to work with us,
          feel free to contact our team.
        </p>

        <div className="mt-8 rounded-2xl bg-red-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
              <MessageCircle size={22} />
            </div>

            <div>
              <h3 className="font-bold text-gray-900">
                Need urgent help?
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                If you are looking for blood urgently,
                use our Find Blood page to search for
                available donors.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-xl md:p-10">
        <h3 className="text-2xl font-bold text-gray-900">
          Send a Message
        </h3>

        <p className="mt-2 text-gray-500">
          Fill out the form and we will get back to you.
        </p>

        {submitted && (
          <div className="mt-5 rounded-xl bg-green-100 p-4 text-sm font-semibold text-green-700">
            ✅ Your message has been sent successfully!
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-7 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Your Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is this about?"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Message
            </label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows="5"
              required
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 font-semibold text-white transition hover:bg-red-700"
          >
            <Send size={18} />
            Send Message
          </button>
        </form>
      </div>
    </div>
  </section>

  <section className="bg-gray-950 px-6 py-16 text-center text-white">
    <h2 className="text-3xl font-bold">
      Ready to Make a Difference?
    </h2>

    <p className="mx-auto mt-4 max-w-xl text-gray-400">
      Your blood donation can give someone another chance
      at life.
    </p>

    <a
      href="/donate"
      className="mt-7 inline-block rounded-xl bg-red-600 px-7 py-3 font-semibold transition hover:bg-red-700"
    >
      Donate Blood ❤️
    </a>
  </section>
</div>
);
}

export default Contact;
