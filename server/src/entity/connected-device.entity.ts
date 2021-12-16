import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({name: 'connected_devices'})
export class ConnectedDeviceEntity extends BaseEntity {
    @Column()
    roomId: number;

    @Column()
    socketId: string;
}