import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useLeaveGame({ enabled = true }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [showLeaveDialog, setShowLeaveDialog] = useState(false);

  const pendingNavigation = useRef(null);
  const currentPath = useRef(location.pathname);

  // Keep the current route updated.
  useEffect(() => {
    currentPath.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    if (!enabled) return;

    function handleLinkClick(event) {
      // Ignore modified clicks:
      // Ctrl/Cmd + click, Shift + click, middle mouse button, etc.
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = event.target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");

      // Ignore links without a normal href.
      if (!href) return;

      // Ignore external links.
      if (link.target === "_blank") return;

      const url = new URL(link.href, window.location.origin);

      if (url.origin !== window.location.origin) return;

      // If clicking the current page, don't block it.
      if (url.pathname === currentPath.current) return;

      event.preventDefault();

      pendingNavigation.current = {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
      };

      setShowLeaveDialog(true);
    }

    document.addEventListener("click", handleLinkClick, true);

    return () => {
      document.removeEventListener("click", handleLinkClick, true);
    };
  }, [enabled]);

  // Handle browser Back / Forward.
  useEffect(() => {
    if (!enabled) return;

    function handlePopState() {
      const destination = {
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
      };

      // Put the user back on the current game route immediately.
      window.history.pushState(
        null,
        "",
        currentPath.current + window.location.search + window.location.hash,
      );

      pendingNavigation.current = destination;
      setShowLeaveDialog(true);
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [enabled]);

  // Handle refresh / closing the tab/browser.
  useEffect(() => {
    if (!enabled) return;

    function handleBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [enabled]);

  function confirmLeave() {
    const destination = pendingNavigation.current;

    setShowLeaveDialog(false);
    pendingNavigation.current = null;

    if (!destination) return;

    navigate(destination.pathname + destination.search + destination.hash);
  }

  function cancelLeave() {
    setShowLeaveDialog(false);
    pendingNavigation.current = null;
  }

  return {
    showLeaveDialog,
    confirmLeave,
    cancelLeave,
  };
}

export default useLeaveGame;
