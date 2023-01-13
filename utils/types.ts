type Field = {
  inputName: string;
  name: string;
  placeholder: string;
};

type Block = {
  blockId: string;
  blockName: string;
  buttonName?: string;
  fields: Field[];
};

export type { Field, Block };
