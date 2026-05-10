
import { Home, HelpCircle, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

const NAV_ITEMS = [
  { icon: Home,       label: "Home",    href: "/",         active: false },
  { icon: HelpCircle, label: "FAQ",     href: "/faq",      active: true  },
  { icon: Search,     label: "Jobs",    href: "/dashboard",active: false },
  { icon: User,       label: "Account", href: "/dashboard",active: false },
];

export function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#F9FAFB]/90 backdrop-blur-xl flex justify-around items-center py-3 px-6 z-50 border-t border-[#E5E7EB]/10">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <Link key={item.label} to={item.href}
            className={cn("flex flex-col items-center gap-1 transition-colors",
              item.active ? "text-[#059669]" : "text-[#4B5563] hover:text-[#064E3B]"
            )}
          >
            <Icon className="w-6 h-6" strokeWidth={item.active ? 2 : 1.5} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
