import { useRouter } from "@tanstack/react-router";
import { object, string, array, minLength, optional, number } from "zod/mini";
import { useApiAuthenticated } from "@/api";
import { Button } from "@/components/ui/button";
import { useAppForm } from "@/hooks/form";
import { mapBackendErrorsToFormFields } from "@/lib/form-error-mapper";
import { AreaChipSelector } from "@/components/onboarding/area-chip-selector";
import { PhotoUpload } from "@/components/onboarding/photo-upload";

const onboardingSchema = object({
  first_name: string().check(minLength(1, "Please enter your first name")),
  last_name: string().check(minLength(1, "Please enter your last name")),
  areas: array(number()).check(minLength(1, "Please select at least one area")),
  photo_url: string(),
});

export default function OnboardingPage() {
  const router = useRouter();
  const authedApi = useApiAuthenticated();

  authedApi.useMutation('post','/candidates/cv/')

  const updateProfile = authedApi.useMutation("patch", "/candidates/profile/");

  const form = useAppForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      areas: [] as number[],
      photo_url: "",
    },
    validators: {
      onSubmit: onboardingSchema,
      onSubmitAsync: async ({ value }) => {
        try {
          await updateProfile.mutateAsync({
            body: {
              first_name: value.first_name,
              last_name: value.last_name,
              interested_categories: value.areas,
            },
          });

          await router.invalidate();
          await router.navigate({ to: "/dashboard/find-job" });
        } catch (error) {
          return {
            fields: mapBackendErrorsToFormFields(error, {
              fallbackField: "first_name",
            }),
          };
        }
      },
    },
  });

  return (
    <div
      className="flex min-h-screen flex-col bg-white text-[#002116] antialiased"
    >
      <main
        className="flex flex-grow items-center justify-center px-6 py-12
          md:py-20"
      >
        <div className="w-full max-w-2xl space-y-12">
          <div className="space-y-4">
            <h1
              className="text-4xl leading-tight font-bold tracking-tight
                text-[#032f22] md:text-5xl"
            >
              Complete your profile
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-[#414844]">
              Tell us a bit more about yourself.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-10"
          >
            {/* Name row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <form.AppField
                name="first_name"
                children={(field) => (
                  <field.TextField label="First Name" placeholder="Jane" />
                )}
              />
              <form.AppField
                name="last_name"
                children={(field) => (
                  <field.TextField label="Last Name" placeholder="Doe" />
                )}
              />
            </div>

            {/* Area chips — controlled via form state */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-[#032f22]">
                  Which areas are you looking for positions in?
                </h2>
                <p className="text-sm text-[#414844]">
                  Select all that apply to your expertise.
                </p>
              </div>
              <form.AppField
                name="areas"
                children={(field) => (
                  <>
                    <AreaChipSelector
                      value={field.state.value}
                      onChange={field.handleChange}
                    />
                    {/* {field.state.meta.errors?.length > 0 && (
                      <p className="text-sm text-red-500 mt-1">
                        {field.state.meta.errors[0]}
                      </p>
                    )} */}
                  </>
                )}
              />
            </div>

            {/* Photo upload — controlled via form state */}

            {/* Submit */}
            <div className="flex flex-col items-center pt-8 sm:items-start">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="h-auto w-full rounded-xl bg-gradient-to-r
                      from-[#032f22] to-[#1e4637] px-10 py-4 text-lg font-bold
                      shadow-xl shadow-[#032f22]/20 transition-transform
                      hover:scale-[1.02] active:scale-95
                      disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  >
                    {isSubmitting ? "..." : "Finish Setup"}
                  </Button>
                )}
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
