import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useNavigationAnimation(delay = 300) {
  const location = useLocation();
  const navigate = useNavigate();

  const shouldAnimate =
    location.state?.animate === true ||
    location.state?.from?.state?.animate === true;

  useEffect(() => {
    if (!shouldAnimate) return;

    const timer = setTimeout(() => {
      navigate(location.pathname, {
        replace: true,
        state: {
          ...location.state,
          animate: false,
          from: location.state?.from
            ? {
                ...location.state.from,
                state: {
                  ...location.state.from.state,
                  animate: false,
                },
              }
            : undefined,
        },
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [shouldAnimate, navigate, location.pathname, location.state, delay]);

  return shouldAnimate;
}

export default useNavigationAnimation;
