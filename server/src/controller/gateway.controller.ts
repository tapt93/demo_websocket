import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IJoinRoomDTO } from 'src/models/joinRoomDTO';
import { ConnectedDeviceService } from 'src/service/connected-device.service';
import { AuthService } from '../auth/auth.service';
import { JoinedRoomService } from '../service/joined-room.service';
import { RoomService } from '../service/room.service';
import { UserService } from '../service/user.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private authService: AuthService,
    private roomService: RoomService,
    private joinedRoomService: JoinedRoomService,
    private userService: UserService,
    private connectedDeviceService: ConnectedDeviceService,
    private jwtService: JwtService,
  ) { }

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket, ...args: any[]) {
    console.log('connect')
    //get user token
    // if (this.jwtService.verify(socket.handshake.headers.authorization, { secret: process.env.JWT_PRIVATE_KEY })) {
    //   return socket.disconnect();
    // }
    const decodedToken = this.jwtService.decode(socket.handshake.headers.authorization);
    //console.log(decodedToken);
    //return
    const role = socket.handshake.query['role'];

    var user = null;
    switch (role) {
      case 'consumer':
        //find in table consumer
        user = await this.userService.findOne({ where: { wmobilePhone: decodedToken['mobilePhone'] } });
        break;
      case 'outlet':
        //find in table outlet
        user = await this.userService.findOne({ where: { mobilePhone: decodedToken['mobilePhone'] } });
        break;
      default:
        break;
    }
    console.log({ user })
    if (!user) {
      return socket.disconnect();
    }

    return this.server.to(socket.id).emit('connected', 'connected');
  }

  async handleDisconnect(socket: Socket) {
    console.log('disconnect')
    await this.removeConnectedUser(socket.id);
    socket.disconnect();
  }

  @SubscribeMessage('send_message')
  async listenForMessages(socket: Socket, message) {
    if (!message) {
      return;
    }
    //get room from redis by message    
    const room = await this.roomService.findById(message.roomId);

    //TODO: save message to room in redis

    //TODO: Send new Message to all joined Users of the room
    const connectedDevices = await this.connectedDeviceService.findByRoomId(message.roomdId);
    for (const device of connectedDevices) {
      this.server.to(device.socketId).emit('receive_message', message);
    }

    //TODO: Send notification to the rest who is not online
  }

  async removeConnectedUser(socketId) {
    //TODO: remove socketId from roomConnected in redis
    return await this.connectedDeviceService.delete({ socketId });
  }

  @SubscribeMessage('join_room')
  async onJoinRoom(socket: Socket, roomId) {
    //save sockets that connected to room
    await this.connectedDeviceService.save({ socketId: socket.id, roomId });
  }

  @SubscribeMessage('leave_room')
  async onLeaveRoom(socket: Socket, roomId) {
    //save sockets that connected to room
    await this.connectedDeviceService.delete({ socketId: socket.id, roomId });
  }
}
