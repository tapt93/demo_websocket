import { BaseEntity } from "src/shared/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { RoomEntity } from "./room.entity";

@Entity({ name: 'joined_room' })
export class JoinedRoomEntity extends BaseEntity {
    @ManyToOne(() => RoomEntity, room => room.joinedRooms)
    room: RoomEntity;

    @Column()
    userId: number;

    @Column()
    role: string;
}