import { useStore } from "@tanstack/react-form";
import { AlertCircle, Mail } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/hooks/form-context";

// Constants
const PERSIAN_REGEX = /[\u0600-\u06FF]/;
const EMAIL_ALLOWED_CHARS = /[^a-zA-Z0-9@._-]/g;
const PERSIAN_ERROR_MESSAGE = "فقط انگلیسی مجاز است";

export default function EmailField() {
  const field = useFieldContext<string>();
  const formErrors = useStore(field.store, (state) => state.meta.errors);
  const [localError, setLocalError] = useState<string>("");

  // Combine all errors
  const allErrors = [
    ...formErrors.map((err) => (typeof err === "string" ? err : err.message)),
    ...(localError ? [localError] : []),
  ];

  const hasError = allErrors.length > 0;

  const handleChange = (value: string) => {
    // Check for Persian characters
    if (PERSIAN_REGEX.test(value)) {
      setLocalError(PERSIAN_ERROR_MESSAGE);
      return;
    }

    // Filter and update
    const sanitized = value.replace(EMAIL_ALLOWED_CHARS, "");
    field.handleChange(sanitized);
    setLocalError("");
  };

  return (
    <div className="w-full space-y-2">
      <div className="relative">
        <Mail
          className="text-muted-foreground pointer-events-none absolute top-4.5
            left-4"
          size={20}
        />
        <Input
          required={false}
          type="email"
          value={field.state.value}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={field.handleBlur}
          placeholder="example@email.com"
          autoFocus
          className={`p-4 pl-[52px] text-left ${
            hasError ? "border-destructive focus-visible:ring-destructive" : ""
            }`}
        />
      </div>

      {hasError && (
        <div className="text-destructive flex  gap-2 text-sm">
          <div className="space-y-1">
            {allErrors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
        </div>
      )}
    </div>
  );
}
