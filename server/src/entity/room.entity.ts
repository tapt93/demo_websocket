import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ConnectedDeviceEntity } from "./connected-device.entity";
import { JoinedRoomEntity } from "./joined-room.entity";
import { MessageEntity } from "./message.entity";
import { UserEntity } from "./user.entity";

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