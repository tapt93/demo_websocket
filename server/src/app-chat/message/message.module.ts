import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from '../room/room.module';
import { MessageController } from './controller/message.controller';
import { MessageEntity } from './entity/message.entity';
import { MessageService } from './service/message.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
    forwardRef(() => RoomModule)
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService]
})
export class MessageModule { }
