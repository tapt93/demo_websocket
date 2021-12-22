import { MessageEntity } from "src/app-chat/message/entity/message.entity";
import { BaseEntity } from "src/shared/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { JoinedRoomEntity } from "./joined-room.entity";

@Entity({ name: 'room' })
export class RoomEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: false })
  started: boolean;

  @OneToMany(() => MessageEntity, message => message.room)
  messages?: MessageEntity[];

  @OneToMany(() => JoinedRoomEntity, joinedRoom => joinedRoom.room)
  joinedRooms?: JoinedRoomEntity[];
}