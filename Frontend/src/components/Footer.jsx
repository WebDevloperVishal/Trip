import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaArrowUp,
} from "react-icons/fa";
import logo from "../../src/assets/logo.png";

const Footer = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          alert("Message sent successfully!");
          formRef.current.reset();
        },
        () => alert("Failed to send message. Please try again later.")
      );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className="relative bg-linear-to-r from-green-600 via-green-600 to-blue-600 text-white py-10 px-6 md:px-12 border-t-4 border-yellow-400"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
       
        <div>
          <div className="flex items-center gap-3 mb-3 ">
            <img
              src={logo}
              alt="VitalTrip Logo"
              className="w-20 h-20 object-contain drop-shadow-md"
            />
            <h2 className="text-2xl font-extrabold tracking-wide">
              <span className="text-white">VITAL</span>
              <span className="text-yellow-300">Trip</span>
            </h2>
          </div>

          <p className="text-gray-100 max-w-md text-lg leading-relaxed mb-7">
            Discover hidden gems, authentic experiences, and expert travel
            insights with <b>VitalTrip</b>.
          </p>

          <h3 className="text-3xl font-bold mb-2 ">Follow Us</h3>
          <div className="flex gap-5 text-4xl">
            <a
              href="https://www.linkedin.com/in/imdineshbk"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-300 transition-transform hover:scale-110"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://instagram.com/__.dinesh.bk"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-300 transition-transform hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com/imdineshbk"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-300 transition-transform hover:scale-110"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com/imdineshbk"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-300 transition-transform hover:scale-110"
            >
              <FaTwitter />
            </a>
            
          </div>
        </div>

        {/* EmailJS Form */}
        <div className="bg-green-800/60 p-5 rounded-xl shadow-md backdrop-blur-md border border-green-700/40">
          <h3 className="text-lg font-semibold mb-4 text-yellow-200">
            Have a Query?
          </h3>
          <form ref={formRef} onSubmit={sendEmail} className="space-y-3">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              className="w-full p-2 rounded-md bg-white text-gray-800 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
              className="w-full p-2 rounded-md bg-white text-gray-800 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="3"
              required
              className="w-full p-2 rounded-md bg-white text-gray-800 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold py-2 rounded-md transition-all text-sm"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/20 mt-6 pt-4 text-center text-xs text-gray-200">
        © {new Date().getFullYear()}{" "}
        <b className="text-white">VitalTrip</b>. All rights reserved.
      </div>

      
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 bg-yellow-400 hover:bg-yellow-500 w-10 h-10 flex items-center justify-center rounded-full text-green-900 shadow-lg text-sm font-bold transition"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;
