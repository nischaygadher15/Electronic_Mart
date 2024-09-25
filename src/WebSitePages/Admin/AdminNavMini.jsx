import { createContext, useState } from "react";

export let AdminMini = createContext();

export let AdminMiniProvider = ({ children }) => {
  let [navBarMini, setNavbarMini] = useState(false);
  return (
    <AdminMini.Provider value={{ navBarMini, setNavbarMini }}>
      {children}
    </AdminMini.Provider>
  );
};
