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
  const blockId = "block2";

  const { socket } = useSocket();
  const [isVisible, setIsVisible] = useState(false);

  const [fields, setFields] = useSocketListener(
    blockId,
    isVisible,
    setIsVisible,
    {
      birthday: { value: "", blocked: false },
      height: { value: "", blocked: false },
    }
  );

  return (
    <>
      {buttonsElement &&
        createPortal(
          <Button
            buttonName="Блок 2"
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
          <legend>Блок 2</legend>
          <label htmlFor="birthday">День рождения</label>
          <input
            type="text"
            name="birthday"
            id="birthday"
            value={fields.birthday.value}
            placeholder="Введите день рождения"
            disabled={fields.birthday.blocked}
            className={ubuntuNormal.className}
            onChange={({ target }) =>
              setFields((prevState) => {
                const state = JSON.parse(JSON.stringify(prevState));
                state.birthday.value = target.value;

                return state;
              })
            }
          />
          <br />
          <label htmlFor="height">Рост</label>
          <input
            type="text"
            name="height"
            id="height"
            value={fields.height.value}
            placeholder="Введите рост"
            disabled={fields.height.blocked}
            className={ubuntuNormal.className}
            onChange={({ target }) =>
              setFields((prevState) => {
                const state = JSON.parse(JSON.stringify(prevState));
                state.height.value = target.value;

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
