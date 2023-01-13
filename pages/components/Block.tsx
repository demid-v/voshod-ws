import { type FC, useEffect } from "react";
import { Block } from "../../utils/types";
import { useSocket } from "../contexts/Socket";
import Field from "./Field";

const Block: FC<{ block: Block; isVisible: boolean }> = ({
  block: { blockId, blockName, fields },
  isVisible,
}) => {
  const { socket, isOpen } = useSocket();

  useEffect(() => {
    if (!socket || !isOpen) {
      return;
    }

    if (isVisible) {
      socket.send(JSON.stringify({ command: "subscribe", block: blockId }));
    } else {
      socket.send(JSON.stringify({ command: "unsubscribe", block: blockId }));
    }
  }, [socket, isOpen, isVisible, blockId]);

  return (
    <div className={isVisible ? "" : "hidden"}>
      <h2>{blockName}</h2>
      <form action="" method="post">
        {fields.map((field) => (
          <Field key={field.inputName} blockId={blockId} field={field} />
        ))}
      </form>
    </div>
  );
};

export default Block;
