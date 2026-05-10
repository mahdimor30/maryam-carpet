import { useStore } from "@tanstack/react-form";
import { Textarea } from "../ui/textarea";
import { useFieldContext } from "@/hooks/form-context";

export default function TextArea({
  label,
  ...props
}: { label?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const field = useFieldContext<string>();

  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div>
      <label>
        <div>{label}</div>
        <Textarea
          {...props}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
        />
      </label>
      {errors.map((error: any) => (
        <div dir="rtl" key={error} style={{ color: "red" }}>
          {typeof error === "string" ? error : error.message}
        </div>
      ))}
    </div>
  );
}
