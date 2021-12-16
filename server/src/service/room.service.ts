import { Injectable } from '@nestjs/common';
import { RoomEntity } from 'src/entity/room.entity';
import { BaseService } from './base.service';

@Injectable()
export class RoomService extends BaseService<RoomEntity> {
  
}