import { logoutFn } from "@/feature/auth/serverFn/logout";
import getUserDisplayName from "@/utils/get-user-display-name";
import { useRouteContext, useRouter } from "@tanstack/react-router";


export default function ProfileSidebar() {
    const router = useRouter()
    const { user } = useRouteContext({
        from: '/_authed/dashboard'
    })

    return (
        <div className="mt-4 rounded-2xl bg-slate-100 px-4 py-4">
            <div className="mb-2 flex items-center gap-3">
                
                <div>
                    <p className="text-xs font-bold">{getUserDisplayName(user)}</p>
                    <p className="text-[10px] font-bold text-emerald-600">
                        {user?.active_subscription.plan.title}
                    </p>
                </div>
            </div>

            <button onClick={async () => {
                const result = await logoutFn()
                if (result.success) {
                    await router.invalidate()
                }
                console.log(result);

            }} className="text-xs text-slate-400 hover:text-red-500">
                Logout
            </button>
        </div>
    )
}