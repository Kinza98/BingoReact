import ProfileMenu from "../../features/settings/ProfileMenu";
import Logo from "./Logo";

import { useEffect, useState } from "react";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 sm:px-6 md:py-5 transition-all duration-300 ${
        scrolled
          ? "bg-[#bacdd3] dark:bg-neon-900/95 shadow-md backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <Logo />

      <ProfileMenu />
    </header>
  );
}

export default Header;
