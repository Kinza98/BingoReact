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
  return <div className="rounded-lg sm:rounded-full bg-white/10 xs:p-1">{children}</div>;
}

function Tab({ children, id }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  const isActive = activeTab === id;

  return (
    <button
      type="button"
      onClick={() => setActiveTab(id)}
      className={`
        px-2 xxs:px-3 xs:px-5 py-2.5 rounded-lg xs:py-3 font-secondary duration-100 transition-all cursor-pointer sm:rounded-full md:text-lg text-base
        ${isActive ? "text-white bg-amber/90 " : "text-white/70 bg-transparent"}
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
