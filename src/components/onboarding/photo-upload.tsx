"use client";

import { useRef } from "react";
import { Camera } from "lucide-react";

interface PhotoUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export function PhotoUpload({ value, onChange }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChange(url);
  };

  return (
    <div className="flex items-center gap-6 p-6 rounded-2xl bg-white border border-[#c1c8c3]/10 shadow-sm">
      <div className="relative h-20 w-20 flex-shrink-0">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-[#d1fee8] flex items-center justify-center">
          {value ? (
            <img
              src={value}
              alt="Profile preview"
              className="object-cover rounded-full"
            />
          ) : (
            <span className="text-2xl font-bold text-[#032f22] select-none">
              JD
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="absolute bottom-0 right-0 bg-[#032f22] text-white p-1.5 rounded-full border-2 border-white hover:scale-110 transition-transform"
        >
          <Camera className="w-3 h-3" />
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>

      <div className="space-y-1">
        <p className="font-semibold text-[#032f22]">Add a profile photo</p>
        <p className="text-sm text-[#414844] leading-snug">
          Personalizing your profile helps build trust with potential referrers.
        </p>
      </div>
    </div>
  );
}