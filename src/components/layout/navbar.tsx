import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartCount] = useState(2)
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* لوگو */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center text-[#c49e50] text-sm font-bold">
              ف
            </div>
            <span className="font-bold text-neutral-900 text-lg tracking-tight">
              فرش‌سرا
            </span>
          </div>

          {/* ناوبری دسکتاپ */}
          <nav className="hidden md:flex items-center gap-7 text-sm text-neutral-500">
            {['خانه', 'محصولات', 'دسته‌بندی‌ها', 'تخفیف‌ها', 'درباره ما'].map(
              (item, i) => (
                <a
                  key={item}
                  href="#"
                  className={`hover:text-neutral-900 transition-colors ${i === 0 ? 'text-neutral-900 font-medium' : ''}`}
                >
                  {item}
                </a>
              ),
            )}
          </nav>

          {/* آیکون‌ها */}
          <div className="flex items-center gap-2">
            {searchOpen ? (
              <input
                autoFocus
                onBlur={() => setSearchOpen(false)}
                placeholder="جستجو..."
                className="w-40 text-sm border border-neutral-200 rounded-lg px-3 py-1.5 outline-none focus:border-neutral-400 transition-all"
              />
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-neutral-100 transition-colors text-neutral-500"
              >
                🔍
              </button>
            )}
            <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-neutral-100 transition-colors text-neutral-500">
              🛒
              {cartCount > 0 && (
                <span className="absolute top-1 left-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <a
              href="/auth"
              className="hidden md:flex items-center gap-1.5 text-sm bg-neutral-900 text-white px-4 py-2 rounded-xl hover:bg-neutral-700 transition-colors"
            >
              ورود
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-neutral-100"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* منوی موبایل */}
      {menuOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white px-4 py-3 space-y-1">
          {['خانه', 'محصولات', 'دسته‌بندی‌ها', 'تخفیف‌ها', 'درباره ما'].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="block py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 px-2 rounded-lg transition-colors"
              >
                {item}
              </a>
            ),
          )}
          <a
            href="/auth"
            className="block mt-2 text-center py-2 bg-neutral-900 text-white text-sm rounded-xl"
          >
            ورود / ثبت‌نام
          </a>
        </div>
      )}
    </header>
  )
}
