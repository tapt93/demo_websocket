import { BaseEntity } from "src/shared/base.entity";
import { Column, Entity } from "typeorm";

@Entity({name: 'connected_devices'})
export class ConnectedDeviceEntity extends BaseEntity {
    @Column()
    roomId: number;

    @Column()
    socketId: string;
}