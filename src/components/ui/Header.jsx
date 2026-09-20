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
      className={`fixed top-0 left-0 right-0 flex justify-between items-center p-6 z-50 transition-all duration-300 ${
        scrolled ? "bg-neon-900 shadow-md" : ""
      }`}
    >
      <Logo />

      <ProfileMenu />
    </header>
  );
}

export default Header;
