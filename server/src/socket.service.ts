import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IMessage } from './message/message.model';
import { IRoom } from './room/room.model';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {


  @WebSocketServer()
  server: Server;

  //room test
  room: IRoom = {
    id: 1,
    name: 'test room',
    messages: [],
    users: ['user1', 'user2'],
    connectedUser: []
  }



  handleConnection(socket: Socket, ...args: any[]) {
    console.log('connect')
    //get user token
    const user = socket.handshake.headers.authorization;
    console.log(user)

    return this.server.to(socket.id).emit('room', this.room);
    // //get rooms by user
    // if (this.room.users.includes(user)) {
    //   //nếu chưa connect thì add vào list connected
    //   if (!this.room.connectedUser.some(c => c.userId === user)) {
        
    //   }
    // }
  }

  handleDisconnect(socket: Socket) {
    console.log('disconnect')
    this.removeConnectedUserFromRoom(socket.id);
    socket.disconnect();
  }

  @SubscribeMessage('send_message')
  listenForMessages(socket: Socket, message: IMessage) {
    //get room from message
    //save message to room
    this.room.messages.push(message);

    //const joinedUsers = room.users;
    //TODO: Send new Message to all joined Users of the room
    for (const user of this.room.connectedUser) {
      this.server.to(user.socketId).emit('receive_message', message);
    }
  }

  @SubscribeMessage('leave_room')
  onLeaveRoom(socket: Socket, roomId: any) {
    this.removeConnectedUserFromRoom(socket.id);
  }

  @SubscribeMessage('join_room')
  onJoinRoom(socket: Socket, roomId: any) {
    const user = socket.handshake.headers.authorization;
    this.room.connectedUser.push({
      socketId: socket.id,
      userId: user
    })
    this.server.to(socket.id).emit('receive_message', this.room.messages);
  }

  removeConnectedUserFromRoom(socketId) {
    const index = this.room.connectedUser.findIndex(c => c.socketId === socketId);
    this.room.connectedUser.splice(index, 1);
  }
}
