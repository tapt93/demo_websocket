import { Injectable } from '@nestjs/common';
import { ConnectedDeviceEntity } from 'src/entity/connected-device.entity';
import { BaseService } from './base.service';

@Injectable()
export class ConnectedDeviceService extends BaseService<ConnectedDeviceEntity> {
    async findByRoomId(roomId): Promise<ConnectedDeviceEntity[]> {
        return this.find({ where: { roomId } })
    }
}