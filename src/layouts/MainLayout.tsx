import type { FC, ReactNode } from "react";
import Header from "../components/Header";
import Socket from "../contexts/Socket";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Header />
    <Socket>{children}</Socket>
  </>
);

export default MainLayout;
