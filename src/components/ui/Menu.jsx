import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";

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
      <div ref={menuRef} className="relative ">
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
      className="cursor-pointer  group/menu flex items-center gap-2 pl-1.5 pr-1.5 sm:pr-4 py-1.5 rounded-full bg-white/6 border border-white/10 hover:bg-white/10 transition-colors"
    >
      {children}

      {/* <HiChevronRight
        className={`text-slate-400 text-sm transition-all duration-200 ${
          isOpen
            ? "rotate-90"
            : "opacity-0 hidden group-hover/menu:opacity-100 group-hover/menu:inline"
        }`}
      /> */}
    </button>
  );
}

function Content({ children }) {
  const { isOpen } = useContext(MenuContext);

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-40 p-1 rounded-xl bg-white/6 backdrop-blur-md border border-white/10 shadow-lg z-50">
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

  const className = ` ${variant === "danger" ? "bg-theme-red bg-[#5b2020]" : ""} cursor-pointer block w-full text-left px-3 py-2.5 rounded-lg text-sm md:text-base text-white/80 hover:text-amber  transition-colors`;
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
