import { useContext } from "react";

import { ToasterContext } from "@/Contexts";

export function useToaster() {
  return useContext(ToasterContext);
}
