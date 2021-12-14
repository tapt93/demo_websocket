import { IMessage } from "src/entity/message.entity";

export interface IRoom {
  id?: number;
  name?: string;
  users?: string[];
  connectedUser?: { socketId: any; userId: any }[];
  messages?: IMessage[];
}