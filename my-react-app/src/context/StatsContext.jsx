import { createContext, useContext, useState } from "react";

export const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [stats, setStats] = useState({
    voltage: 230,
    currentHalogen: 0.4,
    currentLED: 0.1,
    power: 80,
    energy: 0.24,
  });

  return (
    <StatsContext.Provider value={{ stats, setStats }}>
      {children}
    </StatsContext.Provider>
  );
}

export const useStats = () => useContext(StatsContext);
