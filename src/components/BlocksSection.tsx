import { useEffect, useRef, useState } from "react";
import type { Block } from "../utils/types";
import { useSocket } from "../contexts/Socket";
import BlockWithButton from "./BlockWithButton";

const BlocksSection = () => {
  const { socket } = useSocket();

  const buttonsRef = useRef(null);
  const [buttonsElement, setButtonsElement] = useState<Element | null>(null);

  const [error, setError] = useState<string | null>(null);

  const blocks: Block[] = [
    {
      blockId: "block1",
      blockName: "Block 1",
      fields: [
        { inputName: "fname", name: "Имя", placeholder: "Введите имя" },
        {
          inputName: "lname",
          name: "Фамилия",
          placeholder: "Введите фамилию",
        },
      ],
    },
    {
      blockId: "block2",
      blockName: "Block 2",
      fields: [
        {
          inputName: "birthday",
          name: "День рождения",
          placeholder: "Введите день рождения",
        },
        { inputName: "height", name: "Рост", placeholder: "Введите рост" },
      ],
    },
    {
      blockId: "block3",
      blockName: "Block 3",
      fields: [
        { inputName: "city", name: "Город", placeholder: "Введите город" },
        { inputName: "address", name: "Улица", placeholder: "Введите улицу" },
        {
          inputName: "index",
          name: "Почтовый индекс",
          placeholder: "Введите почтовый индекс",
        },
      ],
    },
  ];

  useEffect(() => {
    setButtonsElement(buttonsRef.current);
  }, []);

  useEffect(() => {
    socket?.addEventListener("error", (event) => {
      console.log(event);

      setError("Error");
    });
  }, [socket]);

  return (
    <section>
      {error && <div>{error}</div>}
      <div ref={buttonsRef}></div>
      <div>
        {blocks.map((block) => (
          <BlockWithButton
            key={block.blockId}
            buttonsElement={buttonsElement}
            block={block}
          />
        ))}
      </div>
    </section>
  );
};

export default BlocksSection;
