import { Controller, Get } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private serv: EventService) { }

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  } 
}
