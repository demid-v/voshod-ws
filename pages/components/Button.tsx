import type { Dispatch, FC, SetStateAction } from "react";
import { useSocket } from "../contexts/Socket";

const Button: FC<{
  buttonName: string;
  setIsBlockVisible: Dispatch<SetStateAction<boolean>>;
}> = ({ buttonName: blockName, setIsBlockVisible }) => {
  const { isOpen } = useSocket();

  return (
    <button
      type="button"
      disabled={!isOpen}
      onClick={() => setIsBlockVisible((prevState) => !prevState)}
    >
      {blockName}
    </button>
  );
};

export default Button;
