export interface GameInputDTO {
  title: string;
  console_id: number;
}

export interface GameOutputDTO {
  id: number;
  title: string;
  console: {
    id: number;
    name: string;
  };
}