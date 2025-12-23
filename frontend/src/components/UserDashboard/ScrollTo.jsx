import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.scrollTop = 0;
  }, [pathname]);
};

export default ScrollTo;
