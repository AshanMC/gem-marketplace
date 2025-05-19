import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-red-600 text-white text-center py-4 mt-10">
      <p>&copy; {new Date().getFullYear()} Gemora. All rights reserved.</p>
    </footer>
  );
};

export default Footer;