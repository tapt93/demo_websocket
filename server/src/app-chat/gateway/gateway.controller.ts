import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { verify } from 'crypto';
import { Server, Socket } from 'socket.io';
import { ConnectedDeviceService } from 'src/app-chat/connected-device/service/connected-device.service';
import { AuthService } from 'src/auth/auth.service';
import { RoomService } from '../room/service/room.service';
import { UserService } from '../user/service/user.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private roomService: RoomService,
    private userService: UserService,
    private connectedDeviceService: ConnectedDeviceService,
    private authService: AuthService,
  ) { }

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket, ...args: any[]) {
    console.log('connect');

    const authToken = socket.handshake.headers.authorization; 

    //verify and decode token
    try {
      var decodedToken = this.authService.verifyJwt(authToken);
    } catch (error) {
      console.log('e', error);
      return socket.disconnect();
    }

    if (!authToken || !decodedToken) {
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
