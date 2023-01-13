import { type FC, useState } from "react";
import { createPortal } from "react-dom";
import { useSocket } from "../contexts/Socket";
import { useSocketListener } from "../utils/hooks";
import Button from "./Button";
import { Ubuntu } from "@next/font/google";

const ubuntuNormal = Ubuntu({ subsets: ["cyrillic-ext"], weight: "400" });
const ubuntu = Ubuntu({ subsets: ["cyrillic-ext"], weight: "500" });

const Block1: FC<{
  buttonsElement: Element | null;
}> = ({ buttonsElement }) => {
  const blockId = "block1";

  const { socket } = useSocket();
  const [isVisible, setIsVisible] = useState(false);

  const [fields, setFields] = useSocketListener(
    blockId,
    isVisible,
    setIsVisible,
    {
      fname: { value: "", blocked: false },
      lname: { value: "", blocked: false },
    }
  );

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
        <fieldset>
          <legend>
            <div>Блок 1</div>
          </legend>
          <div className="separator"></div>
          <label htmlFor="fname" className={ubuntu.className}>
            Имя
          </label>
          <input
            type="text"
            name="fname"
            id="fname"
            value={fields.fname.value}
            placeholder="Введите имя"
            disabled={fields.fname.blocked}
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
          <label htmlFor="lname">Фамилия</label>
          <input
            type="text"
            name="lname"
            id="lname"
            value={fields.lname.value}
            placeholder="Введите фамилию"
            disabled={fields.lname.blocked}
            className={ubuntuNormal.className}
            onChange={({ target }) =>
              setFields((prevState) => {
                const state = JSON.parse(JSON.stringify(prevState));
                state.lname.value = target.value;

                return state;
              })
            }
          />
        </fieldset>
      </form>
    </>
  );
};

export default Block1;
