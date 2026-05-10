import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

export function useErrorHandler() {
  const navigate = useNavigate();

  const handleError = useCallback((error: Error | { message?: string; code?: string }) => {
    console.error("Route error:", error);
    
    // You can add error reporting service here
    // reportError(error);
    
    return error;
  }, []);

  const goToHome = useCallback(() => {
    navigate({ to: "/" });
  }, [navigate]);

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  const retry = useCallback(() => {
    window.location.reload();
  }, []);

  return {
    handleError,
    goToHome,
    goBack,
    retry,
  };
}
