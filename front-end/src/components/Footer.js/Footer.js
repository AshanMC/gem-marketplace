import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"; // ✅ Must match install

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-zinc-900 text-orange-100 py-10 px-4 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-orange-400">About Gemora</h4>
          <p className="text-sm">
            Gemora offers a curated selection of fine gemstones and premium accessories to bring timeless elegance into your life.
          </p>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-orange-400">Contact Us</h4>
          <ul className="text-sm space-y-2">
            <li>Email: <a href="mailto:support@gemora.com" className="underline">support@gemora.com</a></li>
            <li>Phone: +94 77 123 4567</li>
            <li>Address: 123 Gem Street, Colombo, Sri Lanka</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-orange-400">Follow Us</h4>
          <div className="flex space-x-4 text-2xl text-white">
            <a href="#" className="hover:text-blue-500 transition" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-pink-500 transition" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-sky-400 transition" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="text-sm text-orange-200 text-center mt-10 border-t border-slate-700 pt-6">
        &copy; {new Date().getFullYear()} Gemora. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
