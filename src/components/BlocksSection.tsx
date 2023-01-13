import { useEffect, useRef, useState } from "react";
import { useSocket } from "../contexts/Socket";
import Block1 from "./Block1";
import Block2 from "./Block2";
import Block3 from "./Block3";

const BlocksSection = () => {
  const { socket } = useSocket();

  const buttonsRef = useRef(null);
  const [buttonsElement, setButtonsElement] = useState<Element | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setButtonsElement(buttonsRef.current);
  }, []);

  useEffect(() => {
    socket?.addEventListener("open", (event) => {
      console.log(event);

      setError(null);
    });

    socket?.addEventListener("error", (event) => {
      console.log(event);

      setError("Error " + event);
    });
  }, [socket]);

  return (
    <section>
      {error && <div>{error}</div>}
      <div ref={buttonsRef}></div>
      <div>
        <Block1 buttonsElement={buttonsElement} />
        <Block2 buttonsElement={buttonsElement} />
        <Block3 buttonsElement={buttonsElement} />
      </div>
    </section>
  );
};

export default BlocksSection;
