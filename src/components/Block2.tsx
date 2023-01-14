import { type FC, useState, type Dispatch, type SetStateAction } from "react";
import { useSocketListener } from "../utils/hooks";
import Block from "./Block";

const Block1: FC<{
  buttonsElement: Element | null;
}> = ({ buttonsElement }) => {
  const blockId = "block2";

  const [isVisible, setIsVisible] = useState(false);

  const [fields, setFields] = useSocketListener(
    blockId,
    isVisible,
    setIsVisible,
    {
      birthday: {
        value: "",
        blocked: false,
        name: "День рождения",
        placeholder: "Введите день рождения",
      },
      height: {
        value: "",
        blocked: false,
        name: "Рост",
        placeholder: "Введите рост",
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
