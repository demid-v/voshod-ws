import type { Dispatch, FC, SetStateAction } from "react";
import { useSocket } from "../contexts/Socket";
import { Ubuntu } from "@next/font/google";

const ubuntu = Ubuntu({ subsets: ["cyrillic-ext"], weight: "500" });

const Button: FC<{
  buttonName: string;
  isBlockVisible: boolean;
  setIsBlockVisible: Dispatch<SetStateAction<boolean>>;
}> = ({ buttonName: blockName, isBlockVisible, setIsBlockVisible }) => {
  const { isOpen } = useSocket();

  return (
    <button
      type="button"
      disabled={!isOpen}
      onClick={() => setIsBlockVisible((prevState) => !prevState)}
      className={
        ubuntu.className + (isBlockVisible ? " clickedButton" : " idleButton")
      }
    >
      {blockName}
    </button>
  );
};

export default Button;
