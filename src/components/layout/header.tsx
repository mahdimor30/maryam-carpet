export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-8">

      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Current View
        </span>
        <span className="text-emerald-900 font-bold">Find Jobs</span>
      </div>

      <div className="flex items-center gap-6">
        {/* search */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 border">
          <input
            placeholder="Search roles or companies..."
            className="bg-transparent outline-none text-sm w-64"
          />
        </div>

        <button>🔔</button>
        <button>❓</button>
      </div>
    </header>
  );
}