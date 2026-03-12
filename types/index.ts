export interface DataRow {
  [key: string]: string | number;
}

export interface FilterState {
  column: string;
  value: string;
}

export interface AIMessage {
  role: "user" | "assistant";
  content: string;
  thinking?: string;
}
