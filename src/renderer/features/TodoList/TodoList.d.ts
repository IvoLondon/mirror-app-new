export type PropType = {
  api: string;
  project_id: number;
};

export type ItemType = {
  id: number;
  due: {
    date: string;
  };
  content: string;
};
