import { Controller, Get, Post, Body } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDTO } from './event.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private serv: EventService) { }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get Events',
    type: EventDTO,
  })  
  public async getAll(): Promise<EventDTO[]> {
    return await this.serv.getAll()
  }

  @Post()
  @ApiOperation({ summary: 'Create Event' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async post(@Body() dto: EventDTO): Promise<EventDTO> {
    return this.serv.create(dto);
  } 
}
