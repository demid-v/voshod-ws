import { type FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Block as BlockType } from "../utils/types";
import { useSocket } from "../contexts/Socket";
import Block from "./Block";
import Button from "./Button";

const BlockWithButton: FC<{
  buttonsElement: Element | null;
  block: BlockType;
}> = ({ buttonsElement, block }) => {
  const { blockName, buttonName } = block;

  const { socket } = useSocket();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    socket?.addEventListener("close", () => setIsVisible(true));
  }, [socket]);

  return (
    <>
      {buttonsElement &&
        createPortal(
          <Button
            buttonName={buttonName || blockName}
            setIsBlockVisible={setIsVisible}
          />,
          buttonsElement
        )}
      <Block block={block} isVisible={isVisible} />
    </>
  );
};

export default BlockWithButton;
