import { Link, useRouter } from "@tanstack/react-router";
import UserProfile from "./user.proile";
import { useApiAuthenticated } from "@/api";
import { Button } from "../ui/button";
import { subscribe } from "diagnostics_channel";
import Logo from "../logo";

const navItems = [
  {
    label: "Find Jobs",
    to: "/dashboard/find-job",
  },
  {
    label: "My Applications",
    to: "/dashboard/applications",
  },
  {
    label: "Profile & CVs",
    to: "/dashboard/profile",
  },
  {
    label: "Billing",
    to: "/dashboard/billing",
  },
];

export default function Sidebar() {
  const disabledSubescription = useApiAuthenticated().useMutation(
    "post",
    "/subscriptions/cancel/",
  );
  const router = useRouter();

  return (
    <aside
      className="fixed top-0 left-0 z-50 flex h-screen w-64 flex-col border-r
        border-slate-100 bg-white px-4 py-8"
    >
      {/* Brand */}
      <div className="mb-12 flex items-center gap-3 px-2">
        <Logo />
      </div>

      {/* <Button
        onClick={() => {
          disabledSubescription.mutate(
            {
              body: {
                cancel_immediately: true,
              },
            },
            {
              onSuccess: async () => {
                alert("Subscription cancelled");
                await router.invalidate();
              },
            },
          );
        }}
      >
        canse
      </Button> */}

      {/* Nav */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            activeProps={{
              className:
                "border-r-4 border-emerald-600 bg-emerald-50/50 font-bold text-emerald-700",
            }}
            inactiveProps={{
              className:
                "text-slate-500 hover:bg-emerald-50 hover:text-emerald-600",
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <UserProfile />
    </aside>
  );
}
