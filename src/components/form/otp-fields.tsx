import { useStore } from "@tanstack/react-form";
import { AlertCircle } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useFieldContext } from "@/hooks/form-context";
import { cn, toEnglishNumeral } from "@/lib/utils";

const REGEXP_ONLY_DIGITS_AND_PERSIAN = "^[0-9]+$";

export default function OTPField({
  label,
  maxLength,
  isSuccess,
}: {
  label?: string;
  maxLength: number;
  isSuccess?: boolean;
}) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const value = useStore(field.store, (state) => state.value) || "";
  const isError = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <div className="flex flex-col items-center space-y-4">
      {label && (
        <label
          htmlFor={field.name}
          className="text-sm leading-none font-medium
            peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
      <InputOTP
        maxLength={maxLength}
        value={value}
        onChange={(newValue) => {
          // const englishValue = toEnglishNumeral(newValue);
          field.handleChange(newValue);
        }}
        pattern={REGEXP_ONLY_DIGITS_AND_PERSIAN}
      >
        <InputOTPGroup className="gap-3" dir="ltr">
          {Array.from({ length: maxLength }).map((_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              isError={isError}
              isSuccess={isSuccess}
              className={cn(
                `bg-input h-14 w-14 rounded-lg border-2 text-2xl font-bold
                first:rounded-lg first:border-l-2 last:rounded-lg`,
                // field.state.value[index] && !isError && "border-neutral-950  ",
              )}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {errors.length > 0 && (
        <div
          className="text-destructive flex gap-2 text-sm
            font-medium"
        >
          <p>{errors.join(", ")}</p>
          <AlertCircle size={16} />
        </div>
      )}
    </div>
  );
}
