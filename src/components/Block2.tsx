import { type FC, useState } from "react";
import { createPortal } from "react-dom";
import { useSocket } from "../contexts/Socket";
import { useSocketListener } from "../utils/hooks";
import Button from "./Button";

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
          <Button buttonName="Block 2" setIsBlockVisible={setIsVisible} />,
          buttonsElement
        )}
      <div style={{ display: isVisible ? "block" : "none" }}>
        <h2>Block 2</h2>
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
          <label htmlFor="birthday">День рождения</label>
          <br />
          <input
            type="text"
            name="birthday"
            id="birthday"
            value={fields.birthday.value}
            placeholder="Введите день рождения"
            disabled={fields.birthday.blocked}
            onChange={({ target }) =>
              setFields((prevState) => {
                const state = JSON.parse(JSON.stringify(prevState));
                state.birthday.text = target.value;

                return state;
              })
            }
          />
          <br />
          <label htmlFor="height">Рост</label>
          <br />
          <input
            type="text"
            name="height"
            id="height"
            value={fields.height.value}
            placeholder="Введите рост"
            disabled={fields.height.blocked}
            onChange={({ target }) =>
              setFields((prevState) => {
                const state = JSON.parse(JSON.stringify(prevState));
                state.height.text = target.value;

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
