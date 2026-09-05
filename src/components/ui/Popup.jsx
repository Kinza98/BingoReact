import { createContext, useContext, useState } from "react";
import { HiX } from "react-icons/hi";

const PopupContext = createContext();
function Popup({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PopupContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
}

function Trigger({ children, as }) {
  const { setIsOpen } = useContext(PopupContext);
  const Component = as;
  return (
    <Component
      className="cursor-pointer underline text-sm xs:text-base font-secondary text-[#967c9b]"
      type={as === "button" ? "button" : undefined}
      onClick={() => setIsOpen((open) => !open)}
    >
      {children}
    </Component>
  );
}

function Content({ children, info = true }) {
  const { setIsOpen, isOpen } = useContext(PopupContext);
  const [isClosing, setIsClosing] = useState(false);

  function handleClose() {
    setIsClosing(true);

    setTimeout(() => {
      setIsClosing(false);
      setIsOpen(false);
    }, 1000);
  }

  if (!isOpen) return null;

  function handleClick(e) {
    if (e.target.id === "overlay") handleClose();
  }

  return (
    <div
      id="overlay"
      className={` ${isClosing ? "animate-overlay-out" : "animate-overlay-in"} fixed z-50 inset-0 w-screen h-screen flex items-center justify-center bg-black/60`}
      onClick={handleClick}
    >
      <div
        className={` ${isClosing ? "animate-pop-out" : "animate-pop-in"}  relative text-base md:text-lg bg-secondary pt-11 m-4 mt-10 w-fit h-fit max-w-[500px] text-gray-300 p-7 text-left shadow-gray-900 rounded-lg shadow-xl`}
      >
        {children}

        {info && (
          <span className="font-primary text-7xl absolute -top-9 right-[48%]">
            ?
          </span>
        )}

        <button
          type="button"
          onClick={handleClose}
          className="-top-3 absolute -right-3 bg-[#704878] p-3 rounded-full text-xl cursor-pointer shadow-lg "
        >
          <HiX />
        </button>
      </div>
    </div>
  );
}

Popup.Trigger = Trigger;
Popup.Content = Content;
export default Popup;
