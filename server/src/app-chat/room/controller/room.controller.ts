import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, Error } from 'src/models/apiResponse';
import { IJoinRoomDTO } from 'src/models/joinRoomDTO';
import { RoomService } from '../service/room.service';
import { RoomEntity } from '../entity/room.entity';
import { JoinedRoomService } from '../service/joined-room.service';
import { MessageService } from 'src/app-chat/message/service/message.service';

@Controller('api/room')
export class RoomController {
    constructor(private readonly roomService: RoomService,
        private readonly messageService: MessageService,
        private readonly joinedRoomService: JoinedRoomService) { }

    @Post('getRoom')
    async getRoom(@Body() joinRoomDTO: IJoinRoomDTO) {
        try {
            //check room exist
            const myRooms = await this.joinedRoomService.find({ where: { userId: joinRoomDTO.from.userId } });
            if (myRooms) {
                const commonRoom = await this.joinedRoomService.findOne({ where: { roomdId: myRooms.map(c => c.room.id), userId: joinRoomDTO.to.userId } });
                if (commonRoom) {
                    const messages = await this.messageService.findByRoom(commonRoom.id);
                    commonRoom.room.messages = Promise.resolve(messages);

                    return new ApiResponse(commonRoom.room);
                }
            }

            //create room if not exists
            const newRoom = await this.roomService.save(new RoomEntity());
            await this.joinedRoomService.addMemberToRoom(newRoom, joinRoomDTO);

            return new ApiResponse(newRoom);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
