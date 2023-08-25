import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ITransaction } from '../interfaces';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TransactionsGateway {
  @SubscribeMessage('new-transations')
  handleMessage(client: Socket, payload: ITransaction): string {
    console.log('new-transactions Gateway payload', payload);

    client.broadcast.emit('admin-new-transactions', payload);
    return 'Hello world!';
  }
}
