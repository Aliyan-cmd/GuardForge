// src/types/index.ts

export interface WSMessage {
  type: string;
  [key: string]: any;
}

export interface User {
  email: string;
  role: string;
}
