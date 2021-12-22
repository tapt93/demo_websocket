import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from 'src/models/apiResponse';
import { IJoinRoomDTO } from 'src/models/joinRoomDTO';
import { RoomService } from '../service/room.service';
import { RoomEntity } from '../entity/room.entity';
import { JoinedRoomService } from '../service/joined-room.service';

@Controller()
export class RoomController {
    constructor(private readonly roomService: RoomService,
        private readonly joinedRoomService: JoinedRoomService) { }

    @Post()
    async getRoom(@Body() joinRoomDTO: IJoinRoomDTO) {
        //check room exist
        const myRooms = await this.joinedRoomService.find({ where: { userId: joinRoomDTO.from.userId } });
        if (myRooms) {
            const ourRoom = await this.joinedRoomService.findOne({ where: { roomdId: myRooms.map(c => c.room.id), userId: joinRoomDTO.to.userId } });
            if (ourRoom) {
                return new ApiResponse(ourRoom.room, true);
            }
        }
        
        //create room if not exists
        const newRoom = await this.roomService.save(new RoomEntity());
        await this.joinedRoomService.save({
            userId: joinRoomDTO.from.userId,
            room: newRoom,
            role: joinRoomDTO.from.role
        });
        await this.joinedRoomService.save({
            userId: joinRoomDTO.to.userId,
            room: newRoom,
            role: joinRoomDTO.to.role
        });
        return new ApiResponse(newRoom);
    }
}
