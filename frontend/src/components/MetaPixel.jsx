import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Tracks PageView when users navigate between pages (React SPA).
// Initial PageView is fired from index.html on first load.
export default function MetaPixel() {
  const location = useLocation();
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (typeof window.fbq !== "function") return;

    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    window.fbq("track", "PageView");
  }, [location.pathname]);

  return null;
}
