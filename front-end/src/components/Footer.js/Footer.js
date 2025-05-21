import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-900 text-orange-300  text-center py-4 mt-10">
      <p>&copy; {new Date().getFullYear()} Gemora. All rights reserved.</p>
    </footer>
  );
};

export default Footer;