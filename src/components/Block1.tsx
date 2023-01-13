import { type FC, useState } from "react";
import { createPortal } from "react-dom";
import { useSocket } from "../contexts/Socket";
import { useSocketListener } from "../utils/hooks";
import Button from "./Button";

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
          <Button buttonName="Block 1" setIsBlockVisible={setIsVisible} />,
          buttonsElement
        )}
      <div style={{ display: isVisible ? "block" : "none" }}>
        <h2>Block 1</h2>
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
          <label htmlFor="fname">Имя</label>
          <br />
          <input
            type="text"
            name="fname"
            id="fname"
            value={fields.fname.value}
            placeholder="Введите имя"
            disabled={fields.fname.blocked}
            onChange={({ target }) =>
              setFields((prevState) => {
                const state = JSON.parse(JSON.stringify(prevState));
                state.fname.text = target.value;

                return state;
              })
            }
          />
          <br />
          <label htmlFor="lname">Фамилия</label>
          <br />
          <input
            type="text"
            name="lname"
            id="lname"
            value={fields.lname.value}
            placeholder="Введите фамилию"
            disabled={fields.lname.blocked}
            onChange={({ target }) =>
              setFields((prevState) => {
                const state = JSON.parse(JSON.stringify(prevState));
                state.lname.text = target.value;

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
