import { type FC, useEffect, useState } from "react";
import type { Field as FieldType } from "../utils/types";
import { useSocket } from "../contexts/Socket";

const Field: FC<{
  blockId: string;
  field: FieldType;
}> = ({ blockId, field: { inputName, name, placeholder } }) => {
  const { socket } = useSocket();

  const [value, setValue] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(false);

  useEffect(() => {
    socket?.addEventListener("message", (message) => {
      console.log("message", message);

      const data = JSON.parse(message.data);
      console.log(data);

      if (data.focus || data.blur) {
        if (data.focus === inputName) {
          setIsReadOnly(true);
        } else if (data.blur === inputName) {
          setIsReadOnly(false);
        }
      } else if (data.block === blockId) {
        setValue(data.data?.[inputName] || "");

        if (data.status?.[inputName]) {
          setIsReadOnly(true);
        }
      }
    });
  }, [socket, blockId, inputName]);

  return (
    <>
      <label htmlFor={inputName}>{name}</label>
      <input
        type="text"
        name={inputName}
        id={inputName}
        placeholder={placeholder}
        value={value}
        readOnly={isReadOnly}
        onFocus={() =>
          socket?.send(
            JSON.stringify({
              command: "focus",
              block: blockId,
              field: inputName,
            })
          )
        }
        onBlur={() =>
          socket?.send(
            JSON.stringify({
              command: "blur",
              block: blockId,
              field: inputName,
            })
          )
        }
        onChange={({ target }) => setValue(target.value)}
      />
      <br />
    </>
  );
};

export default Field;
