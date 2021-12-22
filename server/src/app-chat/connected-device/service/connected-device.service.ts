import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/base.service';
import { Repository } from 'typeorm';
import { ConnectedDeviceEntity } from '../entity/connected-device.entity';

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