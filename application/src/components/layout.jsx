import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <div className="h-screen">
      <Navbar />
      <main className="mb-auto">{children}</main>
      <Footer />
    </div>
  );
}
