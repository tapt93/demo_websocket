import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from '../message/message.module';
import { RoomController } from './controller/room.controller';
import { JoinedRoomEntity } from './entity/joined-room.entity';
import { RoomEntity } from './entity/room.entity';
import { JoinedRoomService } from './service/joined-room.service';
import { RoomService } from './service/room.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomEntity, JoinedRoomEntity]),
    forwardRef(() => MessageModule)
  ],
  controllers: [RoomController],
  providers: [RoomService, JoinedRoomService],
  exports: [RoomService, JoinedRoomService]
})
export class RoomModule { }
