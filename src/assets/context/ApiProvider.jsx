import { useState, useMemo } from "react";
import { themeContext } from "./themeApi";

const ApiProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <themeContext.Provider value={contextValue}>
      {children}
    </themeContext.Provider>
  );
};

export default ApiProvider;
