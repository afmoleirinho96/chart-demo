import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";
import { DEFAULT_TOKEN } from "@/app/models/crypto-metrics";

type CryptocurrencyDataContext = {
  currentToken: string;
  setCurrentToken: Dispatch<SetStateAction<string>>;
};

const defaultContext: CryptocurrencyDataContext = {
  currentToken: DEFAULT_TOKEN,
  setCurrentToken: () => {},
};

export const CryptocurrencyContext = createContext<CryptocurrencyDataContext>(defaultContext);

export const useCryptocurrency = () => {
  const context = useContext(CryptocurrencyContext);

  if (!context) {
    throw new Error("useCurrentCryptocurrency must be used within a CryptocurrencyProvider");
  }
  return context;
};

export const CryptocurrencyProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [currentToken, setCurrentToken] = useState<string>(DEFAULT_TOKEN);

  const value = useMemo(() => {
    return { currentToken, setCurrentToken: setCurrentToken };
  }, [currentToken]);

  return <CryptocurrencyContext.Provider value={value}>{children}</CryptocurrencyContext.Provider>;
};
