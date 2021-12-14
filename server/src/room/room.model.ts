import { IMessage } from "src/message/message.model";

export interface IRoom {
  id?: number;
  name?: string;
  users?: string[];
  connectedUser?: { socketId: any; userId: any }[];
  messages?: IMessage[];
}