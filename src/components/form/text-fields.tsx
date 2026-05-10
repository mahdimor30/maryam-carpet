import { useStore } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { useFieldContext } from "@/hooks/form-context";
import { cn } from "@/lib/utils";

type TextFieldProps = {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function TextField({
  label,
  id,
  leftIcon,
  rightIcon,
  className,
  ...props
}: TextFieldProps) {
  const field = useFieldContext<string>();

  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div className="flex flex-col gap-2 flex-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {leftIcon}
          </div>
        )}

        <Input
          id={id}
          {...props}
          value={field.state.value ?? ""}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          className={cn(
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
        />

        {/* Right Icon */}
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div className="flex flex-col gap-1">
          {errors.map((error, index) => {
            const message =
              typeof error === "string" ? error : error?.message;

            return (
              <span key={index} className="text-red-500 text-sm">
                {message}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}