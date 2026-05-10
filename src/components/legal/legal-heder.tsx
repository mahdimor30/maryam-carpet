import { ReactNode } from "react";

export function LegalHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12 text-center">
      <h1
        className="mb-4 text-5xl leading-none font-extrabold tracking-tight
          text-[#064E3B] md:text-6xl"
      >
        {title}
      </h1>

      {subtitle && <p className="text-lg text-[#4B5563]">{subtitle}</p>}

      <div className="mx-auto mt-8 h-1.5 w-24 rounded-full bg-[#059669]" />
    </div>
  );
}

export function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative overflow-hidden bg-[#F9FAFB] pt-32 pb-20">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full
            bg-emerald-500/5 blur-[100px]"
        />
        <div
          className="absolute right-1/4 bottom-0 h-[400px] w-[400px]
            rounded-full bg-emerald-700/5 blur-[100px]"
        />

        {/* pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#059669 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-6">{children}</div>
    </main>
  );
}
