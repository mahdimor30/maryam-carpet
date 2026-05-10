import { useRouter } from "@tanstack/react-router";
import { Error } from "@/components/ui/error";

export  default function ErrorPage() {
  const router = useRouter();

  const handleHome = () => {
    router.navigate({ to: "/" });
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <Error
      variant="full-page"
      title="خطای عمومی"
      message="متأسفانه مشکلی پیش آمده است. لطفاً دوباره تلاش کنید یا به صفحه اصلی بازگردید."
      showRetry={true}
      showHome={true}
      showBack={true}
      onHome={handleHome}
      onBack={handleBack}
    />
  );
}
