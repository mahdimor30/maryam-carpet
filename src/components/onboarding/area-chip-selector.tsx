"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { $api } from "@/api";

interface AreaChipSelectorProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export function AreaChipSelector({ value, onChange }: AreaChipSelectorProps) {
  const AREAS = $api.useQuery("get", "/systems/categories/");

  const selected = new Set(value);

  const toggle = (id: number) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    onChange(Array.from(next));
  };

  if (AREAS.isLoading) return <div>Loading...</div>;
  if (AREAS.error) return <div>Error loading areas</div>;

  return (
    <div className="flex flex-wrap gap-3">
      {AREAS.data?.map((area) => {
        const active = selected.has(area.id!); // 👈 number

        return (
          <button
            key={area.id}
            type="button"
            onClick={() => toggle(area.id!)} // 👈 number
            className={cn(
              `flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all`,
              active
                ? "bg-[#032f22] text-white shadow-md shadow-[#032f22]/10"
                : `border border-transparent bg-[#d1fee8] text-[#414844]
                   hover:border-[#c1c8c3] hover:bg-[#c6f2dd]`
            )}
          >
            <span>{area.title}</span>
            {active && <Check className="h-3.5 w-3.5 flex-shrink-0" />}
          </button>
        );
      })}
    </div>
  );
}