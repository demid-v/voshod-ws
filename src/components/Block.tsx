import { type FC, useEffect } from "react";
import type { Block as BlockType } from "../utils/types";
import { useSocket } from "../contexts/Socket";
import Field from "./Field";

const Block: FC<{ block: BlockType; isVisible: boolean }> = ({
  block: { blockId, blockName, fields },
  isVisible,
}) => {
  const { socket, isOpen } = useSocket();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (isVisible) {
      socket?.send(JSON.stringify({ command: "subscribe", block: blockId }));
    } else {
      socket?.send(JSON.stringify({ command: "unsubscribe", block: blockId }));
    }
  }, [socket, isOpen, isVisible, blockId]);

  return (
    <div style={{ display: isVisible ? "block" : "none" }}>
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
