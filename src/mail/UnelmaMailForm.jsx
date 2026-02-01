import React, { useEffect } from "react";
import { Mail, Send } from "lucide-react";

const UnelmaMailForm = () => {
  useEffect(() => {
    const scriptUrls = [
      "https://core.unelmamail.com/core/js/jquery-3.6.4.min.js",
      "https://core.unelmamail.com/core/js/jquery-migrate-3.4.1.min.js",
      "https://core.unelmamail.com/core/validate/jquery.validate.min.js",
      "https://core.unelmamail.com/jquery_validate_locale",
      "https://core.unelmamail.com/core/js/functions.js",
    ];

    scriptUrls.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    });

    const initForm = () => {
      if (window.jQuery && window.initJs) {
        window.jQuery(document).ready(function ($) {
          $(".subscribe-embedded-form form").validate({
            rules: {
              EMAIL: {
                required: true,
                email: true,
                remote:
                  "https://core.unelmamail.com/lists/6926dc7cb60bf/check-email",
              },
            },
          });
          window.initJs($(".subscribe-embedded-form"));
        });
      }
    };

    const timeout = setTimeout(initForm, 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="subscribe-embedded-form">
      <form
        action="https://core.unelmamail.com/lists/6926dc7cb60bf/6926cf922c34d/embedded-form-subscribe-captcha"
        method="POST"
        className="flex items-center bg-white rounded-full shadow-md overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-[#008081] transition-all"
      >
        <Mail className="w-5 h-5 text-gray-500 ml-3" />
        <input
          type="email"
          name="EMAIL"
          placeholder="Your email"
          required
          className="flex-1 px-3 py-3 outline-none text-gray-700"
        />
        <button
          type="submit"
          className="bg-[#3780B2] text-white px-4 py-3 rounded-r-full hover:scale-105 transition-transform flex items-center gap-1"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
      <div className="mt-2 text-xs text-gray-500">
        <input type="checkbox" name="acm_term" required className="mr-1" />
        By checking this, I agree to the{" "}
        <a href="#" target="_blank" className="underline">
          Terms & Conditions
        </a>
      </div>
    </div>
  );
};

export default UnelmaMailForm;
