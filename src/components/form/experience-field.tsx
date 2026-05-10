import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "@/hooks/form-context";
import { experienceOptions } from "@/lib/experience";



export type ExperienceOption = (typeof experienceOptions)[number]["key"];

export default function ExperienceField() {
  const field = useFieldContext<string>();

  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <>
      <div dir="rtl" className="flex flex-wrap justify-start gap-2">
        {experienceOptions.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => {
              field.handleChange(item.key);
            }}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              field.state.value === item.key
                ? "bg-moon-primary-600 text-white border-moon-primary-600 border"
                : `border border-gray-200 bg-white text-gray-600
                  hover:border-gray-300`
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {errors.length > 0 && (
        <div dir="rtl" className="mt-2 w-full text-sm text-red-500">
          {errors.map((error: any, index: number) => (
            <div key={index}>
              {typeof error === "string" ? error : error.message}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
