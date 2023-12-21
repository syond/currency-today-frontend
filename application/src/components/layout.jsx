import { ConfigModalFormContext } from "@/Contexts";
import { useState } from "react";

import Navbar from "./navbar";
import Footer from "./footer";
import { ToasterProvider } from "@/components/alerts/toasterProvider";

export default function Layout({ children }) {
  /**
   * @refactor
   * Maybe find a better place for this.
   */
  const [configForm, setConfigForm] = useState({});
  function configModalForm(data) {
    setConfigForm(data);
  }

  return (
    <div className="h-screen">
      <ToasterProvider>
        <Navbar configModalForm={configModalForm} />
        <ConfigModalFormContext.Provider value={configForm}>
          <main className="mb-auto">{children}</main>
        </ConfigModalFormContext.Provider>
        <Footer />
      </ToasterProvider>
    </div>
  );
}
