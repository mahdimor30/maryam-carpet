import { createFormHook } from "@tanstack/react-form";
import { lazy } from "react";
import { fieldContext, formContext, useFormContext } from "./form-context.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";

const TextField = lazy(() => import("@/components/form/text-fields.tsx"));
const NumberField = lazy(() => import("@/components/form/number-fields.tsx"));
const EmailField = lazy(() => import("@/components/form/email-fields.tsx"));
const OTPField = lazy(() => import("@/components/form/otp-fields.tsx"));
const TextArea = lazy(() => import("@/components/form/textarea-fields.tsx"));

const CategoryField = lazy(
  () => import("@/components/form/category-field.tsx"),
);

const ExperienceField = lazy(
  () => import("@/components/form/experience-field.tsx"),
);

function SubscribeButton({
  label,
  isLoading,
  className,
}: {
  label: string;
  isLoading?: boolean;
  className?: string;
}) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          size={"lg"}
          type="submit"
          className={cn("w-full", className)}
        
          disabled={isSubmitting}
        >
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextField,
    NumberField,
    EmailField,
    OTPField,
    TextArea,
    CategoryField,
    ExperienceField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
