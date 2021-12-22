import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/base.service';
import { Repository } from 'typeorm';
import { RoomEntity } from '../entity/room.entity';

@Injectable()
export class RoomService extends BaseService<RoomEntity> {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly _roomRepository: Repository<RoomEntity>,
  ) {
    super();
    this._repository = this._roomRepository;
  }
}