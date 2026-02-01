import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Send, Facebook, Instagram, Linkedin } from "lucide-react";
import UnelmaMailForm from "../mail/UnelmaMailForm";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://unelma-platform-backend.onrender.com/api/footers?populate=*",
      )
      .then((res) => {
        if (res.data.data.length > 0) {
          setFooterData(res.data.data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (!footerData) return null;

  const renderSocialIcon = (platform) => {
    switch (platform) {
      case "Facebook":
        return <Facebook className="w-5 h-5" />;
      case "Instagram":
        return <Instagram className="w-5 h-5" />;
      case "LinkedIn":
        return <Linkedin className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#EAF4F4] to-[#F9FAFB] text-gray-700 pt-16 pb-8 px-6 md:px-12 lg:px-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#3780B2] mb-3">
            {footerData.brandName}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {footerData.brandDescription}
          </p>
          <div className="flex gap-4">
            {footerData.socialLink.map((link) => (
              <a
                key={link.id}
                href={link.url}
                className={`w-9 h-9 flex items-center justify-center bg-white rounded-full shadow hover:scale-110 transition-all`}
                style={{ backgroundColor: link.color || "white" }}
              >
                {renderSocialIcon(link.platform)}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {footerData.quickLink.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  className="hover:text-[#008081] transition-colors"
                  style={{ color: link.hoverColor || "inherit" }}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Resources
          </h3>
          <ul className="space-y-3">
            {footerData.resourceLink.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  className="hover:text-[#3780B2] transition-colors"
                  style={{ color: link.hoverColor || "inherit" }}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {footerData.newsletterTitle}
          </h3>
          <p className="text-gray-600 mb-4">
            {footerData.newsletterDescription}
          </p>
          <UnelmaMailForm />
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 mt-12 pt-6 text-center text-sm text-gray-500">
        {footerData.copyrightText}
      </div>
    </footer>
  );
};

export default Footer;
