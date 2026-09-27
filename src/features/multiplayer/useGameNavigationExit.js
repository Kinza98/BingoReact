import { useEffect } from "react";

export function useGameNavigationExit(onExit) {
  useEffect(() => {
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    function handleNavigation() {
      onExit();
    }

    window.history.pushState = function (...args) {
      const result = originalPushState.apply(this, args);

      window.dispatchEvent(new Event("app-navigation"));

      return result;
    };

    window.history.replaceState = function (...args) {
      const result = originalReplaceState.apply(this, args);

      window.dispatchEvent(new Event("app-navigation"));

      return result;
    };

    window.addEventListener("app-navigation", handleNavigation);
    window.addEventListener("popstate", handleNavigation);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;

      window.removeEventListener("app-navigation", handleNavigation);
      window.removeEventListener("popstate", handleNavigation);
    };
  }, [onExit]);
}
