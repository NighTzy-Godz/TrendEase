import React, { useEffect, useState } from "react";

function useScrollHeight() {
  const [scrollHeight, setScrollHeight] = useState(window.scrollY);

  useEffect(() => {
    const handleScrollChange = () => {
      setScrollHeight(window.scrollY);
    };

    window.addEventListener("scroll", handleScrollChange);

    return () => {
      window.removeEventListener("scroll", handleScrollChange);
    };
  }, []);

  return { scrollHeight };
}

export default useScrollHeight;
