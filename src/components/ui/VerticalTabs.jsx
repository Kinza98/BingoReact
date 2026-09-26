import { createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerticalTabsContext = createContext(null);

function VerticalTabs({ children }) {
  return (
    <VerticalTabsContext.Provider value={{}}>
      {children}
    </VerticalTabsContext.Provider>
  );
}

function List({ children }) {
  return <nav>{children}</nav>;
}

function Tab({ value, children, icon }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.hash === `#${value}`;

  return (
    <button
      type="button"
      onClick={() => navigate(`#${value}`)}
      className={`my-2 flex cursor-pointer items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-base font-semibold transition-all duration-200 ${
        isActive
          ? "bg-teal-500/15 text-teal-700 dark:text-teal-400"
          : "text-slate-600 hover:bg-slate-300/50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function Section({ value, children }) {
  return (
    <section id={value} className="scroll-mt-6">
      <div className="mb-6 overflow-hidden transition-all duration-300">
        {children}
      </div>
    </section>
  );
}

VerticalTabs.List = List;
VerticalTabs.Tab = Tab;
VerticalTabs.Section = Section;

export default VerticalTabs;
