import type { FC, Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import { useSocket } from "../contexts/Socket";
import Button from "./Button";
import { Ubuntu } from "@next/font/google";

const ubuntuNormal = Ubuntu({ subsets: ["cyrillic-ext"], weight: "400" });
const ubuntu = Ubuntu({ subsets: ["cyrillic-ext"], weight: "500" });

const Block: FC<{
  buttonsElement: Element | null;
  blockId: string;
  blockName: string;
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  fields: {
    [key: string]: {
      value: string;
      blocked: boolean;
      name: string;
      placeholder: string;
    };
  };
  setFields: Dispatch<
    SetStateAction<{
      [key: string]: {
        value: string;
        blocked: boolean;
        name: string;
        placeholder: string;
      };
    }>
  >;
}> = ({
  buttonsElement,
  blockId,
  blockName,
  isVisible,
  setIsVisible,
  fields,
  setFields,
}) => {
  const { socket } = useSocket();

  return (
    <>
      {buttonsElement &&
        createPortal(
          <Button
            buttonName="Блок 1"
            isBlockVisible={isVisible}
            setIsBlockVisible={setIsVisible}
          />,
          buttonsElement
        )}
      <form
        action=""
        method="post"
        style={{ display: isVisible ? "block" : "none" }}
        className={ubuntu.className}
        onFocus={({ target }) =>
          socket?.send(
            JSON.stringify({
              command: "focus",
              block: blockId,
              field: target.name,
            })
          )
        }
        onBlur={({ target }) =>
          socket?.send(
            JSON.stringify({
              command: "blur",
              block: blockId,
              field: target.name,
            })
          )
        }
      >
        <h3>
          <div>{blockName}</div>
        </h3>
        <div className="separator"></div>
        {Object.entries(fields).map(
          ([fieldName, { value, blocked, name, placeholder }]) => (
            <div key={fieldName}>
              <label htmlFor={fieldName} className={ubuntu.className}>
                {name}
              </label>
              <input
                type="text"
                name={fieldName}
                id={fieldName}
                value={value}
                placeholder={placeholder}
                disabled={blocked}
                className={ubuntuNormal.className}
                onChange={({ target }) =>
                  setFields((prevState) => {
                    const state = JSON.parse(JSON.stringify(prevState));
                    state.fname.value = target.value;

                    return state;
                  })
                }
              />
              <br />
            </div>
          )
        )}
      </form>
    </>
  );
};

export default Block;
