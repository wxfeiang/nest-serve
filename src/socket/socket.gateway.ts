import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { Socket } from './entities/socket.entity';
import { SocketService } from './socket.service';

@WebSocketGateway(3002, {
  allowEIO3: true, //协议前后端版本要一致
  //后端解决跨域
  cors: {
    origin: 'http://127.0.0.1:5503', //这里不要写*，要写具体，否则会出现跨域问题
    credentials: true,
  },
})
export class SocketGateway {
  constructor(private readonly socketService: SocketService) {}
  msgList: string[] = [];
  @SubscribeMessage('socketTest')
  socketTest(@MessageBody() data: any) {
    console.log('🥠[data]:', data);
    // 转发信息
    const forwardMsg: string = '服务端=>客户端';
    return {
      //通过return返回客户端转发事件
      event: 'forward',
      data: forwardMsg, //data后面跟携带数据
    };
  }
  //接收并处理来自客户端的消息
  @SubscribeMessage('toServer')
  toServer(client: Socket, data: string) {
    console.log(data);
    client.emit('toServer', '这是一条发送给客户端的消息');
  }

  @SubscribeMessage('createSocket')
  create(@MessageBody() createSocketDto: CreateSocketDto) {
    return this.socketService.create(createSocketDto);
  }

  @SubscribeMessage('findAllSocket')
  findAll() {
    return this.socketService.findAll();
  }

  @SubscribeMessage('findOneSocket')
  findOne(@MessageBody() id: number) {
    return this.socketService.findOne(id);
  }

  @SubscribeMessage('updateSocket')
  update(@MessageBody() updateSocketDto: UpdateSocketDto) {
    return this.socketService.update(updateSocketDto.id, updateSocketDto);
  }

  @SubscribeMessage('removeSocket')
  remove(@MessageBody() id: number) {
    return this.socketService.remove(id);
  }
}
