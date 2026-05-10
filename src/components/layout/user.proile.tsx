import { logoutFn } from "@/feature/auth/serverFn/logout";
import getUserDisplayName from "@/utils/get-user-display-name";
import { useRouteContext, useRouter } from "@tanstack/react-router";

export default function UserProfile() {
  const router = useRouter();
  const user = useRouteContext({ from: "/_authed" });

  const plan = user.user?.active_subscription.plan;

 
  console.log(user);
  

  return (
    <div className="mt-4 rounded-2xl bg-slate-100 px-4 py-4">
      <div className="mb-2 flex items-center gap-3">
        <div>
          <p className="text-xs font-bold">{getUserDisplayName(user.user)}</p>
          {/* <p className="text-[10px] font-bold text-emerald-600">Pro Member</p> */}
        </div>
      </div>
      {plan?.title ? (
        <p
          className="mb-2 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium
            text-emerald-700"
        >
          {plan.title}
        </p>
      ) : (
        <p
          className="mb-2 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium
            text-emerald-700"
        >
          Free version
        </p>
      )}
      <button
        onClick={async () => {
          await logoutFn();
          await router.invalidate();
        }}
        className="text-xs text-slate-400 hover:text-red-500"
      >
        Logout
      </button>
    </div>
  );
}
