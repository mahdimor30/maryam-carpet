function TopBar() {
  return (
    <header
      className="sticky top-0 z-30 flex h-20 w-full items-center justify-between
        border-b border-slate-100 bg-[#F9FAFB]/80 px-12 backdrop-blur-xl"
      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-[#4B5563]">Pages /</span>
        <span className="font-bold text-[#064E3B]">Billing</span>
      </div>
      <div className="flex items-center gap-6">
        <div
          className="flex items-center gap-3 rounded-xl border border-[#E5E7EB]
            bg-[#F3F4F6]/50 px-4 py-2"
        >
          <Search className="h-4 w-4 text-[#4B5563]" />
          <input
            className="w-48 border-none bg-transparent text-sm outline-none
              placeholder:text-[#4B5563] focus:ring-0"
            placeholder="Search invoices..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="text-[#4B5563] transition-opacity hover:opacity-80">
            <Bell className="h-5 w-5" />
          </button>
          <button className="text-[#4B5563] transition-opacity hover:opacity-80">
            <Settings className="h-5 w-5" />
          </button>
          <div
            className="flex h-10 w-10 items-center justify-center
              overflow-hidden rounded-full border-2 border-[#059669]
              bg-emerald-100 text-sm font-bold text-[#059669]"
          >
            AR
          </div>
        </div>
      </div>
    </header>
  );
}
