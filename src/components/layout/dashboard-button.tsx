"use client";

import { ChevronDown, LayoutGrid, LogOut } from "lucide-react";
import { Link, useRouteContext, useRouter } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import getUserDisplayName from "@/utils/get-user-display-name";
import { useUser } from "@/hooks/use-user";
import { logoutFn } from "@/feature/auth/serverFn/logout";

export default function ProfileDropdown() {
  const router = useRouter();
  const user = useUser();
  if (user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 text-sm font-medium">
            {getUserDisplayName(user)}
            <ChevronDown className="size-4" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-52 rounded-2xl p-3 shadow-xl"
        >
          <div className="flex flex-col gap-2">
            {/* Dashboard Button */}
            <Button
              onClick={async () => {
                await router.navigate({ to: "/dashboard" });
              }}
              variant="moon-primary"
              size={"lg"}
              className=""
            >
              <span>ورود به داشبورد</span>
              <LayoutGrid className="size-4" />
            </Button>

            {/* Logout Button */}
            <Button
              onClick={async () => {
                await logoutFn();
                await router.invalidate();
              }}
              size={"lg"}
              variant={"secondary"}
            >
              <span>خروج</span>
              <LogOut className="size-4" />
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  return (
    <Button
      asChild
      variant="moon-primary"
      className="rounded-lg px-6 py-2 text-sm font-medium"
    >
      <Link to={"/auth"}>شروع کن</Link>
    </Button>
  );
}

// export default function DashboardButton() {
//   const context = useRouteContext({ from: "__root__" });
//   const user = context?.user;
//   const router = useRouter();
//   return (
//     <Select
//       onValueChange={async (value) => {
//         if (value === "dashboard") {
//           await router.navigate({ to: "/dashboard" });
//         }

//         if (value === "logout") {
//           await logoutFn();
//           await router.invalidate();
//         }
//       }}
//     >
//       <SelectTrigger className="w-full max-w-48 border-none  shadow-none" >
//         <SelectValue placeholder={} />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel className="">{getUserDisplayName(user)}</SelectLabel>

//           <SelectItem
//             value="logout"
//             className="mt-2 rounded-xl bg-neutral-100 px-3 py-2.5 text-moon-primary-900 text-sm font-semibold focus:bg-neutral-200 focus:text-moon-primary-900"
//           >
//             <span className="flex w-full items-center justify-between">
//               <span>خروج</span>
//               <LogOut className="size-4 text-moon-primary-700" />
//             </span>
//           </SelectItem>
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// }
