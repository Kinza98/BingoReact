import { createContext, useContext, useState } from "react";

const TabsContext = createContext();

function Tabs({ children, id }) {
  const [activeTab, setActiveTab] = useState(id);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

function List({ children }) {
  return (
    <div className="rounded-lg md:mt-2  p-1 sm:rounded-lg bg-white/20">
      {children}
    </div>
  );
}

function Tab({ children, id }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  const isActive = activeTab === id;

  return (
    <button
      type="button"
      onClick={() => setActiveTab(id)}
      className={` 
        cursor-pointer rounded-lg px-2 py-2.5 font-secondary text-base
        transition-all duration-100 xs:rounded-full xs:px-5 xs:py-3
        xxs:px-3 sm:rounded-lg md:text-lg
        ${
          isActive
            ? "bg-amber/90 text-white"
            : "bg-transparent text-slate-700 hover:bg-slate-300/60 dark:text-white/70 dark:hover:bg-white/5"
        }
      `}
    >
      {children}
    </button>
  );
}

function Panel({ children, id }) {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== id) return null;

  return children;
}

Tabs.List = List;
Tabs.Tab = Tab;
Tabs.Panel = Panel;

export default Tabs;
