import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { RoomEntity } from "./room.entity";

@Entity({ name: 'message' })
export class MessageEntity extends BaseEntity {
  @Column()
  content: string;

  @Column()
  contentType: string;

  @ManyToOne(() => RoomEntity, room => room.messages)
  @JoinColumn()
  room: RoomEntity;

  @Column()
  createdBy: string;
}