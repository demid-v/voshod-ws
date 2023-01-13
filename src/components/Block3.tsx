import { type FC, useState } from "react";
import { createPortal } from "react-dom";
import { useSocket } from "../contexts/Socket";
import { useSocketListener } from "../utils/hooks";
import Button from "./Button";

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
          <Button buttonName="Block 3" setIsBlockVisible={setIsVisible} />,
          buttonsElement
        )}
      <div style={{ display: isVisible ? "block" : "none" }}>
        <h2>Block 3</h2>
        <form
          action=""
          method="post"
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
          <label htmlFor="city">Город</label>
          <br />
          <input
            type="text"
            name="city"
            id="city"
            value={fields.city.value}
            placeholder="Введите город"
            disabled={fields.city.blocked}
            onChange={({ target }) =>
              setFields((prevState) => {
                const state = JSON.parse(JSON.stringify(prevState));
                state.city.text = target.value;

                return state;
              })
            }
          />
          <br />
          <label htmlFor="address">Улица</label>
          <br />
          <input
            type="text"
            name="address"
            id="address"
            value={fields.address.value}
            placeholder="Введите улицу"
            disabled={fields.address.blocked}
            onChange={({ target }) =>
              setFields((prevState) => {
                const state = JSON.parse(JSON.stringify(prevState));
                state.address.text = target.value;

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
            onChange={({ target }) =>
              setFields((prevState) => {
                const state = JSON.parse(JSON.stringify(prevState));
                state.index.text = target.value;

                return state;
              })
            }
          />
          <br />
        </form>
      </div>
    </>
  );
};

export default Block1;
