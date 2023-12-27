import { useState } from "react";

import { ConfigModalFormContext } from "@/Contexts";

export function ConfigModalFormProvider({ children }) {
  const [configForm, setConfigForm] = useState({});
  function configModalForm(data) {
    setConfigForm(data);
  }

  return (
    <ConfigModalFormContext.Provider value={{ configForm, configModalForm }}>
      {children}
    </ConfigModalFormContext.Provider>
  );
}
