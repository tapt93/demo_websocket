import { RoomEntity } from "../../room/entity/room.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "src/shared/base.entity";

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