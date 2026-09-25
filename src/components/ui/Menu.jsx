import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const MenuContext = createContext();

function Menu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <MenuContext.Provider value={{ isOpen, toggleMenu, closeMenu }}>
      <div ref={menuRef} className="relative">
        {children}
      </div>
    </MenuContext.Provider>
  );
}

function Trigger({ children }) {
  const { isOpen, toggleMenu } = useContext(MenuContext);

  return (
    <button
      type="button"
      onClick={toggleMenu}
      className={`group/menu flex cursor-pointer items-center gap-2 rounded-full border px-1.5 py-1.5 transition-all duration-200 sm:pr-4 ${
        isOpen
          ? "border-white/20 bg-white/10"
          : "border-white/10 bg-white/6 hover:border-white/20 hover:bg-white/10 "
      }`}
    >
      {children}
    </button>
  );
}

function Content({ children }) {
  const { isOpen } = useContext(MenuContext);

  if (!isOpen) return null;

  return (
    <div
      className="
        absolute right-0 top-full z-50 mt-3
        w-64 max-w-[calc(100vw-2rem)]
        overflow-hidden rounded-2xl
        border border-white/10
        bg-neon-900/95
        p-2
        shadow-xl
        backdrop-blur-lg
        animate-in fade-in zoom-in-95 duration-150
      "
    >
      {children}
    </div>
  );
}

function Item({ children, to, onClick, variant }) {
  const { closeMenu } = useContext(MenuContext);

  const handleClick = () => {
    closeMenu();
    onClick?.();
  };

  const isDanger = variant === "danger";

  const className = `group/item flex w-full cursor-pointer items-center rounded-xl px-3 py-3 text-left text-sm sm:text-base transition-all duration-200 ${
    isDanger
      ? "mt-1 border-t border-white/10 rounded-t-none text-theme-red hover:bg-theme-red/10"
      : "text-white/80 hover:bg-white/6 hover:text-amber"
  }`;
  if (to) {
    return (
      <Link to={to} onClick={handleClick} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}

Menu.Trigger = Trigger;
Menu.Content = Content;
Menu.Item = Item;

export default Menu;
