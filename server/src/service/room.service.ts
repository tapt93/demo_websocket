import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from 'src/entity/room.entity';
import { Repository } from 'typeorm';
import { BaseService } from './base.service';

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