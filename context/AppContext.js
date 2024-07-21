"use client";
import { createContext, useState } from 'react';

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [state, setState] = useState({});

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
