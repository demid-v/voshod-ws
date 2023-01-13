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
  const blockId = "block3";

  const { socket } = useSocket();
  const [isVisible, setIsVisible] = useState(false);

  const [fields, setFields] = useSocketListener(
    blockId,
    isVisible,
    setIsVisible,
    {
      city: { value: "", blocked: false },
      address: { value: "", blocked: false },
      index: { value: "", blocked: false },
    }
  );

  return (
    <>
      {buttonsElement &&
        createPortal(
          <Button
            buttonName="Блок 3"
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
          <legend>Блок 3</legend>
          <label htmlFor="city">Город</label>
          <input
            type="text"
            name="city"
            id="city"
            value={fields.city.value}
            placeholder="Введите город"
            disabled={fields.city.blocked}
            className={ubuntuNormal.className}
            onChange={({ target }) =>
              setFields((prevState) => {
                const state = JSON.parse(JSON.stringify(prevState));
                state.city.value = target.value;

                return state;
              })
            }
          />
          <br />
          <label htmlFor="address">Улица</label>
          <input
            type="text"
            name="address"
            id="address"
            value={fields.address.value}
            placeholder="Введите улицу"
            disabled={fields.address.blocked}
            className={ubuntuNormal.className}
            onChange={({ target }) =>
              setFields((prevState) => {
                const state = JSON.parse(JSON.stringify(prevState));
                state.address.value = target.value;

                return state;
              })
            }
          />
          <br />
          <label htmlFor="index">Почтовый индекс</label>
          <br />
          <input
            type="text"
            name="index"
            id="index"
            value={fields.index.value}
            placeholder="Введите почтовый индекс"
            disabled={fields.index.blocked}
            className={ubuntuNormal.className}
            onChange={({ target }) =>
              setFields((prevState) => {
                const state = JSON.parse(JSON.stringify(prevState));
                state.index.value = target.value;

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
