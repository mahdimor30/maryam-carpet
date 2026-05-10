import { Link } from "@tanstack/react-router";
import {
  Instagram,
  Linkedin,
  Facebook,
  MessageCircle,
  Send,
} from "lucide-react";
import MoonLogo from "./raasteh-logo";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const navLinks = [
  { label: "چیکارگی", to: "#" },
  { label: "روال", to: "#" },
  { label: "چرایی", to: "#" },
  { label: "گوشزدها", to: "#" },
  { label: "بلاگ", to: "#" },
];

const legalLinks = [
  { label: "قوانین", to: "/terms" },
  { label: "شرایط استفاده", to: "/terms" },
  { label: "حریم خصوصی", to: "/privacy" },
];

const socialLinks = [
  { icon: Send, to: "https://t.me/raastehplatform", label: "Telegram" },
  {
    icon: Instagram,
    to: "https://instagram.com/raasteh.platform",
    label: "Instagram",
  },
  {
    icon: MessageCircle,
    to: "https://whatsapp.com/channel/0029VbC9zTi2v1Iw2oKHRl2f",
    label: "WhatsApp",
  },
  {
    icon: Facebook,
    to: "https://facebook.com/raastehplatform",
    label: "Facebook",
  },
  {
    icon: Linkedin,
    to: "https://linkedin.com/company/raastehplatform",
    label: "LinkedIn",
  },
];

export default function Footer() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <footer
      ref={ref}
      dir="rtl"
      className={`text-white snap-start transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Main footer content */}
      <div
        className="mx-auto flex max-w-7xl flex-row items-start
          justify-between gap-12 px-6 py-12"
      >
        {/* Right Side — Brand & Socials */}
        <div className="flex min-w-[260px] flex-col items-start gap-6">
          {/* Logo */}

          <MoonLogo />

          {/* Tagline */}
          <p className="text-right text-sm text-[#6b9ab8]">
            پلتفرم ارائه‌ی خدمات ایرانیان
          </p>

          {/* Social Icons */}
          <div className="flex flex-row gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.to}
                aria-label={social.label}
                className="border-moon-primary-100 text-moon-primary-950 flex
                  h-11 w-11 items-center justify-center rounded-xl border
                  transition-colors hover:border-[#4a9eba]"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Left Side — Nav Links */}
        <nav className="flex flex-1 flex-col items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm text-moon-primary-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Divider */}
      <div className="border-t border-[#1e3a52]" />

      {/* Bottom bar */}
      <div
        className="mx-auto flex max-w-7xl flex-row items-center
          justify-between px-6 py-4"
      >
        {/* Copyright — Right */}
        <p className="text-xs text-moon-primary-900">
          © ۱۴۰۴ راسته. تمامی حقوق محفوظ است.
        </p>

        {/* Legal Links — Left */}
        <div className="flex flex-row gap-6">
          {legalLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-xs text-moon-primary-900 transition-colors
                "
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
