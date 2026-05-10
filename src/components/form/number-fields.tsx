import { useStore } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { useFieldContext } from "@/hooks/form-context";
import { useState } from "react";

export default function NumberField({
  label,
  ...props
}: { label?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const field = useFieldContext<string>();
  const [showKeyboardWarning, setShowKeyboardWarning] = useState(false);

  const errors = useStore(field.store, (state) => state.meta.errors);

  // Detect keyboard language based on key press
  const detectKeyboardLanguage = (key: string) => {
    // Persian/Arabic digits and characters
    const persianChars = '۰۱۲۳۴۵۶۷۸۹ضصثقفغعهخحجچپشسیبلاتنمکگظطزرذدئوءيإآأ';
    const arabicChars = '٠١٢٣٤٥٦٧٨٩ضصثقفغعهخحجچپشسيبلاتنمكگظطزرذدئوءيإآأ';
    
    return persianChars.includes(key) || arabicChars.includes(key);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    
    // Check if the pressed key is from Persian/Arabic keyboard
    if (detectKeyboardLanguage(key)) {
      setShowKeyboardWarning(true);
      // Auto-hide warning after 3 seconds
      setTimeout(() => setShowKeyboardWarning(false), 3000);
    } else {
      setShowKeyboardWarning(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimal point
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9.]/g, '');
    field.handleChange(numericValue);
  };

  return (
    <div className="flex flex-col gap-2 flex-1">
      <label>
        <div>{label}</div>
        <Input
          {...props}
          value={field.state.value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={field.handleBlur}
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </label>
      
      {showKeyboardWarning && (
        <div dir="rtl" className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded p-2">
          ⚠️ زبان کیبورد خود را به انگلیسی تغییر دهید
        </div>
      )}
      
      {errors.map((error: any) => (
        <div dir="rtl" key={error} style={{ color: "red" }}>
          {typeof error === "string" ? error : error.message}
        </div>
      ))}
    </div>
  );
}
