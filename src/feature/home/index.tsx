import { useState } from 'react'

// ─── داده‌های نمونه ─────────────────────────────────────────
const CATEGORIES = [
  { id: 1, name: 'کلاسیک', count: 84, color: '#c8a96e', icon: '◈' },
  { id: 2, name: 'مدرن', count: 61, color: '#7c9db5', icon: '◻' },
  { id: 3, name: 'ساده‌بافت', count: 47, color: '#a8b89a', icon: '▦' },
  { id: 4, name: 'پتینه', count: 38, color: '#c4907a', icon: '◉' },
  { id: 5, name: 'سه‌بعدی', count: 29, color: '#9b8ec4', icon: '◫' },
  { id: 6, name: 'فانتزی', count: 53, color: '#d4a5b5', icon: '◈' },
]

const FEATURED = [
  {
    id: 1,
    name: 'آرتا ۱۲۰۰ شانه',
    size: '۱.۵ × ۲.۲۵',
    price: '۴٬۸۰۰٬۰۰۰',
    originalPrice: '۵٬۵۰۰٬۰۰۰',
    tag: 'پرفروش',
    tagColor: '#e8a838',
    pattern: 'classical',
    colors: ['#c8a96e', '#1a1208', '#e8e0d0'],
  },
  {
    id: 2,
    name: 'ماهور مدرن',
    size: '۲ × ۳',
    price: '۶٬۲۰۰٬۰۰۰',
    originalPrice: null,
    tag: 'جدید',
    tagColor: '#4a9b7f',
    pattern: 'modern',
    colors: ['#7c9db5', '#2c3e50', '#ecf0f1'],
  },
  {
    id: 3,
    name: 'گلستان کرم',
    size: '۱.۲ × ۱.۸',
    price: '۳٬۱۰۰٬۰۰۰',
    originalPrice: '۳٬۸۰۰٬۰۰۰',
    tag: 'تخفیف ۱۸٪',
    tagColor: '#e05454',
    pattern: 'cream',
    colors: ['#e8d5b0', '#8b7355', '#f5f0e8'],
  },
  {
    id: 4,
    name: 'نگین پتینه',
    size: '۳ × ۴',
    price: '۱۲٬۵۰۰٬۰۰۰',
    originalPrice: null,
    tag: 'ویژه',
    tagColor: '#9b59b6',
    pattern: 'patine',
    colors: ['#c4907a', '#5d4037', '#fbe9e7'],
  },
]

const STATS = [
  { label: 'محصول', value: '۳۱۲+' },
  { label: 'مشتری راضی', value: '۱۸٬۰۰۰+' },
  { label: 'سال تجربه', value: '۱۵' },
  { label: 'ارسال به شهر', value: '۳۱' },
]

// ─── الگوی SVG فرش ─────────────────────────────────────────
function CarpetSVG({ pattern, colors }: { pattern: string; colors: string[] }) {
  const [c1, c2, c3] = colors
  if (pattern === 'modern') {
    return (
      <svg viewBox="0 0 200 280" className="w-full h-full">
        <rect width="200" height="280" fill={c3} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={20 + i * 34}
            y="20"
            width="18"
            height="240"
            rx="9"
            fill={c1}
            opacity={0.3 + i * 0.1}
          />
        ))}
        <rect x="10" y="100" width="180" height="3" fill={c1} opacity="0.5" />
        <rect x="10" y="170" width="180" height="3" fill={c1} opacity="0.5" />
        <circle
          cx="100"
          cy="140"
          r="35"
          fill="none"
          stroke={c2}
          strokeWidth="2"
          opacity="0.4"
        />
        <circle cx="100" cy="140" r="20" fill={c1} opacity="0.25" />
      </svg>
    )
  }
  if (pattern === 'cream') {
    return (
      <svg viewBox="0 0 200 280" className="w-full h-full">
        <rect width="200" height="280" fill={c3} />
        <rect
          x="8"
          y="8"
          width="184"
          height="264"
          rx="2"
          fill="none"
          stroke={c1}
          strokeWidth="2"
        />
        <rect
          x="18"
          y="18"
          width="164"
          height="244"
          rx="1"
          fill="none"
          stroke={c1}
          strokeWidth="1"
          opacity="0.4"
        />
        {[40, 80, 120, 160, 200, 240].map((y, i) => (
          <path
            key={i}
            d={`M 20 ${y} Q 100 ${y - 15} 180 ${y}`}
            fill="none"
            stroke={c1}
            strokeWidth="0.8"
            opacity="0.3"
          />
        ))}
        <ellipse
          cx="100"
          cy="140"
          rx="40"
          ry="55"
          fill="none"
          stroke={c2}
          strokeWidth="1.5"
          opacity="0.5"
        />
        <circle cx="100" cy="140" r="12" fill={c2} opacity="0.4" />
        {[0, 90, 180, 270].map((a) => (
          <path
            key={a}
            d={`M 100 140 L ${100 + 35 * Math.cos((a * Math.PI) / 180)} ${140 + 50 * Math.sin((a * Math.PI) / 180)}`}
            stroke={c2}
            strokeWidth="1"
            opacity="0.3"
          />
        ))}
      </svg>
    )
  }
  if (pattern === 'patine') {
    return (
      <svg viewBox="0 0 200 280" className="w-full h-full">
        <rect width="200" height="280" fill={c3} />
        <rect
          x="5"
          y="5"
          width="190"
          height="270"
          rx="4"
          fill={c1}
          opacity="0.08"
        />
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={15 + col * 45}
              y={20 + row * 60}
              width="35"
              height="50"
              rx="3"
              fill={c2}
              opacity="0.12"
            />
          )),
        )}
        <rect
          x="12"
          y="12"
          width="176"
          height="256"
          rx="3"
          fill="none"
          stroke={c2}
          strokeWidth="1.5"
          opacity="0.3"
        />
        <circle cx="100" cy="140" r="28" fill={c1} opacity="0.2" />
        <circle cx="100" cy="140" r="18" fill={c1} opacity="0.25" />
        <circle cx="100" cy="140" r="8" fill={c2} opacity="0.5" />
      </svg>
    )
  }
  // classical default
  return (
    <svg viewBox="0 0 200 280" className="w-full h-full">
      <rect width="200" height="280" fill={c3} />
      <rect
        x="6"
        y="6"
        width="188"
        height="268"
        fill="none"
        stroke={c1}
        strokeWidth="2.5"
        opacity="0.5"
      />
      <rect
        x="16"
        y="16"
        width="168"
        height="248"
        fill="none"
        stroke={c1}
        strokeWidth="1"
        opacity="0.25"
      />
      <polygon
        points="100,40 130,90 190,90 145,120 162,175 100,143 38,175 55,120 10,90 70,90"
        fill="none"
        stroke={c1}
        strokeWidth="1.5"
        opacity="0.55"
      />
      <circle cx="100" cy="108" r="22" fill={c1} opacity="0.18" />
      <circle cx="100" cy="108" r="10" fill={c1} opacity="0.35" />
      {[30, 170].map((x) =>
        [50, 140, 230].map((y) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="5"
            fill={c1}
            opacity="0.22"
          />
        )),
      )}
      <path
        d="M 20 200 Q 60 185 100 200 Q 140 215 180 200"
        fill="none"
        stroke={c1}
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  )
}

// ─── کارت محصول ────────────────────────────────────────────
function ProductCard({ product }: { product: (typeof FEATURED)[0] }) {
  const [wished, setWished] = useState(false)
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-neutral-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* تصویر */}
      <div className="relative h-64 bg-neutral-50 overflow-hidden">
        <div className="absolute inset-0 p-6 flex items-center justify-center">
          <div className="w-32 h-44 drop-shadow-lg group-hover:scale-105 transition-transform duration-500">
            <CarpetSVG pattern={product.pattern} colors={product.colors} />
          </div>
        </div>
        {/* تگ */}
        <div
          className="absolute top-3 right-3 text-white text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ backgroundColor: product.tagColor }}
        >
          {product.tag}
        </div>
        {/* دکمه علاقه‌مندی */}
        <button
          onClick={() => setWished(!wished)}
          className="absolute top-3 left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        >
          <span className={wished ? 'text-red-500' : 'text-neutral-300'}>
            ♥
          </span>
        </button>
      </div>
      {/* اطلاعات */}
      <div className="p-4 space-y-3" dir="rtl">
        <div>
          <h3 className="font-semibold text-neutral-800 text-sm">
            {product.name}
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            ابعاد: {product.size} متر
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-bold text-neutral-900">
              {product.price}{' '}
              <span className="text-xs font-normal text-neutral-400">
                تومان
              </span>
            </p>
            {product.originalPrice && (
              <p className="text-xs text-neutral-300 line-through">
                {product.originalPrice}
              </p>
            )}
          </div>
          <button className="bg-neutral-900 text-white text-xs px-4 py-2 rounded-xl hover:bg-neutral-700 transition-colors">
            افزودن
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── صفحه اصلی ─────────────────────────────────────────────
export default function HomePage() {
  return (
    <div
      className="min-h-screen bg-[#fafaf9] font-[Vazirmatn,sans-serif]"
      dir="rtl"
    >
    
      {/* ══════════════ هیرو ══════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-neutral-900 via-[#1a1208] to-neutral-800">
        {/* بافت پس‌زمینه */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#c49e50"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* متن */}
            <div className="space-y-6 text-right">
              <div className="inline-flex items-center gap-2 bg-[#c49e50]/10 border border-[#c49e50]/20 text-[#c49e50] text-xs px-3 py-1.5 rounded-full">
                <span>✦</span>
                <span>بیش از ۳۰۰ طرح ماشینی درجه یک</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                فرش خانه‌ات را
                <br />
                <span className="text-[#c49e50]">متفاوت</span> کن
              </h1>
              <p className="text-neutral-400 text-base leading-relaxed max-w-md">
                از کلاسیک‌ترین طرح‌های سنتی تا مدرن‌ترین دیزاین‌های روز دنیا،
                همه را در یک جا پیدا کن.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-[#c49e50] text-white px-7 py-3 rounded-xl font-medium hover:bg-[#b08a40] transition-colors text-sm">
                  مشاهده محصولات
                </button>
                <button className="border border-white/20 text-white px-7 py-3 rounded-xl font-medium hover:bg-white/5 transition-colors text-sm">
                  مشاوره رایگان
                </button>
              </div>

              {/* آمار */}
              <div className="grid grid-cols-4 gap-4 pt-6 border-t border-white/10">
                {STATS.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-xl font-bold text-[#c49e50]">
                      {s.value}
                    </div>
                    <div className="text-xs text-neutral-500 mt-0.5">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* فرش‌های شناور */}
            <div className="hidden md:flex items-center justify-center relative h-80">
              <div className="absolute right-8 top-4 w-28 h-40 rounded-xl overflow-hidden shadow-2xl rotate-[-8deg] opacity-70">
                <CarpetSVG
                  pattern="cream"
                  colors={['#c8a96e', '#8b7355', '#f5f0e8']}
                />
              </div>
              <div className="relative w-36 h-52 rounded-2xl overflow-hidden shadow-2xl z-10 ring-2 ring-[#c49e50]/30">
                <CarpetSVG
                  pattern="classical"
                  colors={['#c8a96e', '#1a1208', '#e8e0d0']}
                />
              </div>
              <div className="absolute left-8 bottom-4 w-28 h-40 rounded-xl overflow-hidden shadow-2xl rotate-[6deg] opacity-70">
                <CarpetSVG
                  pattern="modern"
                  colors={['#7c9db5', '#2c3e50', '#ecf0f1']}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ بنر تخفیف ══════════════ */}
      <div className="bg-[#e8a838] text-white text-sm text-center py-2.5 px-4">
        🎉 ارسال رایگان برای سفارش‌های بالای ۵ میلیون تومان —{' '}
        <span className="font-bold underline cursor-pointer">
          همین حالا خرید کن
        </span>
      </div>

      {/* ══════════════ دسته‌بندی‌ها ══════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">دسته‌بندی‌ها</h2>
            <p className="text-sm text-neutral-400 mt-1">
              سبکی که می‌پسندی رو انتخاب کن
            </p>
          </div>
          <a
            href="#"
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1"
          >
            همه دسته‌ها <span>←</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className="group relative bg-white rounded-2xl p-4 border border-neutral-100 hover:border-neutral-200 hover:shadow-lg transition-all duration-300 text-center hover:-translate-y-0.5"
            >
              <div
                className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: cat.color + '20', color: cat.color }}
              >
                {cat.icon}
              </div>
              <p className="text-sm font-medium text-neutral-700">{cat.name}</p>
              <p className="text-xs text-neutral-400 mt-0.5">{cat.count} مدل</p>
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ backgroundColor: cat.color }}
              />
            </button>
          ))}
        </div>
      </section>

      {/* ══════════════ محصولات ويژه ══════════════ */}
      <section className="bg-white border-y border-neutral-100 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">
                محصولات ویژه
              </h2>
              <p className="text-sm text-neutral-400 mt-1">
                پرفروش‌ترین‌های این هفته
              </p>
            </div>
            <div className="flex gap-2">
              {['پرفروش', 'جدید', 'تخفیف‌دار'].map((tab, i) => (
                <button
                  key={tab}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                    i === 0
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-500 hover:bg-neutral-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {FEATURED.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="border border-neutral-200 text-neutral-600 px-8 py-3 rounded-xl text-sm hover:bg-neutral-50 hover:border-neutral-300 transition-all">
              نمایش همه محصولات
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════ مزایا ══════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: '🚚',
              title: 'ارسال سریع',
              desc: 'تحویل ۲ تا ۵ روزه در سراسر کشور',
            },
            {
              icon: '✅',
              title: 'ضمانت اصالت',
              desc: 'تمامی محصولات دارای گواهی کیفیت',
            },
            {
              icon: '🔄',
              title: 'مرجوعی آسان',
              desc: '۷ روز ضمانت بازگشت بدون سوال',
            },
            {
              icon: '💬',
              title: 'پشتیبانی ۲۴/۷',
              desc: 'مشاوران ما همیشه در دسترسند',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex gap-4 bg-white p-5 rounded-2xl border border-neutral-100 hover:shadow-md transition-shadow"
            >
              <div className="text-2xl shrink-0 mt-0.5">{item.icon}</div>
              <div>
                <h3 className="font-semibold text-neutral-800 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="mx-4 sm:mx-6 mb-14 rounded-3xl overflow-hidden bg-gradient-to-l from-neutral-900 to-[#1a1208]">
        <div className="max-w-6xl mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-right">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              فرش ایده‌آلت رو پیدا نکردی؟
            </h2>
            <p className="text-neutral-400 text-sm">
              مشاوران ما به صورت رایگان کمکت می‌کنند
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button className="bg-[#c49e50] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#b08a40] transition-colors">
              تماس با مشاور
            </button>
            <button className="border border-white/20 text-white px-6 py-3 rounded-xl text-sm hover:bg-white/5 transition-colors">
              واتساپ
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════ فوتر ══════════════ */}
          
    </div>
  )
}
