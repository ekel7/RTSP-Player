import { Injectable } from '@nestjs/common';
import { CreateRtspStreamDto } from './dto/create-rtsp-stream.dto';
import { UpdateRtspStreamDto } from './dto/update-rtsp-stream.dto';
import { HttpAdapterHost } from '@nestjs/core';
import * as Stream from 'node-rtsp-stream-jsmpeg';
import { Port } from '../ports/port.model';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuid } from 'uuid';

@Injectable()
export class RtspStreamService {
  constructor(
    @InjectModel(Port)
    private portModel: typeof Port,
    private adapterHost: HttpAdapterHost,
  ) {}

  async createStream(createRtspStreamDto: CreateRtspStreamDto) {
    let wsPort = 0;
    const { rtspUrl } = createRtspStreamDto;
    let lastUsedPort = 0;

    const ports = await this.portModel.findAll();

    if (ports.length === 0) {
      wsPort = 4000;
    } else {
      lastUsedPort = ports[ports.length - 1].number;
      console.log(ports[ports.length - 1].number);
      wsPort = lastUsedPort + 1;
    }

    const options = {
      name: 'streamName',
      url: rtspUrl,
      wsPort: wsPort,
    };

    try {
      const newStream = new Stream(options);
      newStream.start();
      const streamPid = newStream.mpeg1Muxer.stream.pid;

      const streamData = {
        webSocketUrl: 'ws://localhost:' + wsPort,
        pid: streamPid,
      };

      this.portModel.findOrCreate({
        where: {
          number: wsPort,
          user: 'randomuser42069',
          id: uuid(),
          pid: streamPid,
        },
      });

      this.portModel.findOrCreate({
        where: {
          number: wsPort + 1,
          user: 'randomuser03024',
          id: uuid(),
          pid: streamPid,
        },
      });

      return streamData;
    } catch (err) {
      console.log(err);
    }
  }

  destroyStream(pid) {
    try {
      process.kill(pid);

      this.portModel.destroy({
        where: {
          pid: pid,
        },
      });
      return 'Stream ' + pid + ' killed successfully.';
    } catch (err) {
      console.error(err);
    }
  }

  /* handleSecureRequest() {
    const httpAdapter = this.adapterHost.httpAdapter;
    const instance = httpAdapter.getHttpServer();

    instance.on('upgrade', function upgrade(request, socket, head) {
                //This is the key, it finds the wsServer and then emits it to my current connection
                wsServer.handleUpgrade(request, socket, head, function done(ws) {
                    wsServer.emit('connection', ws, request);
                });
          }
  } */

  findAll() {
    return `This action returns all rtspStream`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rtspStream`;
  }

  update(id: number, updateRtspStreamDto: UpdateRtspStreamDto) {
    return `This action updates a #${id} rtspStream`;
  }

  remove(id: number) {
    return `This action removes a #${id} rtspStream`;
  }
}
