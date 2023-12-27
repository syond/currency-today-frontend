import { UtilsContext } from "@/Contexts";

import Utils from "@/utils";

export function UtilsProvider({ children }) {
  return (
    <UtilsContext.Provider value={Utils}>{children}</UtilsContext.Provider>
  );
}
