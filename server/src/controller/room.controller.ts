import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JoinedRoomEntity } from 'src/entity/joined-room.entity';
import { RoomEntity } from 'src/entity/room.entity';
import { ApiResponse } from 'src/models/apiResponse';
import { IJoinRoomDTO } from 'src/models/joinRoomDTO';
import { JoinedRoomService } from 'src/service/joined-room.service';
import { RoomService } from 'src/service/room.service';

@Controller()
export class RoomController {
    constructor(private readonly roomService: RoomService,
        private readonly jwtService: JwtService,
        private readonly joinedRoomService: JoinedRoomService,
        private readonly authService: AuthService) { }

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
