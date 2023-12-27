import Navbar from "./navbar";
import Footer from "./footer";

import { ToasterProvider } from "./alerts/toasterProvider";
import { UtilsProvider } from "./providers/UtilsProvider";
import { ConfigModalFormProvider } from "./providers/ConfigModalFormProvider";

export default function Layout({ children }) {
  return (
    <div className="h-screen">
      <UtilsProvider>
        <ToasterProvider>
          <ConfigModalFormProvider>
            <Navbar />
            <main className="mb-auto">{children}</main>
          </ConfigModalFormProvider>
          <Footer />
        </ToasterProvider>
      </UtilsProvider>
    </div>
  );
}
