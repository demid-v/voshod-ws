import type { FC, ReactNode } from "react";
import Socket from "../contexts/Socket";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <Socket>{children}</Socket>
);

export default MainLayout;
