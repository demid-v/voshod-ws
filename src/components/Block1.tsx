import { type FC, useState, type Dispatch, type SetStateAction } from "react";
import { useSocketListener } from "../utils/hooks";
import Block from "./Block";

const Block1: FC<{
  buttonsElement: Element | null;
}> = ({ buttonsElement }) => {
  const blockId = "block1";

  const [isVisible, setIsVisible] = useState(false);

  const [fields, setFields] = useSocketListener(
    blockId,
    isVisible,
    setIsVisible,
    {
      fname: {
        value: "",
        blocked: false,
        name: "Имя",
        placeholder: "Введите имя",
      },
      lname: {
        value: "",
        blocked: false,
        name: "Фамилия",
        placeholder: "Введите фамилию",
      },
    }
  );

  return (
    <Block
      buttonsElement={buttonsElement}
      blockId={blockId}
      blockName="Блок 1"
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      fields={fields}
      setFields={
        setFields as Dispatch<
          SetStateAction<{
            [key: string]: {
              value: string;
              blocked: boolean;
              name: string;
              placeholder: string;
            };
          }>
        >
      }
    />
  );
};

export default Block1;
