import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RtspStreamService } from './rtsp-stream.service';
import { CreateRtspStreamDto } from './dto/create-rtsp-stream.dto';
import { UpdateRtspStreamDto } from './dto/update-rtsp-stream.dto';

@Controller('rtsp-stream')
export class RtspStreamController {
  constructor(private readonly rtspStreamService: RtspStreamService) {}

  @Post()
  createStream(@Body() createRtspStreamDto: CreateRtspStreamDto) {
    return this.rtspStreamService.createStream(createRtspStreamDto);
  }

  @Post('/kill-stream/:id')
  destroyStream(@Param('id') id: number) {
    return this.rtspStreamService.destroyStream(id);
  }

  @Get()
  findAll() {
    return this.rtspStreamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rtspStreamService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRtspStreamDto: UpdateRtspStreamDto,
  ) {
    return this.rtspStreamService.update(+id, updateRtspStreamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rtspStreamService.remove(+id);
  }
}
