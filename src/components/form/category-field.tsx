import { useStore } from "@tanstack/react-form";
import { useLoaderData } from "@tanstack/react-router";
import { useFieldContext } from "@/hooks/form-context";
import { components } from "@/api/types";

export default function CategoryField() {
  const { constants } = useLoaderData({
    from: "/_authed/dashboard/",
  });

  const items = constants.categories;
  const field = useFieldContext<number>();

  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <>
      {items?.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => {
            field.handleChange(item.id || 0);
          }}
          className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
            field.state.value === item.id
              ? "bg-moon-primary-600 border-moon-primary-600 border text-white"
              : `border border-gray-200 bg-white text-gray-600
                hover:border-gray-300`
          }`}
        >
          {item.title}
        </button>
      ))}
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
