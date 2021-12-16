import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedDeviceEntity } from 'src/entity/connected-device.entity';
import { Repository } from 'typeorm';
import { BaseService } from './base.service';

@Injectable()
export class ConnectedDeviceService extends BaseService<ConnectedDeviceEntity> {
    constructor(
        @InjectRepository(ConnectedDeviceEntity)
        private readonly _connectedDeviceRepository: Repository<ConnectedDeviceEntity>,
    ) {
        super();
        this._repository = this._connectedDeviceRepository;
    }

    async findByRoomId(roomId): Promise<ConnectedDeviceEntity[]> {
        return this.find({ where: { roomId } })
    }
}