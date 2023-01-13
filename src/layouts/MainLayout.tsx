import type { FC, ReactNode } from "react";
import Header from "../components/Header";
import Socket from "../contexts/Socket";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <Socket>
    <Header />
    {children}
  </Socket>
);

export default MainLayout;
