import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import { useSocket } from "../contexts/Socket";

function useSocketListener<T extends object>(
  blockId: string,
  isVisible: boolean,
  setIsVisible: Dispatch<SetStateAction<boolean>>,
  fieldsObj: T
): [T, Dispatch<SetStateAction<T>>] {
  const { socket, isOpen } = useSocket();

  const [fields, setFields] = useState(fieldsObj);

  useEffect(() => {
    socket?.addEventListener("close", () => setIsVisible(false));

    socket?.addEventListener("message", (message) => {
      const data = JSON.parse(message.data);

      if (data.block !== blockId) {
        return;
      }

      setFields((prevState) => {
        const state = JSON.parse(JSON.stringify(prevState));

        if (data.focus) {
          state[data.focus].blocked = true;
        } else if (data.blur) {
          state[data.blur].blocked = false;
        } else {
          for (const [name, value] of Object.entries(data.data)) {
            state[name].value = value;
          }

          return state;
        }

        return state;
      });
    });
  }, [socket, blockId, setIsVisible]);

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

  return [fields, setFields];
}

export { useSocketListener };
