import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};
